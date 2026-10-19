# VELTARO — Website pre-launch verification checklist
**Date:** 2026-10-19 | **Status:** Open items; not evidence of deployment or completed browser testing

## Completed in code review
- Removed direct image hotlinks to an Audacy-hosted Getty photograph and a third-party article preview (three references) from `index.html`. Temporarily used the original local `v1-hero.svg` illustration instead.
- Concept visual disclosure remains required wherever imagery might be mistaken for an actual VELTARO vehicle.

## Still required before public promotion
| Area | Evidence needed | Status |
|---|---|---|
| Image licensing | Confirm usage terms for each remaining externally hosted Unsplash image and all fonts/assets; replace if rights unclear | Not verified |
| Forms | Inbox owner activates FormSubmit; test actual delivery, spam handling, error behavior, consent and anti-abuse with non-sensitive sample | Not verified |
| Privacy | Confirm legal controller identity, contact, retention periods, lawful basis and third-party processor arrangements; finalize `privacy.html` | Not verified |
| Mobile | Manual test at 320px, 375px, 768px and desktop; inspect mobile navigation, content overflow, form and keyboard focus | Not verified |
| Accessibility | Check keyboard-only navigation, alt text, contrast, screen reader names and language switch | Not verified |
| Marketing claims | Verify product, partner, financial and regulatory assertions against current evidence register | Not verified |
| Hosting | Verify GitHub Pages/custom domain settings, HTTPS, real deployment URL and no broken internal links | Not verified |

## Release gate
Do not claim production readiness until the outstanding rows have test evidence and an owner/date. This checklist is not legal or certification advice.
