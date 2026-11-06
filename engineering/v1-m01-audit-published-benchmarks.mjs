// External source-integrity audit. NEVER outputs VELTARO design inputs or
// certifies a source, an aircraft, a battery, a flight site, or a mission.
import {readFileSync} from 'node:fs';

const units = {
  cell_specific_energy:'Wh/kg', pack_specific_energy:'Wh/kg',
  pack_mass:'kg', pack_nominal_energy:'kWh',
  tested_discharge_current:'A', tested_discharge_current_high_rate:'A',
  max_measured_temperature_high_rate:'degC',
  high_rate_capacity_retention:'percent', pack_nominal_voltage:'V',
  pack_rated_capacity:'Ah', maximum_takeoff_mass:'kg',
  actual_takeoff_mass:'kg', cumulative_loaded_flight_time:'min',
};
const finitePositive = n => typeof n === 'number' && Number.isFinite(n) && n > 0;
const nonempty = s => typeof s === 'string' && s.trim().length > 0;
const near = (a,b,tolerance) => Math.abs(a-b) <= tolerance;

export function auditPublishedBenchmarks(data) {
  const problems=[];
  const fail=(why)=>problems.push(why);
  if (data?.scope !== 'PUBLISHED_EXTERNAL_AEROSPACE_REFERENCES_ONLY')
    fail('Not a strictly external source register');
  if (data?.transferPolicy !== 'NO_AUTOMATIC_MODEL_INGESTION')
    fail('Missing no-transfer rule');
  if (data?.decision !== 'HOLD_BOTH') fail('HOLD_BOTH decision not preserved');
  const v = data?.veltaroValidatedInputs;
  if (!v || typeof v !== 'object' || Array.isArray(v))
    fail('Missing explicit unknown VELTARO configuration');
  else for (const [key,value] of Object.entries(v))
    if (key === 'operationalAuthorization' || key === 'selectedArchitecture') {
      if (value !== (key === 'operationalAuthorization' ? false : null))
        fail('Unsupported VELTARO status: '+key);
    } else if (value !== null)
      fail('Unsupported VELTARO design value: '+key);

  const sources=Array.isArray(data?.sources) ? data.sources : [];
  if (sources.length < 2) fail('Insufficient independent source identities');
  const sourceIds=new Set();
  for (const source of sources) {
    if (!nonempty(source?.id) || sourceIds.has(source.id)) fail('Missing or duplicate source id');
    else sourceIds.add(source.id);
    if (!source?.url?.startsWith('https://') || !nonempty(source.exactLocation) ||
        source.independentlyReviewedForVeltaro !== false ||
        !nonempty(source.limitations))
      fail('Source provenance/limits incomplete: '+source?.id);
  }

  const observations=Array.isArray(data?.externalObservations) ? data.externalObservations : [];
  if (!observations.length) fail('No observations');
  const observationIds=new Set();
  const byId = new Map();
  for (const x of observations) {
    if (!nonempty(x?.id) || observationIds.has(x.id)) fail('Missing or duplicate observation id');
    else {observationIds.add(x.id);byId.set(x.id,x);}
    if (!sourceIds.has(x?.sourceId)) fail('Unknown source for '+x?.id);
    if (!nonempty(x?.assetId) || !nonempty(x?.conditions) ||
        !nonempty(x?.basis) || !nonempty(x?.statedMeasurementUncertainty))
      fail('Observation conditions/boundaries incomplete: '+x?.id);
    if (!finitePositive(x?.value) || units[x?.metric] !== x?.unit)
      fail('Invalid value or unit: '+x?.id);
    if (x?.transferToVeltaro !== false || x?.independentlyVerifiedForVeltaro !== false)
      fail('Prohibited unreviewed evidence transfer: '+x?.id);
    if ((x?.metric === 'cell_specific_energy' ||
         x?.metric === 'pack_specific_energy' ||
         x?.metric === 'pack_nominal_energy') &&
        !nonempty(x.energyBoundary))
      fail('Missing specific-energy boundary: '+x?.id);
  }

  // Arithmetic checks only within a single reference asset and for NOMINAL
  // energy. Rounded study values should agree, but never become usable Wh/kg.
  const get = (id,metric,asset) => {
    const x=byId.get(id);
    if (!x || x.metric !== metric || x.assetId !== asset) {
      fail('Required scoped observation absent: '+id);
      return NaN;
    }
    return x.value;
  };
  const testMass=get('VS-TEST-PACK-M','pack_mass','VS210-24S1P-TEST');
  const testEnergy=get('VS-TEST-PACK-KWH','pack_nominal_energy','VS210-24S1P-TEST');
  const testSpec=get('VS-TEST-PACK-E','pack_specific_energy','VS210-24S1P-TEST');
  const installedMass=get('VS-ONBOARD-MASS','pack_mass','VS210-24S4P-ONBOARD');
  const installedEnergy=get('VS-ONBOARD-KWH','pack_nominal_energy','VS210-24S4P-ONBOARD');
  const installedSpec=get('VS-ONBOARD-SPEC','pack_specific_energy','VS210-24S4P-ONBOARD');
  const voltage=get('VS-ONBOARD-VOLTAGE','pack_nominal_voltage','VS210-24S4P-ONBOARD');
  const capacity=get('VS-ONBOARD-AH','pack_rated_capacity','VS210-24S4P-ONBOARD');
  const cell=get('X57-CELL-E','cell_specific_energy','NASA-X57');
  const x57Pack=get('X57-PACK-E','pack_specific_energy','NASA-X57');
  const takeoff=get('VS-FLIGHT-MASS','actual_takeoff_mass','VS210-TESTFLIGHT');
  const maxTakeoff=get('VS-AIRFRAME-MTOW','maximum_takeoff_mass','VS210-AIRCRAFT');
  if (!near(testEnergy*1000/testMass,testSpec,0.7))
    fail('24S1P nominal energy / mass inconsistent with reported specific energy');
  if (!near(installedEnergy*1000/installedMass,installedSpec,0.7))
    fail('24S4P nominal energy / mass inconsistent with reported specific energy');
  if (!near(voltage*capacity/1000,installedEnergy,0.02))
    fail('24S4P nominal voltage x Ah inconsistent with reported energy');
  if (!(x57Pack < cell)) fail('X-57 reference pack/cell relation inconsistent');
  if (!(takeoff <= maxTakeoff)) fail('Actual test mass exceeds listed MTOW');

  return {
    assessment:'SOURCE_REGISTER_ARITHMETIC_AND_METADATA_ONLY',
    validSourceRegister:problems.length===0,
    acceptableVeltaroDesignValues:false,
    architectureDecision:'NOT_SELECTED',
    observationCount:observations.length,
    sourceCount:sources.length,
    problems,
    caveat:'Literature has different configuration, nominal/usable boundary and test conditions. No source authentication, design applicability, uncertainty envelope or regulatory approval follows from this audit.',
  };
}

if (process.argv[1]?.endsWith('v1-m01-audit-published-benchmarks.mjs')) {
  const data=JSON.parse(readFileSync('engineering/v1-m01-external-benchmarks.json','utf8'));
  const report=auditPublishedBenchmarks(data);
  process.stdout.write(JSON.stringify(report,null,2)+'\n');
  if (!report.validSourceRegister) process.exitCode=1;
}
