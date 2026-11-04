# Design System — ELITE WORKSHOP LTD

| Document | Details |
|----------|---------|
| **Version** | 1.0 (Draft) |
| **Status** | Design specification — not implemented |
| **References** | `docs/BRD.md`, `docs/SRS.md`, `docs/TECHNICAL_ARCHITECTURE.md`, `docs/UI_UX_DESIGN.md` |
| **Stack alignment** | Tailwind CSS (implementation phase) |

**Important:** Color, typography, and logo treatments marked **provisional** are design proposals until the business owner supplies official brand guidelines (`docs/BRD.md` Section 13).

---

## 1. Design Principles

| Principle | Meaning for ELITE WORKSHOP LTD |
|-----------|--------------------------------|
| **Craft visible** | Layout and typography feel precise; photography leads; no decorative clutter |
| **Trust through restraint** | No fake stats, badges, or urgency tactics; claims match owner-approved copy only |
| **Architecture first** | Strong grid, clear hierarchy, generous but intentional whitespace |
| **Image-forward** | Light surfaces and neutral frames let project photos read clearly |
| **One primary action** | Repeated CTAs use the same primary button style; secondary actions stay visually subordinate |
| **Accessible by default** | Contrast, focus, touch targets, and motion preferences built into tokens |
| **Performance-conscious** | Few font files, controlled shadows, lazy-loaded media, minimal motion |

---

## 2. Color Tokens

### 2.1 Provisional palette status

No verified logo or brand colors exist in the repository. Tokens below are **provisional (PRO)** — suitable for an architectural / workshop services brand — **not official company colors**.

| Token name | Role | Hex | Tailwind key (proposed) | Notes |
|------------|------|-----|-------------------------|-------|
| `color-primary` | Primary brand / headings emphasis | `#1C2430` | `primary` | Deep slate — professional, architectural |
| `color-secondary` | Secondary surfaces, nav hover | `#3D4F5C` | `secondary` | Steel blue-gray |
| `color-accent` | Primary CTA, key links | `#8B5A2B` | `accent` | Warm bronze — craftsmanship; use sparingly |
| `color-accent-hover` | CTA hover | `#734A24` | `accent-hover` | Darker bronze |
| `color-bg` | Main page background | `#FAFAF8` | `surface` | Warm off-white |
| `color-bg-alt` | Alternating sections | `#F0EDE8` | `surface-alt` | Warm light gray |
| `color-bg-inverse` | Footer, optional dark band | `#1C2430` | `surface-inverse` | Use for footer only — not full-site dark theme |
| `color-text` | Body copy | `#1A1A1A` | `foreground` | |
| `color-text-muted` | Supporting text | `#5C6670` | `muted` | Min 14px for long copy |
| `color-text-inverse` | Text on inverse surfaces | `#F5F5F3` | `foreground-inverse` | |
| `color-border` | Dividers, inputs | `#D8DCE0` | `border` | |
| `color-border-strong` | Card outlines | `#B8BFC6` | `border-strong` | |
| `color-success` | Form success | `#1F6B45` | `success` | |
| `color-success-bg` | Success alert bg | `#E8F5EE` | `success-subtle` | |
| `color-error` | Errors | `#B42318` | `error` | |
| `color-error-bg` | Error alert bg | `#FEF3F2` | `error-subtle` | |
| `color-focus` | Focus ring | `#2563EB` | `focus` | Distinct from accent for a11y |

### 2.2 Contrast (proposed verification targets — WCAG 2.2 AA)

| Pair | Use | Target |
|------|-----|--------|
| `color-text` on `color-bg` | Body | ≥ 4.5:1 |
| `color-text-muted` on `color-bg` | Captions | ≥ 4.5:1 for body-sized text |
| `#FFFFFF` on `color-accent` | Primary button label | ≥ 4.5:1 — verify at implementation; adjust accent if needed |
| `color-focus` ring on `color-bg` | Keyboard focus | Visible 3:1 against adjacent colors |

### 2.3 Service category accents (optional, PRO)

Subtle differentiation without breaking brand unity — use only on service cards/icons borders, not full page themes:

| Service | Accent hint (PRO) | Usage |
|---------|-------------------|--------|
| PVC Works | `#4A6FA5` | 2px top border or small label |
| Aluminium Works | `#6B7B8C` | Same pattern |
| Kitchen Furniture | `#7A6248` | Same pattern |
| Decorated Furniture | `#6B5B7A` | Same pattern + scope notice styling |

---

## 3. Typography Tokens

### 3.1 Font families (proposed, licensed)

| Token | Family | Source | Fallback stack |
|-------|--------|--------|----------------|
| `font-sans` | **IBM Plex Sans** | [Google Fonts — SIL OFL 1.1](https://fonts.google.com/specimen/IBM+Plex+Sans) | `system-ui, -apple-system, Segoe UI, Roboto, sans-serif` |
| `font-serif` (optional) | **IBM Plex Serif** | Same license | `Georgia, serif` — About page pull quotes only; **optional** to limit downloads |

**Rationale:** Single sans family with multiple weights conveys precision and industry; avoids trendy display fonts. One variable or 3–4 static weights max at implementation.

### 3.2 Type scale (rem / px at 16px root)

| Token | Size | Line height | Weight | Use |
|-------|------|-------------|--------|-----|
| `text-display` | 2.75rem (44px) | 1.15 | 600 | Home hero (desktop) |
| `text-h1` | 2.25rem (36px) | 1.2 | 600 | Page titles |
| `text-h2` | 1.75rem (28px) | 1.25 | 600 | Section titles |
| `text-h3` | 1.375rem (22px) | 1.3 | 600 | Card titles |
| `text-h4` | 1.125rem (18px) | 1.35 | 600 | Subsections |
| `text-body-lg` | 1.125rem (18px) | 1.6 | 400 | Lead paragraphs |
| `text-body` | 1rem (16px) | 1.6 | 400 | Body |
| `text-body-sm` | 0.875rem (14px) | 1.5 | 400 | Captions, meta |
| `text-nav` | 0.9375rem (15px) | 1.4 | 500 | Primary navigation |
| `text-label` | 0.875rem (14px) | 1.4 | 500 | Form labels, buttons |
| `text-overline` | 0.75rem (12px) | 1.4 | 600 | Section labels (uppercase, letter-spacing 0.06em) |

### 3.3 Responsive typography

| Breakpoint | Display / H1 adjustment |
|------------|-------------------------|
| `< md` | `text-display` → 2rem (32px); `text-h1` → 1.75rem (28px) |
| `md+` | As table above |
| `lg+` | Hero display may use 3rem (48px) if line length ≤ 12 words |

---

## 4. Spacing Tokens

Base unit: **4px**. Tailwind default scale aligned.

| Token | Value | Tailwind | Typical use |
|-------|-------|----------|-------------|
| `space-1` | 4px | `1` | Tight inline |
| `space-2` | 8px | `2` | Icon gaps |
| `space-3` | 12px | `3` | Form field internal |
| `space-4` | 16px | `4` | Component padding sm |
| `space-6` | 24px | `6` | Card padding |
| `space-8` | 32px | `8` | Section padding mobile |
| `space-10` | 40px | `10` | Between blocks |
| `space-12` | 48px | `12` | Section padding tablet |
| `space-16` | 64px | `16` | Section padding desktop |
| `space-20` | 80px | `20` | Major section breaks |
| `space-24` | 96px | `24` | Hero vertical padding desktop |

**Section spacing rule:** Mobile `space-12`–`space-16` vertical between sections; desktop `space-20`–`space-24`.

---

## 5. Container and Grid Rules

| Token | Value | Notes |
|-------|-------|-------|
| `container-max` | 1200px | Main content max-width |
| `container-wide` | 1320px | Optional full-bleed gallery inner wrap |
| `gutter-mobile` | 20px (`px-5`) | Page horizontal padding |
| `gutter-tablet` | 32px (`px-8`) | |
| `gutter-desktop` | 40px (`px-10`) | |

**Grid:**

| Context | Columns | Gap |
|---------|---------|-----|
| Service cards | 1 / 2 / 4 (sm / md / lg) | 24px |
| Project grid | 1 / 2 / 3 | 16px mobile, 24px desktop |
| Contact layout | 1 / 12-col split (5 form + 7 info) at `lg` | 48px |

---

## 6. Breakpoint Strategy

Aligned with `docs/SRS.md` NFR-RSP-001 and `docs/TECHNICAL_ARCHITECTURE.md`.

| Token | Min width | Intent |
|-------|-----------|--------|
| `sm` | 640px | Large phones, small tablets in portrait |
| `md` | 768px | Tablet — nav may switch; 2-col grids |
| `lg` | 1024px | Laptop — desktop nav, 3-col projects |
| `xl` | 1280px | Large desktop — max container centered |
| `2xl` | 1536px | Optional hero image crop refinement |

**No horizontal scroll** on 320px width (SRS NFR-RSP-003).

---

## 7. Border and Radius Rules

| Token | Value | Use |
|-------|-------|-----|
| `radius-none` | 0 | Image frames (architectural — prefer sharp or minimal) |
| `radius-sm` | 2px | Buttons, inputs — **proposed default** |
| `radius-md` | 4px | Cards — use sparingly |
| `radius-lg` | 8px | Modals only — avoid pill-shaped cards site-wide |

**Border width:** 1px default (`border`); 2px for focus rings and selected filter chips.

---

## 8. Shadow Rules

Restrained elevation — prefer borders over heavy shadows.

| Token | CSS (proposed) | Use |
|-------|----------------|-----|
| `shadow-none` | none | Default cards on `surface-alt` |
| `shadow-sm` | `0 1px 2px rgba(28,36,48,0.06)` | Header on scroll (optional) |
| `shadow-md` | `0 4px 12px rgba(28,36,48,0.08)` | Mobile menu panel, dialog |
| `shadow-focus` | `0 0 0 3px rgba(37,99,235,0.35)` | Focus ring companion |

---

## 9. Component Variants

Summary — full behavior in `docs/UI_UX_DESIGN.md` Section 7.

| Component | Variants |
|-----------|----------|
| **Button** | `primary`, `secondary`, `ghost`, `link`; sizes `sm`, `md`, `lg`; states default/hover/focus/disabled/loading |
| **Service card** | Default; optional `featured` (slightly larger image) |
| **Project card** | `grid`, `featured` (home), `list-row` (optional future) |
| **Input** | `text`, `email`, `tel`, `textarea`, `select`; states default/error/disabled |
| **Alert** | `success`, `error`, `info` |
| **Badge** | `service-tag` (neutral outline) |
| **Section header** | With / without overline; with / without description |

---

## 10. Interactive States

| Element | Hover | Focus | Active | Disabled |
|---------|-------|-------|--------|----------|
| Primary button | `accent-hover` bg | 2px `focus` ring + offset | Slight darken | 50% opacity, no pointer |
| Secondary button | `surface-alt` bg | Focus ring | Border darken | Same |
| Nav link | Underline or bottom border 2px | Visible outline | — | — |
| Text link | `accent` underline | Focus ring inset | — | — |
| Card (clickable) | Image scale ≤ 1.02 **optional** | Focus on link wrapper | — | — |

**Duration (motion):** 150ms ease for color; 200ms for menu open; respect `prefers-reduced-motion`.

---

## 11. Accessibility Rules

| Rule | Specification |
|------|---------------|
| Contrast | Meet WCAG 2.2 AA for text and UI components (SRS NFR-A11Y-004) |
| Focus | Always visible; never `outline: none` without replacement |
| Touch targets | Minimum 44×44px (SRS NFR-RSP-002) |
| Forms | Visible `<label>`; errors linked via `aria-describedby`; summary `aria-live="polite"` on submit |
| Images | Meaningful `alt` from owner captions; decorative `alt=""` |
| Headings | One `h1` per page; no skipped levels |
| Mobile menu | `aria-expanded`, focus trap while open, Escape closes |
| Lightbox (if built) | Focus trap, Escape, prev/next buttons labeled (SRS FR-035 Could) |

---

## 12. Naming Conventions

### 12.1 Token naming

- Semantic tokens: `primary`, `accent`, `surface`, `foreground`, `muted`, `border`, `error`, `success`, `focus`.
- Avoid literal names in components (`blue-button`).

### 12.2 Component naming (implementation phase)

- PascalCase React components: `SiteHeader`, `QuoteForm`.
- Feature folders per `TECHNICAL_ARCHITECTURE.md`: `features/quote/QuoteForm.tsx`.

### 12.3 CSS / Tailwind

- Extend theme in `tailwind.config.ts` under `theme.extend.colors`, `fontFamily`, `spacing` as needed.
- Use `@apply` sparingly; prefer utility classes in JSX for clarity.

---

## 13. Implementation Guidance for Tailwind CSS

### 13.1 Proposed `theme.extend` mapping

```ts
// Illustration only — not implemented in this phase
colors: {
  primary: { DEFAULT: '#1C2430', foreground: '#F5F5F3' },
  secondary: '#3D4F5C',
  accent: { DEFAULT: '#8B5A2B', hover: '#734A24', foreground: '#FFFFFF' },
  surface: { DEFAULT: '#FAFAF8', alt: '#F0EDE8', inverse: '#1C2430' },
  foreground: { DEFAULT: '#1A1A1A', muted: '#5C6670', inverse: '#F5F5F3' },
  border: { DEFAULT: '#D8DCE0', strong: '#B8BFC6' },
  success: { DEFAULT: '#1F6B45', subtle: '#E8F5EE' },
  error: { DEFAULT: '#B42318', subtle: '#FEF3F2' },
  focus: '#2563EB',
},
fontFamily: {
  sans: ['var(--font-ibm-plex-sans)', 'system-ui', 'sans-serif'],
},
maxWidth: {
  container: '1200px',
  'container-wide': '1320px',
},
borderRadius: {
  DEFAULT: '2px',
  md: '4px',
  lg: '8px',
},
```

### 13.2 Fonts in Next.js (future)

- Use `next/font/google` for IBM Plex Sans (weights 400, 500, 600 only).
- `display: swap` for performance.

### 13.3 Forms

- Shared input classes: `h-11`, `px-3`, `border-border`, `focus:ring-2 focus:ring-focus`.
- Required field indicator: asterisk in label + `aria-required="true"`.

---

## 14. Open Design Decisions

| ID | Decision | Status |
|----|----------|--------|
| DS-001 | Official brand colors vs. provisional palette | **Unresolved** — await owner assets |
| DS-002 | Logo mark vs. wordmark-only header | **Unresolved** — until logo files |
| DS-003 | IBM Plex Sans vs. owner-specified corporate font | **Proposed** Plex |
| DS-004 | Service category accent colors | **Proposed** optional |
| DS-005 | Project lightbox in MVP | **Could Have** (SRS FR-035) — design spec included, build optional |
| DS-006 | Footer inverse band vs. light footer | **Proposed** inverse footer for grounding |
| DS-007 | Map embed on Contact | **Should Have** (BR-018) — when address confirmed |

---

## Document control

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-10-11 | Initial design system tokens |

---

*End of Design System*
