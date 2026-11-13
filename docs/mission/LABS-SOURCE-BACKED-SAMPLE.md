# LABS public research sample: certification evidence boundaries
13 November 2026 · Self-initiated public-source sample · Not commissioned by a customer · Not regulated engineering advice

## Question and scope
What evidence should a preliminary road-and-air architecture review collect before treating “VTOL capable” as a product claim? This brief compares the research evidence required, not the performance of two aircraft. No proprietary data, hardware test or flight simulation was used.

## Method
Retrieve EASA's Special Condition VTOL page and its drone operations overview; retain URL, retrieval date, response hash and explicit limitations in sources.json. Review existing V1 M-01 mission, mass ledger, energy model and architecture decision records. Separate directly observed page content from our research interpretation. EU road-approval source content could not be substantively validated in this run and remains a research lead.

## Findings with provenance
1. EASA's retrieved VTOL page lists Special Condition VTOL issue 2 and multiple Means of Compliance releases. It explicitly lists a final MOC-5 issue 2 document and a prior consultation period of 18 July–10 October 2025. This demonstrates that a certification reference has revisions and associated compliance material; it does not establish applicability or compliance for V1. Source: EASA-VTOL, accessed 2026-11-13; publication/revision date of each actual PDF must be verified separately.
2. EASA's drone overview distinguishes open, specific and certified categories. It describes risk assessment and national competent authority authorization in the specific-category discussion, and separate operator/remote-pilot responsibilities. Exact exceptions and mission requirements require the applicable legal text and authority review. Source: EASA-UAS, accessed 2026-11-13, page publication date TBD. This cannot determine passenger V1 certification.
3. Existing V1 data deliberately lacks verified component/mission measurements and lawful site pairs. The model's hypothetical numerical closure therefore cannot resolve the missing legal mission, certification basis or hardware evidence. Source: repository engineering/v1-m01-common-mission.json and tests/v1-evidence-quality-gate.mjs. This is an internal evidence observation, not independent technical validation.

## Comparison and uncertainty
VTOL requires investigation of lift-system redundancy, hover/transition energy and peak thermal power, site constraints and an applicable certification basis. Folding fixed wing requires investigation of runway access, takeoff/climb conditions, wing/lock load paths and a separate applicable certification basis. These are engineering questions; no quantified ranking or architecture selection is supported.

## Recommended next validation
Have qualified aerospace/automotive reviewers define the intended categories and common mission; obtain current authoritative legal/certification texts and source PDFs; record lawful operating-site assumptions; request traceable pack-level mass/power/thermal data; review conversion failure hazards and road constraints. Keep both architectures on HOLD until comparative evidence exists.

## Deliverable boundary
This sample illustrates traceable research synthesis. It provides no design signoff, legal opinion, flight permission, performance guarantee or commercial readiness claim. No client, payment or interview is implied. See REGULATORY-ISSUES.csv and SOURCE-REGISTER.md.
