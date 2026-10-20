import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {evaluateScenario} from '../engineering/v1-m01-energy-model.mjs';
const x=JSON.parse(readFileSync('engineering/v1-m01-energy-sample.json','utf8'));
assert.equal(x.status,'ILLUSTRATIVE_ONLY');
for(const [architecture,scenario] of Object.entries(x.variants)){
 const r=evaluateScenario({...x.shared,...scenario,architecture});
 assert.equal(r.converged,true);assert.equal(r.illustrativeOnly,true);
 assert.ok(r.estimatedMassKg>x.shared.dryMassKg+x.shared.payloadKg);
 assert.ok(Math.abs(r.estimatedMassKg-x.shared.dryMassKg-x.shared.payloadKg-r.estimatedPackMassKg)<1e-8);
}
assert.equal(evaluateScenario({architecture:'VTOL',dryMassKg:1,payloadKg:0,usablePackWhPerKg:1,reserveFraction:0,phases:[{name:'test',durationHours:1,powerKWPerKg:1}]}).converged,false);
assert.throws(()=>evaluateScenario({architecture:'VTOL',dryMassKg:1,payloadKg:-1,usablePackWhPerKg:1,reserveFraction:0,phases:[{name:'test',durationHours:1,powerKWPerKg:1}]}));
const mission=JSON.parse(readFileSync('engineering/v1-m01-thrace-route-candidates.json','utf8'));assert.equal(mission.decision,'HOLD_BOTH');assert.equal(mission.operational_authorization,false);
console.log('Toy arithmetic consistent; operational evidence still missing.');
