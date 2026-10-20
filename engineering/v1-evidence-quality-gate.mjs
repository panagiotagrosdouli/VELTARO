// Conservative evidence-quality gate. Documentation completeness is not independent verification.
import {readFileSync} from 'node:fs';
export function assessEvidence(evidence,mission){
 const reasons=[];
 const required=['BATT-01','BATT-02','BATT-03','PROP-01','PROP-02','THERM-01'];
 const records=evidence?.required_vehicle_records;
 if(!Array.isArray(records))reasons.push('Measurement register missing');
 for(const id of required){
  const items=Array.isArray(records)?records.filter(r=>r.id===id):[];
  if(items.length!==1){reasons.push(id+': record missing or duplicated');continue;}
  const x=items[0];
  if(x.status!=='INDEPENDENTLY_VERIFIED'||typeof x.value!=='number'||!Number.isFinite(x.value)||x.value<=0||
    typeof x.measurement_source_id!=='string'||!x.measurement_source_id.trim()||
    typeof x.reviewer!=='string'||!x.reviewer.trim()||
    typeof x.test_date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(x.test_date)||
    typeof x.configuration_id!=='string'||!x.configuration_id.trim()||
    typeof x.conditions!=='string'||!x.conditions.trim()||
    typeof x.unit!=='string'||!x.unit.trim()){
    reasons.push(id+': missing independently verified numeric measurement and provenance');
  }
 }
 if(evidence?.vehicle_validation!==true)reasons.push('Vehicle measurements not independently validated');
 if(mission?.operational_authorization!==true)reasons.push('Operational authorization not established');
 if(mission?.decision!=='REVIEW_READY')reasons.push('Mission comparison not reviewed for release');
 if(!Array.isArray(mission?.candidates)||mission.candidates.length!==2||mission.candidates.some(x=>x.route_legal!==true||!x.departure_site||!x.arrival_site))reasons.push('Valid authorized site pair absent for one or both concepts');
 return {canPublishPerformanceComparison:reasons.length===0,reasons,assessment:'DOCUMENTATION_GATE_ONLY'};
}
if(process.argv[1]?.endsWith('v1-evidence-quality-gate.mjs')){
 const e=JSON.parse(readFileSync('engineering/v1-battery-propulsion-evidence.json','utf8'));
 const m=JSON.parse(readFileSync('engineering/v1-m01-thrace-route-candidates.json','utf8'));
 console.log(JSON.stringify(assessEvidence(e,m),null,2));
}
