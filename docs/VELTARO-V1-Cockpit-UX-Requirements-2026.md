# VELTARO V1 — Cockpit UX requirements, Rev A
**19 October 2026 | Concept specification only, not certified avionics**

## Experience
A restrained premium cockpit that separates **driving**, **site arrival**, **aircraft configuration assessment**, **flight-ready review**, **flight**, and **maintenance lockout**. The interface must never imply it grants operational clearance or makes an unqualified operator a pilot.

| ID | Priority | User-facing behavior to research | Acceptance evidence |
|---|---|---|---|
| UX-01 | P0 | Show unmistakable current mode, not merely requested mode | Mode confusion study and reviewed state mapping |
| UX-02 | P0 | Give faults and safety alerts priority over luxury or entertainment content | Human-factors review, alarm prioritization |
| UX-03 | P0 | Distinguish regulatory/site/pilot approvals from onboard system checks | Wording reviewed by competent aviation/regulatory adviser |
| UX-04 | P0 | Provide clear conversion-abort and locked-out status *concepts* | Functional transition model and safety study |
| UX-05 | P1 | Present energy state with context; no unsupported remaining-range promises | Source-grounded energy estimation model |
| UX-06 | P1 | Keep road-mode driving information legible and low-distraction | Road HMI guideline review and representative user study |
| UX-07 | P1 | Make service and inspection conditions understandable | Maintenance workflow review |
| UX-08 | P2 | Luxury visual identity: measured contrast, legible typography, minimal surfaces | Static design-review checklist and accessibility test plan |

## Initial screen map
1. **ROAD** — road-specific status and relevant alerts.
2. **SITE CHECK** — advisory prompts for legally authorized departure facilities; not permission issuance.
3. **CONFIGURATION REVIEW** — evidence-dependent mechanical/electrical verification; no simulated certainty.
4. **FLIGHT REVIEW** — avionics/pilot/operator checks under future qualified review.
5. **FLIGHT** — architecture-dependent displays requiring dedicated aviation design.
6. **SERVICE REQUIRED** — explicit no-go / qualified maintenance review.

## Design constraints
- Screen aesthetics never substitute for physical control redundancy, pilot qualification or certified systems.
- Prototype screens are **non-operational mockups** only.
- No claim of autonomous takeoff, certified flight displays, artificial-intelligence piloting, or built hardware.
