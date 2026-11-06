// Concept-stage input audit only. This never verifies evidence authenticity,
// authorizes operations, selects an architecture or establishes performance.
import {readFileSync} from 'node:fs';

const ARCHITECTURES = ['VTOL', 'TRANSFORMING_WING'];
const PACK_RECORDS = ['BATT-01', 'BATT-02', 'BATT-03', 'PROP-01', 'PROP-02', 'THERM-01'];
const text = x => typeof x === 'string' && x.trim().length > 0;
const positive = x => typeof x === 'number' && Number.isFinite(x) && x > 0;
const nonnegative = x => typeof x === 'number' && Number.isFinite(x) && x >= 0;
const yes = x => x === true;
const at = (obj, path) => path.split('.').reduce((v, key) => v?.[key], obj);

/**
 * Identifies gaps in *reported input completeness*. A populated field is not
 * authenticated or technically approved, even when a source calls it verified.
 */
export function auditM01(mission, routes, evidence) {
  const checks = [];
  const check = (section, field, value, isPresent) =>
    checks.push({section, field, reported: Boolean(isPresent(value))});

  check('shared', 'mission_id', mission?.mission_id, x => x === 'M-01');
  for (const field of ['jurisdiction', 'origin', 'destination'])
    check('shared', field, at(mission, field), text);

  const assumed = {
    occupant_count: x => Number.isInteger(x) && x > 0,
    occupant_mass_kg: positive,
    luggage_mass_kg: nonnegative,
    vehicle_empty_mass_kg: positive,
    road_leg_origin_km: nonnegative,
    road_leg_destination_km: nonnegative,
    flight_route_km: positive,
    environment_wind_mps: nonnegative,
    reserve_basis: text,
    usable_pack_specific_energy_Wh_per_kg: positive,
  };
  for (const [field, valid] of Object.entries(assumed))
    check('shared', 'assumptions.' + field, at(mission, 'assumptions.' + field), valid);

  for (const field of ['legal_site_access_confirmed', 'source_review_completed', 'independent_safety_review_completed'])
    check('review_flags', 'validation.' + field, at(mission, 'validation.' + field), yes);
  check('review_flags', 'routes.operational_authorization', routes?.operational_authorization, yes);
  check('review_flags', 'evidence.vehicle_validation', evidence?.vehicle_validation, yes);

  for (const architecture of ARCHITECTURES) {
    const spec = mission?.architectures?.[architecture];
    const section = architecture;
    for (const field of ['departure_facility', 'arrival_facility', 'facility_authorization_evidence'])
      check(section, field, spec?.[field], text);
    for (const field of ['flight_phase_energy_kWh', 'peak_electrical_power_kW', 'structural_mass_kg'])
      check(section, field, spec?.[field], positive);
    const candidates = Array.isArray(routes?.candidates)
      ? routes.candidates.filter(x => x?.architecture === architecture) : [];
    check(section, 'route.unique_candidate', candidates.length, x => x === 1);
    const candidate = candidates.length === 1 ? candidates[0] : null;
    check(section, 'route.departure_site', candidate?.departure_site, text);
    check(section, 'route.arrival_site', candidate?.arrival_site, text);
    check(section, 'route.route_legal', candidate?.route_legal, yes);
  }

  for (const id of PACK_RECORDS) {
    const matches = Array.isArray(evidence?.required_vehicle_records)
      ? evidence.required_vehicle_records.filter(x => x?.id === id) : [];
    check('pack_propulsion', id + '.unique_record', matches.length, x => x === 1);
    const record = matches.length === 1 ? matches[0] : null;
    check('pack_propulsion', id + '.positive_value', record?.value, positive);
    check('pack_propulsion', id + '.measurement_source_id', record?.measurement_source_id, text);
    check('pack_propulsion', id + '.configuration_id', record?.configuration_id, text);
    check('pack_propulsion', id + '.conditions', record?.conditions, text);
    check('pack_propulsion', id + '.test_date', record?.test_date,
      x => text(x) && /^\d{4}-\d{2}-\d{2}$/.test(x));
    check('pack_propulsion', id + '.reviewer', record?.reviewer, text);
    check('pack_propulsion', id + '.verified_status', record?.status,
      x => x === 'INDEPENDENTLY_VERIFIED');
  }

  const gaps = checks.filter(x => !x.reported).map(({section, field}) => ({section, field}));
  return {
    mission: mission?.mission_id ?? null,
    assessment: 'REPORTED_INPUT_COMPLETENESS_ONLY',
    outcome: gaps.length ? 'MISSING_INPUTS' : 'INDEPENDENT_REVIEW_STILL_REQUIRED',
    architectureDecision: 'NOT_MADE_BY_AUDIT',
    declaredDecisions: {
      mission: mission?.validation?.decision ?? null,
      routes: routes?.decision ?? null,
      evidence: evidence?.decision ?? null,
    },
    checksCount: checks.length,
    missingCount: gaps.length,
    gaps,
    limitations: 'Populated fields and declared review flags cannot establish evidence authenticity, technical feasibility, operational permission, or certification.',
  };
}

if (process.argv[1]?.endsWith('v1-m01-evidence-gap-audit.mjs')) {
  const load = path => JSON.parse(readFileSync(path, 'utf8'));
  const report = auditM01(
    load('engineering/v1-m01-common-mission.json'),
    load('engineering/v1-m01-thrace-route-candidates.json'),
    load('engineering/v1-battery-propulsion-evidence.json'),
  );
  process.stdout.write(JSON.stringify(report, null, 2) + '\n');
}
