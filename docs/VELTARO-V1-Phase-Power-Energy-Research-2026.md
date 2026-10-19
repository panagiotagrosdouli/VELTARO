# VELTARO V1 — Phase power vs energy research check
**19 October 2026 — educational calculation only, not a vehicle specification**

The executable `tests/v1-phase-energy-power.mjs` separates **energy capacity** (kWh) from **continuous and assumed peak power** (kW). The mission consists of user-supplied fictional phase duration/power pairs; results flag each check independently.

Tracks A and B remain active: A needs separate takeoff/climb/cruise/landing assumptions, B needs hover/transition/cruise/landing assumptions. This tool provides no aerodynamic loads, system efficiency, actual battery discharge curves, certification reserves, rotor sizing, verified masses, or permissible peak discharge duration. The boolean `peakOnly` is a toy tagging mechanism and **must not be taken as proof that a real pack can maintain peak output over a specified duration**.

No battery mass, route range, safety, physical feasibility, legal authorization or product readiness can be inferred from this code. Before any real comparison, source mission-phase power and pack-level usable energy/temperature/SOC/aging limits and obtain qualified independent review. Example values exist solely as software regression fixtures.
