# V1 dual-track numerical comparison — concept fixtures
**19 October 2026. No measured V1 system inputs.**

Run `node tests/v1-concept-comparison.mjs` to exercise the independent toy **mission power/energy** and **battery/total-mass closure** checks for both track A (winged) and track B (VTOL).

Both sets of numbers in the executable are **invented test fixtures**. The tests intentionally construct a track B power-limit failure while track A passes its illustrative power check. This is **not evidence** of a superiority of A, nor of actual feasibility of A or B. Different mission phases, pack parameters, rotor and wing aerodynamics, crashworthy road hardware, site permissions, safety cases and thermal limits remain unevaluated.

Results are explicitly tagged `ILLUSTRATIVE_ONLY`, with no selected architecture and no engineering validation. Do not publish any fixture output as actual VELTARO range, battery capacity, MTOW, payload, speed, cost or certification readiness. The mass closure and phase ledger presently use independent fictional assumptions and therefore **do not enforce physical consistency between them**; such coupling needs sourced data and expert review.
