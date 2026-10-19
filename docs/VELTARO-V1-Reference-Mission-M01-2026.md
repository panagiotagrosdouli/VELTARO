# VELTARO V1 — Reference Mission M-01 and Fair Comparison Protocol
**19 October 2026 | Research scenario, not vehicle performance or operational authorization**

## Mission purpose
Evaluate whether a proposed dual-road/air experience is even meaningful under **real infrastructure constraints**. The initial mission is a trip between two currently unspecified locations involving: origin road leg → designated legal air departure facility → authorized flight segment → designated legal arrival facility → destination road leg.

No assumption is made that an aircraft can depart a street, park anywhere, or obtain flight authorization through a software button.

## Common comparison conditions
| Field | M-01 baseline | How to validate |
|---|---|---|
| Geography and legal jurisdiction | TBD | Select an actual pair of locations and relevant rules |
| Origin and destination | TBD | Specific meaningful customer mission |
| Number of occupants/payload | TBD | User need, including luggage |
| Road legs | TBD | Geographically plausible permitted roads |
| Departure/arrival sites | TBD | Legal runway/VTOL site access by architecture |
| Flight distance | TBD | Mission geometry and alternate options |
| Weather / wind | TBD | Conservative operational envelope supported by evidence |
| Reserve / diversion assumptions | TBD | Applicable aviation framework; qualified review |
| Battery pack usable Wh/kg | TBD | Cited pack-level assumptions, not cell values |
| Passenger/ground/air structure mass | TBD | Traceable per-subsystem breakdown |
| Duty cycle, transition and maintenance | TBD | System integration and operator workflow |
| Cost and time | TBD | Resource estimates including ground-air transfer and servicing |

**Why TBD:** Manufacturing product claims from arbitrary numbers is misleading. A separate demonstrative numerical scenario could show calculation mechanics, but would not validate V1.

## Architecture comparison: no predetermined winner
| Criterion | Electric VTOL hypothesis | Folding fixed-wing runway hypothesis |
|---|---|---|
| Departure facility | Suitable authorized takeoff/landing site required | Suitable runway and facilities required |
| Hover / vertical takeoff power | Required to study where relevant | Not a hover requirement |
| Road integration | Rotor protection and ground/air structures | Folding mechanism and lock integrity |
| Typical critical question | Power, disc loading, transition and failures | Wing folding, runway access, takeoff/landing performance |
| Regulatory route | Requires qualified determination | Requires qualified determination |
| Engineering verdict | **Open** | **Open** |

## Engineering sprint 01 — required evidence
1. Select one mission that existing authorized infrastructure can support; do not assert approval until verified.
2. Identify two independent pack-level battery sources and engineering/operational limitations.
3. Construct a traceable subsystem mass ledger for each architecture.
4. Use the educational model in `tests/v1-sensitivity.mjs` only for transparent sensitivity checks.
5. Carry out failure-mode and regulatory screening with appropriately qualified input.
6. Hold an explicit decision gate: compare feasibility evidence, do not choose based on visual appeal.

## Acceptance criteria
Deliverables are complete only when every assumption has units, source, date and confidence, calculations account for coupling, safety risks are stated, and a qualified reviewer has been identified where needed. **Nothing in this mission protocol authorizes construction or testing.**

## Next decision
The founder may choose the target jurisdiction and an actual customer mission once the constraints are understood. Until then, M-01 is a structured research specification, not a scored market opportunity.
