// Prints missing-input report for the actual VELTARO M-01 research register.
// Fictional test fixtures live only in tests/, never here.
import {readFileSync} from 'node:fs';
import {auditM01PhysicsInputs} from './v1-m01-physics-power-bounds.mjs';
const input=JSON.parse(readFileSync('engineering/v1-m01-physics-research-inputs.json','utf8'));
const report=auditM01PhysicsInputs(input);
process.stdout.write(JSON.stringify(report,null,2)+'\n');
