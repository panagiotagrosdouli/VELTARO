import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const raw=readFileSync('engineering/v1-architecture-decision-gates.csv','utf8').trim().split(/\r?\n/);
assert.equal(raw.length,8);
for(const line of raw.slice(1))assert.equal(line.split(',').at(-1),'HOLD');
const doc=readFileSync('docs/VELTARO-V1-Architecture-Decision-Review-2026.md','utf8');
assert.match(doc,/HOLD BOTH/);assert.match(doc,/No architecture selected/);
console.log('Architecture decision review stays on HOLD pending verified comparative evidence.');
