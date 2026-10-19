# VELTARO V1 — Mass/energy closure educational prototype
**Concept-stage tool; 19 October 2026. Not a vehicle model or flight authorization.**

The module `tests/v1-mass-energy-closure.mjs` performs an iterative toy calculation coupling battery mass and total mass. It takes a *hypothetical* dry mass, payload, assumed usable **pack-level** Wh/kg and flight phases defined by **a stated linear power-per-kg assumption**. The output includes whether it converged, battery mass, total mass and iteration count. Non-convergence is reported instead of inventing a viable craft.

The phase power coefficient is **not** an aerodynamic model. Real VTOL hover power is nonlinear in mass and rotor disc loading, and fixed-wing power depends on velocity, lift/drag and flight phase. The toy calculation deliberately has **no default V1 specifications**. Its reserve fraction is a mathematical example, **not** an airworthiness-compliant reserve. The unit tests use invented values solely to check numerical behavior.

## Next evidence needed before a real trade study
1. A qualified reviewer and agreed road-and-air mission with lawful sites.
2. Two independently sourced pack-level usable energy/power assumption ranges.
3. Structural and road safety mass budget; architecture-dependent thrust and lift models.
4. Distinct hover, transition, takeoff, climb, cruise, descent, landing and emergency scenarios.
5. Applicable legal reserve and certification constraints independently confirmed.
6. Sensitivity analysis with uncertainty, possible non-convergence and external review.

**Gate:** Never publish toy outputs as range, speed, cost, mass or flight readiness of V1. Do not test physical hardware based on this script.
