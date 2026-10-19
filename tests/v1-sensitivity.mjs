// Educational sensitivity calculator only — NOT a VELTARO performance model.
import assert from 'node:assert/strict';
export function energyKWh(phases) {
  return phases.reduce((sum, p) => {
    if (![p.powerKW, p.hours].every(x => Number.isFinite(x) && x >= 0)) throw Error('Invalid phase');
    return sum + p.powerKW * p.hours;
  }, 0);
}
export function batteryMassKg(requiredEnergyKWh, usableWhPerKg) {
  if (!(requiredEnergyKWh >= 0 && Number.isFinite(requiredEnergyKWh)) || !(usableWhPerKg > 0 && Number.isFinite(usableWhPerKg))) throw Error('Invalid assumptions');
  return requiredEnergyKWh * 1000 / usableWhPerKg;
}
export function idealHoverPowerKW(massKg, densityKgM3, rotorAreaM2) {
  if (![massKg, densityKgM3, rotorAreaM2].every(x => Number.isFinite(x) && x > 0)) throw Error('Invalid assumptions');
  const weightN = massKg * 9.80665;
  return Math.pow(weightN, 1.5) / Math.sqrt(2*densityKgM3*rotorAreaM2) / 1000;
}
export function idealWingCruisePowerKW(massKg, speedMS, liftToDrag) {
  if (![massKg, speedMS, liftToDrag].every(x => Number.isFinite(x) && x > 0)) throw Error('Invalid assumptions');
  return massKg * 9.80665 * speedMS / liftToDrag / 1000;
}
assert.equal(energyKWh([{powerKW:10,hours:2},{powerKW:20,hours:0.5}]),30);
assert.equal(batteryMassKg(10,200),50);
assert.ok(idealHoverPowerKW(100,1.225,10)>0);
assert.ok(idealWingCruisePowerKW(100,40,10)>0);
assert.throws(()=>batteryMassKg(1,0));
assert.throws(()=>energyKWh([{powerKW:-1,hours:1}]));
console.log('Educational sensitivity calculation tests passed — no vehicle feasibility validated.');
