# VELTARO V1 — M-01 joint mass/energy/power sensitivity (research v0.2)

**6 November 2026 — ILLUSTRATIVE_ONLY. Not aircraft sizing validation, flight planning, power-pack acceptance, or VELTARO product performance.**

## Objective and reproducibility

The earlier [M-01 educational model](VELTARO-V1-M01-Energy-Comparability-2026.md) varied one input at a time. This extension crosses **pack-level usable specific energy** with **electrical phase power demand per total vehicle mass** for two *separate, hypothetical* architectures. It uses the same arbitrary fixture and shared payload; it does not invent approved flight sites, product range or battery test data.

Run with Node.js 22 from the repository root:

```bash
node engineering/v1-m01-run-joint-sensitivity.mjs
node tests/v1-m01-joint-sensitivity.mjs
```

The runner produces 3 × 3 = **9 toy sensitivity rows per architecture** (18 total). Multipliers are 0.8, 1 and 1.2 for each dimension. These multipliers are **educational perturbations**, not confidence intervals, certified tolerances, expected future component performance or supplier specifications.

For each phase i of a toy scenario:

- Electrical demand P_i = m_total × p_i, where p_i is an **assumed**, not measured, electrical power intensity in kW/kg.
- Flight energy E_flight = Σ(P_i × t_i), with t_i in hours.
- Required usable pack capacity E_pack = E_flight / (1 − r), where r is an arbitrary educational holdback, **not a regulatory reserve**.
- Pack mass m_pack = 1000 × E_pack / ε_pack, where ε_pack is the **installed usable pack** specific energy in Wh/kg.
- Coupled closure: m_total = m_dry + m_payload + m_pack. If the simple linear feedback factor ≥ 1, the toy model returns a **non-closure** with null outputs, not infinite or zero vehicle performance.

A credible aerodynamic, structural and installation model would be needed before interpreting these equations as engineering sizing. They omit rotor disk loading, induced power, takeoff performance, drive cycle, drag, wind, margins, thermal system, component aging, motor/propeller efficiencies and actual battery limits. In reality p_i and m_dry depend on configuration and may not vary independently or linearly with m_total.

## Separate battery power check

Available **energy** does not establish available **power**. The new optional assessment distinguishes:

- `UNKNOWN_NO_PACK_RATINGS`: no numerical continuous/peak rating assumptions were supplied.
- `UNKNOWN_PHASE_DUTY`: no explicit phase classification (continuous vs peak) was supplied.
- `UNKNOWN_INVALID_PACK_RATINGS`: supplied ratings fail basic numerical checks.
- `ASSUMED_CONSTRAINTS_MET_NOT_VERIFIED` / `ASSUMED_CONSTRAINTS_EXCEEDED`: a scenario is compared with explicitly *hypothetical* pack ratings and peak-duration limits. **Neither is technical acceptance or certification.**

The repository's illustrative sample contains **no validated pack ratings or peak/continuous classification** and therefore returns **UNKNOWN**. A real assessment must also model temperature, state of charge, aging, voltage, current, heat rejection, continuous rating definition and transient limits. Tests confirm that absent inputs cannot silently become permission to operate.

## Primary research source register

The linked machine-readable [source register](../engineering/v1-m01-public-source-register.json) records research context, not VELTARO measurements.

| ID | Independent background material | Supported use and boundary |
|---|---|---|
| NASA-2021-PACK | [NASA Glenn — Battery Cell-to-Pack Scaling Trends for Electric Aircraft](https://ntrs.nasa.gov/citations/20210017488) | Thermal, structural and safety overhead influence pack mass. **No universal cell-to-pack factor**, no VELTARO installed-pack measurement. |
| NASA-2025-AAM | [NASA Ames — Impact of Technology and Mission Variations on NASA Advanced Air Mobility Concept Vehicles](https://ntrs.nasa.gov/citations/20250006187) | Mission, battery, rotor, weight, power and thermal sensitivities matter. NASA concept vehicles are **not** roadable VELTARO configurations. |
| EASA-SC-VTOL | [EASA — Special Condition for VTOL and Means of Compliance](https://www.easa.europa.eu/en/document-library/product-certification-consultations/special-condition-vtol) | Relevant VTOL certification context, subject to an applicability assessment. EASA lists MOC-5 SC-VTOL Issue 2 released **5 November 2026**. Not VELTARO approval. |
| EU-2018-858 | [Regulation (EU) 2018/858](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32018R0858) | Road-vehicle type-approval framework. Legal applicability and the vehicle category must be assessed independently. |

## Outcome and next evidence gate

**Decision: HOLD_BOTH.** The two architecture scenarios use arbitrary phase power intensity and a shared illustrative dry mass for arithmetic comparison; their output differences **must not** determine which vehicle architecture is feasible or better.

Before an engineering trade study can rank options, acquire (1) a lawful shared M-01 mission and suitable departure/arrival sites; (2) different architecture-specific mass ledgers; (3) traceable installed battery pack usable energy and time-limited power capability; (4) source-backed flight-phase electric load models and thermal limitations; (5) an applicable reserve and operating envelope; and (6) qualified independent aerospace, automotive, safety and regulatory review.

This branch makes no numerical performance claims, authorizes no external testing or procurement, and neither changes nor validates the concept architecture decision.
