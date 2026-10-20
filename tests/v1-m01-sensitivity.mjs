import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {sensitivitySweep} from '../engineering/v1-m01-sensitivity-sweep.mjs';
const s=JSON.parse(readFileSync('engineering/v1-m01-energy-sample.json','utf8'));
assert.equal(s.status,'ILLUSTRATIVE_ONLY');
for(const [architecture,variant] of Object.entries(s.variants)){
 const rows=sensitivitySweep(s.shared,variant,architecture);
 assert.equal(rows.length,12);assert.ok(rows.every(r=>r.architecture===architecture&&r.converged&&r.requiredUsablePackKWh>0));
 const lookup=(factor,multiplier)=>rows.find(r=>r.factor===factor&&r.multiplier===multiplier).requiredUsablePackKWh;
 for(const factor of ['payload','duration','phase_power'])assert.ok(lookup(factor,.8)<lookup(factor,1)&&lookup(factor,1)<lookup(factor,1.2),factor);
 assert.ok(lookup('pack_specific_energy',.8)>lookup('pack_specific_energy',1));
 assert.ok(lookup('pack_specific_energy',1)>lookup('pack_specific_energy',1.2));
}
const mission=JSON.parse(readFileSync('engineering/v1-m01-thrace-route-candidates.json','utf8'));
assert.equal(mission.decision,'HOLD_BOTH');assert.equal(mission.operational_authorization,false);
console.log('24 educational sensitivity scenarios passed monotonicity and HOLD checks.');
