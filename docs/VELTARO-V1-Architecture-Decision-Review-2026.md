# VELTARO V1 — Architecture comparison decision review (October 2026)

**Decision: HOLD BOTH. No architecture selected.** Concept-stage desk review; not an aircraft/road design approval, risk acceptance, funding decision or basis for physical trials.

## What new evidence is available

The repository now contains four qualitative fault-tree outlines, eight common-cause dependency scenarios, eight conceptual interface boundaries, and proposed requirements linked to initial hazards. These **improve traceability but do not validate either architecture**. All are marked unreviewed. See [interface inventory](../engineering/v1-interface-inventory.csv), [common-cause register](../engineering/v1-common-cause-register.csv), and [existing trade study](VELTARO-V1-Architecture-Trade-Study-2026.md).

## Comparison by decision gate — not a performance ranking

| Gate | Runway / transforming-wing | Powered-lift / VTOL | Evidence status |
|---|---|---|---|
| Lawful route and operating sites | Requires demonstrated runway and legal road/air interfaces | Requires demonstrated vertical site/vertiport and legal road/air interfaces | **MISSING BOTH** |
| Mission payload and ground envelope | Road/flight/wing configuration definition needed | Road envelope plus lift system configuration needed | **MISSING BOTH** |
| Mass and energy closure | Runway, cruise and conversion effects need reviewed inputs | Hover/transition peaks, redundancy and thermal effects need reviewed inputs | **NOT VALIDATED** |
| Mechanical configuration safety | Wing/hinge/lock assurance is a central unique issue | Lift hardware protection and control failure are central unique issues | **UNREVIEWED** |
| Shared control/power separation | Common-cause risk across road and flight domains | Same issue, with lift consequences | **UNREVIEWED** |
| Regulatory and certification pathway | Applicable aircraft and road approvals need qualified review | Powered-lift and road approval pathway need qualified review | **UNRESOLVED BOTH** |
| End-to-end value and development cost | No defensible customer/cost comparison | No defensible customer/cost comparison | **UNKNOWN BOTH** |

**Why there is no winner:** existing studies are scenario lists and planning models, not comparable tested or source-validated evidence. A weighted score would imply precision that the evidence does not support.

## Next evidence packet, in priority order

1. A single jurisdiction and two **lawful reference missions** with the exact site types required (no unverified operating permission claim).
2. Common occupant/payload, road envelope and assumptions register shared by both candidates.
3. Separate sourced pack-level mass, peak-power and reserve ledgers with uncertainty and supplier-datasheet provenance.
4. Candidate-specific safety review: wing lock and runway constraints versus powered-lift loss-of-lift/hover constraints.
5. Independent review of hazards HZ-01..12, CCA-01..08 and interface IF-01..08.
6. A renewed architecture decision memo only after minimum evidence is documented and checked for comparability.

**Gate outcomes:** either may be rejected for infeasible legal operations or unfavorable engineering tradeoffs, both may remain on hold, or a narrowly defined study baseline may be recommended by reviewers. No selection is made in this document.

No supplier contact, external outreach, spending, website modifications, prototype/flight/road operation or certification assertions.
