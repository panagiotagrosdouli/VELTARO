// Educational sensitivity sweeps, NOT VELTARO performance predictions.
import {evaluateScenario} from './v1-m01-energy-model.mjs';
export const factors=[
 {id:'payload',values:[0.8,1,1.2]},
 {id:'pack_specific_energy',values:[0.8,1,1.2]},
 {id:'duration',values:[0.8,1,1.2]},
 {id:'phase_power',values:[0.8,1,1.2]}
];
export function sensitivitySweep(shared,variant,architecture) {
 const baseline=evaluateScenario({...shared,...variant,architecture});
 if(!baseline.converged)throw Error('Baseline does not close');
 return factors.flatMap(f=>f.values.map(multiplier=>{
   const input={...shared,phases:variant.phases.map(p=>({...p})),architecture};
   if(f.id==='payload')input.payloadKg*=multiplier;
   if(f.id==='pack_specific_energy')input.usablePackWhPerKg*=multiplier;
   if(f.id==='duration')input.phases=input.phases.map(p=>({...p,durationHours:p.durationHours*multiplier}));
   if(f.id==='phase_power')input.phases=input.phases.map(p=>({...p,powerKWPerKg:p.powerKWPerKg*multiplier}));
   const v=evaluateScenario(input);
   return {architecture,factor:f.id,multiplier,converged:v.converged,requiredUsablePackKWh:v.converged?v.requiredUsablePackKWh:null,estimatedMassKg:v.converged?v.estimatedMassKg:null,reason:v.converged?null:v.reason};
 }));
}
