import {readFileSync} from 'node:fs';import assert from 'node:assert/strict';
const dep=new Set(readFileSync('engineering/v1-dependency-index.csv','utf8').trim().split(/\r?\n/).slice(1).map(r=>r.split(',')[0]));
const cca=new Set(readFileSync('engineering/v1-common-cause-register.csv','utf8').trim().split(/\r?\n/).slice(1).map(r=>r.split(',')[0]));
const rows=readFileSync('engineering/v1-interface-inventory.csv','utf8').trim().split(/\r?\n/).slice(1);
assert.equal(rows.length,8);
for(let i=0;i<rows.length;i++){
 const cols=[...rows[i].matchAll(/"([^"]*)"(?:,|$)/g)].map(x=>x[1]);
 assert.equal(cols.length,10);assert.equal(cols[0],`IF-${String(i+1).padStart(2,'0')}`);
 assert.ok(dep.has(cols[5]));for(const c of cols[6].split(';'))assert.ok(cca.has(c));
 assert.equal(cols[9],'Unreviewed');
}
console.log('8 candidate interfaces traced to known dependency and common-cause IDs; unreviewed.');
