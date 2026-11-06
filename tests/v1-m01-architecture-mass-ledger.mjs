import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {auditM01MassLedger,SUBSYSTEM_IDS,ARCHITECTURES} from '../engineering/v1-m01-mass-ledger-audit.mjs';

const load = path => JSON.parse(readFileSync(path, 'utf8'));
const originalLedger=load('engineering/v1-m01-architecture-mass-ledgers.json');
const originalMission=load('engineering/v1-m01-common-mission.json');
const baseline=auditM01MassLedger(originalLedger,originalMission);

assert.equal(baseline.decision,'HOLD_BOTH');
assert.equal(baseline.readyForIndependentEngineeringOrCertification,false);
assert.equal(baseline.comparisonArithmeticAvailable,false);
assert.ok(baseline.globalGaps.includes('shared_mission_payload_not_defined'));
assert.equal(originalLedger.selectedArchitecture,null);
assert.deepEqual(Object.keys(originalLedger.architectures).sort(),[...ARCHITECTURES].sort());
assert.ok(ARCHITECTURES.every(x=>originalLedger.architectures[x].systems.length===9));
assert.ok(ARCHITECTURES.every(x=>SUBSYSTEM_IDS.every(id=>
  originalLedger.architectures[x].systems.some(r=>r.id===id&&r.estimateKg===null))));
assert.ok(ARCHITECTURES.every(x=>
  baseline.architectures[x].nominalMassKg===null &&
  baseline.architectures[x].status==='BLOCKED_MISSING_ASSUMPTIONS'));

function mockRow(row, nominal) {
  Object.assign(row,{
    status:'SUBMITTED_FOR_REVIEW',
    estimateKg:nominal,
    lowerKg:nominal*.9,
    upperKg:nominal*1.1,
    sourceId:'FICTIONAL-TEST-FIXTURE',
    dataBasis:'DOCUMENTED_RESEARCH_ASSUMPTION',
    evidenceDate:'2026-11-06',
    configurationId:'NONPHYSICAL-TOY-INPUT',
    conditions:'Illustrative arithmetic tests only; not VELTARO performance',
    rangeBasis:'Arbitrary plus/minus ten percent for test fixture only',
    applicationBoundary:'VELTARO_CONCEPT_ASSUMPTION_ONLY'
  });
}
const input=structuredClone(originalLedger);
const mission=structuredClone(originalMission);
mission.assumptions.occupant_count=2;
mission.assumptions.occupant_mass_kg=150; // combined occupants, mock only
mission.assumptions.luggage_mass_kg=20;
mockRow(input.sharedPayload,170);
for (const architecture of ARCHITECTURES) {
  const start=architecture==='VTOL'?100:90;
  input.architectures[architecture].systems.forEach((row,i)=>mockRow(row,start+10*i));
  mockRow(input.architectures[architecture].integrationMargin,architecture==='VTOL'?20:30);
}
const unmutated=JSON.stringify(input);
const ideal=auditM01MassLedger(input,mission);
assert.equal(JSON.stringify(input),unmutated);
assert.equal(ideal.comparisonArithmeticAvailable,true);
assert.equal(ideal.readyForIndependentEngineeringOrCertification,false);
assert.equal(ideal.releaseGate,'BLOCKED_UNTIL_QUALIFIED_ENGINEERING_REGULATORY_AND_SAFETY_REVIEW');
assert.deepEqual(ideal.globalGaps,[]);
assert.equal(ideal.architectures.VTOL.nominalMassKg,1450);
assert.equal(ideal.architectures.TRANSFORMING_WING.nominalMassKg,1370);
assert.ok(ideal.architectures.VTOL.lowerScenarioSumKg <
  ideal.architectures.VTOL.nominalMassKg);
assert.ok(ideal.architectures.VTOL.upperScenarioSumKg >
  ideal.architectures.VTOL.nominalMassKg);

// Missing or altered data must fail closed even when other entries look complete.
const alter = mutate => {
  const copy=structuredClone(input);
  mutate(copy);
  return auditM01MassLedger(copy,mission);
};
let r=alter(x=>x.architectures.VTOL.systems[0].estimateKg=null);
assert.equal(r.comparisonArithmeticAvailable,false);
assert.equal(r.architectures.VTOL.nominalMassKg,null);
r=alter(x=>x.architectures.TRANSFORMING_WING.systems[0].estimateKg=0);
assert.equal(r.architectures.TRANSFORMING_WING.nominalMassKg,null);
r=alter(x=>x.architectures.VTOL.systems.push({...x.architectures.VTOL.systems[0]}));
assert.ok(r.architectures.VTOL.issues.some(x=>x.includes('SYS-01.missing_or_duplicate')));
r=alter(x=>x.architectures.VTOL.systems.pop());
assert.ok(r.architectures.VTOL.issues.some(x=>x.includes('SYS-09.missing_or_duplicate')));
r=alter(x=>x.architectures.VTOL.systems[0].dataBasis='EXTERNAL_BENCHMARK');
assert.ok(r.architectures.VTOL.issues.some(x=>x.includes('dataBasis_invalid')));
r=alter(x=>x.architectures.VTOL.systems[0].applicationBoundary='X57_CELL_DATA');
assert.ok(r.architectures.VTOL.issues.some(x=>x.includes('external_benchmark')));
r=alter(x=>x.architectures.VTOL.systems[0].evidenceDate='2026-02-30');
assert.ok(r.architectures.VTOL.issues.some(x=>x.includes('evidenceDate_invalid')));
r=alter(x=>x.architectures.VTOL.systems[0].lowerKg=9999);
assert.ok(r.architectures.VTOL.issues.some(x=>x.includes('range_order_invalid')));
r=alter(x=>x.architectures.VTOL.integrationMargin.estimateKg=0);
assert.equal(r.architectures.VTOL.nominalMassKg,null,
  'Changing only nominal without bounds must fail range order');
const zeroMargin=structuredClone(input);
mockRow(zeroMargin.architectures.VTOL.integrationMargin,0);
assert.equal(auditM01MassLedger(zeroMargin,mission).comparisonArithmeticAvailable,true,
  'Documented zero integration allocation is legal arithmetic, not a recommendation');
r=alter(x=>x.architectures.VTOL.systems[0].status='INDEPENDENTLY_VERIFIED');
assert.ok(r.architectures.VTOL.issues.some(x=>x.includes('not_submitted')));
r=alter(x=>x.architectures.VTOL.systems[0].estimateKg=Infinity);
assert.equal(r.architectures.VTOL.nominalMassKg,null);
r=alter(x=>x.architectures.VTOL.systems[0].conditions=null);
assert.ok(r.architectures.VTOL.issues.some(x=>x.includes('conditions_missing')));
r=alter(x=>x.architectures.EXTRA=structuredClone(x.architectures.VTOL));
assert.ok(r.globalGaps.includes('architecture_set_not_exact'));
assert.equal(r.comparisonArithmeticAvailable,false);
const mismatch=structuredClone(mission);
mismatch.assumptions.luggage_mass_kg=40;
const failed=auditM01MassLedger(input,mismatch);
assert.ok(failed.globalGaps.includes('shared_payload_mission_mass_mismatch'));
assert.equal(failed.comparisonArithmeticAvailable,false);

console.log('M-01 mass-ledger tests passed: unknown default, shared payload, arithmetic fixture and fail-closed validations.');
