# VELTARO V1 — Subsystem mass and power evidence budget, Rev 0
**19 October 2026 | Concept-only | No validated hardware, supplier quotes or design numbers**

## Why this exists
A total vehicle mass or battery estimate is meaningless without source-backed subsystem allocations. This register makes every missing input visible and prevents speculative range, performance or certification claims.

| Subsystem ID | Subsystem | Mass kg | Flight peak kW | Ground demand kW | Source / evidence | Current quality |
|---|---|---|---|---|---|---|
| SYS-01 | Road chassis, steering, brakes and occupant crash protection | TBD | N/A | TBD | Vehicle architecture and applicable approval scope | UNKNOWN |
| SYS-02 | Aviation primary structure (wings/rotors as applicable) | TBD | N/A | N/A | Load cases and materials study | UNKNOWN |
| SYS-03 | Flight motors, propulsors and power electronics | TBD | TBD | N/A | Architecture-specific performance and efficiency | UNKNOWN |
| SYS-04 | Battery pack incl. casing, protection and cooling | TBD | TBD | TBD | Usable pack-level energy and sustained/peak power | UNKNOWN |
| SYS-05 | Road propulsion and power electronics | TBD | N/A | TBD | Road duty-cycle study | UNKNOWN |
| SYS-06 | Flight controls, sensors and essential avionics | TBD | TBD | N/A | Fault analysis / applicable assurance scope | UNKNOWN |
| SYS-07 | Folding/conversion or rotor protection mechanisms | TBD | TBD | TBD | Geometry, load path and interlock study | UNKNOWN |
| SYS-08 | Cockpit, seats and HMI | TBD | TBD | TBD | Human factors and packaging study | UNKNOWN |
| SYS-09 | Thermal systems, wiring and auxiliary services | TBD | TBD | TBD | Thermal/electrical architecture and redundancy | UNKNOWN |
| PAYLOAD | Passengers, luggage and other payload | TBD | N/A | N/A | Explicit customer mission | UNKNOWN |
| MARGIN | System integration mass and uncertainty allocation | TBD | N/A | N/A | Explicit justification | UNKNOWN |

**N/A** means not a directly meaningful field, not confirmed zero. Entries remain TBD until traceable references and scope are provided.

## Data entry standard
For every non-TBD value: units, source URL/document, publication date, date accessed, applicability to our assumed mission, pack/component/system boundary, confidence level, reviewer, and sensitivity range. No numbers may be described as V1 specifications until independently reviewed.

## Interface constraints
- Total flight mass cannot be calculated independently of battery mass and required phase power.
- Usable pack energy and discharge power must both be checked; nominal cell energy alone is insufficient.
- Road crashworthiness and dimensional rules affect flight structure and configuration.
- Flight electrical loads, reserve constraints and thermal demands are coupled and mission dependent.
- One architecture may fail feasibility long before a second; we should report that rather than selectively choose better-looking numbers.

## Next research gate
Before introducing data-driven calculations: freeze a sample, legally plausible mission, define payload and airfield/vertiport access, identify credible subsystem benchmarks with comparable boundaries, and recruit appropriate expert review. Until then the existing toy script is **strictly a numerical-method check**.

No purchases, prototype tests, engineering certification, external emails or product image changes are authorized by this document.
