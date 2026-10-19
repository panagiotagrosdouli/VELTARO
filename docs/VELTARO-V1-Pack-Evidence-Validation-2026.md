# VELTARO V1 — Pack-level evidence acceptance (19 October 2026)

The validator `tests/v1-pack-evidence.mjs` ensures that prospective battery inputs are explicitly tagged as **installed usable pack** values rather than nominal cell or module ratings. It demands an evidence type, source, conditions, scope, uncertainty, reviewer, usable pack Wh/kg, continuous/peak power and a peak duration. Measured claims must declare their test methodology.

The illustrative test fixture contains **invented values and is not an engineering benchmark**. Passing schema checks does not establish that a source is true, that a test method was adequate, or that any battery can be used safely in an aircraft. Both tracks A and B remain in research. Next: validate evidence provenance, true usable SOC/temperature/degradation boundaries, power/thermal performance and qualified independent review before importing measured values into an architecture comparison.
