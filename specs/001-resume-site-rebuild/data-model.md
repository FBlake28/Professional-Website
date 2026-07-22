# Phase 1 Data Model: Resume Site Rebuild

There is no database or runtime data store (constitution Principle II/III) — every entity below is
a *content structure* authored directly in `index.html`, not a persisted record. This document
maps each Key Entity from spec.md to its concrete markup shape so Phase 2 tasks can implement
against a shared structure.

## Content Section

Represents one named block of resume content and its corresponding nav link.

| Field | Type | Notes |
|---|---|---|
| `id` | string (HTML `id` attr) | Must exactly match the `href="#id"` used by the nav link (constitution Principle III). |
| `title` | string | Rendered as the section's heading (`<h2>`). |
| `order` | integer (implicit, via document order) | About Me, Professional Biography, Experience, Education, Project Portfolio, Skills, [Certifications — omitted, FR-019], Contact — fixed order per FR-001/FR-020. |
| `body` | HTML | Hand-authored content specific to each section; see Experience Entry / Project Entry below for the two sections with repeated sub-structure. |

**Validation rules**: `id` must be unique on the page and non-empty; every `id` used here must have
a matching nav `<a href="#id">` (and vice versa) — this is checked manually, not enforced by code,
since there's no build step to lint it.

**Instances at launch**: `about`, `bio`, `experience`, `education`, `projects`, `skills`,
`contact`. No `certifications` instance exists yet (FR-019) — adding one later means adding a new
`<section id="certifications">` plus one matching nav link, no structural change elsewhere.

## Experience Entry

A repeated sub-structure inside the Experience section.

| Field | Type | Notes |
|---|---|---|
| `organization` | string | e.g. "Verisk". |
| `role` | string | e.g. "Business Analyst Intern". |
| `period` | string | e.g. "Summer 2026". |
| `description` | string/HTML | Outcome-focused description (FR-004). |

**Instances at launch** (FR-004, spec.md content): Verisk (Business Analyst Intern, Summer 2026);
Lightbridge Academy (ML/GenAI Consulting); Fair Lawn Public School (history teaching); Montville
Parks and Rec.

## Project Entry

A repeated sub-structure inside the Project Portfolio section.

| Field | Type | Notes |
|---|---|---|
| `name` | string | e.g. "Jira Story-Generation Agent". |
| `description` | string/HTML | What the project does (FR-006). |
| `relatedExperienceId` | string, optional | Informal cross-reference to an Experience Entry (e.g. a same-page link or shared wording) — not a hard foreign key, since there's no data layer; per spec.md, Jira Story-Generation Agent relates to Verisk and Staff Scheduling Optimizer relates to Lightbridge Academy. |

**Instances at launch** (FR-006): Jira Story-Generation Agent, Staff Scheduling Optimizer,
Note-Organizing MCP Agent, Insurance Risk Advisor Agent.

## Contact Submission

Transient client-side state only — never persisted by the site (spec.md Assumptions).

| Field | Type | Notes |
|---|---|---|
| `name` | string | Required (FR-009/FR-010). |
| `email` | string | Required, must be well-formed (FR-010). |
| `message` | string | Required (FR-009). |

**State transitions** (client-side UI state, not stored data):

```text
[empty form] --fills fields--> [filled, unvalidated]
[filled, unvalidated] --submit attempt-->
    invalid  --> [blocked: inline validation error shown, no network request] (FR-010, SC-004)
    valid    --> [submitting] --fetch() to Formspree-->
                    success --> [success confirmation shown] (FR-012)
                    failure --> [error message shown, form values retained] (FR-012, Edge Cases)
```

## Resume Document

| Field | Type | Notes |
|---|---|---|
| `path` | string (relative) | `assets/resume.pdf` — single current file, no versioning (FR-013/FR-014). |
| `viewAction` | UI affordance | `<iframe>`/`<embed>` pointing at `path`, rendered in-page. |
| `downloadAction` | UI affordance | `<a href="path" download>` link. |

**Note**: content dependency — see research.md § 8. The file does not exist in the repo yet.

## Visitor

Not a stored entity — no account, session, or profile (spec.md Key Entities). Included here only
for completeness; no schema/fields to design.
