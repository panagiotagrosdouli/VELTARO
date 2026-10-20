import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const x=JSON.parse(readFileSync('engineering/v1-m01-common-mission.json','utf8'));
assert.equal(x.mission_id,'M-01');
assert.equal(x.status,'UNVERIFIED_CONCEPT');
assert.deepEqual(Object.keys(x.architectures).sort(),['TRANSFORMING_WING','VTOL']);
for(const k of ['jurisdiction','origin','destination'])assert.equal(x[k],null);
for(const [k,v] of Object.entries(x.assumptions)){assert.equal(v,null,`No unsupported number allowed: ${k}`);}
for(const variant of Object.values(x.architectures)){
 for(const k of ['departure_facility','arrival_facility','facility_authorization_evidence','flight_phase_energy_kWh','peak_electrical_power_kW','structural_mass_kg'])assert.equal(variant[k],null);
 assert.ok(variant.risks.includes('HZ-12'));
}
assert.equal(x.validation.decision,'HOLD_BOTH');
for(const k of ['legal_site_access_confirmed','source_review_completed','independent_safety_review_completed'])assert.equal(x.validation[k],false);
console.log('M-01 contains two variants, common unverified assumptions, and no fictional authorization or performance.');
