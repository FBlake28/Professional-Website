# Phase 0 Research: Resume Site Rebuild

All Technical Context fields in plan.md were already resolvable from the constitution and
spec — there are no outstanding `NEEDS CLARIFICATION` markers. This document instead records the
concrete implementation-approach decisions needed before design (Phase 1), each following the
same Decision / Rationale / Alternatives format.

## 1. In-page PDF viewing

**Decision**: Embed the resume with a native `<iframe src="assets/resume.pdf">` (or `<embed>`),
plus an adjacent `<a href="assets/resume.pdf" download>Download</a>` link.

**Rationale**: Modern desktop and mobile browsers render PDFs natively inside an iframe/embed with
zero JS; the `download` attribute gives a guaranteed fallback for the Edge Case where a browser
(e.g. some in-app browsers) can't render inline. No dependency added.

**Alternatives considered**: PDF.js (adds a JS library — against Principle I's no-framework-bloat
intent for a single-file viewer this simple); Google Docs viewer embed (adds a live external
network dependency with no free-tier guarantee — against Principle II).

## 2. Contact form submission mechanism

**Decision**: Intercept the form's `submit` event in `js/main.js`, run client-side validation
first, then `fetch()` POST to the Formspree endpoint with `Accept: application/json`, and render
success/error state inline in the DOM without a page navigation.

**Rationale**: FR-012 requires an inline success/error confirmation without leaving the page.
Formspree's AJAX/JSON mode is built for exactly this; a plain HTML `<form action="...">` POST
would navigate to Formspree's own confirmation page (or require an extra redirect page), which
does not satisfy "success confirmation" as an inline experience.

**Alternatives considered**: Native form POST with `_next` redirect param (adds a second page,
breaks single-page structure per FR-020); a third-party form JS SDK (unnecessary dependency for a
3-field POST).

## 3. Client-side validation

**Decision**: Use native HTML5 constraints (`required`, `type="email"`) as a baseline, plus a
small JS check before the `fetch()` call that re-verifies required fields and email shape, showing
inline error text next to the offending field and aborting before any network request.

**Rationale**: Satisfies FR-010 ("block submission ... without any network request being made")
with minimal code; the constraint validation API (`checkValidity()`) already covers most cases for
free.

**Alternatives considered**: A validation library (e.g. validator.js) — unjustified weight for 3
fields; server-side-only validation — not possible, no backend exists (Principle II).

## 4. Navigation implementation

**Decision**: Single `<nav>` with anchor links (`href="#about"`, etc.) matching each section's
`id`, CSS `scroll-behavior: smooth`, a sticky/fixed header, and a JS-toggled collapsible menu at
narrow widths (hamburger button toggles a class, no dependency).

**Rationale**: FR-020 mandates single-page anchor nav; constitution Principle III requires nav
links to match section IDs exactly.

**Alternatives considered**: Multi-page site — explicitly rejected by FR-020 and the spec's
Assumptions.

## 5. Responsive layout approach

**Decision**: Mobile-first CSS using Flexbox/Grid, with media-query breakpoints centered on
375px (base/mobile), 768px (tablet), and 1440px (desktop), relative units (`rem`, `%`, `vw`/`vh`)
for layout-relevant sizing.

**Rationale**: Directly targets FR-016/SC-006 and constitution Principle IV's named breakpoints;
no CSS framework needed for a page this size.

**Alternatives considered**: A compiled CSS framework (Bootstrap/Tailwind) — requires a build step,
against Principle I.

## 6. Accessibility approach

**Decision**: Semantic landmarks (`header`, `nav`, `main`, `section` per content section, `footer`),
one `<h1>` with a logical `<h2>`/`<h3>` hierarchy underneath, descriptive `alt` text on every image,
visible `:focus` styles, `<label for>` on every form field, and a color palette checked for WCAG AA
contrast before finalizing CSS.

**Rationale**: Directly satisfies FR-017 and constitution Principle IV; verified for real via
Lighthouse per Principle V and quickstart.md, not asserted from reading the markup.

**Alternatives considered**: Heavier ARIA widget patterns — unnecessary for mostly static content;
plain semantic HTML is preferred and sufficient here.

## 7. Asset structure & old-site cleanup

**Decision**: New root `index.html`; new `css/`, `js/`, `assets/images/` directories; resume PDF at
`assets/resume.pdf`. All Pinegrow-era root files and directories (`pinegrow.json`,
`tailwind_theme/`, `_pgbackup/`, `desktop.ini`, and any repo-root image/PDF not explicitly reused)
are deleted as an implementation task under this feature.

**Rationale**: CLAUDE.md and FR-015/SC-008 both require the prior site fully removed, not
coexisting alongside the new one; a clean `assets/` structure keeps the hand-written site
reviewable end-to-end per Principle I.

**Alternatives considered**: Leaving old files in place "for now" — directly violates FR-015 and
SC-008 (zero old-site assets reachable after launch).

## 8. Resume PDF content dependency

**Decision**: No resume PDF currently exists anywhere in the repo (verified by file search across
the repo root and `specs/`). Treat the actual PDF content as a content-gathering dependency owned
by Freddy — the same pattern the spec already uses for Certifications (FR-019) — rather than a
design blocker. Implementation proceeds by building the viewer/download UI against
`assets/resume.pdf` as the expected path; Freddy supplies (or the current
`teaching_social_studies-..._v2.pdf`/similar is confirmed *not* to be the intended resume file, and
a real resume PDF is added) before User Story 3's acceptance criteria (SC-005) can be verified for
real.

**Rationale**: The UI/logic for viewing and downloading a PDF is independent of the PDF's content
and shouldn't stall the rest of the plan; but Principle V forbids marking SC-005 "done" without a
real file to test against, so this is called out explicitly rather than silently assumed.

**Alternatives considered**: Blocking all Phase 1 design on the PDF's existence — rejected, since
every other feature area is independent of it; shipping a placeholder/dummy PDF permanently —
rejected, spec requires "the current resume PDF" (Resume Document entity), not a placeholder.
