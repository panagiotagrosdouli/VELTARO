# VELTARO V1 — R07 preliminary hazard register (20 October 2026)

**Status: CONCEPT / ALL HAZARDS UNREVIEWED.** This is a starting point for qualified system-safety engineering, **not** a preliminary system safety assessment signed off for development, flight testing, driving, certification, or use by the public. Both VTOL and transforming fixed-wing concepts remain under study.

## Purpose
Record plausible top-level hazards across **road, site authorization, conversion, flight, landing and maintenance**. The machine-readable source is [hazard-register.csv](hazard-register.csv), with 12 initial entries and no claims of closed risks.

The severity words **Catastrophic/Hazardous** are *illustrative prioritization labels only*, not formal ARP4761 classification or quantitative probabilities; the team has not established a classification scheme or verified any safety targets.

## Key review questions

1. Can flight propulsion remain physically isolated during road operation and conversion? Identify shared controller and bus common-cause paths.
2. How can conversion and mechanical lock evidence be made trustworthy without a single unchecked sensor?
3. What aircraft-specific loss-of-lift or runway risks distinguish VTOL and fixed-wing configurations?
4. How should battery thermal, electrical and structural failure evidence be gathered without assuming vendor datasheets equal system validation?
5. How do the cockpit and authorization workflow prevent *software UI* from being mistaken for regulatory permission?
6. Which events trigger restricted mode, operator alerts and maintenance lockout instead of permissive transitions?

## Entry criteria before changing any row to 'Reviewed'
- Named qualified independent reviewer and date.
- Traceable engineering source or analysis ID, not only narrative text.
- Architecture applicability and operational assumptions.
- Failure scenario and risk classification method documented.
- Candidate controls, test method, responsible owner, open issues and record of reviewer findings.

**No entry may be marked safe, accepted or mitigated from this file alone.** This is a desk-study register. Actual acceptance requires formal safety assessment, documented verification and regulatory guidance appropriate to the selected architecture and jurisdiction.

## Next actions
- Map each hazard to formal system requirements, state machine transitions and proof artifacts.
- Perform FHA/PSSA planning with qualified aerospace/system safety professionals.
- Develop separate preliminary fault trees for propulsion loss, conversion locking and power failures.
- Update `docs/VELTARO-V1-Engineering-Backlog-2026.md` only after independent review. R07 remains **pending**.
