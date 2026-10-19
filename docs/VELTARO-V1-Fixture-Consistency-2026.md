# V1 toy energy cross-check (19 October 2026)
`tests/v1-fixture-consistency.mjs` compares the calculated mission kWh of the mass/energy feedback prototype against the independently supplied phase-level ledger. If they disagree beyond a user-declared relative tolerance, a diagnostic warning is returned.

This checks **arithmetic consistency only**, not the truth of any assumption. It does not connect the estimated battery mass to physical pack sizing, power discharge curves, lift requirements, thermal management, legally required reserves, or airworthiness. Its sample phase power is *constructed from the toy closure result* solely to exercise the test, never an empirical measurement.

Track A (winged) and B (VTOL) remain unselected and require independently sourced engineering inputs and qualified review. Do not present any fixture value as VELTARO performance or readiness.
