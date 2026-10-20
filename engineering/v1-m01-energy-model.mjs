// Research-only mass-energy comparability model. Not VELTARO performance.
// Input phases are illustrative assumptions; no assumed real routes or validated aircraft.
export function evaluateScenario(s) {
 const positive=(x,n)=>{if(!Number.isFinite(x)||x<=0)throw Error(n+' must be positive');return x};
 const nonnegative=(x,n)=>{if(!Number.isFinite(x)||x<0)throw Error(n+' must be nonnegative');return x};
 if(!['VTOL','TRANSFORMING_WING'].includes(s.architecture))throw Error('Unknown architecture');
 const dry=positive(s.dryMassKg,'dry mass'),payload=nonnegative(s.payloadKg,'payload'),specific=positive(s.usablePackWhPerKg,'pack usable specific energy');
 if(!Array.isArray(s.phases)||!s.phases.length)throw Error('Need named phases');
 for(const p of s.phases){if(typeof p.name!=='string'||!p.name||!Number.isFinite(p.durationHours)||p.durationHours<=0||!Number.isFinite(p.powerKWPerKg)||p.powerKWPerKg<0)throw Error('Invalid phase');}
 const reserve=nonnegative(s.reserveFraction,'reserve fraction');if(reserve>=1)throw Error('Reserve fraction >= 1');
 const factor=s.phases.reduce((sum,p)=>sum+p.durationHours*p.powerKWPerKg,0); // kWh/kg
 const coupling=factor*1000/(specific*(1-reserve));
 if(coupling>=1)return {architecture:s.architecture,converged:false,reason:'Mass-energy feedback does not close for illustrative inputs'};
 const mass=(dry+payload)/(1-coupling);
 const energy=s.phases.reduce((sum,p)=>sum+mass*p.durationHours*p.powerKWPerKg,0);
 const packEnergy=energy/(1-reserve);
 const packKg=packEnergy*1000/specific;
 return {architecture:s.architecture,converged:true,estimatedMassKg:mass,estimatedPackMassKg:packKg,missionEnergyKWh:energy,requiredUsablePackKWh:packEnergy,maximumPhaseElectricalPowerKW:Math.max(...s.phases.map(p=>p.powerKWPerKg*mass)),illustrativeOnly:true};
}
