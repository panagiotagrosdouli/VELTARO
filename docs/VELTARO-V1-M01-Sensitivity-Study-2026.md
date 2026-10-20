# VELTARO M-01 — Educational sensitivity study, version 0.1

**20 October 2026 — TOY MODEL ONLY, NOT real vehicle ranges, energy performance, mass estimates or design selection.**

This adds a reproducible **one-factor-at-a-time** sweep to the [educational coupled mass-energy model](../engineering/v1-m01-energy-model.mjs). Both VTOL and transforming-wing configurations use the same assumed dry mass, payload and pack-specific energy; their arbitrary phase profiles differ. These are not engineering measurements or flight-performance estimates.

## Change factors

Each input is evaluated at **80%, 100%, 120%** of the hypothetical baseline:

- Payload mass
- Usable pack-level specific energy (Wh/kg)
- Flight-phase durations, applied to each phase
- Flight-phase power per kilogram, applied to each phase

The study computes 12 rows per architecture (**24 scenarios**), reporting calculated usable pack capacity and total coupled mass, or a non-closure state if the toy assumptions lead to impossible feedback. The figures are strictly **illustrative** and cannot rank architectures.

## Reproduce with Node.js

```bash
node engineering/v1-m01-run-sensitivity.mjs
node tests/v1-m01-sensitivity.mjs
```

Sources: [sweep implementation](../engineering/v1-m01-sensitivity-sweep.mjs), [runner](../engineering/v1-m01-run-sensitivity.mjs), and [toy assumptions](../engineering/v1-m01-energy-sample.json).

## Interpretation and limitations

Monotonic changes in calculated energy are an internal arithmetic check, **not confirmation of aircraft physics**. The model omits aerodynamic and structural mass coupling, discharge-rate/power density, regulatory reserves, thermal limits, noise, road drive cycle, contingency cases and qualified verification. One-factor-at-a-time studies miss factor interactions and uncertainties; these need reviewed real input ranges and multidimensional analysis before engineering decisions.

**Next evidence priorities:** independent full-pack specific energy and peak discharge evidence; separately reviewed hover/transition and wing-borne phase power data; mass breakdowns; lawful route and site access; qualified safety assessment.

The geographical [Thrace research scenario](../engineering/v1-m01-thrace-route-candidates.json) remains **HOLD BOTH** with no authorized site pair or flight permission. No procurement, outreach or physical trials.
