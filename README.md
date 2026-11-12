# VELTARO

VELTARO is an independent, concept-stage exploration of premium road-and-air mobility. The public website presents research questions and design concepts; it does not offer a functioning vehicle, certified aircraft, sales, reservations, or validated performance.

## Development status

The site is a static HTML/CSS/JavaScript project. GitHub Pages serves the public pages from the repository. Contact and customer-research forms post to FormSubmit and require recipient inbox activation. Static checks do not verify delivery. The privacy notice and rights for externally hosted reference photographs still require owner review.

## Repository map

- `index.html` — homepage and general contact form, linking to the LABS exploration page.
- `early-interest.html` — non-binding customer discovery form.
- `collaborate.html` — concept-stage research and collaboration overview.
- `labs.html` — proposed first commercial LABS research offer and V1 long-term distinction (not yet a live paid service).
- `cockpit-concept.html` — illustrative, non-operational cockpit interface.
- `v1-evidence-dashboard.html` — noindex, read-only engineering evidence index.
- `privacy.html` — provisional form-data notice; not a final legal policy.
- `design.css` — legacy stylesheet; the current public pages use page-level styles.
- `assets/` and `v1-hero.svg` — original concept illustrations.
- `docs/` — research, launch, and operating documentation.
- `engineering/` — preliminary concept models, evidence registers, and engineering decision records.
- `tests/` — static site checks, live GET smoke checks, and concept-model checks.
- `.github/workflows/` — GitHub Actions checks.

## Run locally

Open `index.html` in a browser, or serve the repository root with a local static server, for example:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`. Form delivery cannot be verified by opening a local file; do not submit real personal information during testing.

## Checks

Run the static website checks with:

```sh
node tests/check-site.mjs
```

Run the concept-model and cockpit checks with:

```sh
for f in tests/*.mjs; do [ "$f" = tests/check-live-pages.mjs ] || node "$f" || exit 1; done
```

`tests/check-live-pages.mjs` performs non-invasive GET requests to the deployed GitHub Pages site and public SVG assets. It does not submit forms or confirm inbox delivery. A failing result can indicate that the live deployment does not yet match the repository.

## Contact forms

Both forms submit by POST to FormSubmit using the email recipient in the HTML. The receiving mailbox must be activated through FormSubmit before messages are forwarded. See [`docs/Contact-Delivery-Activation-Checklist.md`](docs/Contact-Delivery-Activation-Checklist.md) for a safe manual verification procedure. Never use customer or sensitive information in test submissions.

## Deploy

The repository is configured around the GitHub Pages project URL `https://panagiotagrosdouli.github.io/VELTARO/`. The current live routes are listed in `sitemap.xml`; `robots.txt` points to that sitemap. Repository changes do not update the live site until they are deployed through the repository's GitHub Pages configuration.

## Before public launch

Review [`docs/PRODUCTION-LAUNCH-CHECKLIST.md`](docs/PRODUCTION-LAUNCH-CHECKLIST.md), [`docs/PRIVACY-LAUNCH-CHECKLIST.md`](docs/PRIVACY-LAUNCH-CHECKLIST.md), and [`docs/WEBSITE-LAUNCH-AUDIT.md`](docs/WEBSITE-LAUNCH-AUDIT.md). Human actions remain for FormSubmit activation and testing, privacy/legal review, photography licensing, and browser-based visual checks. The site must continue to describe VELTARO as concept-stage until evidence supports any change.

## Founder-selected operating direction (2026-11-12)

The founder selected **VELTARO LABS as the first prospective revenue workstream** and **VELTARO V1 as the long-term flagship R&D ambition**. This is a strategic choice, not proof of first revenue or incorporation. See `labs.html` and `docs/VELTARO-FOUNDER-STARTUP-PACK-2026-11-12.md`.
