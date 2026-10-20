# VELTARO V1 — Battery & propulsion source evidence packet v0.1

**20 October 2026 — PUBLIC LITERATURE / NO VELTARO MEASURED HARDWARE**

This packet separates **verifiable publication metadata and qualitative scientific findings** from actual system-specific test measurements. The source and missing-data records are machine-readable in [the evidence JSON](../engineering/v1-battery-propulsion-evidence.json).

## Reviewed open research pages

- NASA Glenn, *Battery Cell-to-Pack Scaling Trends for Electric Aircraft* (2021), https://ntrs.nasa.gov/citations/20210017488 — shows pack energy density is sensitive to structural, thermal and operating margins; cell-to-pack conversion is not universally linear. **Not a VELTARO pack measurement.**
- NASA Ames, *Impact of Technology and Mission Variations on NASA Advanced Air Mobility Concept Vehicles* (June 2025), https://ntrs.nasa.gov/citations/20250006187 — studies installed usable Wh/kg, system/rotor/motor efficiency and mission variations across NASA concept aircraft. **Not a validated roadable aircraft or selected VELTARO propulsion system.**
- *NASA concept vehicles and the engineering of advanced air mobility aircraft*, The Aeronautical Journal, https://www.cambridge.org/core/journals/aeronautical-journal/article/nasa-concept-vehicles-and-the-engineering-of-advanced-air-mobility-aircraft/AA7E668D759491B1889299819A2F2715 — background context only; do not treat high-level illustrative battery figures as a commercial pack data sheet.

## Missing V1 measurement records (all unresolved)

| ID | Measurable parameter | Unit |
|---|---|---|
| BATT-01 | Installed **usable pack** specific energy | Wh/kg |
| BATT-02 | Continuous discharge at declared SOC and temperature | kW |
| BATT-03 | Peak discharge with permitted time interval | kW, s |
| PROP-01 | VTOL hover, climb, transition and cruise phase electrical demand | kW |
| PROP-02 | Transforming-wing takeoff, climb and cruise electrical demand | kW |
| THERM-01 | Pack integration, thermal rejection and containment | W and operating conditions |

## Acceptance requirements

For any numeric claim, preserve original document/test ID, publication or test date, units, equipment configuration, defined ambient/SOC/duty cycle, uncertainty, independence of reviewer and applicability to a selected architecture. A marketing cell Wh/kg rating **must never** populate usable **installed pack** Wh/kg. Literature findings may justify *how to model a question* but **not a V1 performance figure**.

All six records intentionally have `null` values. No external supplier outreach, purchases, powertrain selection, performance claim, approval, or independent safety verification is implied. **Architecture decision: HOLD BOTH.**
