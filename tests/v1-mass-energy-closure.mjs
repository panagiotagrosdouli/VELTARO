// Educational conceptual mass-energy closure iteration. Not a VELTARO prediction.
import assert from 'node:assert/strict';
export function iterateMassEnergy({dryMassKg,payloadKg,usableWhPerKg,phases,reserveFraction=0,toleranceKg=0.01,maxIterations=100}) {
  const nums=[dryMassKg,payloadKg,usableWhPerKg,reserveFraction,toleranceKg,maxIterations];
  if(nums.some(x=>!Number.isFinite(x))||dryMassKg<=0||payloadKg<0||usableWhPerKg<=0||reserveFraction<0||reserveFraction>=1||toleranceKg<=0||maxIterations<1||!Number.isInteger(maxIterations))throw Error('Invalid model parameters');
  if(!Array.isArray(phases)||phases.length===0)throw Error('Provide flight phases');
  // phasePowerKW must be a stated toy linear relationship with total mass.
  for(const p of phases){if(![p.hours,p.powerKWPerKg].every(x=>Number.isFinite(x)&&x>=0))throw Error('Invalid phase');}
  let mass=dryMassKg+payloadKg;
  for(let iteration=1;iteration<=maxIterations;iteration++){
    const missionEnergyKWh=phases.reduce((sum,p)=>sum+mass*p.powerKWPerKg*p.hours,0);
    // reserve fraction of usable pack energy, NOT a regulatory reserve rule
    const requiredKWh=missionEnergyKWh/(1-reserveFraction);
    const batteryKg=requiredKWh*1000/usableWhPerKg;
    const nextMass=dryMassKg+payloadKg+batteryKg;
    if(!Number.isFinite(nextMass)||nextMass>1e9)return {converged:false,reason:'mass divergence',iterations:iteration};
    if(Math.abs(nextMass-mass)<=toleranceKg)return {converged:true,iterations:iteration,totalMassKg:nextMass,batteryMassKg:batteryKg,missionEnergyKWh,requiredPackEnergyKWh:requiredKWh};
    mass=nextMass;
  }
  return {converged:false,reason:'iteration limit',iterations:maxIterations};
}
if(import.meta.url===`file://${process.argv[1]}`){
  const sample=iterateMassEnergy({dryMassKg:800,payloadKg:160,usableWhPerKg:180,reserveFraction:0.2,phases:[{hours:0.5,powerKWPerKg:0.06}]});
  assert.equal(sample.converged,true);
  assert.ok(sample.batteryMassKg>0);
  const impossible=iterateMassEnergy({dryMassKg:800,payloadKg:160,usableWhPerKg:50,reserveFraction:0.4,phases:[{hours:2,powerKWPerKg:0.3}]});
  assert.equal(impossible.converged,false);
  assert.throws(()=>iterateMassEnergy({dryMassKg:-1,payloadKg:0,usableWhPerKg:180,phases:[]}));
  console.log('Toy mass-energy closure assertions passed. No actual V1 feasibility established.');
}
