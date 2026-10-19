# VELTARO V1 — Systems Architecture Rev A
**19 October 2026 | Concept study | Not a build specification or certified safety design**

## System boundary
The product hypothesis combines road-legal operation and separately authorized aviation use. The mission, vehicle category and aircraft configuration are not yet selected. Architecture A (VTOL) and B (folding fixed wing) remain **unresolved alternatives**.

## Level 1 subsystem map
| System | Core responsibility | Critical interfaces | Definition of first research deliverable |
| --- | --- | --- | --- |
| SYS-01 Road platform | Occupant protection, braking, steering, road energy use and dimensional envelope | Structure, energy, cockpit, mode logic | Constraint register tied to target jurisdiction |
| SYS-02 Flight propulsion | Safe thrust generation during defined flight phases | Energy, flight controls, structure | A/B architecture-specific power and failure assumptions |
| SYS-03 Energy system | Storage, distribution, isolation and thermal management | Road drivetrain, flight propulsion, cockpit, safety | Pack-level energy/power/mass allocation with uncertainty |
| SYS-04 Airframe and conversion | Structural loads and flight/road geometric configuration | Road chassis, actuators, sensors, flight controls | Configuration options and failure questions |
| SYS-05 Flight controls | Pilot guidance, sensors, stability and control | Propulsion, conversion, cockpit | Preliminary control-authority / failure questions |
| SYS-06 Road/flight mode management | Distinguish road, site inspection, conversion, flight readiness, flight and safe return | All major systems | Read-only functional state model; hazardous transitions listed |
| SYS-07 Cockpit and human factors | Clear state, warning priority, workload and accessible emergency communication | Flight controls, road controls, mode manager | Static interaction wireframes and usability questions |
| SYS-08 Safety and maintainability | Hazard identification, inspection concept, fault record and lockout | All major systems | Preliminary hazard register and service questions |
| SYS-09 Operational environment | Authorized departure/landing infrastructure and qualified operator | Mission, regulatory pathway, navigation | Location-specific constraints research — no assumed permissions |

## Interface contracts to investigate (not software commands)
- **Road → Flight-ready:** only at an appropriate facility, after validated configuration and operator/legal readiness. The cockpit cannot itself grant permission to fly.
- **Energy → Propulsion:** both steady and peak power capability must be evaluated with pack thermal limits and fault behavior. Energy capacity alone is insufficient.
- **Conversion → Structure:** examine positive load paths and mechanical locks, independent sensing, inspection, and what failure leaves the system safe.
- **Flight controls → Human interface:** distinguish warnings, degraded status, and action required; no unverified autonomous safety claims.
- **Safety → Maintenance:** identify conditions that lock out operation until a qualified inspection.

## Engineering trade-off priorities
**P0:** legal mission, total mass-energy closure, flight failure modes, compatible road crash structures, feasible infrastructure.
**P1:** road/flight conversion mechanism, energy thermal limits, human workload and maintenance.
**P2:** luxury cabin finish, non-safety-critical UI personalization and aesthetics.

No hardware interfaces, detailed operating procedures, pilot instructions or component suppliers are specified; competent aerospace and automotive professionals must validate further work.

## Deliverable acceptance gate
Each subsystem has an accountable reviewer role, traceable assumptions, physical units as appropriate, uncertainty, likely failure modes and applicable regulations to research. If data is absent, status = UNKNOWN, never 'pass'.
