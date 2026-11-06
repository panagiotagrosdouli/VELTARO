import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {evaluateScenario} from '../engineering/v1-m01-energy-model.mjs';
import {jointSensitivity} from '../engineering/v1-m01-joint-sensitivity.mjs';

const load = path => JSON.parse(readFileSync(path, 'utf8'));
const sample = load('engineering/v1-m01-energy-sample.json');
const sources = load('engineering/v1-m01-public-source-register.json');
const pristine = JSON.stringify(sample);
const report = jointSensitivity(sample);

assert.equal(report.status, 'ILLUSTRATIVE_ONLY');
assert.equal(report.decision, 'HOLD_BOTH');
assert.equal(report.independentValidation, false);
assert.equal(report.rowCount, 18);
assert.equal(report.rows.length, 18);
assert.equal(JSON.stringify(sample), pristine, 'Never modify the shared hypothetical fixture');

for (const architecture of ['VTOL', 'TRANSFORMING_WING']) {
  const rows = report.rows.filter(r => r.architecture === architecture);
  assert.equal(rows.length, 9);
  assert.equal(new Set(rows.map(r =>
    r.energyMultiplier + ':' + r.powerMultiplier)).size, 9);

  const row = (energy, power) => rows.find(r =>
    r.energyMultiplier === energy && r.powerMultiplier === power);
  const baseline = row(1, 1);
  const direct = evaluateScenario({...sample.shared, ...sample.variants[architecture], architecture});
  assert.equal(baseline.converged, true);
  assert.ok(Math.abs(baseline.illustrativeMassKg - direct.estimatedMassKg) < 1e-8);
  assert.ok(Math.abs(baseline.illustrativeRequiredPackKWh - direct.requiredUsablePackKWh) < 1e-8);
  assert.equal(baseline.packPower.status, 'UNKNOWN_NO_PACK_RATINGS');
  assert.ok(rows.every(r => r.packPower.status === 'UNKNOWN_NO_PACK_RATINGS'));

  // Check interaction directions: less specific energy or more phase power
  // increases the *toy model* total mass and installed pack energy burden.
  assert.ok(row(.8, 1).illustrativeMassKg > baseline.illustrativeMassKg);
  assert.ok(row(1, 1.2).illustrativeMassKg > baseline.illustrativeMassKg);
  assert.ok(row(1.2, .8).illustrativeMassKg < baseline.illustrativeMassKg);
  assert.ok(row(.8, 1.2).illustrativeRequiredPackKWh > baseline.illustrativeRequiredPackKWh);
}

// Explicit pack-rating assumptions still cannot become "verified" results.
const assumedRatings = {VTOL:{continuousPowerKW:1e6, peakPowerKW:1e6, maxPeakHours:1}};
let toy = jointSensitivity(sample, assumedRatings);
assert.equal(toy.rows[0].packPower.status, 'UNKNOWN_PHASE_DUTY');
const classified = structuredClone(sample);
classified.variants.VTOL.phases[0].powerClass = 'PEAK';
classified.variants.VTOL.phases[1].powerClass = 'CONTINUOUS';
toy = jointSensitivity(classified, assumedRatings);
assert.ok(toy.rows.filter(r => r.architecture === 'VTOL').every(r =>
  r.packPower.status === 'ASSUMED_CONSTRAINTS_MET_NOT_VERIFIED'));
assert.ok(toy.rows.filter(r => r.architecture === 'TRANSFORMING_WING').every(r =>
  r.packPower.status === 'UNKNOWN_NO_PACK_RATINGS'));
toy = jointSensitivity(classified,
  {VTOL:{continuousPowerKW:1, peakPowerKW:20, maxPeakHours:.01}});
assert.ok(toy.rows.filter(r => r.architecture === 'VTOL').every(r =>
  r.packPower.status === 'ASSUMED_CONSTRAINTS_EXCEEDED'));
toy = jointSensitivity(classified,
  {VTOL:{continuousPowerKW:100, peakPowerKW:50, maxPeakHours:.2}});
assert.equal(toy.rows[0].packPower.status, 'UNKNOWN_INVALID_PACK_RATINGS');

// Explicit mathematical non-closure cannot be silently interpreted as zero.
const lowEnergy = structuredClone(sample);
lowEnergy.shared.usablePackWhPerKg = 2;
const nonclosing = jointSensitivity(lowEnergy);
assert.ok(nonclosing.rows.every(r => r.converged === false));
assert.ok(nonclosing.rows.every(r =>
  r.illustrativeMassKg === null && r.illustrativeEnergyKWh === null &&
  r.packPower.status === 'NOT_APPLICABLE_NON_CLOSURE'));
assert.throws(() => jointSensitivity({...sample, status:'VALIDATED'}), /ILLUSTRATIVE_ONLY/);
assert.throws(() => jointSensitivity({...sample, variants:{VTOL:sample.variants.VTOL}}),
  /Both architectures/);

// Public research explains what to investigate; it supplies ZERO VELTARO values.
assert.equal(sources.status, 'BACKGROUND_RESEARCH_ONLY');
assert.equal(sources.validated_vehicle_data, false);
assert.equal(sources.decision, 'HOLD_BOTH');
assert.equal(sources.selected_architecture, null);
assert.equal(sources.sources.length, 4);
assert.ok(sources.sources.every(s =>
  s.url.startsWith('https://') && s.veltaro_numerical_value === null &&
  s.transfer_status !== 'VEHICLE_VALIDATED'));
assert.equal(new Set(sources.sources.map(s => s.id)).size, sources.sources.length);
assert.ok(sources.open_numeric_evidence.every(x =>
  x.value === null && typeof x.unit === 'string' && x.required_conditions.length > 20));

console.log('18 two-factor toy scenarios, pack-power unknown/fail-closed cases and research-source boundaries passed.');
