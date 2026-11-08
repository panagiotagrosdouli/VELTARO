# VELTARO website launch audit

Audit basis: repository `main` snapshot `ce5da4da4bb0a0c71f5c9b3d10f173ab72a4d63e`, reviewed 8 November 2026. Checks covered the five public HTML pages, local SVG artwork, sitemap and robots file, form markup, CI workflows, and available static/live checks. This report distinguishes source checks from live and human verification.

## Findings and resolutions

### High

- **Collaboration CTA pointed to a missing section.** `collaborate.html` linked to `index.html#contact`, but the homepage section is `#connect`. Changed the target and added a cross-page fragment check to `tests/check-site.mjs`.
- **Homepage form subject disagreed with the live smoke-test contract.** The homepage used `VELTARO | New Website Inquiry`, while `tests/check-live-pages.mjs` and the delivery checklist expect `VELTARO | New Website Contact Message`. Aligned the repository form value. The deployed page still returns the older value until the repository change is published.
- **Privacy information is not ready for final publication.** The notice correctly labels itself provisional, but still lacks confirmed controller identity, lawful basis, controller-side retention, processor terms, international-transfer safeguards, and verified rights handling. FormSubmit's public FAQ currently states a 30-day submission retention period; confirm that term applies to the active service. Added clearer disclosure of external image requests and remaining owner/legal decisions; see `PRIVACY-LAUNCH-CHECKLIST.md`.
- **Third-party image rights are unverified.** The home page requests four Unsplash reference images. They are identified as third-party inspiration and not VELTARO products, but commercial display rights have not been established. Confirm licenses or replace the images before public promotion.

### Medium

- **Some pages lacked search and sharing metadata.** Collaboration, privacy, and cockpit pages did not have a complete canonical/social metadata set; cockpit also lacked a description. Added page-specific canonical URLs, descriptions, Open Graph and X card metadata. Added factual `WebSite` JSON-LD to the homepage.
- **Cross-page anchors were not covered by the static checker.** The existing check handled local anchors but did not verify `index.html#...` fragments. Added cross-page target validation and checks for page titles, descriptions, canonicals, social URLs, cards, and structured data.
- **Engineering documentation and tests referred to a missing evidence dashboard.** Added `v1-evidence-dashboard.html` as a noindex, read-only view that reads existing preliminary registers and labels them unreviewed. Added checks for its required data regions and noindex directive.
- **README content was stale.** It described a different homepage and features. Replaced it with the current project structure, form behavior, test commands, and outstanding launch actions.

### Low

- **Legacy stylesheet is not linked from the current pages.** `design.css` is present but current page styling is embedded in the HTML files. This audit did not remove it because the change would not improve launch reliability; the file is identified as legacy in the README.
- **Visual and mobile behavior is not browser-verified at all requested widths.** Source CSS includes responsive breakpoints and reduced-motion handling, but no browser rendering session was available for this audit. Owner-side visual review remains on the checklist.

## Verified checks

- Local page and SVG paths referenced by the static site checker exist in the repository.
- Unique IDs and same-page anchors pass; the collaboration cross-page fragment now resolves to `#connect`.
- Contact forms use POST, labeled fields, email input validation, required consent, length constraints, FormSubmit, and spam controls. No live form was submitted.
- `robots.txt` and `sitemap.xml` use the current GitHub Pages project URL.
- The live smoke script received HTTP 200 for the homepage, four HTML routes, and both original SVG assets. Its homepage form-configuration assertion failed because the deployed homepage has the old subject value. The repository is not considered deployed by this work.

## Remaining limits

This is a static source audit, not a legal opinion, accessibility certification, image-license review, inbox-delivery test, full HTML validation, Lighthouse measurement, or responsive browser test. Do not claim GDPR compliance or successful form delivery on this evidence.
