import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const lines=readFileSync('engineering/v1-subsystem-hazard-dependencies.csv','utf8').trim().split(/\r?\n/);
assert.equal(lines.length,10);
const subsystem=JSON.parse(readFileSync('engineering/v1-subsystem-readiness.json','utf8'));
const hazard=readFileSync('engineering/v1-hazard-requirement-trace.csv','utf8');
const evidence=readFileSync('engineering/v1-evidence-priority-matrix.csv','utf8');
for(let i=0;i<9;i++){
 const fields=lines[i+1].replace(/^"|"$/g,'').split('","');
 assert.equal(fields.length,5);
 assert.equal(fields[0],subsystem.subsystems[i].id);
 assert.equal(fields[4],'PROPOSED_UNREVIEWED');
 for(const h of fields[1].split(';')) assert.ok(hazard.includes('"'+h+'"'));
 for(const e of fields[3].split(';')) assert.ok(evidence.includes('"'+e+'"'));
}
assert.ok(readFileSync('docs/VELTARO-V1-Subsystem-Hazard-Dependencies-2026.md','utf8').includes('v1-subsystem-hazard-dependencies.csv'));
console.log('Proposed subsystem references checked.');
