import {readFileSync} from 'node:fs';import assert from 'node:assert/strict';
const rows=readFileSync('engineering/v1-common-cause-register.csv','utf8').trim().split(/\r?\n/);
const hazardIds=new Set(readFileSync('engineering/v1-hazard-register.csv','utf8').trim().split(/\r?\n/).slice(1).map(s=>s.split(',')[0]));
const reqIds=new Set([...readFileSync('engineering/v1-hazard-requirement-trace.csv','utf8').matchAll(/"(REQ-SAF-\d{2})"/g)].map(m=>m[1]));
assert.equal(rows.length,9);
for(let i=1;i<rows.length;i++){const p=rows[i].split(',');assert.equal(p[0],`CCA-${String(i).padStart(2,'0')}`);assert.equal(p.at(-1),'Unreviewed');for(const h of p[4].split(';'))assert.ok(hazardIds.has(h),h);for(const q of p[5].split(';'))assert.ok(reqIds.has(q),q);assert.ok(p[4].split(';').includes('HZ-12'));}
console.log('All 8 unreviewed common-cause entries link to HZ-12 and known requirements.');
