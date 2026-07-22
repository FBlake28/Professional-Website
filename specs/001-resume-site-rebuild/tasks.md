---

description: "Task list template for feature implementation"
---

# Tasks: Resume Site Rebuild

**Input**: Design documents from `/specs/001-resume-site-rebuild/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/formspree-contact-form.md, quickstart.md

**Tests**: Not requested in spec.md — no automated test framework is used (constitution Principle
I: no build step). Verification instead uses the manual/tool-assisted checks in quickstart.md
(browser checks, Lighthouse, a real Formspree submission) per Principle V.

**Organization**: Tasks are grouped by user story (US1/US2/US3, priorities from spec.md) so each
can be implemented and verified independently. All content lives in one `index.html`
(constitution Principle III), so within a story, tasks touching that same file run sequentially;
tasks touching `css/styles.css` or `js/main.js` are separate files and may run in parallel where
noted.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Every task includes its exact file path

## Path Conventions

Single static site at the repo root (no `src/`, no backend) per plan.md's Structure Decision:

```text
index.html
css/styles.css
js/main.js
assets/resume.pdf
assets/images/blake-2024-profile-pic.png
assets/images/teaching.jpg
```

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Clear out the old Pinegrow-era site and stand up the new file structure.

- [X] T001 Create new directories at repo root: `css/`, `js/`, `assets/images/`
- [X] T002 Move reused assets into `assets/images/`: `blake 2024 profile pic.png` →
      `assets/images/blake-2024-profile-pic.png`, `teaching.jpg` → `assets/images/teaching.jpg`
      (spec.md Assumptions — teaching.jpg is the default teaching photo)
- [X] T003 Delete old Pinegrow-era files and unused root assets: old `index.html`,
      `pinegrow.json`, `tailwind_theme/`, `_pgbackup/`, `desktop.ini`, `coming soon.jpg`,
      `data example.jpg`, `Differentiating Instruction with AI.jpg`,
      `FBlake NJCSS Published Article.pdf`, `github_logo.png`,
      `njcss teaching social studies.jpg`, `NJCSS-Logo.jpeg.webp`,
      `Pros-And-Cons-Of-Business-Analytics.png`, `Website FBlake Profile 2025.jpg`,
      `teaching_social_studies-_vol._23_no.2_summer-fall_2023_v2.pdf` (FR-015; run only after T002
      has moved the two reused assets out)
- [X] T004 [P] Create empty `js/main.js` and link it from a new `index.html` placeholder via
      `<script src="js/main.js" defer></script>`

**Checkpoint**: Old site removed, new directory skeleton in place.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared header/nav/footer skeleton and base styles that every content section and
story depends on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T005 Build the semantic page skeleton in `index.html`: `<header>` with `<nav>` containing one
      anchor link per launched section (`#about`, `#bio`, `#experience`, `#education`,
      `#projects`, `#skills`, `#contact` — no `#certifications` link, per FR-019), a `<main>`
      landmark with one empty `<section id="...">` stub per link, and a `<footer>` (constitution
      Principle III: nav hrefs must match section ids exactly; FR-001, FR-008, FR-020)
- [X] T006 [P] Create `css/styles.css` with: CSS custom properties for the color palette and type
      scale (checked for WCAG AA contrast), a mobile-first base reset, and the three breakpoint
      media queries (375px/768px/1440px) as empty scaffolding (FR-016, constitution Principle IV);
      link it from `index.html` via `<link rel="stylesheet" href="css/styles.css">`
- [X] T007 [P] Implement nav behavior in `js/main.js`: smooth-scroll-to-anchor on click and a
      collapsible/hamburger toggle for the nav at narrow widths (FR-008, FR-020, research.md §4)
- [X] T008 Style the header/nav/footer skeleton in `css/styles.css`: sticky/fixed header, visible
      `:focus` states on all nav links, responsive nav layout at all three breakpoints (FR-016,
      FR-017)

**Checkpoint**: Header, nav (functional), and footer work end-to-end with empty section stubs —
user story implementation can now begin.

---

## Phase 3: User Story 1 - Browse Professional Profile (Priority: P1) 🎯 MVP

**Goal**: A visitor can read About Me, Professional Biography, Experience, Education, Project
Portfolio, and Skills in full, reach any of them from the nav, and view them without breakage at
375px/768px/1440px.

**Independent Test**: Load the site without touching the contact form or resume viewer; confirm
every section's content is present, accurate, reachable via nav, and gives a complete picture of
Freddy's background (per spec.md's Independent Test for US1).

### Implementation for User Story 1

- [X] T009 [US1] Fill the `#about` section in `index.html`: headshot
      (`assets/images/blake-2024-profile-pic.png`) with descriptive `alt` text, plus a short
      intro (FR-002)
- [X] T010 [US1] Fill the `#bio` (Professional Biography) section in `index.html`: longer-form bio
      paired with the teaching photo (`assets/images/teaching.jpg`) with descriptive `alt` text
      (FR-003)
- [X] T011 [US1] Fill the `#experience` section in `index.html` with one entry each for Verisk
      (Business Analyst Intern, Summer 2026), Lightbridge Academy (ML/GenAI Consulting), Fair Lawn
      Public School (history teaching), and Montville Parks and Rec, each with a role/period/
      outcomes description per data-model.md's Experience Entry shape (FR-004)
- [X] T012 [US1] Fill the `#education` section in `index.html` with Stevens Institute of
      Technology (M.S. Business Analytics and AI, expected Dec. 2026) and The College of New
      Jersey (B.A. History and Secondary Education, Summa Cum Laude, Dec. 2023) (FR-005)
- [X] T013 [US1] Fill the `#projects` (Project Portfolio) section in `index.html` with entries for
      Jira Story-Generation Agent, Staff Scheduling Optimizer, Note-Organizing MCP Agent, and
      Insurance Risk Advisor Agent, each with a description, per data-model.md's Project Entry
      shape; cross-reference Jira Story-Generation Agent ↔ Verisk and Staff Scheduling Optimizer ↔
      Lightbridge Academy from T011 (FR-006)
- [X] T014 [US1] Fill the `#skills` section in `index.html` listing at minimum: SQL Server, Scrum,
      Snowflake, Power BI, Tableau, BI Analysis, Python, Excel, Staff Training, Business
      Analytics, Team Management, and OpenAI API (FR-007)
- [X] T015 [US1] Style all six sections from T009–T014 in `css/styles.css`: consistent spacing/
      type scale, image layout for About Me/Bio, responsive card/list layout for Experience/
      Education/Projects/Skills, verified at 375px/768px/1440px (FR-016)
- [X] T016 [US1] Verify User Story 1 per quickstart.md's US1 steps: full content present with no
      placeholder text, every nav link jumps to its section, no horizontal scroll/overlap at
      375px/768px/1440px, full keyboard operability of nav (FR-008, FR-016, FR-017, SC-002,
      SC-006)

**Checkpoint**: User Story 1 is fully functional and independently testable — this is the MVP.

---

## Phase 3B: Content Correction & Expansion (Certifications, Honors & Awards)

**Purpose**: Amend spec.md with corrected/expanded content sourced from Freddy's actual resume
drafts (reviewed in `reference-material/`, gitignored), un-defer Certifications (FR-019), and add
the new Honors & Awards section (FR-021) — all still part of User Story 1's "complete, accurate
professional profile" goal.

- [X] T032 Author `resume-website-project-spec-v3.md` (supersedes v2, removed) documenting the
      corrected Experience dates/figures, renamed Insurance Risk Advisor project, new Twentieth
      Century Women Across Cultures project, expanded Skills list, four Certification clusters +
      Other, Education GPA/honor-society detail, and four Honors & Awards items (no
      high-school-era entries, confirmed with Freddy)
- [X] T033 Amend `specs/001-resume-site-rebuild/spec.md`: FR-001 (add Honors & Awards to section
      order), FR-004 (Verisk dates), FR-005 (Education GPA/honor-society detail), FR-006 (rename
      Insurance Risk Advisor + add Twentieth Century Women Across Cultures), FR-007 (expanded
      Skills incl. SDD), FR-019 (un-defer Certifications, resolved), new FR-021 (Honors & Awards),
      new FR-022 (Contact links); update Key Entities and Assumptions accordingly
- [X] T034 [US1] Correct Verisk's period to "June – August 2026" in `index.html` #experience
      (FR-004)
- [X] T035 [US1] Rename "Insurance Risk Advisor Agent" to "Insurance Risk Advisor" and correct its
      description to an LLM-assisted (not autonomous) workflow in `index.html` #projects (FR-006)
- [X] T036 [US1] Add "Twentieth Century Women Across Cultures" project entry to `index.html`
      #projects (FR-006)
- [X] T037 [US1] Expand `index.html` #skills with the full skill set from
      resume-website-project-spec-v3.md, including "Spec-Driven Development (SDD)" (FR-007)
- [X] T038 [US1] Add GPA and honor-society/club detail to the Stevens and TCNJ entries in
      `index.html` #education (FR-005)
- [X] T039 [US1] Add a new Certifications section to `index.html` (four thematic clusters + one
      Other entry, full titles retained) plus a matching nav link in the header (FR-019)
- [X] T040 [US1] Add a new Honors & Awards section to `index.html` (four items, no high-school
      entries) plus a matching nav link (FR-021)
- [X] T041 [US1] Add GitHub, LinkedIn, and email links to `index.html` #contact, alongside the
      still-unbuilt contact form (FR-022)
- [X] T042 [US1] Style the new Certifications and Honors & Awards sections, expanded Skills tags,
      and Education detail in `css/styles.css`, responsive at 375px/768px/1440px (FR-016)
- [X] T043 [US1] Confirm nav (now 9 links) and mobile toggle in `js/main.js` still work correctly
      with the two new sections — no functional changes required since nav-link handling in
      `initNavToggle()` is generic over `nav a[href^="#"]`
- [X] T044 [US1] Verify all corrections and new sections in-browser via Claude in Chrome: content
      accuracy against source PDFs, nav reachability (9 links), responsive layout, keyboard
      operability — same standard as the Phase 3 checkpoint verification

- [X] T045 [US1] Add "LangGraph" to `index.html` #skills, `spec.md` FR-007, and
      resume-website-project-spec-v3.md's Skills list
- [X] T046 [US3] Redesign the resume viewer as a fixed split-screen panel (right half of viewport,
      full-screen below 768px) in `css/styles.css`, with `js/main.js` syncing a
      `resume-panel-open` class on `<body>` to the `<details>` toggle state, plus a close button
      and Escape-key handling — so "View Resume"/"Download Resume" never change size or position
      when the panel opens (FR-013, FR-016, FR-017)
- [X] T047 [US3] Reflow the rest of the page into the remaining left half while the resume panel
      is open: `padding-right: 50vw` on `body.resume-panel-open` (undone below 768px, where the
      panel is full-screen), plus explicit single-column overrides for `.entry-list` and
      `.cert-cluster-list` — including two ID-scoped 1440px rules (`#experience .entry-list`,
      `#projects .entry-list`) that otherwise out-specificity a class-only override — and
      `flex-wrap: wrap` on the desktop nav so nothing overflows once the content area is halved
      (FR-016, FR-017)

**Checkpoint**: User Story 1's content is now complete, corrected, and expanded per
resume-website-project-spec-v3.md — still independently testable, still ahead of Phase 4.

---

## Phase 4: User Story 2 - Contact Freddy (Priority: P2)

**Goal**: A visitor can submit the contact form and have it delivered to Freddy's inbox via
Formspree, with client-side validation and no silent failures.

**Independent Test**: Submit the contact form with valid data and confirm delivery; submit invalid
data and confirm it's blocked client-side; simulate a delivery failure and confirm a visible error
(per spec.md's Independent Test for US2).

### Implementation for User Story 2

- [X] T017 [US2] Fill the `#contact` section in `index.html`: a `<form>` with labeled `name`,
      `email` (`type="email"`), and `message` fields, all `required`, and a submit button
      (FR-009, data-model.md's Contact Submission shape)
- [X] T018 [US2] Implement client-side validation in `js/main.js`: on submit, check
      `checkValidity()`/required fields and email shape before any network call; on failure, show
      inline error text next to the offending field and stop (FR-010, SC-004,
      contracts/formspree-contact-form.md)
- [X] T019 [US2] Implement the Formspree submission handler in `js/main.js`: `fetch()` POST to the
      Formspree endpoint with `Accept: application/json` per contracts/formspree-contact-form.md,
      using Freddy's Formspree form ID (FR-011)
- [X] T020 [US2] Implement inline success/error UI states in `index.html`/`js/main.js`: show a
      success confirmation and clear the form on `200 OK`; on a Formspree error response or a
      failed `fetch()` (network/offline), show a clear inline error message and retain the
      visitor's typed input (FR-012, Edge Cases)
- [X] T021 [US2] Style the `#contact` form and its validation/success/error states in
      `css/styles.css`, responsive at all three breakpoints, with visible `:focus` states on all
      fields (FR-016, FR-017)
- [X] T022 [US2] Verify User Story 2 per quickstart.md's US2 steps: one real end-to-end Formspree
      test submission confirmed delivered, invalid input blocked with zero network requests (check
      via dev tools), and a simulated failure (bad endpoint or offline) shows a visible inline
      error without clearing input (FR-010, FR-011, FR-012, SC-003, SC-004)

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - View or Download the Resume (Priority: P3)

**Goal**: A visitor can view the resume PDF in-page and download a copy, on both desktop and
mobile.

**Independent Test**: Select "View Resume" and confirm the PDF renders in-page; select "Download"
and confirm a file saves locally; repeat both on a mobile browser (per spec.md's Independent Test
for US3).

### Implementation for User Story 3

- [X] T023 [US3] Add a resume-viewer block to `index.html` (placed in or near `#about`/header per
      visual design): an `<iframe>`/`<embed src="assets/resume.pdf">` for in-page viewing plus an
      `<a href="assets/resume.pdf" download>Download</a>` link (FR-013, FR-014, research.md §1)
- [X] T024 [US3] Style the resume-viewer block in `css/styles.css` for responsive sizing at all
      three breakpoints (FR-016)
- [X] T025 [US3] Obtain Freddy's current resume PDF and place it at `assets/resume.pdf` — a
      content dependency, not a design/code task (research.md §8; blocks T026 below)
- [X] T026 [US3] Verify User Story 3 per quickstart.md's US3 steps on both a desktop and a mobile
      browser: PDF renders in-page, download saves a copy, combined under 10 seconds (FR-013,
      FR-014, SC-005) — cannot be truly verified until T025's real PDF is in place

**Checkpoint**: All three user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Whole-site checks that span all three stories.

- [X] T027 Run a Lighthouse audit against `index.html` covering both the Accessibility and
      Performance categories, and resolve any critical/serious accessibility issues and any
      performance flags attributable to unnecessary script/asset weight (FR-017, FR-018, SC-007)
- [X] T028 Audit `index.html`/`css/styles.css`/`js/main.js` for any absolute or local file paths
      and confirm every asset/internal link is relative (constitution Additional Constraints)
- [X] T029 Confirm the GitHub Pages deploy mechanism already used by
      `FBlake28/Professional-Website` (GitHub Actions vs. `main`/`gh-pages` branch) and push a
      commit to verify the new site goes live with no manual step (Feature 6 acceptance,
      resume-website-project-spec-v2.md)
- [X] T030 Confirm zero old Pinegrow-era pages/assets remain reachable at the live GitHub Pages URL
      after deploy — no stale links, no leftover `_pgbackup`/`tailwind_theme` paths (FR-015,
      SC-008)
- [X] T031 Run the full quickstart.md validation pass end-to-end across all three user stories,
      all three breakpoints, and keyboard-only navigation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately. T003 depends on T002 (move reused
  assets out before deleting the rest).
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories. T008 depends
  on T005 and T006.
- **User Stories (Phase 3–5)**: All depend on Foundational (Phase 2) completion. Within
  `index.html`, story content tasks are sequential (same file); each story's own CSS/JS tasks
  depend on that story's content task(s) existing first.
- **Polish (Phase 6)**: Depends on all three user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: No dependency on other stories — the MVP.
- **User Story 2 (P2)**: Independent of US1's content; shares `index.html`/`css/styles.css`/
  `js/main.js` as files but adds a new section and new JS logic, not a modification of US1's.
- **User Story 3 (P3)**: Independent of US1/US2 content; T025 (sourcing the actual PDF) is a
  content dependency owned by Freddy, not a code dependency.

### Parallel Opportunities

- T006 and T007 (Phase 2) touch different files (`css/styles.css`, `js/main.js`) and can run in
  parallel once T005 is done.
- Once Phase 2 is complete, US1, US2, and US3's *content* tasks all touch `index.html` and are
  therefore not safely parallel with each other if worked by more than one person at once — but
  each story is independently completable in sequence, and T025 (resume PDF sourcing, US3) has no
  code dependency and can happen at any time in parallel with all other work.

---

## Parallel Example: Phase 2 (Foundational)

```bash
# After T005 (page skeleton) is done, these two touch different files:
Task: "Create css/styles.css with design tokens, reset, and breakpoint scaffolding"
Task: "Implement nav smooth-scroll and mobile toggle in js/main.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: run quickstart.md's US1 steps for real
5. Deploy/demo if ready — this alone satisfies the site's primary purpose (spec.md: "the entire
   reason the site exists")

### Incremental Delivery

1. Setup + Foundational → shared skeleton ready
2. User Story 1 → validate → deploy (MVP)
3. User Story 2 → validate with a real Formspree submission → deploy
4. User Story 3 → source the real resume PDF (T025) → validate → deploy
5. Polish phase → Lighthouse, relative-path audit, deploy confirmation, old-site cleanup check

---

## Notes

- No test tasks are included — tests were not requested for this feature; quickstart.md's manual/
  tool-assisted checks are the verification mechanism (constitution Principle V).
- Certifications is intentionally not a task in this list (FR-019) — adding it later means adding
  one `<section id="certifications">` plus one nav link, per data-model.md's Content Section
  notes; not part of this launch.
- T025 (sourcing the real resume PDF) is the one task in this list Freddy must do himself — flag it
  early rather than leaving it for last.
- Commit after each task or logical group; stop at each phase checkpoint to validate independently
  before moving on.
