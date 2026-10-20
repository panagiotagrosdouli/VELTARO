import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const s=JSON.parse(readFileSync('engineering/v1-m01-greece-site-research.json','utf8'));
assert.equal(s.status,'PUBLIC_DESK_RESEARCH_ONLY');
assert.equal(s.candidate_runway_facility.icao,'LGAL');
assert.equal(s.candidate_runway_facility.veltaros_access_approved,false);
assert.equal(s.candidate_vtol_facility.operating_permission_confirmed,false);
for(const k of ['origin','destination','road_route_km','flight_route_km','energy_required_kWh'])assert.equal(s[k],null);
assert.equal(s.decision,'HOLD_BOTH');
console.log('Provisional Greece research does not assert route authorization or fictional energy figures.');
