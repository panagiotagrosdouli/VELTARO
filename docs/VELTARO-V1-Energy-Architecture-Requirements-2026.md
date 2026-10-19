# VELTARO V1 — Energy architecture requirements, Rev A
**19 October 2026 | Research-only requirements — no selected battery chemistry, rating or supplier**

## Intended boundary
Investigate integrated road/flight energy storage, electrical power distribution, isolation, monitoring, thermal protection, mechanical containment and maintenance. The shared-storage option is a hypothesis; **separate road/flight energy architectures remain possible**.

| ID | Priority | Question/requirement | Verification evidence |
|---|---|---|---|
| EN-01 | P0 | Bound flight mission energy, worst power phases and required reserves separately | Time-phase traceable calculation and qualified reserve review |
| EN-02 | P0 | Account for full usable **pack-level** specific energy, not cell-level marketing data | Traceable manufacturer/literature sources, dates, uncertainty |
| EN-03 | P0 | Check instantaneous and sustained power against thermal constraints | Appropriate source curves and operating envelope assessment |
| EN-04 | P0 | Consider electrical fault isolation, single-failure cases and emergency response | Initial electrical safety/fault analysis |
| EN-05 | P0 | Address thermal runaway propagation and occupant protection | Qualified safety and packaging study |
| EN-06 | P1 | Separate road traction, flight propulsion, controls and essential loads | Functional power allocation and contingency analysis |
| EN-07 | P1 | Define charging, post-flight inspection and service safety concepts | Infrastructure and maintenance requirements |
| EN-08 | P1 | Recalculate mass-energy coupling rather than assuming a fixed battery mass | Converged iteration with uncertainty bounds |
| EN-09 | P2 | Compare common pack vs partitioned system at architecture level | Trade study with failure/common-cause analysis |

## Unresolved architecture decisions
Voltage, propulsion chemistry, thermal system, pack geometry, number of energy buses, redundancy, charging connectors and quantitative performance are **TBD**; choosing numerical specifications without source-backed loads would be misleading.

## Release gate
Do not order cells/packs, represent performance or build/test hardware from this preliminary document. Require qualified battery, aviation electrical and safety review.
