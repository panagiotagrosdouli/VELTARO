import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const v=JSON.parse(readFileSync('engineering/v1-m01-thrace-route-candidates.json','utf8'));
assert.equal(v.decision,'HOLD_BOTH');assert.equal(v.operational_authorization,false);
assert.deepEqual(v.candidates.map(x=>x.architecture),['TRANSFORMING_WING','VTOL']);
for(const c of v.candidates){assert.equal(c.route_legal,false);assert.equal(c.arrival_site,null);assert.equal(c.origin,null);assert.equal(c.destination,null);assert.equal(c.status,'BLOCKED_UNVERIFIED');assert.ok(c.evidence_gaps.length>=5)}
assert.equal(v.candidates[1].departure_site,null);assert.equal(v.shared_inputs.flight_energy_kWh,null);
console.log('Two research paths remain blocked without authorized site pairs or mass/energy evidence.');
