import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const c=new Set(readFileSync('engineering/v1-common-cause-register.csv','utf8').trim().split(/\r?\n/).slice(1).map(x=>x.split(',')[0]));
const lines=readFileSync('engineering/v1-dependency-index.csv','utf8').trim().split(/\r?\n/);
assert.equal(lines.length,9);
const used=new Set();
for(let i=1;i<lines.length;i++){const p=lines[i].split(',');assert.equal(p[0],`DEP-${String(i).padStart(2,'0')}`);assert.equal(p.at(-1),'Unreviewed');for(const x of p[3].split(';')){assert.ok(c.has(x),x);used.add(x)}}
assert.deepEqual([...used].sort(),[...c].sort());
const doc=readFileSync('docs/VELTARO-V1-Architecture-Dependency-Diagrams-2026.md','utf8');
assert.ok(doc.includes('VTOL candidate')&&doc.includes('Transforming-wing'));
console.log('Eight hypothetical dependencies trace to all eight CCA entries, unreviewed.');
