# VELTARO V1 — M-01 evidence-gap audit (research only)

**6 November 2026 | Concept-stage documentation tool, not airworthiness / roadworthiness or performance verification.**

## Purpose

The M-01 shared-mission register intentionally leaves unsupported inputs unknown. This reproducible audit identifies research-input and reported-review gaps for **both** V1 architecture hypotheses, rather than turning `null` into zero or claiming an unsupported winner.

Run from the repository root with Node.js 22:

```bash
node engineering/v1-m01-evidence-gap-audit.mjs
node tests/v1-m01-evidence-gap-audit.mjs
```

The JSON report contains `checksCount`, `missingCount`, and per-field `gaps` grouped into:

1. **Shared M-01 mission:** jurisdiction, origin/destination, payload, road and flight assumptions, wind, usable battery-pack input and reserve basis.
2. **Reported review flags:** site access, source and safety reviews, operational authorization, and vehicle measurement validation.
3. **Per-architecture inputs:** facilities, written authorization evidence, energy, peak electrical power, structural mass and unique legal-route candidate for VTOL and transforming wing.
4. **Installed-pack / propulsion evidence:** source-linked BATT-01–03, PROP-01–02 and THERM-01 records with configuration, conditions, dates and stated reviewer information.

A reported value means **a field is populated in a specified form**. A boolean `true` or a declared `INDEPENDENTLY_VERIFIED` status cannot authenticate a test, confirm reviewer competence, establish an operating permission or prove technical compliance.

## Decision policy

This audit **never** selects an architecture or authorizes flying or road operations. It returns `MISSING_INPUTS` while required fields are absent and `INDEPENDENT_REVIEW_STILL_REQUIRED` when all are populated. The separate mission, route and evidence registers currently retain `HOLD_BOTH`. Qualified independent technical and regulatory review is essential before any decision.

The audit does not produce vehicle performance figures or merge illustrative toy-model inputs from engineering/v1-m01-energy-sample.json into the research mission. The separate energy-versus-power checks and performance-evidence release gate still apply.

**Inputs:** engineering/v1-m01-common-mission.json; engineering/v1-m01-thrace-route-candidates.json; engineering/v1-battery-propulsion-evidence.json.

**Next research priority:** lawful operating-site evidence and traceable installed-pack power/energy data, always recording source, units, configuration, conditions and uncertainty.
