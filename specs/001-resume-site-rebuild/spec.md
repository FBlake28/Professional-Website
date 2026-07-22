# Feature Specification: Resume Site Rebuild

**Feature Branch**: `001-resume-site-rebuild`

**Created**: 2026-07-17

**Status**: Draft

**Input**: User description: "Build the personal resume website described in resume-website-project-spec-v2.md — all seven content sections, the Formspree contact form, and the in-page resume PDF viewer/download, replacing the existing Pinegrow-generated site entirely."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Professional Profile (Priority: P1)

A prospective employer, client, or collaborator lands on the site and reads through Freddy's
professional profile — About Me, Professional Biography, Experience, Education, Project
Portfolio, Skills, and Certifications — to evaluate his background.

**Why this priority**: This is the entire reason the site exists. A visitor who can't read
accurate, complete content gets zero value regardless of any dynamic feature; everything else is
secondary to this.

**Independent Test**: Load the site without touching the contact form or resume viewer; confirm
every section's content is present, accurate, and reachable via navigation, and on its own gives
a complete picture of Freddy's background.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the site, **When** they scroll or navigate through the page,
   **Then** they can read the About Me, Professional Biography, Experience, Education, Project
   Portfolio, Skills, and Certifications sections in full, with no placeholder or lorem-ipsum text
   remaining.
2. **Given** a visitor uses the site's navigation, **When** they select a section, **Then** they
   are taken directly to that section's content.
3. **Given** a visitor is on a narrow mobile viewport (375px), **When** they view any section,
   **Then** the content lays out without horizontal scrolling or overlapping elements.

---

### User Story 2 - Contact Freddy (Priority: P2)

A visitor interested in reaching out fills out a contact form and successfully sends Freddy a
message without leaving the site.

**Why this priority**: This is the site's one interactive touchpoint and its main call-to-action
for an interested visitor — but the site still delivers its core value (User Story 1) even if
this were unavailable.

**Independent Test**: Submit the contact form with valid data and confirm the message reaches
Freddy's inbox; submit with invalid data and confirm client-side validation blocks it; simulate a
delivery failure and confirm a clear error is shown instead of silent failure.

**Acceptance Scenarios**:

1. **Given** a visitor fills out the contact form with a valid name, email, and message, **When**
   they submit, **Then** the message is delivered to Freddy's inbox and the visitor sees a success
   confirmation.
2. **Given** a visitor leaves a required field blank or enters a malformed email, **When** they
   attempt to submit, **Then** submission is blocked and a validation message is shown without any
   network request being made.
3. **Given** the message fails to reach the delivery service, **When** the visitor submits,
   **Then** they see a clear, visible error message rather than a silent failure.

---

### User Story 3 - View or Download the Resume (Priority: P3)

A visitor wants the traditional resume document itself, not just the page's summary, and can view
it in-page or download a copy.

**Why this priority**: A convenience for visitors (especially recruiters) who want a portable
copy, but the page's own content (User Story 1) already conveys the same information.

**Independent Test**: Select "View Resume" and confirm the PDF renders in-page; select "Download"
and confirm a PDF file saves locally; repeat both on a mobile browser.

**Acceptance Scenarios**:

1. **Given** a visitor selects "View Resume", **When** the PDF loads, **Then** it renders in-page
   without leaving the site or triggering an unexpected download.
2. **Given** a visitor selects "Download", **When** the action completes, **Then** a copy of the
   current resume PDF is saved to their device.
3. **Given** a visitor is on a mobile browser, **When** they use either the view or download
   action, **Then** both work as expected for that platform.

---

### Edge Cases

- What happens when a visitor submits the contact form while offline or the delivery service is
  unreachable? The visitor sees a clear inline error and does not lose the message they typed.
- What happens when a visitor's browser cannot render PDFs inline (e.g. some in-app browsers)?
  The download option must still work as a fallback.
- What happens when the visitor uses only a keyboard (no mouse/touch)? All navigation, the
  contact form, and the resume view/download controls must remain fully operable.
- What happens at very narrow (375px) or very wide (1440px+) viewports? Layout must not break or
  force horizontal scrolling.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST present the following content sections, in order: About Me,
  Professional Biography, Experience, Education, Project Portfolio, Skills, Certifications,
  Honors & Awards, and Contact.
- **FR-002**: System MUST include, in the About Me section, a short introduction paired with
  Freddy's headshot photo.
- **FR-003**: System MUST include, in the Professional Biography section, a longer-form bio
  paired with a photo of Freddy teaching.
- **FR-004**: System MUST list, in the Experience section, at minimum: Verisk (Business Analyst
  Intern, June – August 2026), Lightbridge Academy (ML/GenAI Consulting), Fair Lawn Public School
  (history teaching), and Montville Parks and Rec, each with a description of the role and its
  outcomes.
- **FR-005**: System MUST list, in the Education section, Stevens Institute of Technology (M.S.
  Business Analytics and AI, expected Dec. 2026, with GPA and honor-society/club affiliation per
  resume-website-project-spec-v3.md) and The College of New Jersey (B.A. History and Secondary
  Education, Summa Cum Laude, Dec. 2023, with GPA and honor-society affiliations per
  resume-website-project-spec-v3.md). No high-school or student-teaching-era entries are included.
- **FR-006**: System MUST list, in the Project Portfolio section, at minimum: Jira
  Story-Generation Agent, Staff Scheduling Optimizer, Note-Organizing MCP Agent, Insurance Risk
  Advisor, and Twentieth Century Women Across Cultures, each with a description of what it does.
  Insurance Risk Advisor MUST be described as an LLM-assisted workflow that presents a
  recommendation for a human to act on, not as an autonomous agent that itself approves or denies
  anything.
- **FR-007**: System MUST list, in the Skills section, at minimum the expanded skill set defined
  in resume-website-project-spec-v3.md, including SQL Server, Scrum, Snowflake, Power BI, Tableau,
  BI Analysis, Python, Excel, Staff Training, Business Analytics, Team Management, OpenAI API,
  Spec-Driven Development (SDD), and LangGraph.
- **FR-008**: System MUST provide a way for a visitor to navigate directly to each content section
  from anywhere on the page.
- **FR-009**: System MUST provide a contact form capturing at minimum a visitor's name, email, and
  message.
- **FR-010**: System MUST validate contact form input on the client side before submission
  (required fields present, email address well-formed) and block submission with a visible
  message when invalid.
- **FR-011**: System MUST deliver valid contact form submissions to Freddy's inbox via the
  Formspree service.
- **FR-012**: System MUST show the visitor a clear success confirmation after a successful
  submission and a clear error message after a failed one — submissions MUST NOT fail silently.
- **FR-013**: System MUST provide a way to view the current resume PDF in-page without navigating
  away from the site.
- **FR-014**: System MUST provide a way to download a copy of the current resume PDF to the
  visitor's device.
- **FR-015**: System MUST replace the existing Pinegrow-generated site entirely — no page, asset,
  or generated markup from the prior site may remain live once this feature ships.
- **FR-016**: System MUST remain fully usable and readable at mobile, tablet, and desktop viewport
  widths, with no horizontal scrolling or broken layout at 375px, 768px, and 1440px.
- **FR-017**: System MUST meet baseline accessibility expectations: semantic HTML structure,
  meaningful alternative text for images, a logical heading hierarchy, sufficient color contrast,
  and full keyboard operability for all interactive elements (navigation, form, resume
  view/download).
- **FR-018**: System MUST load quickly, using static assets and minimal script, with no
  perceptible delay attributable to unnecessary script weight.
- **FR-019**: **Resolved** — Certifications content is now available (see
  resume-website-project-spec-v3.md). System MUST include the Certifications section at launch,
  organized into the four thematic clusters plus one "Other" entry defined there, with full
  course/credential titles retained (not condensed or paraphrased).
- **FR-020**: System MUST use a single scrolling page with anchor-link navigation between
  sections (not separate pages per section).
- **FR-021**: System MUST include an Honors & Awards section listing the four honors/awards
  defined in resume-website-project-spec-v3.md (History Department Outstanding Student Teacher
  Award, Provost Master's Scholarship, TCNJ Honors Program Scholarship, and Dean's List for all 7
  semesters), each attributed to its institution. High-school-era awards are explicitly excluded.
- **FR-022**: System MUST include, in the Contact section, direct links to Freddy's GitHub
  profile (github.com/FBlake28), LinkedIn profile (linkedin.com/in/fblake28), and email address
  (frederick.blake20@gmail.com), alongside the contact form.

### Key Entities

- **Visitor**: A person browsing the site. Not authenticated; no account or profile is stored.
- **Content Section**: A named block of resume content (About Me, Professional Biography,
  Experience, Education, Project Portfolio, Skills, Certifications) with a title and body content.
- **Experience Entry**: An organization, role/title, time period, and description of outcomes.
- **Project Entry**: A name and description of what it does; may cross-reference a related
  Experience Entry.
- **Contact Submission**: A visitor-provided name, email, and message sent via the contact form to
  Freddy's inbox through Formspree; not stored by the site itself.
- **Resume Document**: The single current PDF resume file, viewable in-page and downloadable.
- **Certification Entry**: A course/credential title grouped into one of four thematic clusters
  (or the "Other" cluster), per resume-website-project-spec-v3.md. Titles are shown in full, not
  condensed.
- **Honors & Award Entry**: A title and the awarding institution, limited to the four
  post-secondary items defined in resume-website-project-spec-v3.md.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A visitor can read every launched content section and come away with a complete
  understanding of Freddy's professional background without leaving the page or downloading
  anything.
- **SC-002**: A visitor can reach any content section from anywhere on the page in one navigation
  action.
- **SC-003**: At least 95% of well-formed contact form submissions are successfully delivered to
  Freddy's inbox, verified by real end-to-end test submissions.
- **SC-004**: 100% of invalid contact form submissions (missing required field or malformed email)
  are blocked client-side before any network request is made.
- **SC-005**: A visitor can both view the resume in-page and download a copy, combined, in under
  10 seconds, on both a desktop and a mobile browser.
- **SC-006**: The site displays with no horizontal scrolling or visually broken layout at 375px,
  768px, and 1440px viewport widths.
- **SC-007**: The site passes an automated accessibility audit (e.g. Lighthouse) with no
  critical/serious issues.
- **SC-008**: Zero pages, assets, or references from the prior Pinegrow-generated site remain
  reachable after launch.

## Assumptions

- The teaching photo for the Professional Biography section defaults to `teaching.jpg`; final
  art-direction choice among the candidate photos can be swapped in later without a spec change,
  since it doesn't affect scope or behavior.
- Contact form fields are limited to name, email, and message — no phone number, subject line, or
  file attachment — matching a typical personal-site contact form and Formspree's free-tier setup.
- No contact submissions are stored by the site itself beyond what Formspree retains on its own
  dashboard.
- "The site" refers to a single production deployment (GitHub Pages); there is no separate
  staging environment in scope.
- Existing repo assets not explicitly reused (old Pinegrow backups, unused images, `desktop.ini`,
  etc.) are removed as part of this feature's "replace entirely" requirement (FR-015).
- Navigation defaults to a single-page anchor-link structure (FR-020), consistent with the prior
  site's pattern, rather than a multi-page structure — this is reversible later without changing
  the feature's scope.
- **resume-website-project-spec-v3.md** supersedes v2 as the source project spec (v2 has been
  removed). Certifications (FR-019) is no longer deferred — real content was supplied and
  reviewed by Freddy directly, resolving the prior content-gathering gap. Honors & Awards (FR-021)
  is new scope added in this revision, deliberately excluding high-school-era items per Freddy's
  explicit confirmation.
