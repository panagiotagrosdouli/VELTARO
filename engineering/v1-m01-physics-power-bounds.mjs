// VELTARO M-01 conceptual physics calculator. Research equations only.
// NO certified/flight-ready design, real VELTARO mass, performance or permission.
export const GRAVITY_M_S2 = 9.80665;
export const CONCEPTS = Object.freeze(['VTOL', 'TRANSFORMING_WING']);

const positive = (x,name) => {
  if (typeof x !== 'number' || !Number.isFinite(x) || x <= 0)
    throw Error(name+' must be a finite positive number');
  return x;
};
const nonnegative = (x,name) => {
  if (typeof x !== 'number' || !Number.isFinite(x) || x < 0)
    throw Error(name+' must be a finite nonnegative number');
  return x;
};
const fraction = (x,name) => {
  positive(x,name);
  if (x > 1) throw Error(name+' must be <= 1');
  return x;
};
const checked = (x,name) => {
  if (!Number.isFinite(x)) throw Error(name+' arithmetic overflow');
  return x;
};
const text = x => typeof x === 'string' && x.trim().length > 0;

/**
 * Ideal isolated/unobstructed actuator-disk momentum-theory hover.
 * P_i = T^(3/2)/sqrt(2*rho*A), T = m*g.
 * Ignores profile losses, interference, ground effect, transition and failures.
 */
export function idealHover({massKg,airDensityKgPerM3,totalEffectiveRotorDiskAreaM2}) {
  const m=positive(massKg,'massKg');
  const rho=positive(airDensityKgPerM3,'airDensityKgPerM3');
  const area=positive(totalEffectiveRotorDiskAreaM2,'totalEffectiveRotorDiskAreaM2');
  const thrustN=checked(m*GRAVITY_M_S2,'thrust');
  const inducedVelocityMps=checked(Math.sqrt(thrustN/(2*rho*area)),'induced velocity');
  const idealInducedPowerKW=checked(thrustN*inducedVelocityMps/1000,'hover power');
  return {
    model:'IDEAL_ACTUATOR_DISK_HOVER',
    thrustN,
    diskLoadingNPerM2:checked(thrustN/area,'disk loading'),
    inducedVelocityMps,
    idealInducedPowerKW,
    interpretation:'IDEAL_LOWER_BOUND_NOT_REQUIRED_ELECTRICAL_POWER',
  };
}

/**
 * Steady unaccelerated level flight, L=W and T=D=W/(L/D).
 * Required CL is bookkeeping ONLY; without validated polar and CLmax this
 * cannot establish lift capability, stall speed, takeoff or landing.
 */
export function idealWingLevelFlight({
  massKg, trueAirspeedMps, liftToDragRatio,
  airDensityKgPerM3, wingReferenceAreaM2,
}) {
  const m=positive(massKg,'massKg');
  const speed=positive(trueAirspeedMps,'trueAirspeedMps');
  const ld=positive(liftToDragRatio,'liftToDragRatio');
  const rho=positive(airDensityKgPerM3,'airDensityKgPerM3');
  const area=positive(wingReferenceAreaM2,'wingReferenceAreaM2');
  const weightN=checked(m*GRAVITY_M_S2,'weight');
  const dynamicPressurePa=checked(0.5*rho*speed**2,'dynamic pressure');
  const requiredLiftCoefficient=checked(weightN/(dynamicPressurePa*area),'required CL');
  const idealDragN=checked(weightN/ld,'ideal drag');
  const idealPropulsivePowerKW=checked(idealDragN*speed/1000,'wing power');
  return {
    model:'IDEAL_STEADY_LEVEL_WINGBORNE',
    weightN,dynamicPressurePa,requiredLiftCoefficient,idealDragN,idealPropulsivePowerKW,
    stallAssessment:'UNKNOWN_WITHOUT_REVIEWED_LIFT_POLAR_CLMAX',
    interpretation:'SIMPLIFIED_PROPULSIVE_POWER_NOT_TAKEOFF_OR_ELECTRICAL_POWER',
  };
}

/**
 * Explicitly fictional electrical estimate: first efficiency is either hover
 * rotor figure-of-merit or wing propulsive efficiency, then drivetrain
 * efficiency. Auxiliary power is assumed in kW. No reserve or battery sizing.
 */
export function hypotheticalElectricalPhase({
  idealMechanicalPowerKW, aeromechanicalEfficiency,
  electricalDrivetrainEfficiency, auxiliaryElectricalKW, durationHours,
}) {
  const ideal=positive(idealMechanicalPowerKW,'idealMechanicalPowerKW');
  const aero=fraction(aeromechanicalEfficiency,'aeromechanicalEfficiency');
  const drive=fraction(electricalDrivetrainEfficiency,'electricalDrivetrainEfficiency');
  const aux=nonnegative(auxiliaryElectricalKW,'auxiliaryElectricalKW');
  const duration=positive(durationHours,'durationHours');
  const hypotheticalElectricalPowerKW=checked(ideal/(aero*drive)+aux,'electrical power');
  return {
    status:'HYPOTHETICAL_ONLY_NOT_VERIFIED',
    hypotheticalElectricalPowerKW,
    hypotheticalPhaseEnergyKWh:checked(hypotheticalElectricalPowerKW*duration,'phase energy'),
    reserveIncluded:false, batteryPowerCapabilityChecked:false,
  };
}

// No legitimate VELTARO numerics currently available. Missing fields stay null.
const required = Object.freeze({
  VTOL:[
    'massKg','airDensityKgPerM3','totalEffectiveRotorDiskAreaM2',
    'rotorFigureOfMerit','electricalDrivetrainEfficiency',
    'auxiliaryElectricalKW','durationHours'
  ],
  TRANSFORMING_WING:[
    'massKg','trueAirspeedMps','liftToDragRatio','airDensityKgPerM3',
    'wingReferenceAreaM2','propulsiveEfficiency',
    'electricalDrivetrainEfficiency','auxiliaryElectricalKW','durationHours'
  ]
});
export const REQUIRED_PHYSICS_FIELDS=required;

/**
 * Requires explicit hypothesis scope/provenance before running even the toy
 * arithmetic. No result ever constitutes validation or approves architecture.
 */
export function auditM01PhysicsInputs(study) {
  const errors=[];
  if (study?.schemaVersion!=='0.1' || study?.missionId!=='M-01')
    errors.push('schema_or_mission_invalid');
  if (study?.status!=='UNVERIFIED_RESEARCH' ||
      study?.decision!=='HOLD_BOTH' || study?.selectedArchitecture!==null)
    errors.push('research_decision_policy_invalid');
  const incoming=study?.architectures;
  if (!incoming || typeof incoming!=='object' ||
      Object.keys(incoming).sort().join(',')!==[...CONCEPTS].sort().join(','))
    errors.push('architecture_set_invalid');

  const results={};
  for (const architecture of CONCEPTS) {
    const entry=incoming?.[architecture];
    const params=entry?.assumptions;
    const gaps=required[architecture].filter(k=>params?.[k]===null||params?.[k]===undefined);
    const metadata=entry?.provenance;
    const metadataFields=['sourceId','configurationId','conditions','evidenceDate','scopeBasis'];
    if (entry?.status!=='EXPLICIT_HYPOTHETICAL_INPUTS') {
      if (entry?.status!=='UNASSESSED') errors.push(architecture+'.status_invalid');
      if (params && Object.values(params).some(x=>x!==null))
        errors.push(architecture+'.unreviewed_numeric_values_present');
      results[architecture]={status:'MISSING_OR_UNASSESSED',gaps,
        idealPowerKW:null,hypotheticalElectricalPowerKW:null,hypotheticalPhaseEnergyKWh:null};
      continue;
    }
    if (gaps.length ||
        metadataFields.some(k=>!text(metadata?.[k])) ||
        metadata?.scopeBasis!=='EXPLICIT_CONCEPT_HYPOTHESIS_ONLY' ||
        entry?.applicationBoundary!=='NO_VELTARO_PERFORMANCE_TRANSFER') {
      results[architecture]={status:'BLOCKED_INCOMPLETE_OR_UNSCOPED_INPUTS',
        gaps:[...gaps,...metadataFields.filter(k=>!text(metadata?.[k])).map(k=>'provenance.'+k)],
        idealPowerKW:null,hypotheticalElectricalPowerKW:null,hypotheticalPhaseEnergyKWh:null};
      continue;
    }
    try {
      const phase=architecture==='VTOL' ? idealHover(params) : idealWingLevelFlight(params);
      const idealPowerKW=architecture==='VTOL'
        ? phase.idealInducedPowerKW : phase.idealPropulsivePowerKW;
      const electric=hypotheticalElectricalPhase({
        idealMechanicalPowerKW:idealPowerKW,
        aeromechanicalEfficiency:architecture==='VTOL'
          ? params.rotorFigureOfMerit : params.propulsiveEfficiency,
        electricalDrivetrainEfficiency:params.electricalDrivetrainEfficiency,
        auxiliaryElectricalKW:params.auxiliaryElectricalKW,
        durationHours:params.durationHours,
      });
      results[architecture]={status:'HYPOTHETICAL_CALCULATED_NOT_VALIDATED',
        gaps:[], idealPowerKW,
        hypotheticalElectricalPowerKW:electric.hypotheticalElectricalPowerKW,
        hypotheticalPhaseEnergyKWh:electric.hypotheticalPhaseEnergyKWh,
        physics:phase};
    } catch(error) {
      results[architecture]={status:'BLOCKED_INVALID_PHYSICS_INPUTS',
        gaps:[String(error.message)], idealPowerKW:null,
        hypotheticalElectricalPowerKW:null,hypotheticalPhaseEnergyKWh:null};
    }
  }
  return {
    assessment:'FIRST_ORDER_RESEARCH_EQUATIONS_NOT_VEHICLE_PERFORMANCE',
    decision:'HOLD_BOTH',
    safeToUseForAircraftDesign:false,
    independentVerification:false,
    crossArchitectureRankingAllowed:false,
    releaseGate:'BLOCKED_PENDING_MISSION_MASS_AERODYNAMICS_BATTERY_SAFETY_REGULATORY_REVIEW',
    errors,architectures:results,
  };
}
