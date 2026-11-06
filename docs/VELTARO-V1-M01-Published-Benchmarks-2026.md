# VELTARO V1 — M-01 published quantitative benchmarks, research release 0.1

**6 November 2026 | EXTERNAL BENCHMARKS ONLY | Not VELTARO vehicle data, design inputs, certification evidence, battery qualification, or mission authorization.**

## Purpose

This register separates **published numbers for other aircraft** from VELTARO's still-unknown mass, power, installed usable pack energy, flight route, reserve and approval conditions. A research paper or a successful arithmetic test does not validate transferability to a roadable flying vehicle.

Run from the repository root using Node.js 22:

```bash
node engineering/v1-m01-audit-published-benchmarks.mjs
node tests/v1-m01-published-benchmarks.mjs
```

Both source identities, quantitative observations, asset configurations, original units, reporting status and relevant conditions are defined in [the benchmark register](../engineering/v1-m01-external-benchmarks.json). There are **18 separately attributed observations**, across three references. The audit checks metadata and consistency but sets `acceptableVeltaroDesignValues: false` **unconditionally**. No extraction into `v1-m01-common-mission.json` or the illustrative M-01 model occurs.

## Literature data and comparison boundaries

| Source/configuration | Datum in source | Meaning; critical boundary |
|---|---:|---|
| NASA X-57, cells | 225 Wh/kg | Quoted reference cell-level figure, **not installed** pack |
| NASA X-57, full battery pack | 149 Wh/kg | Quoted pack-level specific energy, not an established VELTARO usable-window number |
| NASA X-57 Mod II mission model | approximately 130 Wh/kg | **Modeled available specific energy** over 95% to 20% state of charge at representative discharge; separate paper/model; not a regulatory reserve |
| VS-210, 24S1P test pack | 13.5 kg; 1.95 kWh; 144.7 Wh/kg | Reported **nominal** bench-pack capacity and mass, not mission-usable pack capacity |
| VS-210, 24S1P electrical tests | 110 A at 5C; 235 A at 10.68C | Ground tests, 15–23°C; high rate reduces delivered capacity to 74.2% of nominal |
| VS-210, 24S1P thermal test | 55.1°C | Max sensor temperature at 10.68C; unmeasured tab/busbar hot spots; not a generic thermal guarantee |
| VS-210, 24S4P onboard system | 43.8 kg; 7.81 kWh; 178.4 Wh/kg | **Nominal** onboard energy, different cooling/pack architecture from bench test |
| VS-210 test flight | approximately 140 kg takeoff mass; 8.2 min loaded flight | Six short takeoff–hover–landing events; limited flight profile and **no synchronized current, energy and temperature** data |
| VS-210 airframe specification | 210 kg MTOW | Quadrotor reference **maximum** mass, different from actual flight mass and from any VELTARO road/air configuration |

The 24S1P and 24S4P assemblies are **different assets**, not interchangeable pack tests. The source calculates some 24S4P power/current capability by multiplying 24S1P results; the audit deliberately does **not** copy that extrapolation as a validated onboard continuous/peak power envelope.

### Arithmetic checks (not an uncertainty analysis)

- VS-210 24S4P: 88.8 V × 88 Ah / 1000 = **7.8144 kWh**, consistent with reported rounded 7.81 kWh.
- VS-210 24S4P: 7.81 kWh / 43.8 kg ≈ **178.3 Wh/kg**, consistent with reported rounded 178.4 Wh/kg.
- VS-210 24S1P: 1.95 kWh / 13.5 kg ≈ **144.4 Wh/kg**, consistent with reported rounded 144.7 Wh/kg.
- X-57's reported **225 → 149 → approximately 130 Wh/kg** refer to different cell/pack/available-energy boundaries. **Do not** treat these ratios as universal conversion factors, even between aircraft studies.

## Provenance and interpretation

1. **NASA Glenn (2021):** Chin et al., [*Battery Cell-to-Pack Scaling Trends for Electric Aircraft*](https://ntrs.nasa.gov/citations/20210017488), PDF p. 2. Cell-to-pack losses depend on structure, thermal management, containment and system definition; 225 and 149 Wh/kg are quoted X-57 values. They are not in-house VELTARO measurements.
2. **NASA Langley (2019):** Borer et al., [*Design and Performance of a Hybrid-Electric Fuel Cell Flight Demonstration Concept*](https://ntrs.nasa.gov/citations/20190033418), PDF p. 11. X-57 Mod II mission model uses approximately **130 Wh/kg** for a battery available-energy definition based on **95–20% SOC** at representative discharge. It is a modeling input, not a measured VELTARO system parameter.
3. **Yu et al., *Batteries* 12(9), 317 (2026):** [*Design, Fabrication, and In-Flight Demonstration of a 24S NCM Battery System for an eVTOL Aircraft*](https://doi.org/10.3390/batteries12090317), Tables 1, 3, 6, 9 and Discussion/Conclusions. The short quadrotor test and 24S1P ground data are informative but do not establish safety, lifespan, roadability or power performance of VELTARO. The authors include employees and management of the aircraft developer; treat applicability claims and conflicts disclosures explicitly.

### What "uncertainty" means here

A number from a study is **not** a statistically defensible lower or upper design bound for a different configuration. The register labels whether each entry is nominal, measured, quoted from a separate reference, or used in another paper's mission model. Configuration and environmental conditions are attached per datum. Where numeric measurement uncertainty is not available **in this register**, it is not invented; no confidence interval is inferred from the published values.

The existing M-01 toy sensitivity multipliers (80/100/120%) are **hypothetical perturbations**, not a measured error distribution and not a way to substitute published X-57 or VS-210 numbers directly into an aircraft sizing model.

## Current block: no VELTARO M-01 design values

The register deliberately keeps `installedUsablePackWhPerKg`, `continuousPackPowerKW`, `peakPackPowerKW`, `architectureSpecificEmptyMassKg`, `approvedMissionRangeKm` and related fields **null**, with `operationalAuthorization: false`, `selectedArchitecture: null` and `decision: HOLD_BOTH`. These flags are enforced by tests.

Before ranking a VTOL or transforming-wing roadable design, a qualified team must establish:

- **Operating mission and approvals:** legal departure and arrival sites, route/airspace, road classification, pilot/operator requirements, weather and applicable reserves;
- **Configuration-specific masses:** independently supported airframe, road systems, fold/transition hardware, thermal and safety structure, occupants, equipment and installation budgets;
- **Energy and power evidence:** installed *usable* Wh/kg, continuous and transient kW over temperature/SOC/age, high-rate delivered energy, thermal performance and failure/containment considerations;
- **Flight-phase physics:** separate VTOL hover/transitions or runway takeoff/climb/cruise/landing models with electrical losses and independent engineering review.

**No selection, simulation of a real VELTARO mission, purchase or physical testing is authorized by this work.**
