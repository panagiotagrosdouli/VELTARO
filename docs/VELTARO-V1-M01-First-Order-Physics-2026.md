# VELTARO V1 — M-01 first-order hover and wingborne power study

**6 November 2026 · Research equations Rev 0.1 · UNVERIFIED CONCEPT · HOLD_BOTH.**

This module is a **first-order physics teaching/research tool**, not a flight simulator, an aircraft sizing result, a battery acceptance test or a road/air certification package. All actual VELTARO mass, rotor area, wing geometry, aerodynamic coefficients and electrical-system performance inputs remain **null** in the [M-01 research input register](../engineering/v1-m01-physics-research-inputs.json).

## Reproducible code

From the repository root with Node.js 22:

```bash
node engineering/v1-m01-run-physics-power-bounds.mjs
node tests/v1-m01-physics-power-bounds.mjs
```

The runner returns **MISSING_OR_UNASSESSED** for each architecture, with null numerical outputs. The tests alone use invented arithmetic inputs; they are **not VELTARO specifications** or empirical design bounds.

## (A) VTOL: ideal out-of-ground-effect hover

For a hypothetical isolated, unobstructed ideal actuator disk, steady hover thrust balances weight:

\[
T = mg, \qquad v_i = \sqrt{\frac{T}{2\rho A}}
\]

\[
P_{\mathrm{hover,ideal}}=Tv_i=\frac{(mg)^{3/2}}{\sqrt{2\rho A}}.
\]

Here \(m\) [kg] is the flight configuration mass, \(g=9.80665\) [m/s²], \(\rho\) [kg/m³] air density, \(A\) [m²] the total effective rotor-disk area, \(T\) [N] thrust, \(v_i\) [m/s] ideal induced velocity and \(P\) [W] ideal induced power. The code returns kW after dividing by 1000.

**Caution:** this is an *ideal induced-power component*, not the total real shaft/electrical load. Rotor profile power, induced-power losses, inter-rotor interactions, blade tip losses, downwash effects, control authority, ground effect, thrust margins and vehicle/road packaging are not included. Effective area is **not** necessarily the sum of physical disk areas when rotors overlap or interfere. The simplified momentum theory is not a VTOL transition model.

For *explicitly hypothetical* phase arithmetic, an assumed hover rotor figure of merit \(FM\) and electrical drivetrain efficiency \(\eta_e\) can be introduced:

\[
P_{\mathrm{elec,assumed}}=\frac{P_{\mathrm{hover,ideal}}}{FM\,\eta_e}+P_{\mathrm{aux}}.
\]

\(FM\) in this form is an assumed ratio of ideal induced hover power to actual shaft power for the **specific** rotor-system definition; neither \(FM\), \(\eta_e\), rotor area nor auxiliary demand is validated for VELTARO.

## (B) Transforming-wing: ideal steady wingborne level flight

Only for nonaccelerating *level*, wing-supported flight:

\[
L\approx W=mg,\quad D=\frac{mg}{L/D},
\qquad P_{\mathrm{cruise,ideal}}=DV=\frac{mgV}{L/D}.
\]

\(V\) [m/s] is true airspeed; \(L/D\) is the assumed aerodynamic lift-to-drag ratio at the chosen flight condition; \(D\) [N] is aircraft drag. An associated required lift coefficient follows from dynamic pressure \(q=\rho V^2/2\) and wing reference area \(S\) [m²]:

\[
C_{L,\mathrm{required}}=\frac{mg}{qS}.
\]

**Crucial boundary:** a computed \(C_L\) does **not** prove that a real wing can produce it. We have **no reviewed drag polar or \(C_{L,\max}\)**, no stall or control-envelope verification, no takeoff/climb/landing analysis, no wing folding/locking loads and no runway data.

For a hypothetical electrical power calculation with propulsive efficiency \(\eta_p\) and electrical drivetrain efficiency \(\eta_e\):

\[
P_{\mathrm{elec,assumed}}=\frac{P_{\mathrm{cruise,ideal}}}{\eta_p\eta_e}+P_{\mathrm{aux}}.
\]

Electrical phase energy, **only for an explicitly assumed duration** \(t\) in hours, is \(E_{\mathrm{phase,assumed}}=P_{\mathrm{elec,assumed}}[\mathrm{kW}]\cdot t[\mathrm h]\) in kWh. These values are **not** pack-sizing results and do not include reserve, thermal constraints or measured pack continuous/peak kW.

## Machine-readiness and acceptance rules

The [pure computation module](../engineering/v1-m01-physics-power-bounds.mjs) has separate functions `idealHover`, `idealWingLevelFlight` and `hypotheticalElectricalPhase`. All dimensional inputs and efficiencies must be finite and satisfy relevant physical-domain inequalities. Invalid values or overflow throw errors rather than silently becoming zero.

The `auditM01PhysicsInputs` gate refuses to calculate when either architecture lacks essential parameters, when the study decision is not HOLD_BOTH, or when the architecture set is altered. Even a fully populated fictitious case must declare **EXPLICIT_HYPOTHETICAL_INPUTS**, source/configuration/conditions metadata and `NO_VELTARO_PERFORMANCE_TRANSFER`. Successful arithmetic is labeled **HYPOTHETICAL_CALCULATED_NOT_VALIDATED**. The API **never** returns readiness for flight or authorizes cross-architecture ranking.

The previously created [architecture-specific mass ledgers](VELTARO-V1-M01-Mass-Ledger-2026.md) are the correct future source of *separately justified* VTOL and transforming-wing mass allocations. Their current \`null\` values do **not** feed this physics model. Likewise, unrelated NASA X-57 and VS-210 batteries may be used only as external research context, not as flight-pack evidence for VELTARO.

## Source basis and limitations

- **NASA Ames, Wayne Johnson, NDARC: NASA Design and Analysis of Rotorcraft Theory, Appendix 1 (March 2016), Section 12-4 and 12-5**, <https://ntrs.nasa.gov/api/citations/20160012474/downloads/20160012474.pdf>. Provides the ideal induced velocity/power relationships, and shows why real rotor induced/profile losses and interactions require further modeling.
- **NASA Glenn Research Center, Lift to Drag Ratio**, <https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/lift-to-drag-ratio/>. Explains steady flight force balance, \(L/D\), lift, drag and aerodynamic coefficient dependencies.

The equations are standard first-order relations; the sources do **not** provide VELTARO-specific geometric, aerodynamic or installed power-system data.

### What's missing before any engineering assessment

- Legal and physically plausible M-01 route, operating weather/air-density range, suitable departure/arrival facilities and operating permissions.
- Independent architecture-specific subsystem masses, road/flight packaging, rotor disks/overlap or wing dimensions/load cases.
- Rotor performance maps, figure of merit across actual conditions, flight-control and motor efficiencies; alternatively reviewed wing polars and propulsive efficiencies versus speed and angle of attack.
- Mode conversion, takeoff, climb, hover/transition, cruise, landing, contingency and emergency flight phases.
- Installed **usable** battery pack energy, sustained/peak electrical power over time/temperature/SOC/age, reserve rules and structural/thermal/hazard evidence.
- Independent qualified engineering, safety, automotive and aviation regulatory review.

**Result: HOLD_BOTH.** No actual VELTARO numerical aircraft power, range, speed, flight feasibility, certification or hardware test is claimed or approved.
