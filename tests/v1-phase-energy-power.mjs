// Numerical toy phase energy/power ledger, NOT an aircraft performance model.
import assert from 'node:assert/strict';
export function checkMissionPack({usablePackKWh,continuousPowerKW,peakPowerKW,phases,reserveFraction=0,maxPeakHours=0}){
  if(![usablePackKWh,continuousPowerKW,peakPowerKW].every(n=>Number.isFinite(n)&&n>0)||!Number.isFinite(reserveFraction)||reserveFraction<0||reserveFraction>=1||continuousPowerKW>peakPowerKW||!Number.isFinite(maxPeakHours)||maxPeakHours<0)throw Error('Invalid pack assumptions');
  if(!Array.isArray(phases)||phases.length===0)throw Error('Missing phases');
  let missionKWh=0;let totalPeakHours=0;const rows=[];
  for(const p of phases){
    if(typeof p.name!=='string'||!p.name.trim()||![p.hours,p.powerKW].every(n=>Number.isFinite(n)&&n>=0)||p.peakOnly!==true&&p.peakOnly!==false)throw Error('Invalid phase assumptions');
    const energyKWh=p.hours*p.powerKW;missionKWh+=energyKWh;
    if(p.peakOnly&&p.powerKW>continuousPowerKW)totalPeakHours+=p.hours;
    rows.push({phase:p.name,energyKWh,powerWithinAssumedLimit:p.powerKW<=(p.peakOnly?peakPowerKW:continuousPowerKW)});
  }
  const budgetKWh=usablePackKWh*(1-reserveFraction);
  return {missionKWh,budgetKWh,energyWithinAssumedBudget:missionKWh<=budgetKWh,allPhasePowerWithinAssumedLimits:rows.every(r=>r.powerWithinAssumedLimit),peakDurationWithinAssumedLimit:totalPeakHours<=maxPeakHours,totalPeakHours,rows};
}
if(import.meta.url===`file://${process.argv[1]}`){
  const base={usablePackKWh:100,continuousPowerKW:90,peakPowerKW:180,reserveFraction:0.2,maxPeakHours:0.1};
  const a=checkMissionPack({...base,phases:[{name:'illustrative takeoff',hours:0.05,powerKW:150,peakOnly:true},{name:'illustrative cruise',hours:0.5,powerKW:70,peakOnly:false}]});
  assert.equal(a.peakDurationWithinAssumedLimit,true);
  assert.equal(a.energyWithinAssumedBudget,true);assert.equal(a.allPhasePowerWithinAssumedLimits,true);
  const b=checkMissionPack({...base,phases:[{name:'illustrative hover',hours:0.1,powerKW:200,peakOnly:true}]});
  assert.equal(b.energyWithinAssumedBudget,true);assert.equal(b.allPhasePowerWithinAssumedLimits,false,'Energy adequacy alone cannot establish power adequacy');
  const c=checkMissionPack({...base,phases:[{name:'illustrative cruise',hours:2,powerKW:70,peakOnly:false}]});
  assert.equal(c.energyWithinAssumedBudget,false);
  const d=checkMissionPack({...base,phases:[{name:'long peak',hours:0.2,powerKW:120,peakOnly:true}]});
  assert.equal(d.energyWithinAssumedBudget,true);
  assert.equal(d.allPhasePowerWithinAssumedLimits,true);
  assert.equal(d.peakDurationWithinAssumedLimit,false);
  assert.throws(()=>checkMissionPack({...base,phases:[{name:'bad',hours:-1,powerKW:70,peakOnly:false}]}));
  assert.throws(()=>checkMissionPack({...base,peakPowerKW:10,phases:[{name:'test',hours:1,powerKW:5,peakOnly:false}]}));
  console.log('Phase energy and power toy checks passed; no V1 performance validated.');
}
