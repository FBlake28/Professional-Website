# Quickstart: Validating the Resume Site Rebuild

No build step, no install — this validates a plain static site. Per constitution Principle V,
each check below must actually be performed (browser, Lighthouse, a real Formspree submission),
not declared done from reading the code.

## Prerequisites

- A modern desktop browser (Chrome/Edge/Firefox/Safari) and a mobile device or device emulator.
- `assets/resume.pdf` present with Freddy's real current resume (see research.md § 8 — this is a
  content dependency, not part of the build).
- A configured Formspree form ID wired into `js/main.js` (see contracts/formspree-contact-form.md).

## Running it locally

Open `index.html` directly in a browser (double-click, or `file://` path) — no server required to
view content and layout.

For contact-form testing specifically, serve the folder over `http://` instead of `file://` (e.g.
`python -m http.server 8000` from the repo root, then visit `http://localhost:8000`), since some
browsers restrict `fetch()` from `file://` origins.

## Validation scenarios

### User Story 1 — Browse Professional Profile (P1)

1. Open the site. Confirm About Me, Professional Biography, Experience, Education, Project
   Portfolio, Skills, and Contact are all present, in that order, with real content (no
   lorem-ipsum) — Certifications intentionally absent per FR-019.
2. Click every nav link; confirm each jumps directly to its section (FR-008, SC-002).
3. Resize/emulate the viewport to 375px, 768px, and 1440px; confirm no horizontal scroll and no
   overlapping elements at any of the three (FR-016, SC-006).
4. Tab through the page using only the keyboard; confirm nav, form, and resume controls are all
   reachable and operable (FR-017, Edge Cases).

### User Story 2 — Contact Freddy (P2)

1. Submit the form with a valid name, email, and message. Confirm: (a) the visitor sees an inline
   success confirmation with no page navigation, and (b) the message actually arrives in Freddy's
   inbox via Formspree (SC-003 — a real end-to-end test, not a mocked one).
2. Leave a required field blank, then enter a malformed email; confirm submission is blocked both
   times with a visible validation message and confirm via browser dev tools that no network
   request was made (FR-010, SC-004).
3. Point the form at an unreachable/incorrect endpoint temporarily (or disconnect network) and
   submit; confirm a clear inline error is shown and the visitor's typed input is retained, not
   cleared (FR-012, Edge Cases).

### User Story 3 — View or Download the Resume (P3)

1. Click "View Resume"; confirm the PDF renders in-page without navigating away (FR-013).
2. Click "Download"; confirm a copy of `assets/resume.pdf` saves to the device (FR-014).
3. Repeat both steps on a mobile browser; confirm both work there too (SC-005 — combined under 10
   seconds on both desktop and mobile).

### Accessibility & cleanup gates

1. Run a Lighthouse audit (Chrome DevTools → Lighthouse, Accessibility category) against the
   deployed or local page; confirm no critical/serious issues (FR-017, SC-007).
2. After deploying, confirm zero old Pinegrow-era pages/assets remain reachable at the site's
   GitHub Pages URL — no stale links, no leftover `_pgbackup`/`tailwind_theme` paths (FR-015,
   SC-008).
3. Confirm a pushed commit goes live on GitHub Pages within the expected build time with no manual
   deploy step (Feature 6 acceptance, resume-website-project-spec-v2.md).

## References

- Content/entity shapes: [data-model.md](./data-model.md)
- Formspree request/response contract: [contracts/formspree-contact-form.md](./contracts/formspree-contact-form.md)
- Implementation-approach decisions: [research.md](./research.md)
