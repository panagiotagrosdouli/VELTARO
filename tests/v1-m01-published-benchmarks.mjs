import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {auditPublishedBenchmarks} from '../engineering/v1-m01-audit-published-benchmarks.mjs';

const benchmark = JSON.parse(readFileSync('engineering/v1-m01-external-benchmarks.json','utf8'));
const audit = auditPublishedBenchmarks(benchmark);
assert.equal(audit.validSourceRegister,true, JSON.stringify(audit.problems));
assert.equal(audit.acceptableVeltaroDesignValues,false);
assert.equal(audit.architectureDecision,'NOT_SELECTED');
assert.equal(audit.sourceCount,3);
assert.equal(audit.observationCount,18);
assert.deepEqual(audit.problems,[]);
assert.equal(benchmark.decision,'HOLD_BOTH');
assert.equal(benchmark.transferPolicy,'NO_AUTOMATIC_MODEL_INGESTION');
assert.ok(benchmark.unresolvedMissionFields.includes('lawful_departure_and_arrival_pair'));

const byId = id => benchmark.externalObservations.find(x=>x.id===id);
assert.equal(byId('X57-CELL-E').value,225);
assert.equal(byId('X57-PACK-E').value,149);
assert.equal(byId('X57-USABLE-MODEL-E').value,130);
assert.equal(byId('X57-USABLE-MODEL-E').basis,'MISSION_MODEL_APPROXIMATION');
assert.equal(byId('VS-ONBOARD-SPEC').value,178.4);
assert.equal(byId('VS-ONBOARD-MASS').value,43.8);
assert.equal(byId('VS-ONBOARD-KWH').value,7.81);
assert.equal(byId('VS-TEST-235A').assetId,'VS210-24S1P-TEST');
assert.equal(byId('VS-TEST-55C').unit,'degC');
assert.equal(byId('VS-FLIGHT-MASS').value,140);
assert.ok(benchmark.externalObservations.every(x =>
  x.transferToVeltaro === false && x.independentlyVerifiedForVeltaro === false));

// A nominal observation must never populate a VELTARO usable/approved input.
const modified = fn => {
  const copy=structuredClone(benchmark);
  fn(copy);
  return auditPublishedBenchmarks(copy);
};
const corruptedEnergy=modified(x=>by(x,'VS-ONBOARD-KWH').value=17);
assert.equal(corruptedEnergy.validSourceRegister,false);
assert.ok(corruptedEnergy.problems.some(z=>z.includes('nominal energy / mass')));
const badUnit=modified(x=>by(x,'VS-TEST-110A').unit='kW');
assert.equal(badUnit.validSourceRegister,false);
const duplicate=modified(x=>x.externalObservations.push({...by(x,'X57-CELL-E')}));
assert.equal(duplicate.validSourceRegister,false);
const missingProvenance=modified(x=>by(x,'VS-ONBOARD-MASS').sourceId='UNSUPPORTED');
assert.equal(missingProvenance.validSourceRegister,false);
const crossAsset=modified(x=>by(x,'VS-ONBOARD-KWH').assetId='VS210-24S1P-TEST');
assert.equal(crossAsset.validSourceRegister,false);
const transferAttempt=modified(x=>by(x,'VS-TEST-235A').transferToVeltaro=true);
assert.equal(transferAttempt.validSourceRegister,false);
const unsupportedDesign=modified(x=>x.veltaroValidatedInputs.installedUsablePackWhPerKg=178.4);
assert.equal(unsupportedDesign.validSourceRegister,false);
const unsupportedApproval=modified(x=>x.veltaroValidatedInputs.operationalAuthorization=true);
assert.equal(unsupportedApproval.validSourceRegister,false);
const missingMission=modified(x=>x.unresolvedMissionFields=[]);
assert.equal(missingMission.validSourceRegister,false);

function by(source,id) {
  const observation=source.externalObservations.find(x=>x.id===id);
  assert.ok(observation, 'Missing fixture '+id);
  return observation;
}
console.log('External literature source audit passed: 18 observations, nominal/usable boundaries, unit/asset checks and fail-closed VELTARO transfer tests.');
