# VELTARO V1 — Initial comparative feasibility protocol v0.1
**19 October 2026 | Concept-only | No performance claims | No physical tests authorized**

## Decision question
For an explicitly defined personal mobility mission involving road travel and **authorized** flight, which architecture—electric VTOL or folding fixed-wing runway aircraft—warrants further non-physical investigation?

## Required baseline inputs (all TBD)
| Variable | Unit | Status |
| --- | --- | --- |
| Occupants and luggage/payload | kg | TBD |
| Road legal envelope and crash structures | m, kg | TBD by jurisdiction |
| Takeoff location / access assumptions | category | TBD |
| Route distance and flight stages | km, min | TBD |
| Takeoff, climb, cruise, descent, landing profile | time, speed, altitude | TBD |
| Aircraft empty mass (including road equipment) | kg | TBD |
| Battery usable specific energy and power limits | Wh/kg, W/kg | TBD and source-required |
| Propulsive/aerodynamic efficiencies | dimensionless | TBD |
| Contingency and mandated energy reserve | Wh, % | TBD by applicable framework |
| Failure cases and safe landing strategies | qualitative | TBD |

## First-order analysis sequence
1. Define one common mission for both configurations. Identify alternatives and limits on legal operations.
2. Estimate a traceable component mass budget. Include roadworthiness, energy storage, mechanisms, structure, safety and payload.
3. Estimate power requirements separately for hover/transition and for climb/cruise; do not apply rotor hover assumptions to fixed-wing cruise.
4. Integrate power over flight phases to estimate usable mission energy. Apply a separately justified regulatory/operational reserve.
5. Check coupled mass-energy iteration: extra battery mass changes the power and energy needs.
6. Compare ground-mode packaging, failure modes, noise, infrastructure and expected maintenance burden.
7. Record uncertainty intervals and independent review requests. **Do not produce definitive range/speed claims from unsupported inputs.**

## Preliminary hazard log
| ID | Hazard / initiating issue | Consequence to examine | Research control |
| --- | --- | --- | --- |
| H-01 | Loss of flight propulsion or electrical supply | Loss of controlled flight | Architecture-specific redundancy and emergency landing study |
| H-02 | Road/flight configuration mismatch | Structural failure or control loss | Mode interlock and fail-safe state concept |
| H-03 | Battery thermal event | Fire, loss of system | Cell/pack safety and thermal propagation literature |
| H-04 | Control or sensor failure | Incorrect control response | Control assurance requirements and fault tree |
| H-05 | Public exposure near takeoff/landing | Third-party injury/noise | Operational site and risk restrictions |
| H-06 | Road crash involving aviation mechanisms | Occupant/public harm | Road crashworthiness integration review |

## Gate conditions
Continue conceptual research only when mission, input provenance, mass and energy balance, hazards, legal questions and reviewer gaps are documented. Prototype authorization, flight operations and road testing are **separate future decisions**, requiring qualified specialists, funding and required approvals.

## Authoritative orientation sources
- EASA Special Condition VTOL: https://www.easa.europa.eu/en/document-library/product-certification-consultations/special-condition-vtol
- EASA aircraft certification: https://www.easa.europa.eu/en/domains/aircraft-products
- EU 2018/858 road-vehicle approval: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32018R0858
This preliminary method is not itself an airworthiness or type-approval assessment.
