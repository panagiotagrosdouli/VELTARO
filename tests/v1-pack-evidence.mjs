// Research data schema checks; passing never proves battery safety or performance.
import assert from 'node:assert/strict';
export function assessPackEvidence(x){
 const errors=[];
 if(!x||typeof x!=='object'||Array.isArray(x))return ['Evidence must be an object'];
 if(!['A','B','BOTH'].includes(x.track))errors.push('Invalid architecture');
 if(x.boundary!=='installed_usable_pack')errors.push('Requires installed usable pack boundary, not cell data');
 if(!['MEASURED','LITERATURE_ASSUMPTION'].includes(x.evidenceType))errors.push('Evidence type missing');
 for(const key of ['source','conditions','scope','uncertainty','reviewer']){
   if(typeof x[key]!=='string'||!x[key].trim())errors.push('Missing '+key);
 }
 if(x.evidenceType==='MEASURED'&&(typeof x.testMethod!=='string'||!x.testMethod.trim()))errors.push('Measured claim requires test method');
 if(x.evidenceType==='MEASURED'&&(!x.sourceUrl||!/^https:\/\//.test(x.sourceUrl)))errors.push('Measured claim requires HTTPS traceable source URL');
 if(x.evidenceType==='MEASURED'&&(!x.testDate||!/^\d{4}-\d{2}-\d{2}$/.test(x.testDate)))errors.push('Measured claim requires ISO test date');
 if(x.evidenceType==='MEASURED'){
   for(const key of ['socWindow','temperatureRangeC','agingCondition','peakPowerDurationBasis']){
     if(typeof x[key]!=='string'||!x[key].trim())errors.push('Measured claim missing '+key);
   }
 }
 if(x.evidenceType==='MEASURED'){
   const soc=x.socPercentRange,temperature=x.temperatureC;
   if(!Array.isArray(soc)||soc.length!==2||!soc.every(Number.isFinite)||soc[0]<0||soc[1]>100||soc[0]>=soc[1])errors.push('Invalid numeric SOC range');
   if(!Array.isArray(temperature)||temperature.length!==2||!temperature.every(Number.isFinite)||temperature[0]>temperature[1])errors.push('Invalid numeric temperature range');
 }
 if(!Number.isFinite(x.usableWhPerKg)||x.usableWhPerKg<=0)errors.push('Invalid usable pack specific energy');
 if(!Number.isFinite(x.continuousPowerKW)||x.continuousPowerKW<=0)errors.push('Invalid continuous power');
 if(!Number.isFinite(x.peakPowerKW)||x.peakPowerKW<x.continuousPowerKW)errors.push('Invalid peak power');
 if(!Number.isFinite(x.peakDurationHours)||x.peakDurationHours<0)errors.push('Invalid peak duration');
 if(x.evidenceType==='MEASURED'&&x.reviewAccepted===true){
   if(!x.independentReviewer||typeof x.independentReviewer!=='string'||!x.independentReviewer.trim())errors.push('Independent review identity required');
   if(!x.sourceDocumentId||typeof x.sourceDocumentId!=='string'||!x.sourceDocumentId.trim())errors.push('Source document identifier required');
   if(!x.reviewDate||typeof x.reviewDate!=='string'||!/^\\d{4}-\\d{2}-\\d{2}$/.test(x.reviewDate))errors.push('Review date required');
 }
 if(x.reviewAccepted===true&&x.evidenceType==='LITERATURE_ASSUMPTION')errors.push('Literature assumption cannot be reviewed as measured capability');
 return errors;
}
if(import.meta.url===`file://${process.argv[1]}`){
 const x={track:'BOTH',boundary:'installed_usable_pack',evidenceType:'LITERATURE_ASSUMPTION',source:'fictional unit-test fixture',conditions:'fictional controlled conditions',scope:'illustrative only',uncertainty:'unknown',reviewer:'unassigned',usableWhPerKg:180,continuousPowerKW:30,peakPowerKW:50,peakDurationHours:0.05,reviewAccepted:false};
 assert.deepEqual(assessPackEvidence(x),[]);
 assert.ok(assessPackEvidence({...x,boundary:'cell'}).length);
 assert.ok(assessPackEvidence({...x,reviewAccepted:true}).length);
 assert.ok(assessPackEvidence({...x,peakPowerKW:20}).length);
 assert.ok(assessPackEvidence({...x,evidenceType:'MEASURED'}).length);
 const measured={...x,evidenceType:'MEASURED',testMethod:'bench description',sourceUrl:'https://example.org/fictional',testDate:'2026-01-01',socWindow:'fictional SOC band',temperatureRangeC:'fictional temperature range',agingCondition:'fictional cycle condition',peakPowerDurationBasis:'fictional duty cycle'};
 measured.socPercentRange=[20,90];measured.temperatureC=[15,35];
 assert.deepEqual(assessPackEvidence(measured),[]);
 assert.ok(assessPackEvidence({...measured,reviewAccepted:true}).length,'Review cannot be claimed without reviewer and document identity');
 assert.ok(assessPackEvidence({...measured,socPercentRange:[95,20]}).length);
 assert.ok(assessPackEvidence({...measured,temperatureC:[40,10]}).length);
 assert.ok(assessPackEvidence({...measured,socWindow:''}).length);
 assert.ok(assessPackEvidence({...measured,agingCondition:''}).length);
 assert.ok(assessPackEvidence({...x,evidenceType:'MEASURED',testMethod:'',sourceUrl:'https://example.org/study',testDate:'2026-01-01'}).length);
 assert.ok(assessPackEvidence({...x,evidenceType:'MEASURED',testMethod:'documented bench method',sourceUrl:'http://example.org/study',testDate:'2026-01-01'}).length);
 console.log('Pack evidence boundary tests passed — no physical V1 pack validated.');
}
