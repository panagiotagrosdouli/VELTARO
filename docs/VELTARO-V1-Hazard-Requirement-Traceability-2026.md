# VELTARO V1 — Hazard-to-requirement traceability v0.1

**Concept research only.** This map proposes candidate safety requirements and future assurance evidence for the 12 unreviewed hazards. No requirement is verified, no hazard closed, and nothing here authorizes driving, flight, fabrication or public trials.

Source: [initial hazard register](../engineering/v1-hazard-register.csv). Machine-readable matrix: [traceability CSV](../engineering/v1-hazard-requirement-trace.csv).

## Candidate assurance gates

- **GATE 0 — Traceability completeness:** each hazard has a stable ID, linked requirement and named evidence type. This is a documentation check only.
- **GATE 1 — Independent hazard review:** qualified domain reviewer identifies scope, severity framework, foreseeable misuse, causal chains and common causes.
- **GATE 2 — Architecture-level evidence:** verified independence assumptions, configurations, safe states and failure management assessed separately for VTOL and transforming fixed wing.
- **GATE 3 — Testability:** each requirement has acceptance criteria, quantitative limits justified for the selected vehicle, and a qualified verification plan.
- **GATE 4 — Demonstrated compliance:** traceable test/analysis results independently assessed. No gate may be claimed passed merely by filling this matrix.

## Blocking deficiencies

No certified vehicle architecture; no agreed jurisdiction-specific regulatory basis; no selected energy system; no independent reviewer; no safety analysis with confirmed severity/probability criteria; no valid acceptance thresholds; no verified tests. Battery datasheets or simulated outputs alone cannot close vehicle hazards.

## Next engineering work

1. Review hazard initiating events and consequence chains with experts.
2. Define functional and physical safety boundaries at the road/air interfaces.
3. Perform separate aircraft-specific preliminary system safety assessments.
4. Attach cited test or analysis artifacts to each requirement only after evidence is obtained.

The 12 entries remain **Proposed - unverified**. Website images and concept demonstrations are not safety evidence.
