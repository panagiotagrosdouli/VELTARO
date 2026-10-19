# VELTARO V1 — Product Definition Rev A
**19 October 2026 | CONCEPT ONLY | Internal product requirements, not validated engineering or certified performance**

## Product promise
A premium personal vehicle experience that **explores** road mobility plus legal, controlled flight under a single user journey. The product must never suggest takeoff from arbitrary streets, autonomous flight without appropriate approval, or road/air operation without independent safety assessment.

## Who it is for
**Primary hypothesis:** an experienced, qualified user who can access legal aviation infrastructure and wants a high-design experience across road and air. This is not a mass-market commuter or a promise of universal door-to-door flight. Real user needs remain unvalidated.

## Rev A design principles
1. **Safety is architecture, not marketing.** Flight controls, emergency strategy, fire isolation, configuration interlocks and safe failure response are required design questions from the outset.
2. **One premium journey.** The experience should feel deliberate and elegant whether moving, parked or preparing for an authorized flight.
3. **Honest engineering.** No advertised range, top speed, occupant count, costs or certification claims before study, testing and regulatory review.
4. **Practical packaging.** Road dimensions, parking envelope, mass, structural and pedestrian safety are constraints, not styling afterthoughts.
5. **Serviceability.** Access to high-maintenance systems and inspection of transformation mechanisms must be considered at concept stage.

## Customer journey / user experience specification
| Step | Desired experience | Safety and operational control | Open question |
|---|---|---|---|
| 01 Plan | Enter route, destination and preferred travel mode | Indicate road-only vs potentially authorized air segment | What air infrastructure may legally be used? |
| 02 Drive | Quiet, composed premium road experience | Roadworthiness, driver display, crash safety | Which vehicle approval class is viable? |
| 03 Arrive at air site | Clear location-specific readiness guidance | Site suitability, weather/airspace/permissions checked by qualified system/operator | What approval and process apply? |
| 04 Configure for flight | Intelligible staged transition | Positive mechanical lock verification, system self-checks, safe abort | Architecture and failure response TBD |
| 05 Fly | Reduced pilot cognitive load, readable priority alerts | Aircraft and pilot qualification, redundancy, emergency procedures | Degree of automation and certification TBD |
| 06 Land / return | Predictable landing and reconfiguration sequence | Flight shutdown and secured road mode before moving | Conversion inspection requirements TBD |
| 07 Service | Transparent inspection and maintenance prompts | Maintenance records, fault escalation and lockouts | Approved maintenance regime TBD |

## Design freeze boundaries
- **Exterior direction:** premium, sculptural, restrained; do not mistake concept renders or editorial photos for engineering models.
- **Cabin direction:** highly legible human-machine interface, physical fallback for safety-critical actions where requirements demand; reduce distractions and passenger ambiguity.
- **Transformation:** no visual animation or speculative joint mechanism shall be presented as proven mechanical design.
- **Configuration:** two competing architecture hypotheses remain active: VTOL and runway-based folding fixed-wing. Choose neither solely for aesthetic appeal.

## Prioritized product requirements
| ID | Priority | Requirement / research criterion | Evidence needed for acceptance |
|---|---|---|---|
| V1-001 | P0 | Define a **legal** target trip and departure/arrival operating environment | Mission brief and constraints from competent advisors |
| V1-002 | P0 | Establish road width/height/mass envelope and approval assumptions | Jurisdiction-based design-constraints sheet |
| V1-003 | P0 | Bound passenger/payload and road/air duty cycle | Research-backed mission scenario |
| V1-004 | P0 | Produce comparable traceable mass/energy/power models for both architectures | Reviewed calculations, source assumptions, uncertainty bands |
| V1-005 | P0 | Document single-point failure and emergency landing scenarios | Preliminary hazard analysis and expert comments |
| V1-006 | P0 | Map applicable aviation and automotive approval questions | Regulatory issues register, independent legal/engineering review |
| V1-007 | P1 | Define road/flight mode interlocks and human override/abort concepts | State transition diagram and safety review |
| V1-008 | P1 | Define cabin task flows and distraction constraints | Annotated UX flow + usability research protocol |
| V1-009 | P1 | Estimate service and inspectability burdens | Maintenance concept outline and risks |
| V1-010 | P1 | Test whether qualified users want the constrained real-world mission | Recorded, consented qualitative interviews |
| V1-011 | P2 | Explore premium CMF (colors/materials/finishes) | Design concept board, separate from engineering evidence |
| V1-012 | P2 | Evaluate price and ownership-model hypotheses | Costed engineering basis and willingness-to-pay evidence |

## First engineering milestone — apples-to-apples trade study
Create one common road-plus-flight mission (without choosing ungrounded numerical distances). Build two source-backed models that explicitly include:
- Structure, occupants, road safety equipment, flight systems, propulsion, energy storage, transition hardware and contingencies.
- Distinct flight profiles: VTOL hover/transition vs fixed-wing takeoff, climb and cruise; landing and regulatory reserves.
- A mass-energy feedback loop; battery mass cannot be assumed independent of flight power.
- Infrastructure, adverse weather, maintenance, emergency operation, airspace and road approval constraints.
- Uncertainty bounds; **no winner declared** until evidence and expert review.

## Key unknowns and red flags
| Red flag | Required response |
|---|---|
| An architecture cannot close mass-energy balance using credible parameters | Pause or redesign; no speculative range figures |
| Road crash constraints conflict with flight mechanisms | Resolve architecture issue before styling promises |
| Flight-site/airspace availability is insufficient | Reassess customer mission, do not market door-to-door flight |
| Safety case cannot justify a safe failure response | Stop physical progression pending qualified advice |
| Cost far exceeds credible customer utility | Narrow the intended market or reconsider the concept |

## Scope of work that can responsibly be done now
Document mission scenarios, constraints, hazard questions, architecture options, reference sources and UX flows. **No hardware manufacture, operational flight, certification representation or capital commitment authorized.**

## Executive product decision
**CEO/CPO:** keep V1 as flagship **research priority**, not the first hardware build. **CTO/safety:** require credible, independently reviewed physics and hazard evidence before committing architecture. **CFO:** cash commitments €0 until separately approved. **CMO:** do not publish numerical claims or relabel illustrations as VELTARO prototypes.

**References:** EASA aircraft product certification https://www.easa.europa.eu/en/domains/aircraft-products ; EU vehicle approval Regulation 2018/858 https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32018R0858 . Neither source here determines the specific approval route.
