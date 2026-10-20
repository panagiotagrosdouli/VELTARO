# VELTARO V1 — M-01 educational mass / energy comparison
**20 October 2026 | CONCEPT ONLY, NOT VEHICLE PERFORMANCE**

The executable [model](../engineering/v1-m01-energy-model.mjs) shows how battery mass feeds back into vehicle mass and phase electrical energy. Its paired [sample](../engineering/v1-m01-energy-sample.json) uses arbitrary numbers for both VTOL and transforming-wing concepts; they are **not measured or design-approved**.

For each concept separately: total mass = dry mass + payload + pack mass; mission energy = sum(total mass × illustrative electrical power per kg × phase hours); required usable pack capacity = mission energy/(1−assumed reserve fraction); pack mass = required capacity/usable pack-specific-energy.

The analytic linear coupling factor is c = sum(power per kg × phase hours)×1000/[pack Wh/kg×(1−reserve fraction)]. Mass = (dry + payload)/(1−c), provided c < 1; otherwise the model reports **non-closing**. The reserve fraction is educational, **not an aviation reserve rule**.

The model does **not** represent aerodynamic feasibility, hover physics, power or discharge limits, thermal behavior, road loads, weather, takeoff/landing regulations, emergency requirements, safety or certification. Its phase “maximum” is not a verified electrical transient peak. Identical illustrative dry masses do not imply identical real architecture mass.

**Research gate:** the [Thrace site scenario](../engineering/v1-m01-thrace-route-candidates.json) lacks lawful departure/arrival pair, distances, source-backed payload, pack data, validated power assumptions and qualified review. **HOLD BOTH** architectures; no performance or commercialization claim. No spending, supplier contact or physical testing.
