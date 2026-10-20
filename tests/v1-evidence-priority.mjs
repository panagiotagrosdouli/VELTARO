import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const rows=readFileSync('engineering/v1-evidence-priority-matrix.csv','utf8').trim().split(/\r?\n/).slice(1);
assert.equal(rows.length,10);
const counts={P0:0,P1:0,P2:0};
for(let i=0;i<rows.length;i++){const col=[...rows[i].matchAll(/"([^"]*)"(?:,|$)/g)].map(x=>x[1]);assert.equal(col.length,8);assert.equal(col[0],`EV-${String(i+1).padStart(2,'0')}`);counts[col[1]]++;assert.ok(['MISSING','BLOCKED','UNREVIEWED'].includes(col[7]));}
assert.deepEqual(counts,{P0:4,P1:4,P2:2});
const mission=JSON.parse(readFileSync('engineering/v1-m01-thrace-route-candidates.json','utf8'));
assert.equal(mission.decision,'HOLD_BOTH');assert.equal(mission.operational_authorization,false);
console.log('10 unverified evidence priorities; mission remains on HOLD.');
