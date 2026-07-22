# Implementation Plan: Resume Site Rebuild

**Branch**: `001-resume-site-rebuild` | **Date**: 2026-07-21 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-resume-site-rebuild/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Rebuild Freddy's personal resume/portfolio site as a single hand-written, plain HTML/CSS/JS page
with seven content sections (Certifications deferred per FR-019), anchor-link navigation, an
in-page/downloadable resume PDF, and a Formspree-backed contact form — replacing the prior
Pinegrow-generated site entirely, with no framework, bundler, backend, or paid service introduced.

## Technical Context

**Language/Version**: HTML5, CSS3, vanilla JavaScript (ES2017+ browser-native — no transpilation,
no TypeScript)

**Primary Dependencies**: None (no framework, no bundler, no package manager). Formspree (free
tier) is called directly from frontend JS via `fetch()` for the contact form; the browser's
native PDF rendering (via `<iframe>`/`<embed>`) is used for the resume viewer.

**Storage**: N/A (no database). The resume is a static file at `assets/resume.pdf`. Contact
submissions are not persisted by the site — Formspree holds them on its own dashboard only.

**Testing**: No automated test framework (would require a build/runtime step, against Principle
I). Verification is manual and tool-assisted per constitution Principle V: browser checks at
375px/768px/1440px, a Lighthouse accessibility/performance audit, and a real end-to-end Formspree
test submission.

**Target Platform**: Static site hosted on GitHub Pages; verified in current desktop and mobile
versions of Chrome, Safari, Firefox, and Edge.

**Project Type**: Single static website (no frontend/backend split — there is no backend).

**Performance Goals**: Fast initial load on static assets with minimal script (FR-018); combined
resume view + download interaction under 10 seconds on desktop and mobile (SC-005).

**Constraints**: No build step; no backend/server; no paid or over-free-tier third-party service
(Formspree free tier, 50 submissions/month); relative paths only (works from any host path or
`file://`); must fully replace the prior Pinegrow output with nothing old left reachable
(FR-015/SC-008).

**Scale/Scope**: One page, seven launched content sections (Certifications section omitted until
content exists, per FR-019), one contact form, one resume PDF — scoped for personal-site traffic,
not concurrent load.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status |
|---|---|---|
| I. Static-First, No-Framework Stack | Plan introduces no framework, bundler, package manager, or visual builder; plain HTML/CSS/JS opened directly or served as-is. | PASS |
| II. Static Hosting, No Backend | Plan uses GitHub Pages static hosting only; Formspree free tier is the sole external service, called directly from frontend JS; no server/database/paid service. | PASS |
| III. Single-Source Content Architecture | All content (About Me → Contact) lives directly in `index.html`; nav anchor IDs match section IDs. | PASS |
| IV. Mobile Responsive, Accessible, Fast Load | Design commits to mobile-first responsive CSS, semantic HTML + accessibility practices, and minimal JS — verified via Lighthouse and manual breakpoint checks before being marked done. | PASS |
| V. Spec-Driven Development Workflow | This plan follows `/speckit.specify` → `/speckit.plan`; spec.md was updated first; acceptance criteria will be verified for real, not self-reported. | PASS |

No violations — Complexity Tracking is not needed.

*(Re-checked after Phase 1 design below — see "Post-Design Constitution Check".)*

## Project Structure

### Documentation (this feature)

```text
specs/001-resume-site-rebuild/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
│   └── formspree-contact-form.md
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
index.html              # Single page: all 7 launched sections + nav + contact form + resume viewer
css/
└── styles.css           # Mobile-first responsive styles, design tokens (colors/type/spacing)
js/
└── main.js              # Nav (anchor scroll + mobile menu toggle), form validation + Formspree
                         # fetch() submission, resume viewer wiring
assets/
├── resume.pdf           # Current resume PDF (view + download source) — content dependency, see
│                        # research.md "Resume PDF content dependency"
└── images/
    ├── blake-2024-profile-pic.png   # Headshot (About Me) — reused from repo root
    └── teaching.jpg                  # Teaching photo (Professional Biography) — default per
                                       # spec.md Assumptions; swappable without a spec change
```

**Structure Decision**: Single static project at the repo root (no `src/`, no frontend/backend
split — there is no backend). One `index.html` holds all content per constitution Principle III;
`css/` and `js/` are split out only to keep `index.html` readable, not as a build concern. Reused
images move into `assets/images/`; the resume PDF lives at `assets/images/`'s sibling
`assets/resume.pdf` per the constitution's stated path. All old Pinegrow-era root files
(`pinegrow.json`, `tailwind_theme/`, `_pgbackup/`, `desktop.ini`, unreferenced images/PDFs, the old
`index.html`) are deleted as part of this feature's cleanup (FR-015/SC-008) — tracked as
implementation tasks, not designed further here.

## Complexity Tracking

> Not applicable — Constitution Check has no violations to justify.

## Post-Design Constitution Check

*Re-evaluated after Phase 1 (data-model.md, contracts/, quickstart.md) below.*

| Principle | Re-check after design | Status |
|---|---|---|
| I. Static-First, No-Framework Stack | data-model.md and contracts/ describe plain content structures and a direct `fetch()` call to Formspree — no library or codegen introduced. | PASS |
| II. Static Hosting, No Backend | contracts/formspree-contact-form.md confirms the only network call is client → Formspree; no new service introduced during design. | PASS |
| III. Single-Source Content Architecture | data-model.md's entities (Content Section, Experience Entry, Project Entry) map directly to hand-authored HTML blocks, not a data file or CMS. | PASS |
| IV. Mobile Responsive, Accessible, Fast Load | quickstart.md's validation steps exercise breakpoints, keyboard nav, and Lighthouse explicitly. | PASS |
| V. Spec-Driven Development Workflow | Design artifacts trace back to spec.md's FRs/entities/success criteria with no invented scope. | PASS |

No new violations introduced during design. Ready for `/speckit-tasks`.
