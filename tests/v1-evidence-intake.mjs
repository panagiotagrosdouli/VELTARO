// Evidence intake schema checks only; this does not verify source truth or engineering feasibility.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
export const GATES=new Set(['operational_access','mass_closure','energy_power','safety','usability','compliance']);
export function validateEvidence(record){
  const issues=[];
  if(!record||typeof record!=='object'||Array.isArray(record))return ['Evidence must be an object'];
  if(!['A','B'].includes(record.track))issues.push('Track must be A or B');
  if(!GATES.has(record.gate))issues.push('Unknown gate');
  for(const field of ['claim','source','sourceDate','accessDate','scope','uncertainty','reviewer']){
    if(typeof record[field]!=='string'||!record[field].trim())issues.push('Missing '+field);
  }
  for(const field of ['sourceDate','accessDate']){
    if(typeof record[field]==='string'&&!/^\d{4}-\d{2}-\d{2}$/.test(record[field]))issues.push('Invalid '+field);
  }
  if(!['UNSOURCED','SOURCED','REVIEWED','REJECTED'].includes(record.claimStatus))issues.push('Invalid claimStatus');
  if(record.claimStatus==='REVIEWED'&&record.reviewAccepted!==true)issues.push('REVIEWED needs explicit reviewAccepted');
  if(record.claimStatus==='REVIEWED'&&(record.source==='INTERNAL_PLACEHOLDER_NOT_EXTERNAL_EVIDENCE'||(typeof record.reviewer==='string'&&record.reviewer.toLowerCase().includes('placeholder'))))issues.push('Placeholder evidence cannot be REVIEWED');
  if(record.claimStatus==='SOURCED'||record.claimStatus==='REVIEWED'){
    if(record.source==='INTERNAL_PLACEHOLDER_NOT_EXTERNAL_EVIDENCE')issues.push('External or document reference required');
    if(typeof record.source==='string'&&record.source.trim().length<12)issues.push('Source reference too short');
  }
  if(record.sourceDate&&record.accessDate&&/^\d{4}-\d{2}-\d{2}$/.test(record.sourceDate)&&/^\d{4}-\d{2}-\d{2}$/.test(record.accessDate)&&record.sourceDate>record.accessDate)issues.push('Source date after access date');
  if(typeof record.units!=='string'||!record.units.trim())issues.push('Units or N/A must be declared');
  return issues;
}
if(import.meta.url===`file://${process.argv[1]}`){
  const example=JSON.parse(readFileSync('engineering/v1-evidence-example.json','utf8'));
  assert.deepEqual(validateEvidence(example),[]);
  assert.ok(validateEvidence({...example,track:'C'}).length);
  assert.ok(validateEvidence({...example,claimStatus:'REVIEWED'}).length);
  assert.ok(validateEvidence({...example,source:''}).length);
  assert.ok(validateEvidence({...example,claimStatus:'REVIEWED',reviewAccepted:true}).length,'Placeholders never qualify as review');
  assert.ok(validateEvidence({...example,claimStatus:'SOURCED'}).length,'Placeholders never qualify as sourced');
  assert.ok(validateEvidence({...example,sourceDate:'2026-10-20'}).length,'Future source date relative to access date');
  console.log('Evidence intake validation checks passed; no engineering claim independently verified.');
}
