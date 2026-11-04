# Content Review — ELITE WORKSHOP LTD Website

| Document | Details |
|----------|---------|
| **Version** | 1.0 |
| **Status** | Launch readiness tracking |
| **Last updated** | Phase 6 frontend implementation |

This document lists content and assets that require business owner confirmation before production launch.

---

## Business facts requiring confirmation

| Item | Current state | Owner action |
|------|---------------|--------------|
| Company history, founding date, team size | Not published | Provide approved About copy |
| Years of experience, awards, certifications | Not used on site | Provide proof before any claims |
| Decorated Furniture definition (BR-019) | Scope notice + draft copy only | Answer BRD Section 8.4 questions |
| Service scope (PVC, aluminium, kitchen) | Neutral draft bullets | Replace with confirmed offerings |
| Geographic service area | Not stated | Confirm for Contact/SEO |
| Quotation follow-up SLA text | Generic success messages | Approve customer-facing wording |

---

## Brand and logo

| Asset | Status |
|-------|--------|
| Official logo (SVG/PNG) | **Missing** — text wordmark used in header |
| Official brand colors | **Provisional** — see `docs/DESIGN_SYSTEM.md` tokens in `client/src/app/globals.css` |
| Corporate fonts | **Provisional** — IBM Plex Sans until brand guidelines supplied |

---

## Photography and portfolio

| Asset | Intended use | Status |
|-------|--------------|--------|
| Hero / workshop imagery | Home, About | Placeholder panels — no stock presented as projects |
| Service category photos | Service cards and detail pages | Placeholders |
| Project case studies | `/projects`, home preview | **No projects published** (`client/src/content/projects.ts` empty) |

---

## Contact and legal

| Item | Status |
|------|--------|
| Official phone, email, address, hours | Env vars empty by default — footer/contact show pending message |
| WhatsApp number | Optional env — hidden when empty |
| Social media URLs | Optional env — hidden when empty |
| Privacy Policy | **Draft** in `client/src/content/privacy.ts` — legal review required |
| Data controller / jurisdiction | Not specified in policy draft |

---

## Forms and backend

| Item | Status |
|------|--------|
| Contact form UI | Implemented — POST `/api/v1/contact` |
| Quotation form UI | Implemented — POST `/api/v1/quotes` |
| Express inquiry endpoints | **Implemented** — `POST /api/v1/contact`, `POST /api/v1/quotes` |
| MongoDB persistence | Requires configured `MONGODB_URI` on server |

---

## Route notes

| Topic | Decision |
|-------|----------|
| Canonical quote URL | `/quote` (SRS) with redirect from `/request-a-quote` |
| Canonical privacy URL | `/privacy` with redirect from `/privacy-policy` |
| Service URLs | SRS slugs (`pvc-works`, etc.) with redirects from shortened paths where configured |

---

## Pre-launch checklist (content)

- [ ] Owner approves all service descriptions in `client/src/content/services.ts`
- [ ] Decorated Furniture scope finalized
- [ ] Contact env vars populated with verified details
- [ ] Privacy policy legally reviewed
- [ ] Portfolio entries added with photo rights and captions
- [ ] Hero and service photography replaced where placeholders remain
- [ ] Backend inquiry endpoints live and tested with forms
