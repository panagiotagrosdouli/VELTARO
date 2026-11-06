// VELTARO V1 M-01 research-only mass ledger.
// Only adds user-supplied subsystem assumptions; never validates a vehicle,
// verifies a source, selects an architecture, or authorizes road/air operation.
export const SUBSYSTEM_IDS = Object.freeze(Array.from({length:9}, (_,i)=>'SYS-'+String(i+1).padStart(2,'0')));
export const ARCHITECTURES = Object.freeze(['VTOL','TRANSFORMING_WING']);
const nonempty = x => typeof x === 'string' && x.trim().length > 0;
const finite = x => typeof x === 'number' && Number.isFinite(x);
const validDate = s => nonempty(s) && /^\d{4}-\d{2}-\d{2}$/.test(s) &&
  !Number.isNaN(Date.parse(s+'T00:00:00Z')) &&
  new Date(s+'T00:00:00Z').toISOString().slice(0,10) === s;
const BASIS = ['DOCUMENTED_RESEARCH_ASSUMPTION','CONFIGURATION_SPECIFIC_RECORD'];
const BOUNDARY = 'VELTARO_CONCEPT_ASSUMPTION_ONLY';

function inspectMassEntry(record, id, allowZero=false) {
  const problems = [];
  const issue = detail => problems.push(id+'.'+detail);
  if (!record || typeof record !== 'object' || Array.isArray(record)) {
    issue('record_missing');
    return {ready:false,problems};
  }
  if (record.status !== 'SUBMITTED_FOR_REVIEW') {
    issue('not_submitted');
    if (['estimateKg','lowerKg','upperKg'].some(k => record[k] !== null && record[k] !== undefined))
      issue('unassessed_numeric_present');
  }
  for (const key of ['estimateKg','lowerKg','upperKg']) {
    if (!finite(record[key]) || (allowZero ? record[key]<0 : record[key]<=0))
      issue(key+'_not_supported');
  }
  if (finite(record.lowerKg) && finite(record.estimateKg) && finite(record.upperKg) &&
      !(record.lowerKg<=record.estimateKg && record.estimateKg<=record.upperKg))
    issue('range_order_invalid');

  for (const key of ['sourceId','configurationId','conditions','rangeBasis'])
    if (!nonempty(record[key])) issue(key+'_missing');
  if (!validDate(record.evidenceDate)) issue('evidenceDate_invalid');
  if (!BASIS.includes(record.dataBasis)) issue('dataBasis_invalid');
  if (record.applicationBoundary !== BOUNDARY)
    issue('external_benchmark_or_unscoped_data_not_allowed');
  return {ready:problems.length===0, problems};
}

export function auditM01MassLedger(ledger, mission) {
  const globalGaps = [];
  if (ledger?.schemaVersion !== '0.1') globalGaps.push('schemaVersion_invalid');
  if (ledger?.missionId !== 'M-01' || mission?.mission_id !== 'M-01')
    globalGaps.push('mission_id_mismatch');
  if (ledger?.status !== 'RESEARCH_UNVERIFIED' || ledger?.decision !== 'HOLD_BOTH' ||
      ledger?.selectedArchitecture !== null)
    globalGaps.push('architecture_and_validation_policy_invalid');
  if (mission?.validation?.decision !== 'HOLD_BOTH')
    globalGaps.push('reference_mission_decision_not_hold');

  const assumptions = mission?.assumptions;
  const count = assumptions?.occupant_count;
  const occupants = assumptions?.occupant_mass_kg;
  const luggage = assumptions?.luggage_mass_kg;
  if (!Number.isInteger(count) || count < 1 || !finite(occupants) || occupants<=0 ||
      !finite(luggage) || luggage < 0)
    globalGaps.push('shared_mission_payload_not_defined');

  const payload = inspectMassEntry(ledger?.sharedPayload,'PAYLOAD');
  if (payload.ready && finite(occupants) && finite(luggage) &&
      Math.abs(ledger.sharedPayload.estimateKg-(occupants+luggage)) > 1e-8)
    globalGaps.push('shared_payload_mission_mass_mismatch');

  const reports = {};
  for (const architecture of ARCHITECTURES) {
    const issues = [];
    const entry = ledger?.architectures?.[architecture];
    const rows = Array.isArray(entry?.systems) ? entry.systems : [];
    if (!Array.isArray(entry?.systems)) issues.push('systems_not_array');
    const ids=rows.map(x => x?.id);
    for (const id of SUBSYSTEM_IDS) {
      const matches=rows.filter(x => x?.id===id);
      if (matches.length!==1) {
        issues.push(id+'.missing_or_duplicate');
        continue;
      }
      const result=inspectMassEntry(matches[0],id);
      issues.push(...result.problems);
    }
    for (const id of ids) if (!SUBSYSTEM_IDS.includes(id))
      issues.push('unknown_system_id:'+String(id));
    if (entry?.integrationMargin?.id !== 'MARGIN') issues.push('margin.id_invalid');
    const margin=inspectMassEntry(entry?.integrationMargin,'MARGIN',true);
    issues.push(...margin.problems);

    const complete = issues.length===0 && payload.ready && globalGaps.length===0;
    const sum = key =>
      rows.reduce((total,row)=>total+row[key],0) +
      entry.integrationMargin[key] + ledger.sharedPayload[key];
    reports[architecture] = {
      status: complete ? 'ARITHMETIC_ONLY_NOT_VALIDATED' : 'BLOCKED_MISSING_ASSUMPTIONS',
      nominalMassKg:complete ? sum('estimateKg') : null,
      lowerScenarioSumKg:complete ? sum('lowerKg') : null,
      upperScenarioSumKg:complete ? sum('upperKg') : null,
      // Note: component lower/upper sums are NOT statistical confidence intervals.
      issues,
    };
  }
  if (!ledger?.architectures ||
      Object.keys(ledger.architectures).sort().join(',') !== [...ARCHITECTURES].sort().join(','))
    globalGaps.push('architecture_set_not_exact');

  const comparisonArithmeticAvailable = globalGaps.length===0 && payload.ready &&
    ARCHITECTURES.every(x=>reports[x].status==='ARITHMETIC_ONLY_NOT_VALIDATED');
  return {
    missionId:'M-01',
    assessment:'DOCUMENTED_ASSUMPTION_ARITHMETIC_ONLY',
    decision:'HOLD_BOTH',
    readyForIndependentEngineeringOrCertification:false,
    comparisonArithmeticAvailable,
    releaseGate:'BLOCKED_UNTIL_QUALIFIED_ENGINEERING_REGULATORY_AND_SAFETY_REVIEW',
    globalGaps:[...globalGaps,...payload.problems],
    architectures:reports,
    limitations:[
      'Source identifiers and submitted dates do not authenticate assumptions or measurements.',
      'No mass-energy feedback, propulsion sizing, structural loads, thermal limits or certification assessment.',
      'Lower/upper sums are scenario envelopes, not probabilistic confidence bounds.',
      'Published external aircraft benchmarks are not transferred to VELTARO mass entries.',
    ],
  };
}
