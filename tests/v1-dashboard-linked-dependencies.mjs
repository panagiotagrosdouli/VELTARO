import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const page=readFileSync('v1-evidence-dashboard.html','utf8');assert.ok(page.includes('id="dependency-body"'));assert.ok(page.includes("fetch('engineering/v1-subsystem-hazard-dependencies.csv'"));assert.ok(page.includes('PROPOSED_UNREVIEWED'));assert.ok(page.includes('textContent'));assert.ok(!page.includes('innerHTML'));
const lines=readFileSync('engineering/v1-subsystem-hazard-dependencies.csv','utf8').trim().split(/\r?\n/);assert.equal(lines.length,10);for(const line of lines.slice(1)){const fields=line.replace(/^"|"$/g,'').split('","');assert.equal(fields.length,5);assert.equal(fields[4],'PROPOSED_UNREVIEWED');}
console.log('Dashboard dependency table maps nine unreviewed subsystem links.');
