# Business Requirements Document (BRD)

## ELITE WORKSHOP LTD — Professional Corporate Website

| Document | Details |
|----------|---------|
| **Version** | 1.0 (Draft) |
| **Status** | Pending business owner validation |
| **Project type** | Professional company website / service showcase |
| **Technology constraints (implementation phase)** | Next.js (TypeScript), Node.js (Express.js), MongoDB, Tailwind CSS |

---

## 1. Executive Summary

ELITE WORKSHOP LTD requires a professional corporate website to present its services, demonstrate credibility through completed work (when assets are available), and convert visitor interest into qualified contact and quotation requests.

**Confirmed at this stage:** The company name; four high-level service categories (PVC Works, Aluminium Works, Kitchen Furniture, Decorated Furniture); and the intent to build a showcase and inquiry website—not e-commerce or internal business systems.

**Not yet confirmed:** Detailed service definitions, geographic market, branding, contact details, portfolio content, operational processes, and the precise meaning of “Decorated Furniture.”

This document defines business goals, audience hypotheses, service analysis, recommended site scope (MVP vs. future), customer journeys, uniquely identified business requirements (BR-xxx), non-functional expectations, content needs, risks, assumptions, and open questions. It does **not** specify solution design, UI, or technical architecture.

---

## 2. Business Background

### 2.1 Confirmed information

| Item | Detail |
|------|--------|
| Legal / trading name | ELITE WORKSHOP LTD |
| Website purpose | Professional presentation of services; showcase of work; credibility; contact and quotation inquiry |
| Service categories (names only) | PVC Works; Aluminium Works; Kitchen Furniture; Decorated Furniture |
| Implementation stack (later phase) | Frontend: Next.js + TypeScript; Backend: Node.js + Express.js; Database: MongoDB; Styling: Tailwind CSS |

### 2.2 Unknown information (requires confirmation)

- Company history, mission, vision, and values  
- Registered address, service area(s), and operating hours  
- Official phone, email, and other contact channels  
- Brand identity (logo, colors, typography guidelines)  
- Exact scope of each service line and pricing model  
- Portfolio: project names, descriptions, dates, locations, and photography rights  
- Certifications, warranties, and insurance (if any)—**not to be invented**  
- Testimonials and references—**only if provided and authorized**  
- Preferred languages for the website (single locale vs. multilingual)  
- Legal entity details for Privacy Policy (data controller, jurisdiction)

### 2.3 Reasonable business recommendations (not confirmed as company policy)

- Prioritize mobile-friendly experience and fast load times for local search and on-site sharing.  
- Use structured inquiry forms to reduce low-quality leads and speed quotation preparation.  
- Publish a clear Privacy Policy before collecting personal data via forms.  
- Organize portfolio by service category to support “see work like mine” decision-making.

---

## 3. Business Problem and Opportunity

### 3.1 Problem (hypothesis)

Without a dedicated professional web presence, potential customers may:

- Fail to discover ELITE WORKSHOP LTD when searching for relevant services  
- Lack confidence due to absent or inconsistent proof of capability  
- Default to competitors with clearer service descriptions and visible project history  
- Use unstructured channels (e.g., social DMs only), increasing missed or poorly qualified inquiries  

*Validation needed:* Current customer acquisition channels and pain points from the business owner.

### 3.2 Opportunity

A focused corporate website can:

- Centralize accurate service messaging once confirmed by the owner  
- Present portfolio and process (when content exists) to shorten trust-building time  
- Capture structured quotation requests aligned to service lines  
- Support referrals (“send them our website”) with a stable, professional URL  

---

## 4. Business Objectives

| ID | Objective | Success indicators (to be baselined with owner) |
|----|-----------|---------------------------------------------------|
| BO-01 | Increase awareness among target audiences in defined service area(s) | Organic/direct traffic; branded searches *(baseline TBD)* |
| BO-02 | Communicate services clearly and differentiate ELITE WORKSHOP LTD | Time on service pages; reduced “what do you do?” calls *(TBD)* |
| BO-03 | Build trust through professional presentation and authentic portfolio | Inquiry quality; owner-reported win rate *(TBD)* |
| BO-04 | Generate qualified inquiries and quotation requests | Form submissions; contact clicks; owner qualification rate *(TBD)* |
| BO-05 | Provide a scalable content foundation for future marketing | Ease of adding projects/services without full redesign *(process TBD)* |

---

## 5. Project Scope

### 5.1 In scope (business view)

- Public marketing website: company profile, services, portfolio (when assets exist), contact, quotation request  
- Content suitable for search engines and social sharing (subject to NFRs)  
- Privacy-conscious handling of form submissions (details in implementation phase)

### 5.2 Out of scope (unless explicitly approved later)

See **Section 17 — Out-of-Scope Features**.

### 5.3 Constraints

- No fabrication of company facts, projects, testimonials, or credentials in content or BRD examples marked as industry-only.  
- Technology stack listed in Section 1 is fixed for a later implementation phase; this BRD does not design how it is applied.

---

## 6. Stakeholders

| Stakeholder | Role | Interests |
|-------------|------|-----------|
| Business owner / ELITE WORKSHOP LTD leadership | Decision authority, content source | Accurate brand, lead quality, low maintenance |
| End customers (residential, commercial, trade) | Website users | Clarity, trust, easy contact |
| Project sponsor *(TBD)* | Funding / priority | ROI, timeline |
| Business analyst / product team | Requirements | Complete, testable BR, traceability |
| Development team *(future)* | Delivery | Clear MVP, stable NFRs |
| Legal / compliance advisor *(optional)* | Privacy, terms | GDPR/local law alignment for forms |

---

## 7. Target Customers

*The segments below are **potential** audiences until confirmed by the business owner.*

| Segment | Typical needs | Website relevance |
|---------|---------------|-------------------|
| Residential homeowners | Kitchen fit-out, windows/doors, custom furniture, aesthetics, budget clarity | Service pages, portfolio by room/type, quote form |
| Property renovators | Coordinated trades, timelines, material choice | Process overview *(if provided)*, project examples |
| Contractors / builders | Reliable subcontractor, capacity, spec compliance | Trade-focused proof, contact speed |
| Architects / designers | Spec-grade products, finishes, documentation | Technical galleries, material options *(if confirmed)* |
| Property developers | Repeatability, scale, commercial terms | Commercial project portfolio *(if allowed)* |
| Commercial businesses | Shopfronts, office fit-out, durability | Aluminium/PVC/commercial furniture narratives *(if in scope)* |
| Interior decorators | Styled furniture, coordination | “Decorated Furniture” clarity critical |

**Open question:** Primary vs. secondary segments and geographic focus (local only vs. regional/national).

---

## 8. Service Analysis

For each service: meaning, customer needs, **industry examples (not confirmed ELITE offerings)**, value proposition pattern, information needed from owner, and website content/assets.

---

### 8.1 PVC Works

#### Meaning (general industry)

“PVC works” typically refers to fabrication and installation using polyvinyl chloride (PVC) profiles and related systems—often windows, doors, partitions, cladding elements, or shopfront components depending on market terminology.

#### Typical customer needs

- Energy efficiency and weather sealing (where windows/doors apply)  
- Security and durability  
- Aesthetic match to property  
- Correct measurements and installation quality  
- Warranty and after-sales support *(if offered—confirm)*  

#### Common industry examples *(illustrative only—not confirmed for ELITE WORKSHOP LTD)*

| Example category | Illustrative offerings |
|------------------|------------------------|
| Windows & doors | Casement, sliding, tilt-and-turn PVC windows; PVC entrance doors |
| Glazing systems | Double/triple glazing integration *(supplier-dependent)* |
| Interior | PVC skirting, panels, lightweight partitions |
| Exterior | PVC cladding, fascias/soffits *(where market uses PVC)* |
| Commercial | PVC shopfront framing, display windows |

#### Potential value to customers

- Cost-effective, low-maintenance options vs. some alternatives  
- Consistent factory-style profiles with custom sizing  
- Improved comfort and noise reduction when paired with appropriate glazing  

#### Information required from business owner

- Exact PVC product lines and brands used  
- Residential vs. commercial focus  
- Measurement/site survey process  
- Lead times, warranties, service area  
- Whether supply-only, install-only, or supply-and-fit  

#### Content and images needed

- Confirmed service description and bullet inclusions/exclusions  
- Before/after or completed install photography (with consent)  
- Optional: diagram of standard window/door types offered  
- FAQ on maintenance, colors, guarantees *(only if accurate)*  

---

### 8.2 Aluminium Works

#### Meaning (general industry)

Aluminium works usually cover fabrication and installation of aluminium profiles for structural and architectural applications: windows, doors, curtain walling, shopfronts, railings, pergolas, kitchen profiles, and custom metalwork.

#### Typical customer needs

- Slim sightlines, modern aesthetics, structural strength  
- Corrosion resistance (coastal/industrial environments)  
- Large spans (doors, facades)  
- Powder coating / anodizing color options  
- Compliance with local building standards *(confirm applicability)*  

#### Common industry examples *(illustrative only—not confirmed for ELITE WORKSHOP LTD)*

| Example category | Illustrative offerings |
|------------------|------------------------|
| Windows & doors | Aluminium casement, sliding, bi-fold doors |
| Facades | Curtain wall, cladding systems |
| Commercial | Shopfronts, automatic door interfaces *(if partnered)* |
| Interior / fit-out | Aluminium partitions, display frames |
| Exterior | Railings, gates, pergolas, louvers |

#### Potential value to customers

- Durability and premium appearance  
- Design flexibility for modern architecture  
- Suitable for commercial high-traffic environments  

#### Information required from business owner

- Fabrication capabilities (in-house vs. outsourced)  
- Finishes and color ranges  
- Project size limits (residential only vs. commercial facades)  
- Certifications or tested systems *(do not claim without proof)*  

#### Content and images needed

- Service scope statement aligned to actual capabilities  
- Portfolio tagged by application (door type, facade, etc.)  
- Material/finish swatches photography *(if applicable)*  

---

### 8.3 Kitchen Furniture

#### Meaning (general industry)

Kitchen furniture encompasses designed, manufactured, and installed kitchen cabinetry, worktops integration, storage systems, and related built-in furniture for residential or commercial kitchens.

#### Typical customer needs

- Layout optimization and ergonomics  
- Material choice (carcass, fronts, hardware)  
- Integration with appliances, plumbing, electrical *(coordination model TBD)*  
- Budget tiers and timeline  
- Durability, cleaning, and moisture resistance  

#### Common industry examples *(illustrative only—not confirmed for ELITE WORKSHOP LTD)*

- Modular kitchen units; custom bespoke kitchens  
- Island units, pantries, tall units  
- Commercial kitchen casework *(if in scope)*  
- Hardware: soft-close hinges, pull-outs, handles  

#### Potential value to customers

- Tailored storage and workflow  
- Cohesive aesthetic with rest of home  
- Single accountable workshop for cabinetry quality  

#### Information required from business owner

- Custom vs. modular approach  
- Materials (MDF, plywood, laminate, lacquer, solid wood, etc.)  
- Design process (site visit, 3D drawings—confirm)  
- Relationship with appliance suppliers  
- Installation and aftercare  

#### Content and images needed

- Kitchen portfolio with style tags (modern, classic, etc.)  
- Process steps *(owner-approved)*  
- Material and finish gallery *(confirmed options only)*  

---

### 8.4 Decorated Furniture

#### Ambiguity

The term **“Decorated Furniture”** is **not standardized** in a single global industry taxonomy. It may imply different business models. Until the owner defines it, all interpretations below are **hypotheses**.

| Possible interpretation | Description |
|----------------------|-------------|
| A. Upholstered / soft furniture | Sofas, armchairs, headboards with fabric/leather finishing |
| B. Finished / “decor-ready” case goods | Pre-finished cabinets, wardrobes, TV units for interior projects |
| C. Custom furniture with decorative finishes | Paint, veneer, carving, gold leaf, ornamental details |
| D. Furniture for interior decorators | White-label or designer-collaboration pieces |
| E. Event / commercial display furniture | Temporary or promotional pieces *(less common label)* |
| F. Translation / naming variant | Local language term mapping to “fitted furniture” or “joinery” |

#### Questions to determine intended meaning

1. Does ELITE WORKSHOP LTD manufacture, finish, upholster, or only supply decorated furniture?  
2. Is the focus residential, hospitality, retail, or office?  
3. Which materials and techniques are in scope (upholstery, lacquer, veneer, CNC ornament)?  
4. Is this service standalone or bundled with kitchen/aluminium/PVC projects?  
5. Should the website use a different customer-facing label (e.g., “Custom Furniture & Finishes”)?  
6. Are there standard product lines or only made-to-order?  
7. What is the typical project size and lead time?  

#### Typical customer needs *(generic until defined)*

- Aesthetic alignment with interior design  
- Custom dimensions and finishes  
- Quality of craftsmanship and durability  
- Clear approval process for fabrics/colors  

#### Potential value to customers

- Differentiation through bespoke design and finish quality  
- One-stop workshop credibility *(if truly integrated—confirm)*  

#### Information required from business owner

- Authoritative definition of “Decorated Furniture”  
- Product/service list under this category  
- Relationship to other three service lines  

#### Content and images needed

- Definition-led service page once terminology is agreed  
- Portfolio filtered by “decorated furniture” with owner-approved captions  
- Glossary or FAQ to reduce customer confusion  

---

## 9. Proposed Website Sitemap

| Page / area | Business purpose | MVP vs. future |
|-------------|------------------|----------------|
| **Home** | First impression; primary CTAs (contact, quote); summary of four services; trust signals *(only real assets)* | **MVP** |
| **About Us** | Company story, values, team/workshop credibility *(fact-based only)* | **MVP** (minimal until copy provided) |
| **Services overview** | Orient visitors to four categories; links to detail | **MVP** |
| **Service detail (×4)** | Deep dive per line; FAQs; link to related projects | **MVP** (content depth depends on owner input) |
| **Projects / Portfolio** | Proof of delivery; filter by service | **MVP** if photos exist; otherwise **placeholder strategy TBD** |
| **Contact Us** | Phone/email/location/hours *(when confirmed)*; map optional | **MVP** |
| **Request a Quote** | Structured lead capture; service selection; project brief | **MVP** |
| **Privacy Policy** | Legal transparency for personal data | **MVP** before forms go live |
| **Terms of Use** | Optional limitation of liability, content copyright | **Should Have** |
| **Blog / Insights** | SEO and education | **Could Have** (future) |
| **Careers** | Hiring | **Could Have** (only if hiring) |
| **FAQ (global)** | Reduce repetitive inquiries | **Should Have** |
| **Testimonials** | Social proof | **Could Have** *(authorized quotes only)* |

---

## 10. Customer Journeys

### 10.1 Journey A — Homeowner researching kitchen furniture

```mermaid
flowchart LR
  A[Discover via search or referral] --> B[Land on Home]
  B --> C[Navigate to Kitchen Furniture]
  C --> D[Review portfolio filters]
  D --> E{Ready to inquire?}
  E -->|Yes| F[Request a Quote]
  E -->|Maybe| G[Contact Us]
  F --> H[Confirmation message / expectation set]
  G --> H
  H --> I[Owner follow-up offline]
```

| Step | Visitor goal | Website support |
|------|--------------|-----------------|
| Discover | Find a credible workshop | SEO, clear titles, local relevance *(when known)* |
| Understand | See if kitchen scope matches need | Service page, real project photos |
| Trust | Verify quality | Portfolio, about, optional testimonials |
| Act | Start quotation | Quote form with kitchen-specific fields |
| Post-submit | Know what happens next | Auto-acknowledgment copy *(TBD)* |

### 10.2 Journey B — Contractor seeking aluminium subcontractor

| Step | Notes |
|------|-------|
| Entry | Often direct to Services or Portfolio from referral |
| Evaluation | Speed to contact, evidence of commercial-scale work *(if applicable)* |
| Conversion | Contact call or short quote form with project type and timeline |
| Risk | Missing commercial portfolio may cause drop-off |

### 10.3 Journey C — Architect / designer evaluating “Decorated Furniture”

| Step | Notes |
|------|-------|
| Entry | Service page from search or sitemap |
| Confusion risk | **High** until term is defined—page must clarify scope early |
| Conversion | Contact for spec discussion or quote with finish schedules |

---

## 11. Business Requirements

Priority legend: **Must Have** (MVP critical), **Should Have** (important soon after MVP), **Could Have** (future enhancement).

| ID | Requirement description | Business value | Priority | Acceptance criteria | Dependencies / open questions |
|----|-------------------------|----------------|----------|---------------------|------------------------------|
| BR-001 | Publish company identity (name, logo when provided) consistently across the site | Brand recognition | Must Have | Name visible on all pages; logo displayed when asset delivered | Logo file formats |
| BR-002 | Present four service categories with owner-approved descriptions | Clarifies offerings | Must Have | Each service has dedicated page; no unapproved claims | Owner copy for each service |
| BR-003 | Provide a portfolio of completed projects with images and captions | Trust, conversion | Must Have | Each published project linked to ≥1 service; captions approved | Photo rights, project list |
| BR-004 | If portfolio not ready at launch, agreed fallback (e.g., “Projects coming soon”) without fake projects | Avoids reputational harm | Must Have | Zero fabricated projects or stock photos presented as ELITE work | Owner decision on launch gate |
| BR-005 | Contact page with verified phone, email, and address when provided | Low-friction reach | Must Have | All displayed contacts match owner official details | Contact validation |
| BR-006 | Request a Quote form capturing service interest, contact details, location, brief, optional attachments policy | Qualified leads | Must Have | Submission stored/delivered per agreed process; required fields validated | Email vs. database workflow in build phase |
| BR-007 | Post-submission user acknowledgment (on-screen message) | Sets expectations | Must Have | User sees success state; message text owner-approved | Copy for SLA e.g. “We respond within X days” *(X TBD)* |
| BR-008 | Privacy Policy covering form data use | Legal compliance | Must Have | Policy published; linked from footer and forms | Jurisdiction, DPO/contact |
| BR-009 | Mobile-responsive layout for all MVP pages | Majority mobile traffic | Must Have | Usable navigation and forms on common phone sizes | NFR targets in Section 12 |
| BR-010 | About Us content reflecting owner-approved company profile | Trust | Should Have | No contradictions with other pages | Company history copy |
| BR-011 | Service-specific FAQs where accurate answers exist | Fewer repetitive calls | Should Have | FAQ visible on service pages or global FAQ | Owner Q&A input |
| BR-012 | Portfolio filtering by service category | Faster relevance | Should Have | User can filter projects by PVC, Aluminium, Kitchen, Decorated | Taxonomy agreement |
| BR-013 | Basic SEO: unique titles and meta descriptions per page | Discoverability | Should Have | Each MVP page has editable meta; no duplicate empty titles | Keyword strategy TBD |
| BR-014 | Social media links (only for active official profiles) | Channel integration | Could Have | Links work; no dead profiles | Which platforms |
| BR-015 | Testimonials section with named authorization | Social proof | Could Have | Each quote has written approval on file | Customer consent |
| BR-016 | Multilingual support | Broader market | Could Have | Locales defined by owner | Primary language |
| BR-017 | Blog or articles | SEO, education | Could Have | Editorial process defined | Resource for writing |
| BR-018 | Operating hours and service area map | Local SEO | Should Have | Hours/area match reality | Geographic scope |
| BR-019 | Clear definition and customer-facing label for Decorated Furniture | Reduces bounce/confusion | Must Have | Page states scope in owner-approved terms | Section 8.4 questions |
| BR-020 | Footer with navigation, contact snippet, privacy link | Consistent wayfinding | Must Have | Footer on all MVP pages | — |

---

## 12. Non-Functional Requirements

*Numerical targets below are **proposed** for discussion—not confirmed contractual SLAs.*

| ID | Category | Requirement | Proposed target / note | Priority |
|----|----------|-------------|------------------------|----------|
| NFR-001 | Mobile responsiveness | Layout adapts to common viewport sizes without horizontal scroll | Test on representative iOS/Android sizes | Must Have |
| NFR-002 | Performance | Pages feel fast on typical mobile networks | e.g. Core Web Vitals “good” band as **aspirational** target | Should Have |
| NFR-003 | Accessibility | Perceivable, operable content for users with disabilities | Align with WCAG 2.1 Level AA as **recommended** target | Should Have |
| NFR-004 | SEO | Crawlable structure, semantic headings, sitemap | Search Console setup post-launch | Should Have |
| NFR-005 | Security | HTTPS everywhere; protect form submissions | TLS valid; no sensitive data in URLs | Must Have |
| NFR-006 | Privacy | Minimize collected data; secure storage/transmission | Retention period **TBD** with owner | Must Have |
| NFR-007 | Reliability | Site available for business use | Uptime target **TBD** (e.g. 99.5% aspirational) | Should Have |
| NFR-008 | Maintainability | Content updates without developer for routine changes | CMS vs. static update process **TBD** in technical phase | Should Have |
| NFR-009 | Scalability | Handle traffic growth and portfolio growth | MongoDB/Express suitable for marketing scale; revisit if heavy media CDN needed | Could Have |
| NFR-010 | Browser support | Modern evergreen browsers | Define minimum versions in SRS | Should Have |

---

## 13. Content and Asset Requirements

| Asset / information | Owner action | Used on | Status |
|---------------------|--------------|---------|--------|
| Company logo (vector + PNG) | Provide files | Header, favicon, social | **Required** |
| Brand colors and fonts | Provide guidelines or examples | Whole site | **Required** |
| Official contact: phone, email | Confirm | Contact, footer | **Required** |
| Business address and service area | Confirm | Contact, SEO local | **TBD** |
| Operating hours | Confirm if public | Contact | **TBD** |
| Company profile / About narrative | Approve copy | About | **Required** for full story |
| Service descriptions (×4) | Approve scope, inclusions/exclusions | Service pages | **Required** |
| Decorated Furniture definition | Answer Section 8.4 questions | Service page, FAQ | **Critical** |
| Project list: name, location, date, services | Approve | Portfolio | **Required** for portfolio launch |
| High-resolution project photographs | Grant usage rights | Portfolio, Home | **Required** |
| Team/workshop photos *(optional)* | Grant rights | About | Optional |
| Testimonials | Written permission | Testimonials | Optional |
| Social media URLs | Confirm active accounts | Footer | Optional |
| Privacy Policy inputs | Legal name, contact, data uses | Privacy | **Required** before forms |
| Quote response SLA message | Approve wording | Quote confirmation | **TBD** |

---

## 14. Assumptions and Constraints

### 14.1 Assumptions (must be validated)

| ID | Assumption |
|----|------------|
| ASM-001 | Primary goal is lead generation, not online sales. |
| ASM-002 | Owner will supply or approve all customer-facing text and images. |
| ASM-003 | Four named services remain the top-level taxonomy unless owner restructures. |
| ASM-004 | Quotation workflow continues offline after form submission (email/phone follow-up). |
| ASM-005 | English is the initial website language unless owner specifies otherwise. |

### 14.2 Constraints

| ID | Constraint |
|----|------------|
| CON-001 | Technology stack: Next.js (TS), Express, MongoDB, Tailwind—for implementation phase only. |
| CON-002 | No invented company facts, metrics, or portfolio items in published content. |
| CON-003 | BRD stops at business requirements; SRS/architecture/UI design are separate deliverables. |

---

## 15. Risks and Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Undefined “Decorated Furniture” causes wrong customer expectations | High | Medium | Resolve Section 8.4 before final service copy; consider renamed customer label |
| Delayed portfolio assets blocks trust-focused launch | High | Medium | Agree BR-004 launch strategy; phased portfolio release |
| Scope creep toward e-commerce or CRM | Medium | Medium | Enforce Section 17; change control |
| Incomplete contact/legal info delays compliant forms | Medium | High | Prioritize Privacy Policy inputs; soft launch without forms only if owner accepts |
| Overclaiming PVC/aluminium capabilities vs. actual licenses | High | Low–Med | Owner sign-off on every technical claim |
| Stock photography misrepresented as own work | Reputational | Low | Policy: real projects only |
| Single owner bottleneck for content approval | Schedule | Medium | Content checklist with deadlines |

---

## 16. MVP Scope

### 16.1 MVP pages and features

- Home  
- About Us *(minimal approved content acceptable)*  
- Services overview + four service detail pages *(owner-approved scope)*  
- Portfolio **or** explicit interim approach per BR-004  
- Contact Us  
- Request a Quote + acknowledgment  
- Privacy Policy  
- Footer navigation (BR-020)  
- Mobile-responsive experience (BR-009, NFR-001)  
- HTTPS and secure form handling (NFR-005, NFR-006)  
- Resolved customer-facing definition for Decorated Furniture (BR-019)  

### 16.2 Post-MVP (Should / Could)

- FAQ, testimonials, blog, multilingual, advanced SEO content program, operating hours/map enhancements, portfolio filtering (BR-012) if not in MVP  

---

## 17. Out-of-Scope Features

Unless explicitly approved in a future change request, the following are **out of scope**:

| Feature | Rationale |
|---------|-----------|
| Online payments | Not a sales platform per project brief |
| Shopping cart / product catalog e-commerce | Same |
| Inventory management | Business operations, not marketing site |
| Customer accounts / login portals | No self-service requirement stated |
| Employee management | Internal HR scope |
| Admin dashboards *(as business product)* | Not required for showcase site; *note: lightweight content admin may be discussed in technical phase without full CRM* |
| Complex CRM | Offline follow-up assumed |
| Booking/scheduling system | Not requested |
| Live chat *(unless later requested)* | Could Have at most |

**In scope clarification:** Contact forms and quotation inquiry forms **are** in scope.

---

## 18. Open Questions for the Business Owner

1. What is the exact definition and customer-facing name for **Decorated Furniture**?  
2. What geographic area do you serve?  
3. What are the official contact details and preferred primary channel (phone vs. email)?  
4. For each service, what do you actually offer vs. explicitly do **not** offer?  
5. Do you have a portfolio ready? If yes, how many projects and for which services?  
6. Are you B2C, B2B, or both? Which segment is priority?  
7. What is your quotation process after a form is submitted (timeline, site visit)?  
8. Do you hold any certifications or standardized systems worth publishing? *(Provide proof only.)*  
9. Brand assets: logo, colors, existing marketing materials?  
10. Language requirements now or later?  
11. Legal entity details for Privacy Policy and data retention preferences?  
12. Launch deadline or seasonal marketing drivers?  
13. Competitors or sites you admire (style reference only, not copy)?  
14. Are social media accounts active and should they be linked?  
15. Any restrictions on showing project locations or client names?  

---

## 19. Acceptance Criteria for the Business Requirements

The BRD will be considered **accepted for implementation planning** when:

| # | Criterion |
|---|-----------|
| AC-01 | Business owner (or delegate) confirms objectives in Section 4 align with intent. |
| AC-02 | All four services have approved descriptions; Decorated Furniture ambiguity resolved (BR-019). |
| AC-03 | MVP sitemap (Section 16) agreed, including portfolio launch approach (BR-004). |
| AC-04 | Must Have business requirements (BR-001 through BR-009, BR-019, BR-020) prioritized with no unresolved blockers marked “Critical.” |
| AC-05 | Content and asset checklist (Section 13) has owners and target dates for **Required** items. |
| AC-06 | Out-of-scope list (Section 17) acknowledged. |
| AC-07 | Open questions (Section 18) answered or explicitly deferred with documented impact. |
| AC-08 | NFR priorities (Section 12) agreed at least at Must/Should level; numeric targets optionally baselined. |

---

## Document control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-11 | Business analysis (draft) | Initial BRD from available inputs |

---

*End of Business Requirements Document*
