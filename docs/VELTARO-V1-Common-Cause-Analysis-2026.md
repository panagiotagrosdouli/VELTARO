# VELTARO V1 — Common-cause failure analysis, concept v0.1

**20 October 2026 · DRAFT · ALL UNREVIEWED**

This is a qualitative common-cause/common-mode dependency screening for a dual-use **road + flight** concept. It is not a verified safety analysis, quantitative reliability model, certification artifact, prototype test result, or approval to operate.

## Scope and method

Review shared **power, software, computing, sensing, physical installation, thermal management, user interface and maintenance** dependencies. Ask whether a single failure, environmental condition, design error or organizational mistake can defeat several nominally separate safeguards at once.

Eight initial records are maintained in [v1-common-cause-register.csv](../engineering/v1-common-cause-register.csv). Each references existing hazard and safety-requirement IDs, especially **HZ-12 / REQ-SAF-12**.

## Key dependencies to investigate

- **Road/air propulsion inhibition:** determine if a shared controller, relay or power bus could defeat both nominally distinct permissions.
- **Power resilience:** a duplicated computer is not independent if both rely on the same pack, harness, thermal path or power switching.
- **Sensor diversity:** two agreeing sensors may share calibration, software or environmental vulnerability; independence must be demonstrated, not assumed.
- **Transforming structure:** redundant lock indications are insufficient if a single mount, hinge or maintenance step can undermine them together.
- **Crew displays and authority:** cockpit statuses must distinguish requested, checked, authorized and mechanically secured configurations; the screen cannot confer legal flight permission.
- **Maintenance and updates:** a shared software release or incorrect service procedure can cause multiple protective layers to fail simultaneously.

## Assurance sequence (all pending)

1. Freeze a **specific candidate architecture**, interfaces and operating assumptions before declaring independent systems.
2. Identify common-mode initiators, shared locations and dependencies in block diagrams.
3. Assess zonal/installation risks and candidate segregation on selected geometry; consider regulatory and environmental effects.
4. Trace risk mitigations to independently reviewed specifications, evidence owners and verified procedures.
5. Submit detailed architecture-dependent common-cause assessment to qualified aircraft, vehicle, electrical, software and systems-safety reviewers.

### Boundary

This register deliberately contains **no probabilities, test success claims, acceptable-risk determinations, approved interlock design or performance limits**. All hazards remain open. Component datasheets, high-level flowcharts or dashboard demonstrations do not prove independence.

## Next engineering gate

Produce an **interface-dependency diagram** for separate VTOL and transforming-wing concepts. Record assumptions, evidence gaps and test/analysis owners before quantitative work.
