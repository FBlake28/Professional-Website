# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal resume/portfolio website for Frederick Blake, being rebuilt from scratch as hands-on
practice with spec-driven development (SDD). The full plan lives in
`resume-website-project-spec-v2.md` — read that file for feature specs, content, and open
decisions; this file is about *how to work in the repo*, not a duplicate of the spec.

**This replaces a prior Pinegrow-generated site.** The old `index.html`, `pinegrow.json`,
`tailwind_theme/`, and `_pgbackup/` directories are being torn out and replaced with a
hand-written, plain HTML/CSS/JS site — no visual builder, no generated interaction wiring, no
compiled framework output to treat as a black box. Once the rebuild lands, none of those
Pinegrow-specific files or conventions should still be referenced as current — if you find
lingering mentions of them elsewhere (docs, comments), they describe the *old* site being
replaced, not the target state.

## Stack and constraints (resolved decisions from the spec)

- **Frontend**: plain HTML/CSS/JS. No framework, no bundler, no package manager — hand-written
  and openable directly in a browser, same as before, but now hand-authored top to bottom instead
  of visual-builder output.
- **Hosting**: GitHub Pages (static-only), deployed from this repo.
- **Contact form**: Formspree free tier, called directly from the frontend — no self-hosted
  backend or serverless function.
- **Resume file**: a PDF stored directly in the repo (e.g. `/assets/resume.pdf`), viewed in-page
  and downloadable — no external hosting.
- **No backend, no ongoing cost**: every third-party service used must stay within its free tier;
  nothing here should need a server to maintain long-term.

## SDD workflow (GitHub Spec Kit)

This project uses GitHub's Spec Kit (`specify` CLI) for the SDD pipeline, driven through
`/speckit.*` slash commands (`constitution` → `specify` → `plan` → `tasks` → `implement`), backed
by `.specify/memory/constitution.md` and the templates in `.specify/templates/`.

- The user (Freddy) is new to SDD and is using this project specifically to *learn* the
  methodology, not just to ship the site fast. Explain concepts as they come up rather than
  rushing through steps silently — but don't over-explain unprompted tangents; explain the thing
  directly in front of him at that step.
- When a feature needs to change, edit the relevant feature spec section in
  `resume-website-project-spec-v2.md` (or the generated `specs/*/spec.md`) first, then re-run the
  affected Spec Kit step — rather than making a disconnected ad hoc edit.
- Feature specs are checklists with acceptance criteria. Verify them for real (browser checks,
  Lighthouse/accessibility audit, an actual Formspree test submission, GitHub Pages deploy
  logs) rather than declaring a checklist item done without checking it.

## Structure (target state)

Content sections, in order: About Me, Professional Biography, Experience, Education, Project
Portfolio, Skills, Certifications, Contact. Navigation style (single-page anchor nav vs.
multi-page) is still an open decision — check the spec's Open Items before assuming one.

Reused assets from the old site: `blake 2024 profile pic.png` (headshot) and one teaching photo
(candidates: `Differentiating Instruction with AI.jpg`, `njcss teaching social studies.jpg`,
`teaching.jpg` — final pick TBD). Everything else at the repo root (old Pinegrow backups, unused
images, `desktop.ini`, etc.) is being cleared out as part of the rebuild — don't assume an asset
still belongs just because it's present until the Deployment feature's cleanup step has run.

## Working with this repo

- There's still nothing to install or build for the core site — open the HTML file in a browser
  to preview. If a step in the spec introduces tooling (e.g. a Lighthouse CLI), treat that as
  scoped to verification, not a build requirement for the site itself.
- Prefer editing the plain HTML/CSS/JS source directly — there's no generated-markup concern
  anymore once the Pinegrow files are removed, so hand-editing is always safe and expected.
- Don't reintroduce a visual builder, generated interaction wiring, or a compiled-CSS-as-black-box
  pattern — the whole point of this rebuild is that every layer is hand-written and understood.
- Check `resume-website-project-spec-v2.md`'s Open Items section before making calls on
  certifications content, the teaching photo choice, or navigation style — these are explicitly
  unresolved, not oversights.
