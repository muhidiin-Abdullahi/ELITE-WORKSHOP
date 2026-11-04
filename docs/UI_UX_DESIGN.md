# UI/UX Design Specification — ELITE WORKSHOP LTD

| Document | Details |
|----------|---------|
| **Version** | 1.0 (Draft) |
| **Status** | Design research and specification — not implemented |
| **References** | `docs/BRD.md`, `docs/SRS.md`, `docs/TECHNICAL_ARCHITECTURE.md`, `docs/DESIGN_SYSTEM.md` |
| **MVP pages** | Per SRS Section 5.1 + custom 404 |

---

## 1. Design Goals

| Goal | Design response |
|------|-----------------|
| Communicate craftsmanship and precision | Restrained typography, grid discipline, authentic photography |
| Build trust without exaggeration | No invented history, stats, or testimonials; owner-approved copy only |
| Clarify four service lines | Consistent service templates; Decorated Furniture scope notice (BR-019) |
| Convert interest to inquiries | Clear CTA hierarchy: **Request a Quote** primary, **Contact** secondary |
| Support residential and commercial audiences (hypothesis) | Neutral premium tone; project diversity when assets exist |
| Meet accessibility and mobile expectations | WCAG 2.2 AA target; 44px targets; readable forms on small screens |
| Perform well on real devices | Light theme, optimized images, minimal motion |

---

## 2. Brand and Audience Context

### 2.1 Verified vs. provisional

| Item | Status |
|------|--------|
| Company name **ELITE WORKSHOP LTD** | Confirmed (BRD) |
| Four service category names | Confirmed (names only) |
| Logo, colors, fonts | **Not in repository** — design uses **provisional** direction (`DESIGN_SYSTEM.md`) |
| Contact details, address, hours | **Unknown** — UI must hide or use approved placeholders |
| Portfolio photography | **Unknown** — empty state or labeled placeholders only |

### 2.2 Audience (hypothesis — BRD Section 7)

Homeowners, renovators, contractors, architects, developers, commercial clients. Design stays **neutral-professional** so no segment feels excluded until the owner confirms priority segment.

---

## 3. Visual Direction

### 3.1 Keywords

Premium · Modern · Professional · Clean · Architectural · Image-driven · Trustworthy

### 3.2 Layout character

- **Editorial grid:** Full-width hero photography or controlled split hero; content sections in `1200px` container.
- **Vertical rhythm:** Alternating `surface` and `surface-alt` sections for scanability — not every section needs a background change (max alternate every other section).
- **Corners:** Minimal radius (2–4px) — avoid “startup SaaS” rounded cards.
- **Icons:** Line icons only where functional (phone, mail, menu, chevron); no icon grids for “features.”
- **Photography:** Dominates hero and portfolio; text blocks stay concise.

### 3.3 What we avoid

Excessive gradients, decorative animation, fake social proof, stock photos presented as ELITE work, dark full-site theme, crowded hero with five CTAs.

---

## 4. Color Palette

See **`docs/DESIGN_SYSTEM.md` Section 2** for token names and hex values.

**Provisional direction (PRO):** Warm off-white backgrounds, deep slate typography, bronze accent for primary actions — evokes workshop materials and architectural drawings without mimicking a specific trade brand.

**When official brand arrives:** Replace token hex values in Tailwind config; re-run contrast audit; do not claim interim palette was ever “official.”

### 4.1 Required from business owner

- Logo (SVG + PNG)
- Brand primary/secondary colors (if any)
- Existing stationery, vehicle livery, or social profile colors for alignment

---

## 5. Typography

See **`docs/DESIGN_SYSTEM.md` Section 3**.

**UX writing tone (content guidelines, not invented copy):**

- Headlines: direct, capability-oriented (“Kitchen furniture, built to your space”) — **owner must approve final strings**.
- Body: short paragraphs (2–4 sentences); bullet lists for scope when owner provides facts.
- Avoid superlatives (“best in region”) unless owner verifies.

---

## 6. Spacing and Layout Rules

| Rule | Specification |
|------|---------------|
| Page gutters | `20px` mobile → `32px` tablet → `40px` desktop |
| Max line length | 65–75 characters for body copy |
| Hero min-height | `min-h-[420px]` mobile, `min-h-[520px]` desktop — image or split content |
| Sticky header | Height `64px` mobile / `72px` desktop; subtle bottom border on scroll |
| Footer | Inverse `surface-inverse` band; padding `space-16` vertical |

Full tokens: `DESIGN_SYSTEM.md` Sections 4–6.

---

## 7. Component Inventory

Each component: purpose, structure, variants, responsive behavior, accessibility.

### 7.1 Site header

| Attribute | Detail |
|-----------|--------|
| **Purpose** | Global wayfinding, brand presence (FR-001–FR-006) |
| **Structure** | Logo or wordmark left; desktop nav center or right; primary CTA button right (`Request a Quote`) |
| **Variants** | Transparent over hero (home only, if contrast sufficient) → solid `surface` on scroll |
| **Responsive** | `< md`: hamburger; logo centered or left; CTA visible as button or icon+text |
| **A11y** | `nav` landmark; skip link before header; menu button `aria-expanded` |

### 7.2 Desktop navigation

| Attribute | Detail |
|-----------|--------|
| **Links** | Home, About, Services, Projects, Contact — **no dropdown required for MVP** (four services reachable via Services page) |
| **Active state** | Bottom border 2px `accent` or `primary` + `aria-current="page"` |
| **Optional future** | Services mega-menu — **not MVP** unless owner requests |

### 7.3 Mobile navigation

| Attribute | Detail |
|-----------|--------|
| **Pattern** | Full-height or max 85vh panel from right; overlay scrim |
| **Content** | Stacked links, then primary CTA, then phone link **if configured** |
| **Motion** | Slide 200ms; `prefers-reduced-motion`: instant show/hide |
| **A11y** | Focus trap, Escape closes, return focus to menu button |

### 7.4 Footer

| Attribute | Detail |
|-----------|--------|
| **Structure** | 3 columns desktop: (1) logo + one-line descriptor **owner-approved**, (2) nav links, (3) contact snippet + Privacy link |
| **Contact** | Show phone/email only when env config non-empty (SRS FR-070) |
| **Social** | Icon row only if URLs configured (BR-014, Could) |

### 7.5 Buttons

| Variant | Use |
|---------|-----|
| **Primary** | Request a Quote |
| **Secondary** | Contact Us, View Projects |
| **Ghost** | Tertiary in-content links |
| **Link** | Inline text actions |

Sizes: default `h-11` (44px min touch). Loading: spinner + `aria-busy`.

### 7.6 Service card

| Attribute | Detail |
|-----------|--------|
| **Structure** | Image 4:3 top; overline service name; 2-line summary; text link “View service →” |
| **Variants** | Optional category accent top border (PRO) |
| **Responsive** | 1 col mobile, 2 tablet, 4 desktop on overview |
| **A11y** | Entire card not one link — use visible link; image alt describes service context generically until owner alt text |

### 7.7 Project card

| Attribute | Detail |
|-----------|--------|
| **Structure** | Image 3:2 or 4:3; project title; service tags (badges); optional location if owner allows |
| **Hover** | Subtle image zoom optional; must not be only affordance |
| **A11y** | Link wraps title or “View project” |

### 7.8 Breadcrumbs

| Attribute | Detail |
|-----------|--------|
| **Use** | Service detail, project detail |
| **Pattern** | Home → Services → [Service] or Home → Projects → [Project] |
| **A11y** | `nav` with `aria-label="Breadcrumb"` |

### 7.9 Page hero (interior pages)

| Attribute | Detail |
|-----------|--------|
| **Structure** | Shorter than home: `h1`, optional 1-line intro, optional breadcrumb above |
| **Background** | `surface-alt` or thin image band — not full viewport |

### 7.10 Section heading block

| Attribute | Detail |
|-----------|--------|
| **Structure** | Optional overline → `h2` → optional 1–2 sentence description → optional “View all” link |
| **Alignment** | Left-aligned default; center only on home services block |

### 7.11 Image gallery (project detail)

| Attribute | Detail |
|-----------|--------|
| **MVP** | Responsive grid 1–2 columns; click opens **accessible dialog lightbox** if implemented (SRS Could) |
| **Fallback** | Static grid without lightbox acceptable for MVP |
| **A11y** | Each image alt; dialog focus trap if lightbox built |

### 7.12 Contact information block

| Attribute | Detail |
|-----------|--------|
| **Structure** | Label + value rows: Phone, Email, Address, Hours |
| **Empty state** | Row hidden if unset; optional message: “Contact details will be published here.” **Owner must approve wording** |

### 7.13 Contact form

| Fields (SRS) | fullName*, message*, email or phone* (TAD-004), preferredContactMethod optional |
| **States** | Default, validating, submitting, success, error |
| **Layout** | Single column mobile; max-width `480px` for fields |

### 7.14 Quotation form

| Fields (SRS) | fullName*, phone*, serviceCategory*, projectDescription*; email, projectLocation, preferredContactMethod optional |
| **Pre-fill** | `?service=` from service pages |
| **Disclaimer** | Static text: inquiry only, not binding quote — owner-approved SLA text when available |
| **Privacy** | Link above submit |

### 7.15 Form success / error

| State | Design |
|-------|--------|
| Success | `success-subtle` alert; check icon; clear next steps |
| Error (field) | Red border + text under field |
| Error (global) | `error-subtle` alert; retry guidance; suggest phone if configured |

### 7.16 Empty states

| Context | Content |
|---------|---------|
| Portfolio | Owner-approved `portfolioEmptyStateMessage` (BR-004); illustration optional — neutral line art, not fake projects |
| Missing service copy | “Service information is being prepared.” — owner approval |
| Decorated Furniture undefined | Prominent **scope notice** panel: definition pending (US-007) |

### 7.17 Loading states

| Context | Design |
|---------|--------|
| Form submit | Disable button, spinner, preserve entered values |
| Page | Prefer SSR — minimal route loading skeletons for slow networks only |
| Images | Blur placeholder or neutral `surface-alt` box — no fake project content in placeholder |

### 7.18 Dialog / lightbox (optional MVP)

If implemented: close button, Escape, focus trap, `role="dialog"`, `aria-modal="true"`, prev/next for gallery.

---

## 8. Page-by-Page Design Specifications

### 8.A Home Page (`/`)

**Objective:** Within 5 seconds, visitor understands ELITE WORKSHOP LTD offers professional PVC, aluminium, kitchen, and related furniture services and knows how to view work or request a quote.

| Order | Section | Purpose | Content notes |
|-------|---------|---------|---------------|
| 1 | Header | Nav + CTA | Wordmark until logo |
| 2 | Hero | Positioning | **Headline (owner):** what the company does in one line. **Subline:** one supporting sentence max. **Primary CTA:** Request a Quote. **Secondary:** View Services or Projects. **Visual:** owner hero image or neutral architectural placeholder labeled “Photography coming soon” — not fake project |
| 3 | Services overview | Four categories | 4 cards linking to detail pages |
| 4 | Featured projects | Proof | **Only if projects exist** — 3 items max; link to `/projects`. Else skip or single line pointing to contact |
| 5 | Company introduction | Trust | 2–3 sentences **owner-approved**; link About |
| 6 | “Why work with us” | Supportable differentiation | **Bullets only from owner facts** (e.g., process, quality checks) — no “20+ years” unless verified |
| 7 | Inquiry band | Conversion | `surface-alt` full-width: headline + one sentence + primary CTA Quote + secondary Contact |
| 8 | Footer | Wayfinding | Privacy link mandatory |

**Hero composition:** Desktop — 55% image / 45% text split or full-bleed image with left-aligned text panel on semi-opaque `surface` (ensure contrast). Mobile — stack image then text; CTAs stack vertically, primary full-width.

**Button hierarchy:** One primary per viewport in hero; secondary outline.

---

### 8.B About Us (`/about`)

| Section | Purpose | Owner input required |
|---------|---------|----------------------|
| Page hero | Context | Page title + optional approved tagline |
| Story | Who we are | Full narrative — **not invented** |
| Approach / craftsmanship | How work is done | Process steps only if owner confirms |
| Capabilities | What workshop can do | Tie to four services at high level |
| Workshop imagery | Authenticity | Real photos with rights — else omit |
| CTA band | Next step | Quote + Contact |

**Do not include:** Founding year, employee count, awards, unless owner supplies.

---

### 8.C Services Overview (`/services`)

| Section | Detail |
|---------|--------|
| Intro | `h1` “Services” + one paragraph owner-approved |
| Grid | Four equal cards with distinct optional accent border (PRO) |
| Bottom CTA | “Not sure which service?” → Contact or Quote |

Visual identity per service: photography from owner when available; else category placeholder with clear label “Representative category image — project photos to follow.”

---

### 8.D Individual Service Pages (`/services/[slug]`)

**Shared template** for PVC, Aluminium, Kitchen, Decorated.

| Section | PVC / Aluminium / Kitchen | Decorated Furniture |
|---------|---------------------------|---------------------|
| Breadcrumb | Yes | Yes |
| Hero | Service name + summary | **+ Scope notice box first** (BR-019) explaining term is defined by owner; if missing, amber-neutral info panel “Definition pending confirmation” — **no invented product list** |
| Introduction | Owner body copy | Same |
| Imagery | Owner photos only | Same |
| Offerings | Bullet list **owner-confirmed only** | Do not list upholstery/lacquer etc. until defined |
| Benefits | Only accurate, approved statements | Generic craft quality language only if owner approves |
| Related projects | 2–4 cards filtered by service slug | Same |
| FAQ accordion | **Should Have** — owner Q&A only | Extra FAQ on terminology when resolved |
| CTA | Quote pre-selected + Contact | Same |

**Decorated Furniture ambiguity (preserved):** Design includes a visible **“What we mean by this service”** callout. Content comes from owner answers to BRD Section 8.4 — design does not resolve meaning.

---

### 8.E Projects / Portfolio (`/projects`)

| Element | Specification |
|---------|---------------|
| Header | `h1` + short intro |
| Filter bar | **Should Have (SRS FR-034)** — show when ≥6 projects **proposed**; else omit in MVP |
| Grid | 3:2 images, 1/2/3 columns responsive |
| Empty state | Centered message + CTA to quote/contact (BR-004) |
| Project detail | Title, meta line (location/date if allowed), description, gallery, service tags, CTA |

**No fictitious projects.** Placeholder grid during design phase = gray frames + “Project photography pending” in wireframes only — not in production.

---

### 8.F Contact Us (`/contact`)

| Layout (lg+) | Left 5/12: form. Right 7/12: contact block + optional map **when address confirmed** |
| Layout (mobile) | Contact details above form if phone/email exist; else form first |

**Form:** See component 7.13. Honeypot field visually hidden.

**Verified details:** Render from config only. WhatsApp button if number configured (SRS FR-072).

---

### 8.G Request a Quote (`/quote`)

| Element | Detail |
|---------|--------|
| Intro | `h1`, 2 sentences on process (owner-approved), inquiry disclaimer |
| Form | Single column; service `<select>` with four options; phone required indicator `*` |
| Required indicators | Legend “* Required” |
| Mobile | Sticky submit optional **only if** it doesn’t cover fields — prefer inline submit |
| Success | Replace form with success panel or show alert above fold; include owner SLA when provided |

---

### 8.H Privacy Policy & Error Pages

**Privacy (`/privacy`):**

- Readable legal layout: max-width `720px`, `text-body`, clear `h2` sections.
- Last updated date **when owner/legal provides**.

**404 (`not-found`):**

- Calm message; links Home, Services, Contact, Quote.
- Optional subtle illustration — not humorous.

**Form / API errors:** Inline per Section 7.15 — no raw error codes shown to users.

---

## 9. Image and Photography Strategy

### 9.1 Principles

1. **Authenticity first** — only ELITE WORKSHOP LTD project photos in production portfolio.
2. **Until assets exist** — neutral placeholders with explicit non-project labeling in staging/design reviews.
3. **Never** — stock images implying completed ELITE work.

### 9.2 Style direction (for owner / photographer brief)

| Attribute | Guidance |
|-----------|----------|
| Lighting | Natural or soft studio; avoid harsh HDR |
| Composition | Straight lines for aluminium/PVC; lifestyle context for kitchens |
| Color grading | Neutral, slightly warm — match `surface` warmth |
| Cropping | Consistent aspect ratios per grid (3:2 projects, 4:3 services) |
| Resolution | Master 2400px long edge; web derivatives via Next/Image |
| Workshop shots | Optional credibility — real workshop only |

### 9.3 Category guidance (when shooting)

| Category | Suggested subjects |
|----------|-------------------|
| PVC Works | Installed windows/doors, detail of profiles — **owner confirms products** |
| Aluminium Works | Frames, facades, doors — per actual scope |
| Kitchen Furniture | Wide room + detail hardware |
| Decorated Furniture | **TBD with owner** — do not shoot assuming upholstery vs. case goods |

### 9.4 Technical handling

- `next/image` with responsive `sizes`.
- Lazy load below fold; priority only for LCP hero.
- Alt text from owner captions (SRS NFR-A11Y-005).
- Missing image: text-only project layout (SRS edge case).

---

## 10. Responsive Design Strategy

| Breakpoint | Navigation | Hero | Services grid | Projects | Forms |
|------------|------------|------|---------------|----------|-------|
| 320–639px | Hamburger | Stacked | 1 col | 1 col | Full width fields |
| 640–767px | Hamburger | Stacked | 2 col | 2 col | Full width |
| 768–1023px | Hamburger or inline **proposed hamburger until lg** | Split optional | 2 col | 2 col | Max-width centered |
| 1024px+ | Full horizontal nav | Split / full bleed | 4 col overview | 3 col | Split contact layout |
| 1280px+ | Same | More image crop room | Same | Same | Same |

**Forms:** Avoid multi-step unless approved — single page per SRS.

**Typography:** Scale down per `DESIGN_SYSTEM.md` Section 3.3.

---

## 11. Interaction and Motion

| Interaction | Behavior |
|-------------|----------|
| Mobile menu | Slide + fade scrim; reduced motion → fade only |
| Button hover | Background darken 150ms |
| Button focus | Visible ring — always |
| Nav link | Underline animate optional 150ms |
| Project card | Optional 1.02 scale on image — disabled if `prefers-reduced-motion` |
| Form validation | Inline on blur + submit; no shake animations |
| Submit | Button loading state min 300ms visibility to avoid flash |
| Section entrance | **No scroll-jacking**; optional fade-in **Could** — default off for MVP |

Essential information never hover-only.

---

## 12. Accessibility Requirements

Design must satisfy SRS NFR-A11Y-001–006 and `DESIGN_SYSTEM.md` Section 11.

| Area | Requirement |
|------|-------------|
| Color | AA contrast for text and controls |
| Keyboard | All nav, forms, dialogs operable |
| Focus | 3px visible focus ring `color-focus` |
| Semantics | Landmarks, one h1, logical heading order |
| Forms | Labels, errors, `aria-live` for submit result |
| Images | Accurate alt; decorative empty alt |
| Touch | 44px min targets |
| Motion | Honor `prefers-reduced-motion` |
| Mobile menu | Trap + Escape |

---

## 13. Conversion Strategy

### 13.1 Action hierarchy

| Priority | Action | Destination | Placement |
|----------|--------|-------------|-----------|
| **Primary** | Request a Quote | `/quote` | Header, hero, inquiry bands, end of service pages |
| **Secondary** | View Projects | `/projects` | Hero, after services |
| **Secondary** | Contact Us | `/contact` | Header footer, secondary buttons |
| **Tertiary** | Explore Services | `/services` | Hero, home services section |

### 13.2 Rules

- Maximum **one primary CTA per visible section**.
- Service pages: one primary (Quote) + text link Contact.
- Do not repeat identical CTA copy more than twice before footer on a single page **proposed**.
- Quote form: minimize fields per SRS — no multi-page wizard.

### 13.3 Messaging (templates for owner approval)

- Primary button label: **“Request a Quote”** (consistent site-wide).
- Secondary: **“Contact Us”**, **“View Projects”**, **“View Service”**.

---

## 14. Content and Asset Dependencies

| Asset | Required for | Owner action |
|-------|--------------|--------------|
| Logo SVG/PNG | Header, favicon | Provide files |
| Brand colors/fonts | Theme | Guidelines or samples |
| Hero image | Home | Project or brand-approved photo |
| Service copy ×4 | Service pages | Approve scope text |
| Decorated Furniture scope | Service page callout | Answer BRD 8.4 |
| Project photos + metadata | Portfolio | Rights + captions |
| About narrative | About | Approve copy |
| Contact details | Contact/footer | Official phone, email, address |
| Privacy policy text | Privacy + forms | Legal approval |
| Quote success / SLA message | Quote success state | Approve wording |
| Empty portfolio message | Projects empty state | Approve (BR-004) |

---

## 15. Design Review Checklist

Use before implementation sign-off and before launch content review.

| # | Criterion | Pass? |
|---|-----------|-------|
| 1 | Company name correct; no false credentials | |
| 2 | Provisional colors labeled if brand not supplied | |
| 3 | Visual hierarchy: h1 clear, one primary CTA per section | |
| 4 | Typography matches design system scale | |
| 5 | Contrast AA on text, buttons, focus | |
| 6 | Photography authentic or clearly placeholder | |
| 7 | Mobile: no horizontal scroll; menu usable | |
| 8 | Navigation matches SRS sitemap | |
| 9 | Forms match SRS fields and required rules | |
| 10 | Privacy linked from forms | |
| 11 | Decorated Furniture page handles ambiguity | |
| 12 | Empty portfolio state designed | |
| 13 | No fake testimonials/stats/awards | |
| 14 | Footer on all pages with Privacy | |
| 15 | Performance: hero image optimized; fonts limited | |
| 16 | Reduced motion respected | |
| 17 | Contact channels hidden when config empty | |

---

## 16. Unresolved Design Decisions

| ID | Topic | Status |
|----|-------|--------|
| UX-001 | Official brand vs. provisional palette | Unresolved |
| UX-002 | Hero: full-bleed vs. split | **Proposed:** split on desktop for readability |
| UX-003 | Portfolio filter in first release | **Proposed defer** unless ≥6 projects (align SRS Should Have) |
| UX-004 | Lightbox in MVP | Optional (SRS Could) |
| UX-005 | Transparent header on home | **Proposed** only if hero contrast passes WCAG |
| UX-006 | Map on Contact | When address confirmed (BR-018) |
| UX-007 | “Why choose us” bullets content | Await owner — section omit if no facts |
| UX-008 | Service photography placeholders in production | **Proposed:** omit image area rather than stock |

Business questions OQ-001–OQ-013 from SRS remain open; design does not close them.

---

## Document control

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-10-11 | Initial UI/UX specification |

---

*End of UI/UX Design Specification*
