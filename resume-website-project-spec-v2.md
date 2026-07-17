# Project Spec: Resume Website (SDD Practice Project) — v2

## Revision Note
This is v2, replacing the original `resume-website-project-spec.md`. Changes from v1:
- Adopted GitHub's official **Spec Kit** as the SDD tooling (replacing the hand-rolled process described in v1's workflow note). This document now serves as the source material fed into Spec Kit's `/speckit.constitution` and `/speckit.specify` steps.
- Resolved the architecture/stack decision: plain HTML/CSS/JS, no framework.
- Resolved the contact form provider: Formspree, free tier.
- Replaced the placeholder Content Sections checklist with the finalized 7-section structure.
- Updated Experience/Projects content to reflect current work (Verisk internship, Lightbridge Academy consulting, personal AI projects).
- Added a new feature: in-page resume PDF viewer + download.

## Purpose of This Document
This file is the project-level spec for a personal resume website, built as hands-on practice with spec-driven development (SDD). It's uploaded into a Claude Project, which uses this document to guide setup and development — not just execute tasks silently.

### Instructions for the assistant in this Project
- The user (Freddy) is new to SDD and is using this project specifically to learn it, not just to ship a website fast.
- Explain concepts as they come up rather than rushing through steps silently. Don't over-explain unprompted tangents — explain the thing directly in front of him at that step.
- This project now uses **GitHub Spec Kit** for the SDD workflow. Help Freddy actually run the `/speckit.*` command pipeline (constitution → specify → plan → tasks → implement) rather than defaulting to ad hoc requests.
- Feature specs below are checklists — help him check acceptance criteria via real verification (tests, browser checks, Lighthouse, deploy logs) rather than declaring something done without checking it.
- When a feature needs to change, guide him to edit the relevant feature spec section first, then re-run the affected Spec Kit step(s).

## Goal
Build and deploy a personal resume/portfolio website end-to-end, replacing the current Pinegrow-generated GitHub Pages site with one built and understood layer-by-layer. Primary purpose: practice the full development cycle (frontend, deploy pipeline, one light dynamic touchpoint) using spec-driven development with Claude Code and GitHub Spec Kit.

## Scope Decision
**Static site + a third-party contact form service** (not fully static, not a self-hosted backend).
- Rationale: fully static skips practicing the "connect to an external service" pattern; a self-hosted serverless function isn't compatible with GitHub Pages (static-only hosting) and would add infrastructure to maintain. A third-party form service gets a working, real contact form without a backend to maintain.

## Non-Negotiables (Constraints)
- Mobile responsive
- Accessible (semantic HTML, reasonable contrast, keyboard navigable)
- Fast load (static assets, minimal JS bloat)
- No backend/server to maintain long-term
- No ongoing cost — every third-party service used must stay within its free tier
- Content demo-able without ongoing maintenance burden

## Hosting & Repo Decisions (resolved)
- **Hosting:** GitHub Pages (static-only) — already in use for the current site
- **Repo approach:** Replace files in the existing repo (`FBlake28/Professional-Website`) in place; keep the repo rather than starting fresh
- **Assets:** Reuse "blake 2024 profile pic.png" as the primary headshot. A second photo of Freddy teaching (candidates already in the repo: `Differentiating Instruction with AI.jpg`, `njcss teaching social studies.jpg`, `teaching.jpg`) is needed for the Professional Biography section — final pick TBD during the visual design pass. All other current repo assets (Pinegrow backups, unused images, `desktop.ini`, etc.) are cleared out.
- **Contact form:** Formspree (free tier), called directly from the static frontend — no self-hosted function needed

## Architecture / Stack Decisions (resolved)
- **Frontend:** Plain HTML/CSS/JS — no framework. A resume site doesn't need a full SPA framework, and hand-writing it keeps every layer understandable, matching this project's learning goal.
- **Build/deploy:** GitHub Pages' native deploy from the repo — exact mechanism (GitHub Actions vs. `main`/`gh-pages` branch) to be confirmed against whatever the current repo already uses, during the Deployment feature.
- **SDD tooling:** GitHub Spec Kit (`specify` CLI), integrated with Claude Code, installed via `uv`.
- **Contact form provider:** Formspree, free tier (50 submissions/month — far above expected traffic for a personal site; no cost).
- **Resume file:** PDF stored directly in the repo (e.g. `/assets/resume.pdf`), no external hosting needed.

## Feature Specs (checklist + acceptance criteria each)

### 1. Layout & Structure
- [ ] Semantic HTML skeleton (header, sections, footer)
- [ ] Navigation (single-page anchor nav or multi-page, TBD)
- Acceptance: passes basic accessibility check (semantic tags, alt text, heading hierarchy)

### 2. Styling System
- [ ] Consistent design system (colors, type scale, spacing)
- [ ] Responsive breakpoints (mobile/tablet/desktop)
- Acceptance: no horizontal scroll or broken layout at common breakpoints (375px, 768px, 1440px)

### 3. Content Sections
- [ ] **About Me** — short intro, below headshot
- [ ] **Professional Biography** — longer bio, paired with a teaching photo
- [ ] **Experience** — see updated content below
- [ ] **Education** — Stevens Institute (M.S. Business Analytics and AI, expected Dec. 2026), TCNJ (B.A. History and Secondary Ed., Summa Cum Laude, Dec. 2023)
- [ ] **Project Portfolio** — see updated content below
- [ ] **Skills** — SQL Server, Scrum, Snowflake, Power BI, Tableau, BI Analysis, Python, Excel, Staff Training, Business Analytics, Team Management, OpenAI API
- [ ] **Certifications** — content to be gathered from Freddy (not yet provided)
- [ ] **Contact** — see Feature 4 below
- Acceptance: content matches Freddy's current work (below), no placeholder text left in

**Updated Experience content (replaces outdated resume draft):**
- **Verisk — Business Analyst Intern (Summer 2026):** Optimized a Scrum team's workflow; built a Jira story-generation agent using Claude that lets project owners quickly define user stories and new features, enabling spec-driven development within the team.
- **Lightbridge Academy — Consulting (ML/GenAI):** Built a staff scheduling optimizer that predicts classroom attendance (under 3% failure rate) and reduces staffing costs by 3%+ per center annually (six figures company-wide), while keeping project cost minimal by using pre-paid subscription services the company already had.
- Existing entries (Fair Lawn Public School history teaching, Montville Parks and Rec) carry over as-is from the prior resume draft.

**Project Portfolio content:**
- **Jira Story-Generation Agent** (Verisk) — see Experience above; can be cross-linked here.
- **Staff Scheduling Optimizer** (Lightbridge Academy) — see Experience above; can be cross-linked here.
- **Note-Organizing MCP Agent** — a personal AI agent, built using MCP, that ingests roughly-taken notes and transforms them into organized notes, auto-categorizing into folders and linking to related topics.
- **Insurance Risk Advisor Agent** — an LLM-based agent with access to Freddy-trained Random Forest and Multiple Linear Regression models; predicts insurance claim likelihood, recommends premiums, and suggests accept/deny in plain text. User asks in natural language, the LLM calls the appropriate trained ML model, classifies risk, and explains the recommendation.

### 4. Contact Form (the dynamic piece)
- [ ] Frontend form with client-side validation
- [ ] Wired to Formspree (free tier)
- [ ] Delivery confirmed working end-to-end
- Acceptance: test submission successfully reaches Freddy's inbox; invalid input rejected client-side; a failed submission shows a clear error rather than failing silently; usage stays within Formspree's free 50/month cap

### 5. Resume Viewer (new)
- [ ] "View Resume" button that opens/embeds the PDF in-page (browsers render PDFs natively)
- [ ] Download button/link (HTML `download` attribute) to save the PDF locally
- [ ] PDF served directly from the repo — no external hosting or backend
- Acceptance: viewing and downloading both work on desktop and mobile browsers; PDF reflects the updated resume content

### 6. Deployment Pipeline
- [ ] Existing repo's old Pinegrow-generated site files replaced with new hand-built site
- [ ] Reused assets (headshot, teaching photo) carried over and referenced correctly
- [ ] GitHub Pages deploy confirmed working from the updated repo
- [ ] Custom domain (if applicable) still resolves correctly after the swap
- Acceptance: a code change pushed to the repo is live within the expected build time, no manual deploy steps, old site fully replaced with no broken links

## Build Gates (how compliance actually gets checked)
Verification should come from actual checks, not self-report:
- Lighthouse/accessibility audit for Layout & Styling specs
- A real test submission for the contact form, checked end-to-end, with Formspree usage confirmed within free-tier limits
- Manual check of the resume viewer/download on both desktop and mobile
- GitHub Pages deploy status/logs as the gate for the Deployment spec

## Open Items (not yet resolved)
- Certifications content — need list from Freddy
- Final choice of teaching photo for the Professional Biography section
- Navigation style: single-page anchor nav vs. multi-page

## Workflow Note
This spec is the input to GitHub Spec Kit's pipeline: `/speckit.constitution` → `/speckit.specify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.implement`. When a feature needs to change, edit the relevant section above first, then re-run the affected Spec Kit step — rather than issuing a disconnected ad hoc request to Claude Code directly.
