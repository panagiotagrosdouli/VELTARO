import {readFileSync} from 'node:fs';import assert from 'node:assert/strict';
const raw=readFileSync('engineering/v1-failure-tree-index.csv','utf8').trim().split(/\r?\n/);
const hazards=new Set(readFileSync('engineering/v1-hazard-register.csv','utf8').trim().split(/\r?\n/).slice(1).map(s=>s.split(',')[0]));
const reqs=new Set([...readFileSync('engineering/v1-hazard-requirement-trace.csv','utf8').matchAll(/"(REQ-SAF-\d{2})"/g)].map(m=>m[1]));
assert.equal(raw.length,5);
for(const [i,row] of raw.slice(1).entries()){const p=row.split(',');assert.equal(p[0],`FT-0${i+1}`);assert.equal(p.at(-1),'Unreviewed');for(const id of p[3].split(';'))assert.ok(hazards.has(id),id);for(const id of p[4].split(';'))assert.ok(reqs.has(id),id)}
console.log('4 conceptual top-events linked to registered hazards and proposed requirements; no risks closed.');
