import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {assessEvidence} from '../engineering/v1-evidence-quality-gate.mjs';
const e=JSON.parse(readFileSync('engineering/v1-battery-propulsion-evidence.json','utf8'));
const m=JSON.parse(readFileSync('engineering/v1-m01-thrace-route-candidates.json','utf8'));
let x=assessEvidence(e,m);assert.equal(x.canPublishPerformanceComparison,false);assert.ok(x.reasons.length>=9);
const fake=structuredClone(e);fake.vehicle_validation=true;
for(const r of fake.required_vehicle_records)Object.assign(r,{status:'INDEPENDENTLY_VERIFIED',value:100,measurement_source_id:'FAKE',reviewer:'FAKE',test_date:'2026-10-20',configuration_id:'FAKE',conditions:'FAKE',unit:'FAKE'});
x=assessEvidence(fake,m);assert.equal(x.canPublishPerformanceComparison,false);assert.ok(x.reasons.some(z=>z.includes('authorization')));
assert.equal(assessEvidence({...e,required_vehicle_records:[]},m).canPublishPerformanceComparison,false);
console.log('Data-quality gate blocks unverified published performance and absent legal mission.');
