# VELTARO V1 — M-01 architecture-specific mass ledgers (research Rev 0)

**6 November 2026 | CONCEPT ONLY | No validated aircraft mass, flight capacity or road/air authorization.**

## Engineering objective

Before running a defensible mass–energy–power trade study, both options need an explicit **subsystem mass ledger** with a shared mission/payload but distinct configurations. The previously published [subsystem evidence budget](VELTARO-V1-Subsystem-Evidence-Budget-2026.md) defines SYS-01 to SYS-09, payload and integration margin. This implementation turns those data requirements into an auditable JSON schema and a cautious arithmetic checker.

The [machine-readable ledgers](../engineering/v1-m01-architecture-mass-ledgers.json) contain **21 mass allocations**: 9 system records plus 1 integration margin for **each** architecture, and 1 shared payload. Every mass and source field starts as **null**. Both the VTOL-powered-lift and runway-dependent transforming-wing designs remain **HOLD_BOTH**.

## Run and validate

From the repository root with Node.js 22:

```bash
node engineering/v1-m01-run-mass-ledger-audit.mjs
node tests/v1-m01-architecture-mass-ledger.mjs
```

The runner reports missing assumption/evidence fields for both architectures and returns **null** mass totals until all nine subsystem rows, the separate margin, and the shared mission payload meet *documentation completeness* checks.

## Ledger boundaries

| Allocation | Meaning | Particular double-counting risk |
|---|---|---|
| SYS-01 | Road chassis, steering, braking and crash protection | Shared load paths in airframe cannot be counted twice |
| SYS-02 | Flight primary structure, e.g. rotors or folding wing | Wing/rotor attachment and structural members need allocation rules |
| SYS-03 | Flight motors, propulsors, inverters | Distinguish road propulsion (SYS-05) and shared hardware |
| SYS-04 | **Complete installed battery pack**, enclosure, thermal protection and cooling | No cell-only Wh/kg in place of installed pack mass; avoid duplication with SYS-09 |
| SYS-05 | Road propulsion and power electronics | Shared drivetrain and electrical hardware require an allocation convention |
| SYS-06 | Flight-control computers, sensors and avionics | Do not overlap cockpit HMI hardware in SYS-08 |
| SYS-07 | VTOL rotor protection **or** folding-wing actuation, locks and conversion interlocks | Different architecture-dependent mechanisms and load paths |
| SYS-08 | Cockpit, seats, human factors hardware | Road crash and occupant safety may overlap SYS-01 |
| SYS-09 | Non-battery thermal, wiring and auxiliary services | SYS-04 owns battery-dedicated cooling, no double allocation |
| PAYLOAD | **Common** passengers + luggage mass defined by the M-01 mission | Must equal the mission's combined occupant mass + luggage |
| MARGIN | Separate system integration mass allocation | Not a certification reserve, and not a substitute for uncertainty analysis |

Unlike a simplified "identical dry mass" sensitivity fixture, **each architecture has its own structural and equipment ledger**. A missing item is **unknown**, never zero or "not applicable" by default.

## Required metadata and arithmetic policy

A mass record can be labeled `SUBMITTED_FOR_REVIEW` only when it includes:

- `lowerKg`, `estimateKg`, `upperKg` with finite nonnegative (margin) or positive (other systems/payload) mass, ordered lower ≤ estimate ≤ upper;
- `sourceId`, `evidenceDate`, `configurationId`, `conditions` and `rangeBasis`;
- `dataBasis` = `DOCUMENTED_RESEARCH_ASSUMPTION` or `CONFIGURATION_SPECIFIC_RECORD`, with `applicationBoundary` explicitly set to `VELTARO_CONCEPT_ASSUMPTION_ONLY`.

A source ID is **not** proof that its content or relevance was checked. The code cannot authenticate a reviewer or a test record. Values taken from unrelated aircraft **must not** be imported into this ledger merely because their unit is kg. The prior [external benchmark register proposed in PR #130](https://github.com/panagiotagrosdouli/VELTARO/pull/130) is literature context, not a VELTARO mass source.

Once all submissions and shared payload conditions are syntactically complete, the tool can calculate:

\[
m_{\mathrm{nominal}} = m_{\mathrm{payload}} + m_{\mathrm{integration}} + \sum_{i=01}^{09}m_{\mathrm{SYS}-i}
\]

The analogous sums of lower and upper assumed allocations are **scenario envelopes**, not confidence intervals or quantified uncertainty: correlations, conservatism and possible omitted items remain unresolved. The result is always marked `ARITHMETIC_ONLY_NOT_VALIDATED` and can never release engineering, safety, regulatory or product performance gates.

The tests include **fabricated values** solely for regression testing; none are entered into the project's baseline JSON, used as VELTARO predictions or presented as a design. The current mission's occupants and luggage remain unknown; consequently the baseline is **BLOCKED_MISSING_ASSUMPTIONS** with **null totals**.

## Constraints still outside the mass budget

Even after source-supported subsystem estimates are gathered, an actual feasibility comparison needs: architecture-specific aerodynamics and vertical lift/runs, the mass–energy coupling of an actual installed pack, continuous and peak discharge limits over time/SOC/temperature, structural and crash loads, authorized takeoff/landing infrastructure, correct certification/vehicle classes, flight reserve rules and independently reviewed hazard cases.

**Decision remains HOLD_BOTH. No prototype manufacture, test operation, purchasing, certification or public performance claims authorized.**
