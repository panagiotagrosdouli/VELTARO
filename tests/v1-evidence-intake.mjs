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
  if(typeof record.units!=='string'||!record.units.trim())issues.push('Units or N/A must be declared');
  return issues;
}
if(import.meta.url===`file://${process.argv[1]}`){
  const example=JSON.parse(readFileSync('engineering/v1-evidence-example.json','utf8'));
  assert.deepEqual(validateEvidence(example),[]);
  assert.ok(validateEvidence({...example,track:'C'}).length);
  assert.ok(validateEvidence({...example,claimStatus:'REVIEWED'}).length);
  assert.ok(validateEvidence({...example,source:''}).length);
  console.log('Evidence intake validation checks passed; no engineering claim independently verified.');
}
