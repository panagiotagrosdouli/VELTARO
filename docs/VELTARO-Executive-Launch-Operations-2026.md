# VELTARO — Executive Operations & Lead Intake SOP
**22 October 2026 | Owner assignments proposed; not a claim of formally appointed executives or incorporated company**

## Executive operating model
- **CEO:** approve strategic positioning, launch claims, priorities, milestone gates, team assignments and partnerships.
- **COO:** own the daily contact queue, response SLA, lead stage transitions and weekly operating review.
- **CFO:** approve spend, cash runway, legal/accounting formation plan and evidence-backed fundraising materials. No vehicle deposits or order revenue.
- **CTO:** maintain product feasibility evidence, requirements, safety/regulatory research, independent engineering reviewer requirements.
- **CIO:** own GitHub Pages or other hosting setup, DNS/HTTPS, FormSubmit setup, security, privacy access controls, retention/deletion processes and backups.
- **CMO:** own truthful messaging, consented lead generation, campaign attribution and interviews; no unsupported specifications or delivery dates.
These are role responsibilities, not actual people or permissions.

## Form activation: HUMAN ACTION REQUIRED
The static `index.html` and `early-interest.html` both POST to FormSubmit at the receiving inbox configured in source code.
1. Confirm the destination mailbox belongs to an authorized operator. Prefer a verified business inbox before public campaigns.
2. Complete the FormSubmit activation/verification flow delivered to that mailbox. This cannot be performed using GitHub alone.
3. With authorization, send non-sensitive synthetic sample inquiries from **both** forms. Inspect destination inbox and spam, anti-spam challenge, fields, encoding, consent information and sender acknowledgement.
4. Verify that user-facing failures are handled, and document date/time, device/browser, expected vs actual results. Static CI cannot prove email delivery.
5. Get privacy counsel to finalize controller identity, contact, processing basis, third-party processor arrangements, transfer requirements, retention, deletion and response process before public launch.
6. Confirm deployed domain, TLS, accessibility, responsiveness and third-party image rights. Record a go/no-go signoff.

## Contact workflow (only once privacy/legal and inbox are approved)
- New inquiry -> spam/safety screening -> record minimal contact details and consent timestamp -> classify (research customer, engineering collaboration, investor inquiry, other) -> acknowledge -> owner assigned -> reply -> schedule interview -> summarize evidence -> close/delete when retention requirement applies.
- **Suggested internal service target:** human triage within two business days. No public SLA until staffed.
- Do not make unsupported commercial offers or imply customer/investor commitments.
- Do not copy sensitive form submissions into public issues or GitHub.

## Weekly CEO dashboard
- Inquiries delivered / forms tested
- Qualified, consented research leads
- Interviews booked and conducted
- Most frequent unmet customer needs
- Open compliance/security blockers
- Engineering feasibility evidence gates
- Budget and committed expenditures

## Release signoff
CEO: messaging approved; COO: response workflow staffed; CFO: spending/financial controls; CTO: engineering claims reviewed; CIO: live form/HTTPS/privacy operations tested; CMO: consented campaigns and measurement ready.

**Status at writing:** Code supports standard POST forms and static tests, but no end-to-end email delivery, lawful data processing, public deployment or incorporation is verified. Do not state that forms are fully operational before the real receiving inbox test.
