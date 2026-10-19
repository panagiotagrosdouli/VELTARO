# VELTARO V1 — First-order mass and energy model v0.1
**19 October 2026 · Research tool only · All example values hypothetical, NOT V1 specifications**

## Purpose
Compare the *sensitivity* of VTOL versus runway-capable fixed wing to mission choices. This simplified model is not a vehicle design, flight prediction, energy reserve compliance demonstration or safety assessment. It deliberately requires the analyst to enter their own assumptions.

## Model
Mass bookkeeping:
`m_total = m_payload + m_structure + m_road + m_flight + m_propulsion + m_battery + m_other`.
For a defined battery **usable** specific energy `e_usable` (Wh/kg), battery mass lower-bound is `E_required / e_usable`, before accounting for power limits, battery casing, usable state of charge, longevity and other safety margins. Never use cell-only density as pack-level usable density.

For a simplified hover phase, the ideal actuator-disc momentum bound is `P_ideal = (m*g)^(3/2) / sqrt(2*rho*A)`, with `A` total effective rotor disc area, `rho` air density; actual electrical power is *higher*, due to induced, profile, drivetrain and other losses. This relation assumes an ideal hover condition and cannot be directly applied to transition or wing-borne flight.

For fixed-wing cruise at known speed `V`, mechanical propulsive power approximation is `P_prop = (m*g*V)/(L/D)`. Electrical input power increases with losses; takeoff, climb, acceleration and reserves require separate phase modeling. **No assertion** that either architecture is superior follows from these formulas alone.

Compute energy from time-phased electrical input power: `E_mission = sum(P_phase[kW] * t_phase[h])`, in kWh; explicitly include reserve `E_reserve` determined later by qualified review. `E_required = E_mission + E_reserve`.

## Data quality requirements
- Each input must state **value / unit / source / date / confidence / applicable regime**.
- Must model road structures and crash requirements, full-pack integration mass, flight propulsion, aviation safety equipment and folding/transition mechanisms.
- Coupled iterate battery mass and total takeoff weight until convergence (or declare no feasible solution).
- Atmosphere, wind, flight envelope, rotor disc loading, L/D, control assumptions and landing infrastructure all matter.
- Do not convert a single toy-case result into a predicted road-legal aircraft performance figure.

## Decision gate
Stop and request qualified aerospace review if basic mass-energy closure fails, failure scenarios are unresolved or approval route has not been scoped. No testing or prototype work is authorized.
