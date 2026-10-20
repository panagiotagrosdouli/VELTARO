import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const page=readFileSync('v1-evidence-dashboard.html','utf8');assert.match(page,/HOLD BOTH/);assert.match(page,/textContent/);assert.match(page,/fetch\(p/);assert.doesNotMatch(page,/innerHTML/);for(const s of ['v1-evidence-priority-matrix.csv','v1-battery-propulsion-evidence.json','v1-m01-thrace-route-candidates.json'])assert.ok(page.includes(s));
const csv=readFileSync('engineering/v1-evidence-priority-matrix.csv','utf8');assert.equal(csv.trim().split(/\r?\n/).length,11);
const battery=JSON.parse(readFileSync('engineering/v1-battery-propulsion-evidence.json','utf8'));assert.equal(battery.vehicle_validation,false);
const mission=JSON.parse(readFileSync('engineering/v1-m01-thrace-route-candidates.json','utf8'));assert.equal(mission.decision,'HOLD_BOTH');
console.log('Evidence dashboard integrity checks passed; decision remains HOLD.');
