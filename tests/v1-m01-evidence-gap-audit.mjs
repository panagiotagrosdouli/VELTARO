import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {auditM01} from '../engineering/v1-m01-evidence-gap-audit.mjs';

const load = path => JSON.parse(readFileSync(path, 'utf8'));
const mission = load('engineering/v1-m01-common-mission.json');
const routes = load('engineering/v1-m01-thrace-route-candidates.json');
const evidence = load('engineering/v1-battery-propulsion-evidence.json');
const baseline = auditM01(mission, routes, evidence);
assert.equal(baseline.assessment, 'REPORTED_INPUT_COMPLETENESS_ONLY');
assert.equal(baseline.outcome, 'MISSING_INPUTS');
assert.equal(baseline.architectureDecision, 'NOT_MADE_BY_AUDIT');
assert.ok(baseline.missingCount > 0);
assert.equal(baseline.missingCount, baseline.gaps.length);
assert.equal(baseline.declaredDecisions.mission, 'HOLD_BOTH');
for (const key of ['VTOL', 'TRANSFORMING_WING']) {
  assert.ok(baseline.gaps.some(x => x.section === key && x.field === 'route.arrival_site'));
  assert.ok(baseline.gaps.some(x => x.section === key && x.field === 'route.route_legal'));
}
assert.ok(baseline.gaps.some(x => x.field === 'BATT-01.positive_value'));
assert.ok(baseline.gaps.some(x => x.field === 'validation.independent_safety_review_completed'));

// The audit must not silently accept duplicate candidate or evidence records.
const duplicatedRoutes = structuredClone(routes);
duplicatedRoutes.candidates.push(structuredClone(
  duplicatedRoutes.candidates.find(x => x.architecture === 'TRANSFORMING_WING')));
assert.ok(auditM01(mission, duplicatedRoutes, evidence).gaps.some(
  x => x.section === 'TRANSFORMING_WING' && x.field === 'route.unique_candidate'));
const duplicatedEvidence = structuredClone(evidence);
duplicatedEvidence.required_vehicle_records.push(structuredClone(duplicatedEvidence.required_vehicle_records[0]));
assert.ok(auditM01(mission, routes, duplicatedEvidence).gaps.some(
  x => x.field === 'BATT-01.unique_record'));

// Zero is valid for optional road legs, luggage and wind; not for energy or mass.
const revised = structuredClone(mission);
for (const field of ['road_leg_origin_km', 'road_leg_destination_km', 'luggage_mass_kg', 'environment_wind_mps'])
  revised.assumptions[field] = 0;
assert.equal(auditM01(revised, routes, evidence).gaps.filter(x =>
  ['assumptions.road_leg_origin_km', 'assumptions.road_leg_destination_km',
   'assumptions.luggage_mass_kg', 'assumptions.environment_wind_mps'].includes(x.field)).length, 0);

// Even populated form fields cannot authorize an aircraft or select an architecture.
const claimed = structuredClone(mission);
claimed.validation = {legal_site_access_confirmed:true, source_review_completed:true,
  independent_safety_review_completed:true, decision:'CHOSEN'};
const result = auditM01(claimed, routes, evidence);
assert.equal(result.architectureDecision, 'NOT_MADE_BY_AUDIT');
assert.equal(result.outcome, 'MISSING_INPUTS');
console.log('M-01 evidence gap audit flags unknowns, duplicates and review limitations.');
