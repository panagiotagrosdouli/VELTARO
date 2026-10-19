// Check internal arithmetic consistency between two toy V1 calculators.
// Not a coupled aircraft design or a feasibility assessment.
import assert from 'node:assert/strict';
import {checkMissionPack} from './v1-phase-energy-power.mjs';
import {iterateMassEnergy} from './v1-mass-energy-closure.mjs';
export function checkFixtureConsistency({pack,closure,relativeTolerance=0.01}){
 if(!Number.isFinite(relativeTolerance)||relativeTolerance<0||relativeTolerance>=1)throw Error('Invalid tolerance');
 if(Math.abs(pack.reserveFraction-closure.reserveFraction)>1e-12)return {consistent:false,reason:'reserve assumptions disagree',engineeringValidated:false};
 const p=checkMissionPack(pack),c=iterateMassEnergy(closure);
 if(!c.converged)return {consistent:false,reason:'mass closure did not converge',massClosure:c,phaseLedger:p};
 const expectedKWh=c.missionEnergyKWh;
 const estimatedPackKWh=c.batteryMassKg*closure.usableWhPerKg/1000;
 const packDeltaKWh=Math.abs(pack.usablePackKWh-estimatedPackKWh);
 if(packDeltaKWh>Math.max(estimatedPackKWh,Number.EPSILON)*relativeTolerance)return {consistent:false,reason:'assumed pack capacity differs from closure pack estimate',packDifferenceKWh:packDeltaKWh,massClosure:c,phaseLedger:p,engineeringValidated:false};
 const delta=Math.abs(p.missionKWh-expectedKWh);
 const consistent=delta<=Math.max(expectedKWh,Number.EPSILON)*relativeTolerance;
 return {consistent,reason:consistent?'toy mission energy inputs agree':'toy mission energy inputs disagree',energyDifferenceKWh:delta,massClosure:c,phaseLedger:p,engineeringValidated:false};
}
if(import.meta.url===`file://${process.argv[1]}`){
 const closure={dryMassKg:800,payloadKg:160,usableWhPerKg:180,reserveFraction:0.2,phases:[{hours:0.5,powerKWPerKg:0.06}]};
 const c=iterateMassEnergy(closure);assert.ok(c.converged);
 const p={usablePackKWh:c.batteryMassKg*closure.usableWhPerKg/1000,continuousPowerKW:400,peakPowerKW:600,reserveFraction:0.2,maxPeakHours:0,phases:[{name:'fictional cruise',hours:0.5,powerKW:c.missionEnergyKWh/0.5,peakOnly:false}]};
 assert.equal(checkFixtureConsistency({pack:p,closure}).consistent,true);
 assert.equal(checkFixtureConsistency({pack:{...p,usablePackKWh:p.usablePackKWh*2},closure}).consistent,false);
 assert.equal(checkFixtureConsistency({pack:{...p,reserveFraction:0.3},closure}).consistent,false);
 assert.equal(checkFixtureConsistency({pack:{...p,phases:[{name:'inconsistent fiction',hours:0.5,powerKW:1,peakOnly:false}]},closure}).consistent,false);
 assert.throws(()=>checkFixtureConsistency({pack:p,closure,relativeTolerance:-1}));
 console.log('Toy phase-versus-closure energy consistency checks passed; aircraft feasibility not established.');
}
