# V1 evidence intake validator
This small executable validates **completeness of submitted evidence records**, not correctness of a design. Run `node tests/v1-evidence-intake.mjs`. Example data deliberately contains no performance value and is marked UNSOURCED.

Mandatory: architecture A or B; one of six engineering gates; claim, source, source/access dates, scope, units, uncertainty, reviewer, claim status. The status REVIEWED requires an explicit `reviewAccepted: true` supplied by an actual reviewer; the program cannot establish their qualifications.

Never infer certification, performance, vehicle viability or product readiness from a successful schema check. Both research architectures remain on hold until independently sourced evidence and qualified human review. No emails, expenses or product imagery changes.
