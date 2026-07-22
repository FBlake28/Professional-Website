# Project Spec: Resume Website (SDD Practice Project) — v3

## Revision Note

This is v3, replacing `resume-website-project-spec-v2.md` (removed — v3 supersedes it entirely).
Changes from v2, made after Freddy reviewed his actual resume drafts and a supplementary context
document (kept locally in `reference-material/`, gitignored, never committed) against what was
built in Phases 1–3:

- Corrected Experience content: Fair Lawn Public School and Montville Parks & Rec now use real
  source wording (v2 had reconstructed/inferred text, since corrected). Verisk's period corrected
  to June – August 2026 (a fixed-length internship, not open-ended). Fair Lawn's SGO metric
  confirmed as 783% (the accurate figure — a "78%" variant appearing in one source document is a
  typo, not the true number).
- Renamed "Insurance Risk Advisor Agent" to **"Insurance Risk Advisor"** and corrected its
  description: it's an LLM-assisted workflow that calls a trained ML model and returns a
  recommendation for a human to act on — not an autonomous agent that itself approves or denies
  anything.
- Added "Twentieth Century Women Across Cultures" (published academic work) to Project Portfolio.
- Expanded the Skills section, including adding "Spec-Driven Development (SDD)" explicitly.
- Un-deferred Certifications (real content now available) — organized into four thematic clusters
  plus one "Other" entry, full titles retained (not condensed).
- Added a new top-level **Honors & Awards** section (previously out of scope).
- Education section: added GPA and honor-society/club detail for Stevens and TCNJ; explicitly
  **not** adding high-school or student-teaching-era entries.
- Contact: added GitHub, LinkedIn, and email links alongside the existing contact form.
- **Resolved**: Honors & Awards excludes all high-school-era entries (Montville High School's
  President's Award of Academic Excellence, Visual Arts Award, History Award) — consistent with
  the same exclusion in Education. The section lists four post-secondary honors instead.

## Purpose of This Document

This file is the project-level spec for a personal resume website, built as hands-on practice with
spec-driven development (SDD). It guides setup and development for this repo — not just a task
list to execute silently.

### Instructions for the assistant in this project

- The user (Freddy) is new to SDD and is using this project specifically to learn it, not just to
  ship a website fast. Explain concepts as they come up rather than rushing through steps silently
  — but don't over-explain unprompted tangents.
- This project uses GitHub Spec Kit for the SDD workflow (`/speckit-*` commands: constitution →
  specify → plan → tasks → implement). Since implementation is already underway, prefer amending
  Spec Kit's existing `spec.md`/`tasks.md` over full regeneration where that would discard
  completed task-tracking.
- Feature specs below are checklists — verify acceptance criteria for real (browser checks,
  Lighthouse, an actual Formspree submission, deploy logs) rather than declaring something done
  without checking it.
- When a feature needs to change, edit the relevant feature spec section here first, then
  amend the affected Spec Kit artifacts.

## Goal

Build and deploy a personal resume/portfolio website end-to-end, replacing the prior
Pinegrow-generated GitHub Pages site with one built and understood layer-by-layer.

## Scope Decision

**Static site + a third-party contact form service** (not fully static, not a self-hosted
backend). A third-party form service (Formspree) gets a working, real contact form without a
backend to maintain, while still practicing the "connect to an external service" pattern.

## Non-Negotiables (Constraints)

- Mobile responsive
- Accessible (semantic HTML, reasonable contrast, keyboard navigable)
- Fast load (static assets, minimal JS bloat)
- No backend/server to maintain long-term
- No ongoing cost — every third-party service used must stay within its free tier
- Content demo-able without ongoing maintenance burden
- **Factual accuracy over narrative convenience** — figures and dates on the site must match
  Freddy's actual source material; if a number is unflattering or a role feels less relevant, the
  fix is presentation (placement, emphasis, brevity), never altering the figure itself.

## Hosting & Repo Decisions (resolved)

- **Hosting**: GitHub Pages (static-only), same repo (`FBlake28/Professional-Website`)
- **Assets**: `assets/images/blake-2024-profile-pic.png` (headshot), `assets/images/teaching.jpg`
  (Professional Biography photo) — already in place. All other legacy repo assets cleared out.
- **Contact form**: Formspree (free tier), endpoint `https://formspree.io/f/mdaqdble`, implemented
  via a plain `fetch()` POST with `Accept: application/json` — no `@formspree/ajax` library or
  other external script dependency (constitution Principle I).

## Architecture / Stack Decisions (resolved)

- **Frontend**: Plain HTML/CSS/JS — no framework, no build step.
- **File structure**: `index.html`, `css/styles.css`, `js/main.js`, `assets/images/`,
  `assets/resume.pdf` (not yet supplied).
- **SDD tooling**: GitHub Spec Kit (`specify` CLI). Constitution ratified at v2.0.0.
- **Resume file**: PDF at `assets/resume.pdf`, no external hosting — Freddy is revising it before
  supplying it; this blocks only Feature 5, not the rest of the build.

## Feature Specs (checklist + acceptance criteria each)

### 1. Layout & Structure — built (Phase 1–2)

- [x] Semantic HTML skeleton (header, nav, main landmark, footer)
- [x] Single-page anchor navigation
- Acceptance: passes basic accessibility check (semantic tags, alt text, heading hierarchy) —
  verified in-browser via Claude in Chrome

### 2. Styling System — built (Phase 2–3)

- [x] Design-token CSS (colors checked for WCAG AA contrast, type scale, spacing)
- [x] Responsive breakpoints at 375px / 768px / 1440px
- Acceptance: no horizontal scroll or broken layout at those breakpoints — verified with real
  device-emulated screenshots at 412px (mobile) and 768px (tablet) via Lighthouse's CDP-driven
  rendering (the Claude in Chrome extension's `resize_window` tool doesn't actually resize the
  rendering viewport in this environment, confirmed across repeated attempts across phases;
  Lighthouse's own Chrome launch sidesteps that limitation entirely), plus desktop verified
  directly throughout earlier phases. All three breakpoints now genuinely confirmed.

### 3. Content Sections (expanded to 9: About Me, Professional Biography, Experience, Education, Project Portfolio, Skills, Certifications, Honors & Awards, Contact)

- [x] **About Me** — built
- [x] **Professional Biography** — built
- [x] **Experience** — built, corrected this revision (SGO figure confirmed, Verisk dates fixed)
- [x] **Education** — built; this revision adds GPA/honor-society detail (no high-school or
      student-teaching-era entries)
- [x] **Project Portfolio** — built, corrected this revision (Insurance Risk Advisor rename/
      description fix, new published-work entry)
- [ ] **Skills** — expanded this revision, see below
- [ ] **Certifications** — new this revision, four clusters + one Other entry, full titles retained
- [ ] **Honors & Awards** — new top-level section this revision, four items, no high-school entries
- [ ] **Contact** — GitHub/LinkedIn/email links added this revision; contact form itself is
      Feature 4, not yet built
- Acceptance: content matches Freddy's verified source material — no reconstructed/inferred
  content where real source text exists

**Corrected Experience content:**

- **Verisk — Business Analyst Intern, June – August 2026:** Optimized a Scrum team's workflow;
  built a Jira story-generation agent using Claude that lets project owners quickly define user
  stories and new features, enabling spec-driven development within the team.
- **Lightbridge Academy — ML/GenAI Consultant:** Built a staff scheduling optimizer that predicts
  classroom attendance with under a 3% failure rate and reduces staffing costs by 3%+ per center
  annually (six figures company-wide), while keeping project cost minimal by using pre-paid
  subscription services the company already had.
- **Fair Lawn Public School — High School History Teacher, Sep. 2024 – Jun. 2025:** Designed and
  delivered professional development ("Differentiation with Artificial Intelligence") focused on
  leveraging AI in education; trained 70+ educators across two sessions and was re-invited based
  on program impact. Increased Student Growth Objective (SGO) scores by **783%** by designing/
  implementing targeted instructional interventions.
- **Montville Township Parks and Recreation Department — Assistant Director, Head Counselor,
  Counselor, Summers 2017–2025:** Redesigned data collection and reporting workflows, reducing
  administrative labor hours by more than 100%. Managed daily scheduling and resource allocation
  for 100+ participants and staff using Excel and Google Workspace, adjusting operations to meet
  evolving program demands. Led seasonal staff training and streamlined communication between
  administrative and program teams to improve operational coordination.

**Corrected/expanded Project Portfolio content:**

- **Jira Story-Generation Agent** (Verisk) — unchanged.
- **Staff Scheduling Optimizer** (Lightbridge Academy) — unchanged.
- **Note-Organizing MCP Agent** — unchanged.
- **Insurance Risk Advisor** *(renamed from "Insurance Risk Advisor Agent")* — an LLM-assisted
  workflow, not an autonomous agent: a user describes a driver in natural language, the LLM calls
  a trained ML model (Random Forest or Multiple Linear Regression), the model returns a predicted
  claim likelihood and premium, and the LLM presents a recommendation for a human to act on. It
  does not itself approve or deny anything.
- **Twentieth Century Women Across Cultures** *(new — published academic work)* — research
  published in *Teaching Social Studies*, Vol. 23, No. 2, pp. 123–129.

**Skills (expanded):**

SQL Server, Scrum, Snowflake, Power BI, Tableau, BI Analysis, Python, Excel, Staff Training,
Business Analytics, Team Management, OpenAI API, **Spec-Driven Development (SDD)**, Model Context
Protocol (MCP), Agentic AI Development, LangChain, Retrieval-Augmented Generation (RAG), Vector
Databases (FAISS, ChromaDB), LangGraph, Data Analysis, Artificial Intelligence (AI), Technology
Integration, Statistics, Leadership, Cross-Team Collaboration.

**Certifications (four clusters + one "Other" entry, full titles retained, not condensed):**

*AI & Agentic Systems Development*
Unboxing AI: Visual Studio Code and GitHub Copilot Deep Dive · Agentic AI: Build Your First
Agentic AI System · Model Context Protocol (MCP): Hands-On with Agentic AI · Agentic AI
Fundamentals: Architectures, Frameworks, and Applications · Building AI Agents for Beginners by
Microsoft · Build Multimodal Generative AI Applications · Advanced RAG with Vector Databases and
Retrievers · Vector Databases for RAG: An Introduction · Build RAG Applications: Get Started ·
Develop Generative AI Applications: Get Started · Machine Learning Foundations: Calculus ·
Machine Learning Foundations: Linear Algebra

*Business Analytics, Data & Excel*
Google Data Analytics Professional · Introduction to SQL · Intermediate SQL · Coding for Data ·
Python Essential Training · Python Intermediate · Programming Foundations: Numerical Mathematics
and Calculations · Complete Guide to Excel Statistics with Copilot · Excel: Analytics Tips ·
Excel: Using Solver for Decision Analysis · Excel: Dashboards for Beginners · Excel Copilot:
Working with Formulas and Functions · Microsoft Copilot for Excel · Agile Business Analysis

*AI-Assisted Productivity & Project Tooling*
Learning Microsoft 365 Copilot for Work · Learning Microsoft 365 Copilot Chat (Free Version) ·
Learning Git and GitHub · Introduction to Web APIs · Agile Project Management with Jira Cloud: 1
Projects, Boards, and Issues · Agile Project Management with Jira Cloud: 2 Lean and Agile
Processes · Spec-Driven Development with GitHub Spec Kit

*Education & Instructional Credentials*
Social Studies Instructional CEAS · Google Workspace for Education Fundamentals, Intermediate
Level · Youth Mental Health First Aid · Substitute Teacher – Five Year License

*Other*
Stevens Business + AI Faculty Lecture Series

**Education detail (GPA & honor-society info, no high-school or student-teaching-era entries):**

- **Stevens Institute of Technology** — GPA: 3.86/4.0. Business Intelligence and Analytics Club
  member.
- **The College of New Jersey** — GPA: 3.95/4.0. Member: Kappa Delta Pi (Education Honors
  Society), Phi Alpha Theta (History Honors Society), Phi Kappa Phi (Multidisciplinary Honors
  Society).

**Honors & Awards (new section — four items, no high-school entries, confirmed with Freddy):**

1. **History Department Outstanding Student Teacher Award** — The College of New Jersey, Class of
   2023–2024.
2. **Provost Master's Scholarship** — Stevens Institute of Technology. Awarded to exceptional
   students entering Stevens to pursue a master's degree full-time; a one-time tuition scholarship
   awarded at admission.
3. **TCNJ Honors Program Scholarship** — The College of New Jersey.
4. **Dean's List, all 7 semesters** — The College of New Jersey.

Montville High School's awards (President's Award of Academic Excellence, Visual Arts Award,
History Award) are excluded as high-school-era and out of scope — resolved per Freddy's
confirmation.

### 4. Contact Form (the dynamic piece) — built

- [x] Frontend form markup + client-side validation
- [x] Wired to Formspree via plain `fetch()` (endpoint `https://formspree.io/f/mdaqdble`)
- [x] Delivery confirmed working end-to-end (real test submission sent and returned `200 OK`,
      verified via Claude in Chrome network inspection)
- [x] GitHub (`github.com/FBlake28`), LinkedIn (`linkedin.com/in/fblake28`), and email
      (`frederick.blake20@gmail.com`) links added alongside the form
- Acceptance: test submission successfully reaches Freddy's inbox; invalid input rejected
  client-side; a failed submission shows a clear error rather than failing silently; usage stays
  within Formspree's free 50/month cap

### 5. Resume Viewer (new) — built

- [x] "View Resume" button (native `<details>`/`<summary>` disclosure as the base interaction,
      progressively enhanced by JS) opens a fixed split-screen panel: resume on the right half of
      the viewport (full-screen below 768px), "View Resume"/"Download Resume" buttons stay in
      place on the left at a constant size — redesigned after initial feedback that the buttons
      were stretching/moving and the PDF preview was too small
- [x] Download link (HTML `download` attribute)
- [x] PDF served directly from the repo at `assets/resume.pdf` — supplied by Freddy
- [x] Close button and Escape-key handling, with focus returned to the toggle button on close
- Acceptance: in-page viewing verified in-browser via Claude in Chrome — split-panel layout,
      button size/position stability (confirmed via `getBoundingClientRect()` before/after
      toggling), close button, and Escape key all verified working. Desktop confirmed directly;
      the base page's mobile/tablet layout is now genuinely confirmed via real device-emulated
      screenshots (see Feature 2), but the specific combination of "resume panel open at mobile
      width" is still code-review-only, not screenshot-verified — the full-screen-below-768px CSS
      rule mirrors the desktop version that was verified directly, so risk is low, but flagging it
      as the one remaining narrower gap rather than claiming it's fully confirmed. No-JS fallback
      (native `<details>` inline expand) preserved as a graceful degradation path.

### 6. Deployment Pipeline — not started

- [x] Existing repo's old Pinegrow-generated site files replaced (Phase 1)
- [x] Reused assets carried over and referenced correctly (Phase 1)
- [ ] GitHub Pages deploy confirmed working from the updated repo
- [ ] Custom domain (if applicable) still resolves correctly after the swap
- Acceptance: a code change pushed to the repo is live within the expected build time, no manual
  deploy steps, old site fully replaced with no broken links

## Build Gates (how compliance actually gets checked)

- Lighthouse audit (Accessibility **and** Performance categories) — run 2026-07-21: Accessibility
  100/100 at desktop, 768px (tablet), and 412px (mobile, real device emulation); Performance
  88-89/100 locally, with the gap attributable to the local Python dev server (no HTTP caching/
  compression/HTTP2) and the inherent bf-cache exclusion of embedding a PDF, not to code defects —
  see full findings in the Phase 6 conversation notes
- A real test submission for the contact form, checked end-to-end, with Formspree usage confirmed
  within free-tier limits — done (200 OK response, delivered)
- Manual check of the resume viewer/download on both desktop and mobile — desktop confirmed
  directly; mobile confirmed for the base page layout, resume-panel-open-at-mobile-width
  specifically remains code-review-only (see Feature 5 note)
- GitHub Pages deploy status/logs as the gate for the Deployment spec — not yet run, pending
  Freddy's go-ahead to commit/push (nothing committed yet this implementation pass)
- Device/breakpoint check at 375px/768px/1440px — resolved via Lighthouse's real device-emulated
  screenshots at 412px and 768px, plus desktop verified directly throughout

## Open Items (not yet resolved)

- Custom domain status (if any) — not yet discussed
- Whether to commit this work as one commit or several logical commits, and when to push/deploy —
  Freddy's call, not yet made
- Future idea (not in current scope): a second page or dedicated sub-page for longer lists (full
  certifications, extended project write-ups) — deferred, would require revisiting the
  single-page/no-framework architecture decision

## Workflow Note

This spec is the input to GitHub Spec Kit's pipeline. Since implementation is underway (Phases 1–3
complete on branch `001-resume-site-rebuild`), changes described here are applied by amending
Spec Kit's existing `specs/001-resume-site-rebuild/spec.md` and `tasks.md` directly, not by
re-running `/speckit-specify` from scratch.
