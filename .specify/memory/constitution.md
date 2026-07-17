<!--
Sync Impact Report
==================
Version change: 1.0.0 → 2.0.0 (MAJOR: backward-incompatible principle removal/redefinition)

Modified principles:
- I. Static-First, No Build Step → I. Static-First, No-Framework Stack (retitled, rationale
  reframed around the hand-written rebuild rather than Pinegrow round-trip safety)
- III. Single-Source Content Architecture → III. Single-Source Content Architecture (retained,
  wording unchanged in substance — still hand-authored HTML source of truth)

Removed principles (obsolete — the Pinegrow-generated site is being fully replaced, not preserved):
- II. Respect Pinegrow-Generated Output — removed outright, not amended
- IV. Backup & Asset Hygiene (`_pgbackup/` preservation) — removed outright, not amended

Added principles:
- II. Static Hosting, No Backend (GitHub Pages + Formspree as the sole external dependency;
  no server, no ongoing cost)
- IV. Mobile Responsive, Accessible, Fast Load (the spec's Non-Negotiables, made testable)
- V. Spec-Driven Development Workflow (edit spec first then re-run the Spec Kit step; verify
  acceptance criteria for real — this folds in and supersedes old Principle V's browser-check rule)

Added sections: none beyond principle changes (Additional Constraints, Development Workflow,
Governance sections retained with updated content)

Removed sections: none structurally (only principle-level content removed, per above)

Templates requiring updates:
- ✅ .specify/templates/plan-template.md — Constitution Check gate is generic/parameterized; no edits needed
- ✅ .specify/templates/spec-template.md — generic, no principle-specific references to update
- ✅ .specify/templates/tasks-template.md — generic phase/task structure; no edits needed
- ✅ .claude/skills/speckit-*/SKILL.md — reviewed, no stale Pinegrow or CLAUDE-only references found
- ✅ CLAUDE.md — already rewritten ahead of this amendment to describe the hand-written rebuild;
  no contradictions to reconcile
- ⚠ index.html, pinegrow.json, tailwind_theme/, _pgbackup/ — still present on disk from the old
  site; their removal is tracked as the Deployment feature's cleanup step (see
  resume-website-project-spec-v2.md § Feature 6), not a constitution concern

Follow-up TODOs: none
-->

# Resume Website Constitution

## Core Principles

### I. Static-First, No-Framework Stack

The site MUST be plain, hand-written HTML/CSS/JS that can be opened directly in a browser or
served as-is. No package manager, bundler, JS framework (React, Vue, etc.), visual builder, or
compiled-CSS toolchain may be introduced without explicit user approval. Any proposed change that
would require running `npm install`, a build command, or a dev server as a prerequisite to viewing
the page is a constitution violation unless the user has explicitly requested that shift.

**Rationale**: This project exists to practice building and understanding every layer by hand.
A framework or visual builder would reintroduce the exact black-box-output problem the rebuild is
meant to eliminate, and adds maintenance burden with no benefit for a single personal site.

### II. Static Hosting, No Backend

The site MUST deploy as static files to GitHub Pages with no server-side logic, database, or
custom backend. Formspree (free tier) is the one sanctioned external service, used directly from
the frontend solely to deliver the contact form; no self-hosted function, additional API, or paid
service may be introduced. Every third-party dependency MUST stay within its free tier — nothing
in this repo should carry an ongoing cost or require a credential/`.env` file to render correctly.

**Rationale**: The spec explicitly rejects a self-hosted backend (incompatible with GitHub Pages'
static-only hosting and adds infrastructure to maintain) in favor of a third-party form service,
specifically to practice the "connect to an external service" pattern without taking on upkeep or
cost.

### III. Single-Source Content Architecture

All page content — About Me, Professional Biography, Experience, Education, Project Portfolio,
Skills, Certifications, Contact — MUST live in the site's own hand-authored HTML, not fetched at
runtime or split via a templating system or CMS. Section IDs used for navigation MUST continue to
match the header nav links.

**Rationale**: A single-page personal resume has no scale or reuse pressure that would justify
fragmenting content or adding a content pipeline; keeping content in the markup keeps the site
trivially portable and reviewable end-to-end.

### IV. Mobile Responsive, Accessible, Fast Load

Every page MUST be mobile responsive (no horizontal scroll or broken layout at common breakpoints:
375px, 768px, 1440px), accessible (semantic HTML, sufficient contrast, full keyboard navigability,
meaningful `alt` text, correct heading hierarchy), and fast-loading (static assets, minimal JS,
no framework bloat). These are non-negotiable constraints from the project spec, not aspirational
goals.

**Rationale**: These are the spec's stated Non-Negotiables — the site must work for real visitors
on real devices, not just render correctly on the author's desktop browser.

### V. Spec-Driven Development Workflow

Work in this repo MUST follow the GitHub Spec Kit pipeline (`/speckit.constitution` →
`/speckit.specify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.implement`). When a feature
needs to change, the relevant spec section MUST be edited first, then the affected Spec Kit
step(s) re-run — not a disconnected ad hoc edit. Every feature checklist's acceptance criteria
MUST be verified for real (a browser check at the stated breakpoints, a Lighthouse/accessibility
audit, an actual end-to-end Formspree test submission, GitHub Pages deploy logs) before being
marked done; a checklist item MUST NOT be declared complete on self-report alone.

**Rationale**: This project's primary purpose is to practice SDD itself, not just to ship a
website — skipping the spec-first loop or rubber-stamping acceptance criteria defeats the point of
the exercise, and self-reported "done" claims have a poor track record on UI-visible or
integration work.

## Additional Constraints

- **Technology stack**: Plain HTML5, CSS, and vanilla JS only. No JS framework, no CSS
  preprocessor requiring a build step, no bundler.
- **Hosting & deploy**: GitHub Pages, deployed from this repo (`FBlake28/Professional-Website`);
  the exact deploy mechanism (GitHub Actions vs. a `main`/`gh-pages` branch) is confirmed against
  whatever the repo already uses, during the Deployment feature.
- **Contact form**: Formspree free tier (50 submissions/month), with client-side validation and a
  visible error state on failed submission — never fail silently.
- **Resume file**: a PDF stored directly in the repo (e.g. `/assets/resume.pdf`), viewed in-page
  and downloadable, with no external hosting.
- **Relative paths only**: all asset and internal links MUST use relative paths so the site works
  identically whether opened from disk or served from any host path.

## Development Workflow

- Prefer editing the site's hand-written HTML/CSS/JS directly for content and style changes; this
  requires no build step and is immediately visible on reload.
- Preserve in-page (or multi-page, per the Open Items decision) navigation so it continues to match
  the content sections in Principle III.
- Before reporting a UI-visible change as complete, verify it per Principle V: open the page in a
  browser at mobile/tablet/desktop breakpoints, and re-run any relevant acceptance check (Lighthouse,
  a real Formspree submission, etc.) rather than asserting success from reading the code.
- Consult `resume-website-project-spec-v2.md`'s Open Items (certifications content, teaching photo
  choice, navigation style) before making a unilateral call on any of them.

## Governance

This constitution supersedes ad hoc practices for this repository. `CLAUDE.md` remains the
authoritative day-to-day runtime guidance file for coding agents working in this repo; where the
two overlap, they are intended to agree — if a future edit to either introduces a conflict, this
constitution's principles take precedence and `CLAUDE.md` MUST be reconciled to match.

**Amendment procedure**: Amendments are made by editing `.specify/memory/constitution.md` via the
`/speckit-constitution` workflow, which also checks dependent templates (plan/spec/tasks) and
`CLAUDE.md` for consistency and records a Sync Impact Report at the top of this file.

**Versioning policy**: Semantic versioning applies to this document — MAJOR for
backward-incompatible principle removals/redefinitions (as in this amendment), MINOR for new
principles or materially expanded guidance, PATCH for clarifications and wording fixes.

**Compliance review**: Any change proposed in this repo (by a human or an agent) should be checked
against the Core Principles above before being made, especially Principles I and II, since those
are the ones most likely to be silently violated by well-intentioned tooling additions or a
"just this once" backend/service shortcut.

**Version**: 2.0.0 | **Ratified**: 2026-07-17 | **Last Amended**: 2026-07-17
