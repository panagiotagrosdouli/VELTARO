// Compare toy numerical checks side by side WITHOUT scoring actual aircraft.
import assert from 'node:assert/strict';
import {checkMissionPack} from './v1-phase-energy-power.mjs';
import {iterateMassEnergy} from './v1-mass-energy-closure.mjs';
export function compareConceptFixtures(tracks){
  if(!Array.isArray(tracks)||tracks.length!==2||tracks.map(x=>x.id).join(',')!=='A,B')throw Error('Supply both tracks A and B in order');
  return {status:'ILLUSTRATIVE_ONLY',selectedArchitecture:null,tracks:tracks.map(({id,pack,closure})=>{
    if(!pack||!closure)throw Error('Missing independent checks for '+id);
    const energyPower=checkMissionPack(pack);
    const massClosure=iterateMassEnergy(closure);
    const diagnostics=[];
    if(!massClosure.converged)diagnostics.push('TOY_MASS_CLOSURE_NOT_CONVERGED');
    if(!energyPower.energyWithinAssumedBudget)diagnostics.push('TOY_ENERGY_LIMIT_EXCEEDED');
    if(!energyPower.allPhasePowerWithinAssumedLimits)diagnostics.push('TOY_POWER_LIMIT_EXCEEDED');
    if(!energyPower.peakDurationWithinAssumedLimit)diagnostics.push('TOY_PEAK_DURATION_LIMIT_EXCEEDED');
    return {id,energyPower,massClosure,diagnostics,engineeringValidated:false};
  })};
}
if(import.meta.url===`file://${process.argv[1]}`){
 const pack={usablePackKWh:100,continuousPowerKW:90,peakPowerKW:180,reserveFraction:0.2,maxPeakHours:0.1};
 const closure={dryMassKg:800,payloadKg:160,usableWhPerKg:180,reserveFraction:0.2,phases:[{hours:0.5,powerKWPerKg:0.06}]};
 const result=compareConceptFixtures([
  {id:'A',pack:{...pack,phases:[{name:'fictional cruise',hours:0.5,powerKW:70,peakOnly:false}]},closure},
  {id:'B',pack:{...pack,phases:[{name:'fictional hover',hours:0.1,powerKW:200,peakOnly:true}]},closure}
 ]);
 assert.equal(result.status,'ILLUSTRATIVE_ONLY');
 assert.equal(result.selectedArchitecture,null);
 assert.deepEqual(result.tracks.map(t=>t.id),['A','B']);
 assert.ok(result.tracks.every(t=>t.engineeringValidated===false));
 assert.equal(result.tracks[0].energyPower.allPhasePowerWithinAssumedLimits,true);
 assert.equal(result.tracks[1].energyPower.allPhasePowerWithinAssumedLimits,false);
 assert.ok(result.tracks[1].diagnostics.includes('TOY_POWER_LIMIT_EXCEEDED'));
 assert.ok(result.tracks[0].diagnostics.every(x=>x.startsWith('TOY_')));
 assert.throws(()=>compareConceptFixtures([{id:'A',pack,closure}]));
 console.log('Dual-track illustrative numerical comparison checks passed. Neither architecture verified or selected.');
}
