# Production launch checklist

Status key: **Completed and verified** means source or command evidence exists; **Implemented but not verified** means present in source but not proven in production; **Requires owner action** means account-specific input or action is needed; **Requires external review** means a qualified reviewer or rights holder must decide; **Not applicable** means no feature is present in the reviewed static site.

| Area | Status | Evidence / next step |
|---|---|---|
| Static site routes and local artwork | Completed and verified (source) | Local check confirms referenced pages and SVGs are present. Live GET smoke returned HTTP 200 for public routes/assets. |
| Collaboration CTA anchor | Completed and verified (source) | Link now targets `index.html#connect`; cross-page test added. |
| Homepage form subject | Implemented but not verified | Repository aligns to the static smoke-test contract. Live deployment still has `New Website Inquiry`; publish and rerun smoke check. |
| Form delivery | Requires owner action | Activate the FormSubmit recipient and perform the two-form dummy-message procedure in `Contact-Delivery-Activation-Checklist.md`. No live form was submitted. |
| Mobile layouts at 320–1920 px | Implemented but not verified | Responsive CSS exists. Visually inspect all target widths, keyboard behavior, focus, and real form interaction in a browser. |
| SEO metadata and sitemap | Completed and verified (source) | Unique page metadata and GitHub Pages canonicals are present; sitemap and robots point to the configured project URL. Recheck after any domain change. |
| Structured data | Completed and verified (source) | Homepage `WebSite` JSON-LD parses and contains only the public name, URL, and factual description. |
| Privacy notice | Requires owner action | Complete controller, lawful basis, retention, processor and transfer information; then obtain legal review and update the provisional notice. |
| Image rights | Requires owner action / external review | Confirm commercial rights for remote Unsplash photography or replace it with licensed/original imagery. |
| Accessibility | Implemented but not verified | Semantic landmarks, labels, focus styles, and reduced-motion support exist. Run browser/manual keyboard and screen-reader checks and a current automated audit. |
| Security headers | Not applicable to repository configuration | GitHub Pages static hosting does not configure arbitrary response headers from these files. Do not claim custom headers are deployed. |
| GitHub Pages deployment | Implemented but not verified | The live project URL responds successfully. Confirm repository Pages settings and publish the reviewed change; this audit did not alter account settings or deploy. |
| Build and CI checks | Completed and verified (local source) | Run `node tests/check-site.mjs` and the non-live `tests/*.mjs`. The live smoke assertion currently fails against the deployed homepage's old form subject. |
| Browser performance/Lighthouse | Requires owner action | Capture actual measurements after the final deployed version; no scores were fabricated. |

## Launch assessment

**TECHNICALLY READY — OWNER ACTIONS REQUIRED** after the source checks pass. Wider public launch remains dependent on form activation/delivery testing, privacy and image-rights decisions, manual responsive/accessibility review, and publication of the reviewed source changes. The current live site has not been updated by this audit.
