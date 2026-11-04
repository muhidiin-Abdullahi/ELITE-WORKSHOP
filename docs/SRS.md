# Software Requirements Specification (SRS)

## ELITE WORKSHOP LTD — Corporate Website

| Document | Details |
|----------|---------|
| **Version** | 1.0 (Draft) |
| **Status** | Requirements definition — implementation not started |
| **Reference** | `docs/BRD.md` v1.0 (Draft, pending business owner validation) |
| **Technology constraints (implementation phase)** | Next.js (TypeScript), Node.js (Express.js), MongoDB, Tailwind CSS |

---

## 1. Document Overview

This Software Requirements Specification translates business requirements from the Business Requirements Document (`docs/BRD.md`) into testable software requirements for a public marketing website with inquiry capture (contact and quotation request).

**Scope of this document:** Page behavior, functional requirements, data and logical API expectations, non-functional requirements, error handling, traceability, MVP vs. future features.

**Out of scope for this document:** UI/visual design, technical architecture, database schemas, endpoint paths, and application code.

### 1.1 BRD review summary

| Topic | Finding |
|-------|---------|
| **Business objectives** | BO-01 through BO-05 (awareness, clarity, trust, inquiries, scalable content) |
| **MVP pages** | Home, About, Services (+4 detail), Portfolio (or BR-004 placeholder), Contact, Request a Quote, Privacy Policy |
| **Must Have BRs** | BR-001–BR-009, BR-019, BR-020 |
| **Assumptions** | ASM-001–ASM-005; constraints CON-001–CON-003 |
| **Unresolved business facts** | Contact details, service copy, portfolio assets, Decorated Furniture definition, privacy/legal, retention |
| **BRD formal acceptance** | BRD Section 19 (AC-01–AC-08) not yet recorded as satisfied; SRS proceeds from BRD v1.0 as the authoritative business baseline |

### 1.2 Ambiguities and contradictions (explicit)

| Item | Description | SRS handling |
|------|-------------|--------------|
| **Portfolio Must Have vs. launch without projects** | BR-003 requires portfolio when publishing; BR-004 requires a non-fake empty/placeholder state if portfolio is not ready | Software supports **both modes**: populated portfolio **or** approved empty state (config/content flag). No fictional projects. |
| **Contact vs. quotation inquiries** | BR-006 details quotation form; BR-005 emphasizes verified contact details. BRD in-scope list includes general “contact” | SRS includes a **Contact inquiry** form (simpler) distinct from **Quotation request** (structured per BR-006). Both map to lead capture; delivery mechanism TBD. |
| **WCAG version** | BRD NFR-003 references WCAG 2.1 Level AA | SRS adopts **WCAG 2.2 Level AA** as the **proposed** target per project instruction; traceability notes alignment with BRD intent |
| **Portfolio filtering** | BR-012 is Should Have; BRD Section 16.2 suggests post-MVP if not in MVP | Default **MVP:** list/grid without filter; **Should Have (MVP+):** client-side or query-param filter by service slug |
| **Admin / CMS** | BRD out-of-scope for admin dashboard; NFR-008 asks how content is maintained | MVP content assumed **developer-maintained** (static/structured data). **Decision required** before treating portfolio/services as DB-managed editorial content (see DEC-001) |
| **Terms of Use** | BRD Should Have, not listed in Section 16.1 MVP bullet list | SRS classifies Terms of Use as **Should Have** (not blocking MVP launch unless legal requires) |

No silent changes to Must Have business requirements. Where software design choices are pending, they are flagged as **proposed** or **unresolved**.

---

## 2. Purpose and Scope

### 2.1 Purpose

Define verifiable software behavior for:

- Public content presentation (company, services, projects)
- Navigation and calls to action
- Contact and quotation inquiry submission and persistence/notification
- Error, empty, and edge-case behavior
- Non-functional qualities (performance, accessibility, SEO, security, privacy)

### 2.2 In scope (software)

| Area | Description |
|------|-------------|
| Public website pages | As specified in Section 6–7 |
| Forms | Contact inquiry; quotation request |
| Portfolio | Listing and detail views when content exists; empty state per BR-004 |
| Backend operations | Logical submit-inquiry operations (implementation in architecture phase) |
| SEO & accessibility | Metadata, structure, sitemap/robots (behavioral requirements) |

### 2.3 Out of scope (software)

Per BRD Section 17 and project brief:

- E-commerce, payments, carts, inventory
- Authentication, customer accounts, employee portals
- Admin dashboard, full CRM, booking systems (unless later approved)
- Automated quotation pricing or order confirmation

### 2.4 References

| Document | Version | Relationship |
|----------|---------|--------------|
| `docs/BRD.md` | 1.0 | Source of business requirements BR-xxx, BO-xxx, ASM-xxx, CON-xxx |

---

## 3. Overall Product Description

The product is a **server-rendered or hybrid-rendered** public website (Next.js) communicating with a **Node.js/Express** backend for form submissions, optionally reading **MongoDB** for inquiries and optionally for portfolio/service content depending on DEC-001.

**Confirmed service taxonomy (slugs proposed for routing — labels from owner content):**

| Slug (proposed) | Display name (BRD) | Owner copy status |
|-----------------|-------------------|-------------------|
| `pvc-works` | PVC Works | **Unconfirmed** |
| `aluminium-works` | Aluminium Works | **Unconfirmed** |
| `kitchen-furniture` | Kitchen Furniture | **Unconfirmed** |
| `decorated-furniture` | Decorated Furniture | **Unconfirmed** (definition critical — BR-019) |

---

## 4. User Types

| Actor | Description | Authentication | Permissions |
|-------|-------------|----------------|-------------|
| **Public visitor** | Anyone browsing the site | None | Read public pages; submit contact/quote forms subject to validation and rate limits |
| **Prospective customer** | Visitor intending to inquire | None | Same as public visitor (not a separate system role) |
| **Inquiry recipient** | Owner/staff receiving leads (e.g., email inbox) | Outside website | Receive notifications or retrieve stored submissions per operational process **(TBD)** |

**Explicitly excluded from MVP:** Administrator login, content editor roles, customer accounts.

| Decision ID | Topic | Status |
|-------------|-------|--------|
| DEC-001 | Persist portfolio/services in MongoDB vs. static content files | **Unresolved** — MVP can ship with static/structured content; MongoDB required at minimum for inquiry storage if not using email-only |
| DEC-002 | Inquiry delivery: email only, DB only, or email + DB | **Unresolved** |

---

## 5. Website Sitemap

### 5.1 MVP sitemap (aligned with BRD Section 16)

```
/                          Home
/about                     About Us
/services                  Services overview
/services/[serviceSlug]    Service detail (×4)
/projects                  Portfolio listing
/projects/[projectSlug]    Project detail (when projects exist)
/contact                   Contact Us
/quote                     Request a Quote
/privacy                   Privacy Policy
/*                         Custom 404 (unknown routes)
```

### 5.2 Should Have / future (BRD)

| Route | Priority | Notes |
|-------|----------|-------|
| `/terms` | Should Have | Terms of Use |
| `/faq` | Should Have / Could | Global FAQ (BR-011) |
| `/blog`, `/blog/[slug]` | Could Have | BR-017 |

### 5.3 SRS addition: Custom 404

The BRD does not list a 404 page; adding **Custom 404** is a **software engineering recommendation** for professional UX (navigation home, contact/quote links). It does **not** expand business scope beyond a public marketing site.

---

## 6. Page Specifications

For each page: purpose, audience, content sections, actions, linked FRs, navigation, responsive/accessibility notes, acceptance criteria.

---

### 6.1 Home (`/`)

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | First impression; route users to services, portfolio, and inquiry CTAs (BR-001, BO-04) |
| **Audience** | All target segments (hypothesis per BRD Section 7) |
| **Content sections (MVP)** | Header/nav; hero with primary CTA(s); services overview (four categories); featured projects **or** omitted/placeholder per BR-004; brief company intro (owner-approved or minimal placeholder text approved by owner); footer (BR-020) |
| **Trust content** | Only owner-provided assets (no invented testimonials/awards — BR-015 future) |
| **User actions** | Navigate to services, portfolio, about, contact, quote; click tel/mailto/WhatsApp **when configured** |
| **Functional** | FR-010–FR-014, FR-040–FR-042 |
| **Internal links** | All main nav destinations; deep links to each service |
| **Responsive** | Single-column stacking for hero and service cards on narrow viewports (NFR-RSP-001) |
| **Accessibility** | One logical `h1`; CTAs keyboard-focusable; decorative hero images with empty alt or role presentation (NFR-A11Y-001) |
| **Acceptance criteria** | Company name visible (BR-001); at least one path to Quote and Contact; four services linked; footer includes Privacy link; no fictional projects in “featured” area |

---

### 6.2 About Us (`/about`)

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | Owner-approved company profile (BR-010) |
| **Audience** | Trust-seeking visitors |
| **Content sections** | Heading; narrative copy **(owner-supplied)**; optional workshop/team imagery **(with rights)** |
| **User actions** | Navigate elsewhere; contact/quote CTA |
| **Functional** | FR-015 |
| **Acceptance criteria** | Page renders without contradicting other pages; if copy missing, show owner-approved “content pending” stub—not invented history |

---

### 6.3 Services overview (`/services`)

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | Orient users to four categories (BR-002) |
| **Content sections** | Intro; card/list for each service with summary **(owner-approved teaser)**; CTAs to detail and quote |
| **User actions** | Open service detail; pre-select service on quote via query e.g. `?service=kitchen-furniture` **(proposed)** |
| **Functional** | FR-020–FR-024 |
| **Acceptance criteria** | Exactly four categories; each links to valid detail route; unconfirmed services show approved generic copy only |

---

### 6.4 Service detail (`/services/[serviceSlug]`)

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | Deep service information (BR-002, BR-019 for decorated furniture) |
| **Content sections** | Title (owner-facing label); description; scope bullets **(owner-approved)**; optional FAQ **(BR-011, Should Have)**; related projects strip **if portfolio exists**; CTA to quote with service pre-selected |
| **Unconfirmed content** | All technical/product claims for PVC, aluminium, kitchen, decorated furniture until owner sign-off |
| **User actions** | View related projects; open quote form; contact |
| **Functional** | FR-020–FR-025 |
| **Invalid slug** | Treat as 404 (FR-090) |
| **Acceptance criteria** | Decorated Furniture page includes prominent scope statement once BR-019 content exists; invalid slugs return 404 |

---

### 6.5 Portfolio listing (`/projects`)

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | Showcase completed work (BR-003) or approved empty state (BR-004) |
| **Content sections** | Page title; grid/list of projects **or** empty state; optional filter UI **(BR-012, Should Have)** |
| **User actions** | Open project detail; filter by service **when implemented** |
| **Functional** | FR-030–FR-035 |
| **Empty state** | Owner-approved message (e.g., projects coming soon); link to contact/quote; **no stock/fake projects** |
| **Acceptance criteria** | Each listed project has ≥1 service association (BR-003); empty state matches BR-004 when no projects published |

---

### 6.6 Project detail (`/projects/[projectSlug]`)

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | Project proof and context (BR-003) |
| **Content sections** | Title; owner-approved description; location/date **if authorized**; service tags; image gallery |
| **User actions** | View images (lightbox **Could Have**); navigate to same-service page or quote |
| **Functional** | FR-030–FR-035 |
| **Missing images** | See Section 14 — placeholder per project or hide gallery with explanation |
| **Acceptance criteria** | Captions and metadata match owner-approved source; no client/name/location if owner restricted |

---

### 6.7 Contact Us (`/contact`)

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | Low-friction reach (BR-005) |
| **Content sections** | Configurable phone, email, address, hours **(placeholders until owner provides)**; optional map embed **(future/Should Have — BR-018)**; contact inquiry form |
| **User actions** | tel:/mailto: links; WhatsApp deep link **if official number provided**; submit contact form |
| **Functional** | FR-050–FR-054, FR-070–FR-072 |
| **Acceptance criteria** | Displayed contacts only from configuration; form validates and submits per FR-050 |

---

### 6.8 Request a Quote (`/quote`)

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | Structured quotation **inquiry** (BR-006, BR-007) — not a binding quote |
| **Content sections** | Form; link to Privacy Policy; brief disclaimer that submission is an inquiry |
| **User actions** | Complete and submit form |
| **Functional** | FR-060–FR-066 |
| **Acceptance criteria** | Required fields enforced; success acknowledgment (BR-007); service category includes four BRD categories |

---

### 6.9 Privacy Policy (`/privacy`)

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | Legal transparency (BR-008) |
| **Content** | Owner/legal-approved policy text **(not generated fictitious legal content in production)** |
| **Functional** | FR-080 |
| **Acceptance criteria** | Linked from footer and forms; page reachable before forms enabled in production |

---

### 6.10 Custom 404 (unknown routes)

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | Recover from bad links |
| **Content** | Clear message; links to Home, Services, Contact, Quote |
| **Functional** | FR-090 |
| **Acceptance criteria** | HTTP 404 status; no stack traces; consistent header/footer |

---

## 7. Functional Requirements

Priority: **Must** = MVP; **Should** = BRD Should Have; **Could** = future.

### A. Global navigation and layout

| ID | Requirement | Priority | Traces to |
|----|-------------|----------|-----------|
| FR-001 | The site SHALL display a persistent header on all MVP pages with company name and logo when a logo asset is configured (BR-001). | Must | BR-001 |
| FR-002 | The header SHALL provide navigation links to: Home, About, Services, Projects, Contact, Request a Quote (labels may match owner tone). | Must | BR-020 |
| FR-003 | The header SHALL indicate the active section using a visual and programmatic state (e.g., `aria-current="page"` on the current nav item). | Must | — |
| FR-004 | On viewports below a defined breakpoint **(proposed: 768px)**, primary navigation SHALL collapse into an accessible mobile menu (button toggles menu; focus trap **proposed** while open). | Must | BR-009, NFR-001 |
| FR-005 | The site SHALL display a footer on all MVP pages with repeated nav, Privacy Policy link, and a configurable contact snippet (phone/email when provided) (BR-020). | Must | BR-020, BR-005 |
| FR-006 | Logo in header SHALL link to Home. | Must | — |
| FR-007 | Skip link to main content SHALL be provided as the first focusable element **(proposed WCAG best practice)**. | Should | NFR-A11Y-001 |
| FR-008 | Social media icons SHALL appear in footer **only** when URLs are configured (BR-014). | Could | BR-014 |
| FR-009 | Language switcher SHALL NOT be shown unless multilingual scope is approved (BR-016). | Could | BR-016 |

### B. Home page

| ID | Requirement | Priority | Traces to |
|----|-------------|----------|-----------|
| FR-010 | Home SHALL present a hero region with a primary CTA routing to Request a Quote and a secondary CTA to Contact or Services **(exact copy TBD)**. | Must | BO-04 |
| FR-011 | Home SHALL display all four service categories with links to respective detail pages. | Must | BR-002 |
| FR-012 | Home MAY display a featured projects subsection only when at least one published project exists; otherwise omit or show owner-approved non-deceptive placeholder (BR-004). | Must | BR-003, BR-004 |
| FR-013 | Home SHALL include a company introduction section using owner-approved text or an explicit minimal stub agreed with owner. | Should | BR-010 |
| FR-014 | Home page metadata (title, description) SHALL be configurable per page without duplicating empty values (BR-013). | Should | BR-013 |

### C. Services

| ID | Requirement | Priority | Traces to |
|----|-------------|----------|-----------|
| FR-020 | Services overview SHALL list exactly four categories matching BRD taxonomy unless owner restructures (ASM-003). | Must | BR-002 |
| FR-021 | Each service detail page SHALL render owner-approved title, summary, and body content from configuration/content source. | Must | BR-002 |
| FR-022 | Service detail pages SHALL NOT render unapproved industry example text as factual ELITE offerings (CON-002). | Must | CON-002 |
| FR-023 | Each service detail page SHALL include CTA(s) to Request a Quote with that service pre-selected **(proposed query param or hidden field)**. | Must | BR-006 |
| FR-024 | Each service detail page SHALL link to Projects filtered or tagged for that service when portfolio exists. | Should | BR-012 |
| FR-025 | Decorated Furniture detail SHALL display owner-approved scope definition at top of main content when provided (BR-019). | Must | BR-019 |
| FR-026 | Service-specific FAQ accordions SHALL render only from owner-approved Q&A pairs (BR-011). | Should | BR-011 |

**Unconfirmed by owner (content, not software):** PVC product lines, aluminium fabrication scope, kitchen materials/process, decorated furniture meaning and public label.

### D. Projects and portfolio

| ID | Requirement | Priority | Traces to |
|----|-------------|----------|-----------|
| FR-030 | Portfolio listing SHALL render zero or more published projects from the content source; unpublished/draft projects SHALL NOT appear publicly. | Must | BR-003 |
| FR-031 | Each project SHALL associate with one or more service slugs from the four categories. | Must | BR-003 |
| FR-032 | Project detail SHALL show owner-approved title, description, and ordered image list with alt text supplied or derived from approved captions **(not generic "image1")**. | Must | BR-003 |
| FR-033 | When no projects are published, portfolio listing SHALL show the approved empty state (BR-004) without fabricated entries. | Must | BR-004 |
| FR-034 | Portfolio SHALL support filtering by service category on listing page **(client-side or query param)**. | Should | BR-012 |
| FR-035 | Image gallery MAY support keyboard-accessible next/previous **(lightbox)** without requiring download of originals. | Could | — |
| FR-036 | Project listing on Home (featured) SHALL use the same project records as `/projects` to avoid inconsistency. | Must | — |

### E. Contact form (Contact Us page)

| ID | Requirement | Priority | Traces to |
|----|-------------|----------|-----------|
| FR-050 | Contact page SHALL include a contact inquiry form distinct from the quotation form (simpler field set). | Must | BRD 5.1 contact |
| FR-051 | **Required fields:** full name, message. **Optional fields:** email, phone, preferred contact method **(proposed)**. | Must | Data minimization |
| FR-052 | Email field SHALL be validated for format when provided; at least one of email or phone SHOULD be required **(DEC-003 — proposed: require email OR phone)**. | Must | — |
| FR-053 | Successful submission SHALL show inline success message; form SHALL reset or offer clear “submit another” **(proposed)**. | Must | BR-007 pattern |
| FR-054 | Submissions SHALL be sent to backend logical operation `submitContactInquiry` (Section 13). | Must | DEC-002 |

### F. Request a Quote

| ID | Requirement | Priority | Traces to |
|----|-------------|----------|-----------|
| FR-060 | Quote page SHALL present a quotation **inquiry** form, not pricing output or order confirmation (ASM-004). | Must | BR-006, ASM-004 |
| FR-061 | **Required fields:** full name; phone number; service category (enum of four services); project description. | Must | BR-006 |
| FR-062 | **Optional fields:** email; project location; preferred contact method (phone/email/WhatsApp **if enabled**). | Must | User brief |
| FR-063 | Service category control SHALL use the four BRD categories; invalid tampered values SHALL be rejected server-side. | Must | BR-006 |
| FR-064 | Client-side and server-side validation SHALL enforce field rules before persistence/notification. | Must | NFR-SEC-001 |
| FR-065 | On success, display owner-approved acknowledgment copy including non-binding inquiry disclaimer (BR-007). | Must | BR-007 |
| FR-066 | The system SHALL reduce accidental duplicate submissions via disable-on-submit and optional idempotency token **(proposed)** for a short window. | Should | Section 14 |
| FR-067 | Quote form SHALL link to Privacy Policy near submit control. | Must | BR-008 |
| FR-068 | File attachments SHALL NOT be required for MVP unless owner approves storage/virus scanning scope **(BR-006 mentioned optional attachments policy — future)**. | Could | BR-006 |

### G. Calls to action (telephone, WhatsApp, email)

| ID | Requirement | Priority | Traces to |
|----|-------------|----------|-----------|
| FR-070 | Phone numbers displayed SHALL come from site configuration; when empty, phone CTAs SHALL be hidden—not fake numbers. | Must | BR-005, CON-002 |
| FR-071 | `tel:` links SHALL use configured E.164 or local format as provided by owner. | Must | BR-005 |
| FR-072 | WhatsApp links (`https://wa.me/...`) SHALL render only when an official WhatsApp-capable number is configured **(proposed channel)**. | Should | Open Q3 |
| FR-073 | `mailto:` links SHALL use configured official email when provided. | Must | BR-005 |

### H. Content and images

| ID | Requirement | Priority | Traces to |
|----|-------------|----------|-----------|
| FR-080 | Privacy Policy page SHALL render configurable HTML/Markdown/legal text supplied by owner or legal advisor. | Must | BR-008 |
| FR-081 | Service and project content SHALL be loaded from a defined content layer: **(A)** static modules/JSON in repo and/or **(B)** MongoDB documents **(DEC-001)**. | Must | NFR-008 |
| FR-082 | Images SHALL use responsive sizing and lazy loading below the fold **(proposed performance)**. | Should | NFR-PERF-002 |
| FR-083 | Content deployment SHALL NOT require an admin dashboard in MVP; updates via code/config deploy or approved process. | Must | BRD Section 17 |
| FR-084 | Testimonials component SHALL NOT render without configured authorized entries (BR-015). | Could | BR-015 |

### I. Routing and system pages

| ID | Requirement | Priority | Traces to |
|----|-------------|----------|-----------|
| FR-090 | Unknown routes SHALL return HTTP 404 with custom page (Section 6.10). | Must | — |
| FR-091 | Sitemap generation SHALL include all indexable MVP routes that have content **(exclude draft projects)**. | Should | NFR-SEO-003 |
| FR-092 | `robots.txt` SHALL be served and reference sitemap URL **(proposed)**. | Should | NFR-SEO-003 |

---

## 8. User Stories

Format: **US-xxx** | Priority | Linked BR | Acceptance criteria | Dependencies | Questions

---

### US-001 — Discover services from Home

**As a** prospective customer, **I want** to see an overview of ELITE WORKSHOP LTD’s four service lines on the home page, **so that** I can quickly tell if the company matches my needs.

| Field | Detail |
|-------|--------|
| Priority | Must |
| Linked BR | BR-002, BO-02 |
| Acceptance criteria | Given I am on Home, when the page loads, then I see four service entries each linking to `/services/[slug]`; and no service claims beyond owner-approved copy. |
| Dependencies | Service content configuration |
| Questions | Final customer-facing label for Decorated Furniture (BR-019) |

---

### US-002 — Read service details

**As a** homeowner, **I want** to read detailed information about kitchen furniture services, **so that** I can decide whether to request a quote.

| Field | Detail |
|-------|--------|
| Priority | Must |
| Linked BR | BR-002 |
| Acceptance criteria | Given I open `/services/kitchen-furniture`, when content is published, then I see owner-approved description and a CTA to `/quote` with service pre-selected. |
| Dependencies | FR-021, owner copy |
| Questions | Exact kitchen scope |

---

### US-003 — Browse portfolio

**As a** visitor, **I want** to view completed projects with photos, **so that** I can judge quality before contacting the company.

| Field | Detail |
|-------|--------|
| Priority | Must (when portfolio available) |
| Linked BR | BR-003, BR-004 |
| Acceptance criteria | Given projects are published, when I visit `/projects`, then I see only approved projects with images and captions; given no projects, then I see empty state without fake projects. |
| Dependencies | Project content, photo rights |
| Questions | Launch with or without portfolio (BR-004) |

---

### US-004 — Filter projects by service

**As a** contractor, **I want** to filter portfolio items by aluminium works, **so that** I see relevant examples faster.

| Field | Detail |
|-------|--------|
| Priority | Should |
| Linked BR | BR-012 |
| Acceptance criteria | Given filtering is implemented and ≥2 projects exist, when I select “Aluminium Works”, then only projects tagged with that service are shown. |
| Dependencies | FR-034 |
| Questions | Include in MVP or phase 2? |

---

### US-005 — Submit contact inquiry

**As a** visitor, **I want** to send a short message without filling a full quote form, **so that** I can ask a simple question.

| Field | Detail |
|-------|--------|
| Priority | Must |
| Linked BR | BR-005, BR-007 |
| Acceptance criteria | Given valid required fields, when I submit, then I see success message and backend receives inquiry; given invalid email format, then inline error without submit. |
| Dependencies | FR-050–054, DEC-002 |
| Questions | Require email, phone, or either? (DEC-003) |

---

### US-006 — Submit quotation request

**As a** prospective customer, **I want** to describe my project and select a service category, **so that** the workshop can follow up with a quotation offline.

| Field | Detail |
|-------|--------|
| Priority | Must |
| Linked BR | BR-006, BR-007, ASM-004 |
| Acceptance criteria | Given required fields completed, when I submit, then I see acknowledgment that this is an inquiry not a final price; and submission is stored/notified; given missing phone, then submit blocked with clear errors. |
| Dependencies | FR-060–067 |
| Questions | SLA text (BR-007); retention (NFR-PRIV-002) |

---

### US-007 — Understand Decorated Furniture

**As an** interior designer, **I want** a clear explanation of what “Decorated Furniture” includes, **so that** I do not misinterpret the service.

| Field | Detail |
|-------|--------|
| Priority | Must |
| Linked BR | BR-019 |
| Acceptance criteria | Given owner scope text is configured, when I open decorated furniture service page, then scope appears before long descriptive content; given missing scope, then page shows owner-approved “definition pending” stub—not guessed content. |
| Dependencies | Owner definition |
| Questions | BRD Section 8.4 (7 questions) |

---

### US-008 — Mobile navigation

**As a** mobile user, **I want** to open the main menu and reach the quote page, **so that** I can inquire without horizontal scrolling.

| Field | Detail |
|-------|--------|
| Priority | Must |
| Linked BR | BR-009 |
| Acceptance criteria | Given viewport width 375px, when I open the menu and tap Request a Quote, then I navigate to `/quote` without horizontal overflow on the page body. |
| Dependencies | FR-004, NFR-RSP-001 |
| Questions | — |

---

### US-009 — Privacy before forms

**As a** privacy-conscious visitor, **I want** to read how my form data is used, **so that** I can decide whether to submit.

| Field | Detail |
|-------|--------|
| Priority | Must |
| Linked BR | BR-008 |
| Acceptance criteria | Given forms are enabled, when I view Contact or Quote page, then I can reach Privacy Policy via visible link without leaving form context permanently. |
| Dependencies | FR-080, FR-067 |
| Questions | Legal jurisdiction |

---

### US-010 — Recover from broken link

**As a** visitor, **I want** a helpful page when a URL does not exist, **so that** I can continue browsing.

| Field | Detail |
|-------|--------|
| Priority | Must |
| Linked BR | — (SRS addition) |
| Acceptance criteria | Given `/unknown-path`, when loaded, then HTTP status is 404 and page offers links to Home and Contact. |
| Dependencies | FR-090 |
| Questions | — |

---

## 9. Acceptance Criteria (Consolidated MVP Gate)

The MVP software SHALL be considered ready for user acceptance testing when:

| ID | Criterion | Verification method |
|----|-----------|---------------------|
| SAC-01 | All Must Have FR-xxx implemented for MVP pages | Test checklist / manual QA |
| SAC-02 | BR-001, BR-020: identity and footer on all MVP pages | Visual + DOM inspection |
| SAC-03 | BR-004: no fictional portfolio entries | Content review |
| SAC-04 | BR-006–BR-008: quote form + privacy linkage; privacy page exists | Functional test |
| SAC-05 | BR-009: responsive nav and forms at mobile width | Responsive test |
| SAC-06 | Forms reject invalid input server-side | API/integration test |
| SAC-07 | Error paths do not leak stack traces | Security test |
| SAC-08 | Owner-approved content loaded for services (placeholders only where explicitly agreed) | Content sign-off |
| SAC-09 | HTTPS enforced in production environment | Deployment check |
| SAC-10 | BR-019: decorated furniture page behavior per US-007 | Content conditional test |

---

## 10. Non-Functional Requirements

BRD NFR-001–010 are refined below with SRS IDs. **Proposed** numeric targets require formal approval.

### 10.1 Performance (NFR-PERF-xxx)

| ID | Requirement | Target / note | Priority |
|----|-------------|---------------|----------|
| NFR-PERF-001 | Primary content SHALL be usable without waiting for all below-fold images | LCP **proposed:** ≤ 2.5s on 4G simulated median hardware | Should |
| NFR-PERF-002 | Images SHALL be served in optimized formats/sizes appropriate to viewport | Next.js image optimization **proposed** in implementation | Should |
| NFR-PERF-003 | Core Web Vitals SHOULD meet Google “Good” thresholds in production **(proposed aspirational)** | LCP, INP, CLS per web.dev | Should |
| NFR-PERF-004 | API form submission endpoint SHOULD respond within **proposed 3s p95** under normal load | Excludes email provider latency | Should |

*Traces to BRD NFR-002.*

### 10.2 Responsive design (NFR-RSP-xxx)

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-RSP-001 | Layout SHALL adapt at breakpoints **proposed:** mobile &lt;768px, tablet 768–1023px, desktop ≥1024px without loss of core functionality | Must |
| NFR-RSP-002 | Touch targets for primary actions SHOULD be at least 44×44 CSS px **(proposed)** | Should |
| NFR-RSP-003 | No mandatory horizontal scrolling for main content at 320px width | Must |

*Traces to BRD NFR-001.*

### 10.3 Accessibility (NFR-A11Y-xxx)

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-A11Y-001 | Public pages SHOULD conform to **WCAG 2.2 Level AA** **(proposed target;** BRD cited 2.1) | Should |
| NFR-A11Y-002 | All interactive controls SHALL be operable via keyboard; focus order logical | Must |
| NFR-A11Y-003 | Focus indicators SHALL be visible | Must |
| NFR-A11Y-004 | Text contrast SHALL meet WCAG AA minimums for normal and large text | Must |
| NFR-A11Y-005 | Meaningful images SHALL have appropriate `alt`; decorative images empty alt | Must |
| NFR-A11Y-006 | Forms SHALL associate labels with inputs; errors announced **(`aria-live` proposed)** | Must |

*Traces to BRD NFR-003.*

### 10.4 SEO (NFR-SEO-xxx)

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-SEO-001 | Each MVP page SHALL have unique `<title>` and meta description from configuration **(not empty duplicates)** | Should |
| NFR-SEO-002 | Canonical URLs SHALL be set **(proposed)** to avoid duplicate indexing | Should |
| NFR-SEO-003 | XML sitemap and robots.txt behavior per FR-091–092 | Should |
| NFR-SEO-004 | Open Graph title/description/image per page when assets exist **(no fictional claims)** | Should |
| NFR-SEO-005 | Structured data **(proposed):** `Organization` with name and **only confirmed** contact/address fields; `LocalBusiness` ONLY when address confirmed | Should |

*Traces to BRD NFR-004, BR-013.*

### 10.5 Security (NFR-SEC-xxx)

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-SEC-001 | All form inputs validated server-side; reject unexpected fields (allowlist) | Must |
| NFR-SEC-002 | Rate limiting on inquiry endpoints **(proposed:** e.g. 10 req / 15 min / IP, tunable) | Must |
| NFR-SEC-003 | Secrets (DB URI, SMTP, API keys) SHALL NOT be exposed to client bundle | Must |
| NFR-SEC-004 | Production SHALL use HTTPS (TLS) | Must |
| NFR-SEC-005 | Protect against common web vulnerabilities **(OWASP-oriented):** injection, XSS stored in admin-less system—sanitize displayed user content if ever echoed | Must |
| NFR-SEC-006 | Security headers **(proposed):** CSP baseline, X-Content-Type-Options, Referrer-Policy—exact policy in architecture phase | Should |
| NFR-SEC-007 | CORS SHALL allow only known frontend origin(s) for API | Must |

*Traces to BRD NFR-005.*

### 10.6 Privacy (NFR-PRIV-xxx)

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-PRIV-001 | Collect only fields defined in Section 12; no hidden tracking beyond **decision-required** analytics | Must |
| NFR-PRIV-002 | Retention period for inquiries SHALL follow owner/legal decision **(TBD)** | Must |
| NFR-PRIV-003 | Forms SHALL not submit without Privacy Policy being published in production | Must |
| NFR-PRIV-004 | Logs SHALL avoid storing full message bodies **(proposed)** or SHALL redact PII per policy | Should |

*Traces to BRD NFR-006.*

### 10.7 Reliability and maintainability (NFR-REL-xxx, NFR-MNT-xxx)

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-REL-001 | User-facing failure when backend unavailable SHALL show generic retry message (Section 14) | Must |
| NFR-REL-002 | Uptime target **proposed:** 99.5% monthly **(TBD approval)** | Should |
| NFR-MNT-001 | Codebase SHALL use TypeScript strict mode **(proposed convention)** | Should |
| NFR-MNT-002 | Environment-specific configuration via env vars, not committed secrets | Must |
| NFR-MNT-003 | Consistent formatting/linting **(proposed)** in implementation phase | Should |

*Traces to BRD NFR-007, NFR-008, NFR-010.*

### 10.8 Scalability (NFR-SCL-001)

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-SCL-001 | Architecture SHALL support growth of portfolio entries and inquiry volume typical of SME marketing site without redesign | Could |

*Traces to BRD NFR-009.*

---

## 11. Data Requirements

Detailed MongoDB schema belongs to the Technical Architecture phase. Below: logical data categories.

### 11.1 Service categories (reference data)

| Field | Required | Validation | Storage |
|-------|----------|------------|---------|
| `slug` | Yes | Enum of four slugs; immutable unless owner restructures | Static config and/or MongoDB **(DEC-001)** |
| `displayName` | Yes | Non-empty string, owner-approved | Same |
| `summary` | Yes | Non-empty for published pages | Same |
| `body` | Yes | Owner-approved HTML/MD | Same |
| `scopeNotice` | For decorated only | Required before BR-019 sign-off | Same |
| `sortOrder` | Yes | 1–4 | Same |
| `seoTitle`, `seoDescription` | Should | Length limits **(proposed:** title ≤60, desc ≤160 chars recommended) | Same |

**Sensitivity:** Public, low.

---

### 11.2 Portfolio projects

| Field | Required | Validation | Storage |
|-------|----------|------------|---------|
| `slug` | Yes | Unique, URL-safe | Static and/or MongoDB **(DEC-001)** |
| `title` | Yes | Non-empty | Same |
| `description` | Yes | Owner-approved | Same |
| `services` | Yes | Array of ≥1 valid service slug | Same |
| `location` | No | Owner authorization | Same |
| `completedDate` | No | ISO date or year | Same |
| `images` | Should | ≥1 for typical project; see edge cases | Same |
| `published` | Yes | Boolean; default false until approved | Same |
| `clientName` | No | Only if owner allows | Same |

**Sensitivity:** Public when published; image rights contractual.

**Retention:** Content retained until owner removes; not tied to inquiry retention.

---

### 11.3 Contact inquiries

| Purpose | Capture general questions from Contact page |

| Field | Required | Validation |
|-------|----------|------------|
| `fullName` | Yes | Length 2–100 **(proposed)** |
| `email` | Conditional | Valid email if provided; **DEC-003:** at least one of email/phone required |
| `phone` | Conditional | E.164 or local pattern **(proposed)** |
| `message` | Yes | Length 10–5000 **(proposed)** |
| `preferredContactMethod` | No | Enum: phone, email, whatsapp |
| `submittedAt` | Auto | Server timestamp |
| `source` | Auto | `contact` |
| `clientMeta` | Auto | IP hashed or truncated **(privacy decision)**; user agent optional |

**Persistent storage:** **Recommended Yes** in MongoDB for audit and backup if email fails **(DEC-002)**.

**Sensitivity:** Personal data — moderate.

**Retention:** **Unresolved** — business/legal decision (BRD Section 18 Q11).

---

### 11.4 Quotation requests

| Purpose | Structured lead for offline quotation (ASM-004) |

| Field | Required | Validation |
|-------|----------|------------|
| `fullName` | Yes | 2–100 chars |
| `phone` | Yes | Non-empty, format check **(proposed)** |
| `email` | No | Valid if present |
| `serviceCategory` | Yes | One of four enum values |
| `projectDescription` | Yes | 20–8000 chars **(proposed)** |
| `projectLocation` | No | 2–200 chars |
| `preferredContactMethod` | No | Enum |
| `submittedAt` | Auto | Timestamp |
| `source` | Auto | `quote` |
| `status` | Auto | **Proposed:** `new` only in MVP (no workflow UI) |

**Persistent storage:** Same as DEC-002.

**Sensitivity:** Personal + project details — moderate.

**Retention:** **Unresolved.**

---

### 11.5 Site configuration (non-personal)

| Field | Examples | Notes |
|-------|----------|-------|
| `companyName` | ELITE WORKSHOP LTD | Confirmed |
| `logoUrl` | — | Until asset provided |
| `phone`, `email`, `address`, `hours` | — | Placeholders empty in dev |
| `whatsappNumber` | — | Optional |
| `socialLinks` | — | Optional BR-014 |
| `quoteSuccessMessage` | — | Owner-approved (BR-007) |
| `portfolioEmptyStateMessage` | — | Owner-approved (BR-004) |

**Storage:** Environment or config file; not hard-coded fictional values.

---

## 12. Logical API Requirements

Implementation details (routes, HTTP methods, JSON schemas) deferred to Technical Architecture. Operations required by MVP features:

### 12.1 `submitContactInquiry`

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | Accept and persist/forward contact form (FR-054) |
| **Caller** | Next.js frontend (server action or client fetch to Express) |
| **Input** | Fields per Section 11.3 |
| **Validation** | Server-side allowlist; field rules; reject oversize payloads **(proposed max body 32KB)** |
| **Success** | HTTP 201 or 200 with non-sensitive confirmation payload `{ success: true }` |
| **Errors** | 400 validation; 429 rate limit; 503 service unavailable — generic messages |
| **Security** | NFR-SEC-001–007; optional honeypot field **(proposed anti-spam)** |
| **Side effects** | Insert MongoDB document **(if DEC-002 includes DB)**; optional email notification |

### 12.2 `submitQuotationRequest`

| Attribute | Specification |
|-----------|---------------|
| **Purpose** | Accept quotation inquiry (FR-060–066) |
| **Input** | Section 11.4 |
| **Validation** | Strict enum for `serviceCategory`; phone required |
| **Success** | `{ success: true }` + client shows BR-007 message |
| **Errors** | Same pattern as 12.1 |
| **Security** | Same |
| **Side effects** | DB insert and/or email **(DEC-002)** |

### 12.3 Read operations (MVP)

| Operation | Purpose | Notes |
|-----------|---------|-------|
| `getPublishedProjects` | List/detail for portfolio | May be static import in MVP without public API |
| `getServices` | Service pages | Likely static in MVP |
| `getSiteConfig` | Contact details, messages | Server-side only; do not expose secrets |

**No public write APIs** other than the two inquiry operations.

---

## 13. Error Handling and Edge Cases

| Scenario | Expected behavior | FR/NFR |
|----------|-------------------|--------|
| Empty required field (client) | Inline field errors; submit prevented | FR-064 |
| Empty required field (server) | 400 with field-level codes; no persistence | NFR-SEC-001 |
| Invalid email/phone format | Inline + server 400 | FR-051, FR-061 |
| Invalid service enum (tampered) | Server 400 generic validation error | FR-063 |
| Backend/API unavailable | User message: unable to submit, try again or use phone/email if configured; no stack trace | NFR-REL-001 |
| Database connection failure | Treat as 503; log internally without PII burst | NFR-REL-001 |
| Repeated double-click submit | Button disabled after first click; ignore duplicate within **proposed 30s** window | FR-066 |
| Network interruption mid-submit | Show retry guidance; idempotent handling **(proposed)** | FR-066 |
| Empty portfolio | Empty state content (BR-004) | FR-033 |
| Project with zero images | Show text-only detail or owner-approved “images unavailable” block; do not use unrelated stock | FR-032 |
| Missing alt text on project image | Block publish in content validation **(proposed)** or use caption fallback | NFR-A11Y-005 |
| Unknown route | Custom 404 (FR-090) | FR-090 |
| Unsupported Content-Type / oversized body | 415/413 with generic message | NFR-SEC-001 |
| Spam submission | Rate limit + honeypot **(proposed)** | NFR-SEC-002 |

User-facing messages MUST NOT include database errors, connection strings, or stack traces.

---

## 14. Accessibility and SEO (Cross-Cutting)

See Sections 10.3 and 10.4. Implementation phase SHALL include:

- Semantic landmarks (`header`, `main`, `footer`, `nav`)
- Single `h1` per page
- Visible focus states on menu and forms
- Metadata management per page template
- Sitemap excluding unpublished projects and draft routes

---

## 15. Security and Privacy (Cross-Cutting)

- **Data minimization:** Only specified form fields (Section 11).
- **Consent:** Privacy Policy link on forms; explicit marketing opt-in **not required unless owner requests** **(proposed)**.
- **Inquiry handling:** Offline follow-up (ASM-004); no automated pricing.
- **Third parties:** Email provider (e.g., SMTP/API) — document in architecture; DPA if applicable **(TBD)**.
- **Analytics:** If added later, cookie consent may be required **(jurisdiction TBD)** — **Could Have**, not MVP unless mandated.

---

## 16. MVP Scope (Software)

### 16.1 Included

| Feature | FR references |
|---------|---------------|
| All MVP pages (Section 5.1) + Custom 404 | FR-001–FR-092 (subset) |
| Contact + Quote forms with validation | FR-050–067 |
| Config-driven contact CTAs | FR-070–073 |
| Portfolio populated **or** empty state | FR-030–FR-033 |
| Privacy page + links | FR-080, FR-067 |
| Responsive header/footer/nav | FR-001–FR-006 |
| Logical APIs submit contact + quote | Section 12 |
| Core security/privacy NFRs Must items | NFR-SEC, NFR-PRIV, NFR-RSP Must |

### 16.2 Deferred (Should/Could — still specified)

| Feature | BR | Notes |
|---------|-----|-------|
| Portfolio filter | BR-012 | FR-034 |
| Service/global FAQ | BR-011 | FR-026 |
| Terms of Use | Should Have in BRD | Route `/terms` |
| Social links | BR-014 | FR-008 |
| Testimonials | BR-015 | FR-084 |
| Blog, multilingual | BR-016, BR-017 | — |
| Map / hours prominence | BR-018 | Contact page |
| Attachment upload on quote | BR-006 note | FR-068 |

---

## 17. Future Enhancements (Proposals — Not Approved)

- Admin CMS for projects/services (requires explicit approval; BRD warns against dashboard scope creep)
- CRM integration/webhooks for inquiries
- Live chat widget
- Advanced analytics dashboard
- Online booking
- Customer portal for quote status

---

## 18. Assumptions and Dependencies

| ID | Assumption / dependency |
|----|-------------------------|
| ASM-001–005 | As BRD Section 14.1 |
| CON-001–003 | As BRD Section 14.2 |
| DEP-001 | Owner provides or approves all public text, images, legal copy |
| DEP-002 | Hosting and TLS certificate available for production |
| DEP-003 | MongoDB instance available if inquiry persistence selected |
| DEP-004 | Email or notification channel configured for DEC-002 |
| DEP-005 | BRD Must Have requirements remain stable unless change-controlled |

---

## 19. Open Questions and Decisions

| ID | Question / decision | Status |
|----|---------------------|--------|
| OQ-001 | Decorated Furniture definition and public label | **Unresolved** |
| OQ-002 | Confirmed scope copy for each service | **Unresolved** |
| OQ-003 | Official phone, email, address, WhatsApp, hours | **Unresolved** |
| OQ-004 | Portfolio availability at launch | **Unresolved** (BR-004 strategy) |
| OQ-005 | Inquiry delivery: email vs MongoDB vs both | **Proposed decision DEC-002** |
| OQ-006 | Contact form: require email, phone, or either | **Proposed DEC-003** |
| OQ-007 | Data retention and deletion process for inquiries | **Unresolved** |
| OQ-008 | Portfolio/services in DB vs static files | **Unresolved DEC-001** |
| OQ-009 | Quote response SLA customer-facing text | **Unresolved** |
| OQ-010 | Privacy Policy legal text and jurisdiction | **Unresolved** |
| OQ-011 | Include portfolio filtering in MVP build | **Proposed:** defer to Should Have |
| OQ-012 | Analytics tooling and cookie consent | **Unresolved** |
| OQ-013 | BRD formal sign-off (AC-01–AC-08) | **Unresolved** |

---

## 20. Requirements Traceability Matrix

Verification methods: **Manual QA**, **Automated test**, **Content review**, **Security review**, **A11y audit**.

| BRD ID | SRS ID(s) | Page / feature | Acceptance / verification |
|--------|-----------|----------------|---------------------------|
| BR-001 | FR-001, FR-006 | Global header | SAC-02, Content review |
| BR-002 | FR-011, FR-020–FR-022 | Services | SAC-08, Manual QA |
| BR-003 | FR-030–FR-032, FR-036 | Projects | US-003, Content review |
| BR-004 | FR-012, FR-033 | Home, Projects | SAC-03 |
| BR-005 | FR-070–FR-073, FR-005 | Contact, footer | Config review |
| BR-006 | FR-060–FR-064, FR-067 | Quote | US-006, Automated test |
| BR-007 | FR-053, FR-065 | Contact, Quote | Manual QA |
| BR-008 | FR-080, FR-067 | Privacy, forms | US-009 |
| BR-009 | FR-004, NFR-RSP-001–003 | All pages | US-008, Manual QA |
| BR-010 | FR-013, FR-015 | Home, About | Content review |
| BR-011 | FR-026 | Service/FAQ | Deferred Should Have |
| BR-012 | FR-034, US-004 | Projects | Should Have QA |
| BR-013 | FR-014, NFR-SEO-001 | All pages | SEO checklist |
| BR-014 | FR-008 | Footer | Could — when configured |
| BR-015 | FR-084 | Home/testimonials | Could — out of MVP |
| BR-016 | FR-009 | Global | Could — out of MVP |
| BR-017 | — | Blog | **Not in SRS MVP** — future |
| BR-018 | Contact map/hours | Contact | Partial via config fields; map **proposed** Should Have |
| BR-019 | FR-025, US-007 | Decorated service | SAC-10 |
| BR-020 | FR-002, FR-005 | Header, footer | SAC-02 |

### Business requirements not fully expanded as separate software features

| BRD ID | Reason |
|--------|--------|
| BR-017 | Blog explicitly Could Have / future; no MVP software requirement beyond optional route placeholder |
| BR-015 | Could Have; FR-084 guards against uninvented testimonials |
| BR-016 | Could Have; excluded until approved |

### BO traceability (selected)

| Objective | SRS coverage |
|-----------|--------------|
| BO-01 | NFR-SEO-xxx, public pages |
| BO-02 | FR-020–025, services content |
| BO-03 | FR-030–033, About FR-015 |
| BO-04 | FR-050–067, CTAs FR-070–073 |
| BO-05 | FR-081, DEC-001 content layer |

---

## Document control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-11 | Software requirements (draft) | Initial SRS from BRD v1.0 |

---

*End of Software Requirements Specification*
