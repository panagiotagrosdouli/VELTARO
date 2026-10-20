import {readFileSync} from 'node:fs';
import {sensitivitySweep} from './v1-m01-sensitivity-sweep.mjs';
const s=JSON.parse(readFileSync('engineering/v1-m01-energy-sample.json','utf8'));
if(s.status!=='ILLUSTRATIVE_ONLY')throw Error('Refusing unsupported sample');
const report={status:'ILLUSTRATIVE_ONLY',architectureDecision:'HOLD_BOTH',factors:['payload','pack_specific_energy','duration','phase_power'],rows:[]};
for(const [architecture,variant] of Object.entries(s.variants))report.rows.push(...sensitivitySweep(s.shared,variant,architecture));
process.stdout.write(JSON.stringify(report,null,2)+'\n');
