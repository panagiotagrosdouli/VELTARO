import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  GRAVITY_M_S2, CONCEPTS, REQUIRED_PHYSICS_FIELDS,
  idealHover, idealWingLevelFlight, hypotheticalElectricalPhase,
  auditM01PhysicsInputs
} from '../engineering/v1-m01-physics-power-bounds.mjs';

const study=JSON.parse(readFileSync('engineering/v1-m01-physics-research-inputs.json','utf8'));
const baseline=auditM01PhysicsInputs(study);
assert.equal(baseline.assessment,'FIRST_ORDER_RESEARCH_EQUATIONS_NOT_VEHICLE_PERFORMANCE');
assert.equal(baseline.decision,'HOLD_BOTH');
assert.equal(baseline.safeToUseForAircraftDesign,false);
assert.equal(baseline.independentVerification,false);
assert.equal(baseline.crossArchitectureRankingAllowed,false);
assert.deepEqual(Object.keys(study.architectures).sort(),[...CONCEPTS].sort());
for (const architecture of CONCEPTS) {
  assert.equal(baseline.architectures[architecture].status,'MISSING_OR_UNASSESSED');
  assert.equal(baseline.architectures[architecture].idealPowerKW,null);
  assert.equal(baseline.architectures[architecture].hypotheticalElectricalPowerKW,null);
  assert.deepEqual(baseline.architectures[architecture].gaps,[...REQUIRED_PHYSICS_FIELDS[architecture]]);
  assert.ok(Object.values(study.architectures[architecture].assumptions).every(v=>v===null));
}
assert.equal(study.noAutomaticImportFromPublishedAircraft,true);
assert.equal(study.selectedArchitecture,null);
assert.equal(study.decision,'HOLD_BOTH');

// Closed-form ideal hover: weight, induced flow and disk loading.
const hoverInput={
  massKg:1000,airDensityKgPerM3:1.225,totalEffectiveRotorDiskAreaM2:20
};
const hover=idealHover(hoverInput);
assert.equal(hover.model,'IDEAL_ACTUATOR_DISK_HOVER');
assert.ok(Math.abs(hover.thrustN-1000*GRAVITY_M_S2)<1e-9);
assert.ok(Math.abs(hover.inducedVelocityMps-
  Math.sqrt(hover.thrustN/(2*1.225*20)))<1e-10);
assert.ok(Math.abs(hover.idealInducedPowerKW-
  hover.thrustN*hover.inducedVelocityMps/1000)<1e-10);
assert.ok(Math.abs(idealHover({...hoverInput,massKg:2000}).idealInducedPowerKW/
  hover.idealInducedPowerKW-Math.pow(2,1.5))<1e-10);
assert.ok(Math.abs(idealHover({...hoverInput,totalEffectiveRotorDiskAreaM2:80})
  .idealInducedPowerKW/hover.idealInducedPowerKW-0.5)<1e-10);
assert.ok(idealHover({...hoverInput,airDensityKgPerM3:.8})
  .idealInducedPowerKW>hover.idealInducedPowerKW);
assert.throws(()=>idealHover({...hoverInput,totalEffectiveRotorDiskAreaM2:0}),/positive/);
assert.throws(()=>idealHover({...hoverInput,massKg:Infinity}),/finite/);

// Simplified wingborne steady level-flight power and lift coefficient.
const wingInput={
  massKg:1000,trueAirspeedMps:50,liftToDragRatio:12,
  airDensityKgPerM3:1.225,wingReferenceAreaM2:12
};
const wing=idealWingLevelFlight(wingInput);
assert.equal(wing.model,'IDEAL_STEADY_LEVEL_WINGBORNE');
assert.ok(Math.abs(wing.idealDragN-1000*GRAVITY_M_S2/12)<1e-10);
assert.ok(Math.abs(wing.idealPropulsivePowerKW-wing.idealDragN*50/1000)<1e-9);
assert.ok(Math.abs(wing.requiredLiftCoefficient-
  1000*GRAVITY_M_S2/(.5*1.225*50**2*12))<1e-10);
assert.equal(wing.stallAssessment,'UNKNOWN_WITHOUT_REVIEWED_LIFT_POLAR_CLMAX');
assert.ok(idealWingLevelFlight({...wingInput,liftToDragRatio:8})
  .idealPropulsivePowerKW>wing.idealPropulsivePowerKW);
assert.ok(idealWingLevelFlight({...wingInput,trueAirspeedMps:100})
  .requiredLiftCoefficient<wing.requiredLiftCoefficient);
assert.throws(()=>idealWingLevelFlight({...wingInput,wingReferenceAreaM2:-2}),/positive/);
assert.throws(()=>idealWingLevelFlight({...wingInput,trueAirspeedMps:0}),/positive/);

// Finite, efficiencies in (0,1], explicit duration and auxiliary demand.
const power=hypotheticalElectricalPhase({
 idealMechanicalPowerKW:100,aeromechanicalEfficiency:.8,
 electricalDrivetrainEfficiency:.9,auxiliaryElectricalKW:5,durationHours:.1
});
assert.ok(Math.abs(power.hypotheticalElectricalPowerKW-(100/(.8*.9)+5))<1e-8);
assert.ok(Math.abs(power.hypotheticalPhaseEnergyKWh-
  power.hypotheticalElectricalPowerKW*.1)<1e-8);
assert.equal(power.batteryPowerCapabilityChecked,false);
assert.equal(power.reserveIncluded,false);
assert.throws(()=>hypotheticalElectricalPhase({
 idealMechanicalPowerKW:100,aeromechanicalEfficiency:1.01,
 electricalDrivetrainEfficiency:.9,auxiliaryElectricalKW:0,durationHours:.1
}),/<= 1/);
assert.throws(()=>hypotheticalElectricalPhase({
 idealMechanicalPowerKW:100,aeromechanicalEfficiency:.9,
 electricalDrivetrainEfficiency:.9,auxiliaryElectricalKW:-1,durationHours:.1
}),/nonnegative/);

// Hypothetical values are used only in this test, never repository source JSON.
const fake=structuredClone(study);
const fixture={
  VTOL:{...hoverInput,rotorFigureOfMerit:.7,
    electricalDrivetrainEfficiency:.92,auxiliaryElectricalKW:1,durationHours:.04},
  TRANSFORMING_WING:{...wingInput,propulsiveEfficiency:.8,
    electricalDrivetrainEfficiency:.93,auxiliaryElectricalKW:1,durationHours:.5},
};
for(const architecture of CONCEPTS){
  fake.architectures[architecture].status='EXPLICIT_HYPOTHETICAL_INPUTS';
  fake.architectures[architecture].assumptions=fixture[architecture];
  fake.architectures[architecture].provenance={
    sourceId:'TEST-ONLY-NONPHYSICAL-NUMBERS',
    configurationId:'SYNTHETIC_UNIT_TEST',
    conditions:'Arithmetic validation only, never a vehicle test',
    evidenceDate:'2026-11-06',
    scopeBasis:'EXPLICIT_CONCEPT_HYPOTHESIS_ONLY',
  };
}
const before=JSON.stringify(fake);
const toy=auditM01PhysicsInputs(fake);
assert.equal(JSON.stringify(fake),before,'Model must not mutate input');
for(const architecture of CONCEPTS){
  assert.equal(toy.architectures[architecture].status,'HYPOTHETICAL_CALCULATED_NOT_VALIDATED');
  assert.ok(toy.architectures[architecture].idealPowerKW>0);
  assert.ok(toy.architectures[architecture].hypotheticalElectricalPowerKW>
    toy.architectures[architecture].idealPowerKW);
  assert.equal(toy.crossArchitectureRankingAllowed,false);
}

// Every invalid or unscoped entry fails closed, even if some data are populated.
const change=fn=>{const copy=structuredClone(fake);fn(copy);return auditM01PhysicsInputs(copy);};
let bad=change(x=>x.architectures.VTOL.assumptions.totalEffectiveRotorDiskAreaM2=0);
assert.equal(bad.architectures.VTOL.status,'BLOCKED_INVALID_PHYSICS_INPUTS');
assert.equal(bad.architectures.VTOL.idealPowerKW,null);
bad=change(x=>x.architectures.TRANSFORMING_WING.assumptions.liftToDragRatio=null);
assert.equal(bad.architectures.TRANSFORMING_WING.status,'BLOCKED_INCOMPLETE_OR_UNSCOPED_INPUTS');
bad=change(x=>x.architectures.VTOL.provenance.sourceId=null);
assert.equal(bad.architectures.VTOL.status,'BLOCKED_INCOMPLETE_OR_UNSCOPED_INPUTS');
bad=change(x=>x.architectures.VTOL.provenance.scopeBasis='CERTIFIED');
assert.equal(bad.architectures.VTOL.status,'BLOCKED_INCOMPLETE_OR_UNSCOPED_INPUTS');
bad=change(x=>x.architectures.VTOL.applicationBoundary='TRANSFERRED_FROM_NASA');
assert.equal(bad.architectures.VTOL.status,'BLOCKED_INCOMPLETE_OR_UNSCOPED_INPUTS');
bad=change(x=>x.architectures.VTOL.assumptions.rotorFigureOfMerit=4);
assert.equal(bad.architectures.VTOL.status,'BLOCKED_INVALID_PHYSICS_INPUTS');
bad=change(x=>x.selectedArchitecture='VTOL');
assert.equal(bad.architectures.VTOL.status,'BLOCKED_STUDY_POLICY');
assert.equal(bad.architectures.TRANSFORMING_WING.idealPowerKW,null);
bad=change(x=>x.architectures.EXTRA=structuredClone(x.architectures.VTOL));
assert.equal(bad.architectures.VTOL.status,'BLOCKED_STUDY_POLICY');
bad=change(x=>x.architectures.VTOL.status='UNASSESSED');
assert.equal(bad.architectures.VTOL.status,'MISSING_OR_UNASSESSED');
assert.ok(bad.errors.some(x=>x.includes('unreviewed_numeric_values_present')));

console.log('M-01 physics: ideal rotor/wing bounds, hypothetical energy, missing inputs and non-certification gates passed.');
