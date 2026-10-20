# VELTARO V1 — Performance evidence gate v0.1

**20 October 2026.** A conservative, machine-readable documentation check prevents research-only battery and propulsion inputs being labelled ready for public V1 vehicle performance comparisons.

## Usage
```bash
node engineering/v1-evidence-quality-gate.mjs
node tests/v1-evidence-quality-gate.mjs
```

The gate checks for all six source-linked **independently verified, unit-labelled, configuration-specific** measurement records (pack Wh/kg, sustained power, peak power, two architecture-specific propulsion power values, thermal evidence), plus independent vehicle validation and confirmed authorized route/site pairs.

**Current expected output: blocked.** These records contain null values and no approved operating route. The educational coupled mass-energy model and sensitivity tests remain usable as purely illustrative mathematics and must never appear as measured VELTARO capability.

**Critical limitation:** passing automated checks in future cannot authenticate documents, prove reviewer competence, establish engineering safety, aviation authorization, certification or genuine vehicle performance. Qualified human review and a proper assurance/certification program are required.

This addition changes no website, operates no vehicle and authorizes no purchasing or outreach. Architecture decision stays **HOLD BOTH**.
