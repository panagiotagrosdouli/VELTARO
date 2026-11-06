// Joint two-factor concept sensitivity only; not vehicle predictions.
// Do not mix hypothetical fixture values with reviewed engineering evidence.
import {evaluateScenario} from './v1-m01-energy-model.mjs';

export const GRID_MULTIPLIERS = Object.freeze([0.8, 1, 1.2]);
export const CONCEPTS = Object.freeze(['VTOL', 'TRANSFORMING_WING']);
const finitePositive = n => typeof n === 'number' && Number.isFinite(n) && n > 0;

/**
 * Checks arithmetic against explicitly assumed battery ratings and phase duty.
 * Every return is a simulation-assumption status, NEVER real pack acceptance.
 * Missing battery ratings or phase duty produce UNKNOWN, not a pass.
 */
export function assessAssumedPackPower(scenario, result, limits = null) {
  if (!result?.converged) return {status:'NOT_APPLICABLE_NON_CLOSURE'};
  if (limits == null) return {status:'UNKNOWN_NO_PACK_RATINGS'};
  if (!finitePositive(limits.continuousPowerKW) ||
      !finitePositive(limits.peakPowerKW) ||
      limits.peakPowerKW < limits.continuousPowerKW ||
      typeof limits.maxPeakHours !== 'number' ||
      !Number.isFinite(limits.maxPeakHours) ||
      limits.maxPeakHours < 0)
    return {status:'UNKNOWN_INVALID_PACK_RATINGS'};
  if (scenario.phases.some(p => !['CONTINUOUS', 'PEAK'].includes(p.powerClass)))
    return {status:'UNKNOWN_PHASE_DUTY'};

  let peakDurationHours = 0;
  const phases = scenario.phases.map(p => {
    const demandKW = p.powerKWPerKg * result.estimatedMassKg;
    const limitKW = p.powerClass === 'PEAK' ? limits.peakPowerKW : limits.continuousPowerKW;
    if (p.powerClass === 'PEAK' && demandKW > limits.continuousPowerKW)
      peakDurationHours += p.durationHours;
    return {name:p.name, powerClass:p.powerClass, assumedDemandKW:demandKW,
      withinAssumedRating:demandKW <= limitKW};
  });
  const ratingChecksPass = phases.every(p => p.withinAssumedRating);
  const durationCheckPass = peakDurationHours <= limits.maxPeakHours;
  return {
    status: ratingChecksPass && durationCheckPass
      ? 'ASSUMED_CONSTRAINTS_MET_NOT_VERIFIED'
      : 'ASSUMED_CONSTRAINTS_EXCEEDED',
    peakDurationHours, durationCheckPass, phases,
  };
}

/**
 * For each architecture, cross pack-level Wh/kg with flight-phase electrical
 * power intensity over the same *hypothetical* shared mass/payload baseline.
 * The cross-grid is not independent uncertainty quantification or safety work.
 */
export function jointSensitivity(sample, assumedPackRatings = {}) {
  if (sample?.status !== 'ILLUSTRATIVE_ONLY')
    throw Error('Only explicit ILLUSTRATIVE_ONLY samples permitted');
  if (!sample.shared || !sample.variants ||
      Object.keys(sample.variants).sort().join(',') !== [...CONCEPTS].sort().join(','))
    throw Error('Both architectures required');

  const rows = [];
  for (const architecture of CONCEPTS) {
    const phases = sample.variants[architecture]?.phases;
    if (!Array.isArray(phases) || !phases.length)
      throw Error('Missing flight phases for ' + architecture);

    for (const energyMultiplier of GRID_MULTIPLIERS)
      for (const powerMultiplier of GRID_MULTIPLIERS) {
        const scenario = {
          ...sample.shared,
          architecture,
          usablePackWhPerKg: sample.shared.usablePackWhPerKg * energyMultiplier,
          phases: phases.map(p => ({...p, powerKWPerKg:p.powerKWPerKg * powerMultiplier})),
        };
        const result = evaluateScenario(scenario);
        const packPower = assessAssumedPackPower(
          scenario, result, assumedPackRatings?.[architecture] ?? null);
        rows.push({
          architecture, energyMultiplier, powerMultiplier,
          converged:result.converged,
          illustrativeMassKg:result.converged ? result.estimatedMassKg : null,
          illustrativePackMassKg:result.converged ? result.estimatedPackMassKg : null,
          illustrativeEnergyKWh:result.converged ? result.missionEnergyKWh : null,
          illustrativeRequiredPackKWh:result.converged ? result.requiredUsablePackKWh : null,
          illustrativePeakPhasePowerKW:result.converged
            ? result.maximumPhaseElectricalPowerKW : null,
          packPower,
          reason:result.converged ? null : result.reason,
        });
      }
  }
  return {
    status:'ILLUSTRATIVE_ONLY',
    scope:'TWO_FACTOR_MASS_ENERGY_ARITHMETIC_NOT_AIRCRAFT_PERFORMANCE',
    decision:'HOLD_BOTH',
    independentValidation:false,
    rowCount:rows.length,
    rows,
    limitations:[
      'Power per kilogram and dry mass are arbitrary, not aero-propulsive physics.',
      'No verified pack power, thermal performance, road mission, infrastructure or legal authorization.',
      'Grid is illustrative sensitivity, not statistical uncertainty or a fair architecture ranking.',
    ],
  };
}
