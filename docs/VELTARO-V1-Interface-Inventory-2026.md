# VELTARO V1 — Interface inventory and independent safety review gates

**20 October 2026 — conceptual / UNREVIEWED.** This catalog lists **hypothesized** subsystem boundaries and dependencies; it is not a physical/electrical interface control document (ICD), wiring diagram, aircraft safety analysis or approved architecture.

The machine-readable inventory is [v1-interface-inventory.csv](../engineering/v1-interface-inventory.csv). Each of the eight entries maps to an existing DEP-01..08 and at least one existing CCA-01..08.

## Boundary review by architecture

| Interface group | VTOL | Transforming wing | Evidence needed |
|---|---|---|---|
| Electrical power | Candidate critical flight distribution | Candidate shared road/air distribution | Isolation and continuity argument, reviewed installation concept |
| Controllers and software | Road to flight controller boundary | Conversion to flight permission boundary | Failure containment, change configuration and independence analysis |
| Sensors | Road/flight state correlation | Lock/geometry status and permissive state | Diverse-source assumptions and verification plan |
| Structures | Lift propulsion mounts and vibrational environment, pending detailed inventory | Wing hinges, locking and structural load paths | Qualified load cases and structural review |
| Human interface | Site/pilot authorization and indicated readiness | Mechanical locks, conversion and flight permission | Human factors and operation-state review |
| Maintenance | Energy isolation, diagnostics | Stored energy and access to moving structures | Lockout procedure and zonal review |

## Review gates (proposed; no gate complete)

- **IG-0: Owner and system boundary** — identify the owner, independent reviewer, architecture version and intended jurisdiction.
- **IG-1: Interface definition** — specify connector or physical load path, functions, operating states, fault propagation, units and configuration baseline.
- **IG-2: Independence assessment** — document common-cause and zonal dependencies, separation arguments, sensor/common-compute effects and unverified assumptions.
- **IG-3: Evidence planning** — connect hazard IDs and requirements to qualified analysis/test artifacts and entry criteria.
- **IG-4: Independent disposition** — external qualified reviewers decide whether more evidence is required. No positive disposition is implied by the inventory.

## Missing essentials

No selected propulsion, control or power hardware; no layout, harness routing, critical bus definition, protective coordination, failure rates, load cases, validated safe-state transitions or human factors trials. All entries stay **Unreviewed**, and no road or flight operation is authorized.

## Next step

Develop an ICD draft only for the architecture chosen after feasibility comparison, with interface owners, measurable parameters and review criteria. Do not equate complete documentation with verified safety.
