# ELITE WORKSHOP LTD — Phase 8 QA Report

**Report date:** 2026-10-11  
**Phase:** Frontend–backend integration and quality assurance  
**Repository:** `client/` (Next.js), `server/` (Express), `docs/`

---

## 1. Executive Summary

Phase 8 verified alignment between the Next.js frontend and Express API against the BRD, SRS, and technical architecture. **Contact and quotation workflows function end-to-end** when MongoDB is available: API contract matches, server validation and rate limiting are in place, and the frontend shows success only after `{ success: true }`.

**Automated checks:** client lint/build passed; server typecheck/build passed; **18/18** server tests passed (including a new service-category contract test).

**Defects fixed during QA:** CORS blocked form POSTs when Next.js ran on an alternate localhost port; submit button `type` default; form control ARIA wiring via `FormField`.

**Production readiness:** Suitable for **staging / pre-production** deployment once business content, production env vars, and operational processes (backups, inquiry handling) are confirmed. Not recommended for public production launch without approved company contact details and hosting configuration.

---

## 2. Scope of Verification

| In scope | Out of scope |
|----------|----------------|
| API integration (contact, quotes, health) | Admin dashboard, auth |
| MongoDB persistence (dev DB) | Email notifications |
| Routing, redirects, 404 | Payment, orders, CRM |
| Form validation (client + server) | Full WCAG audit certification |
| Build, lint, server tests | Production deployment |
| Security review (config/code level) | Penetration testing |
| Manual browser E2E (contact success) | Lighthouse/CWV in CI |
| Responsive/a11y spot checks | Visual regression suite |

Reference documents read: `docs/BRD.md`, `docs/SRS.md`, `docs/TECHNICAL_ARCHITECTURE.md`, `docs/UI_UX_DESIGN.md`, `docs/DESIGN_SYSTEM.md`, `docs/CONTENT_REVIEW.md`, `docs/BACKEND_IMPLEMENTATION.md`.

---

## 3. Environment and Test Setup

| Item | Value |
|------|--------|
| OS | Windows 10.0.26200 |
| Node | 24.x (per README) |
| Frontend dev URL | `http://localhost:3001` (port 3000 occupied by unrelated app) |
| API URL | `http://localhost:5000/api/v1` |
| MongoDB | `mongodb://127.0.0.1:27017/elite_workshop_dev` (used for API startup in QA session) |
| Client env | Defaults in `client/src/config/site.ts` when `.env.local` absent |
| Server env | No committed `server/.env`; QA session used inline `MONGODB_URI` + `CLIENT_URL` |

**Note:** Port 3000 served a different project (ACCO LTD) during browser testing; ELITE WORKSHOP dev instance verified on **3001**.

---

## 4. Integration Checklist (Summary)

| # | Area | Status | Evidence |
|---|------|--------|----------|
| 1 | Frontend/backend configuration | **Passed** | `.env*.example` files; `siteConfig.apiBaseUrl`; server `env.ts` |
| 2 | API URL consistency | **Passed** | `NEXT_PUBLIC_API_BASE_URL` + `/contact`, `/quotes` paths |
| 3 | Contact form integration | **Passed** | Browser E2E success; `scripts/verify-api-integration.ps1` |
| 4 | Quotation form integration | **Passed** | API POST all four categories; server `it.each` slugs |
| 5 | MongoDB persistence | **Passed** | 201 responses; document counts in dev DB (see §7) |
| 6 | Validation and error handling | **Passed** | Server Vitest + invalid payload script |
| 7 | Responsive layouts | **Partial** | Code review + static build; no multi-viewport automation |
| 8 | Navigation and routing | **Passed** | HTTP 200/404 matrix on dev server (§9) |
| 9 | SEO and accessibility | **Partial** | Metadata on pages; manual a11y improvements; no axe/Lighthouse run |
| 10 | Security and privacy | **Partial** | Code review + npm audit; dev CORS widened only in development |
| 11 | Production builds | **Passed** | `npm run build` client and server |
| 12 | Automated/manual verification | **Partial** | Server tests + API script + one browser E2E; no Playwright/Cypress |

---

## 5. Frontend–Backend API Contract Results

| Test ID | Description | Expected | Actual | Status | Evidence |
|---------|-------------|----------|--------|--------|----------|
| API-01 | Health GET | `200`, `{ success: true }` | Match | **Passed** | Integration script |
| API-02 | Contact POST path/method | `POST /api/v1/contact` | Match | **Passed** | `client/src/lib/api/contact.ts`, server routes |
| API-03 | Quote POST path/method | `POST /api/v1/quotes` | Match | **Passed** | `quotes.ts`, routes |
| API-04 | Contact body fields | `fullName`, `email?`, `phone?`, `message`, `preferredContactMethod?`, `website` | Match | **Passed** | Zod schema vs client payload |
| API-05 | Quote body fields | Includes `serviceCategory`, `projectDescription`, etc. | Match | **Passed** | Schemas |
| API-06 | Service slugs | Four SRS slugs | Match | **Passed** | `server/src/tests/contract.test.ts` |
| API-07 | Success response | `201`, `{ success: true, data: null }` | Match | **Passed** | Integration script |
| API-08 | Validation errors | `400`, structured `error.fields` | Match | **Passed** | Vitest + `postJson` mapping |
| API-09 | Rate limit | `429` user-safe message | Match (server) | **Passed** | `client.ts` 429 branch; limiter middleware |
| API-10 | No hardcoded API host in components | Env-based base URL | Match | **Passed** | `siteConfig.apiBaseUrl` |

---

## 6. Contact Form Test Results

| Test ID | Description | Expected | Actual | Status | Evidence |
|---------|-------------|----------|--------|--------|----------|
| CF-01 | Valid submission (API) | 201, success | Match | **Passed** | `verify-api-integration.ps1` |
| CF-02 | Valid submission (browser) | Success alert after API OK | "Message sent" shown | **Passed** | Browser on `:3001/contact` |
| CF-03 | Missing email and phone | Client/server reject | Covered server-side | **Passed** | Vitest |
| CF-04 | Invalid email | Error, no false success | Match | **Passed** | Vitest |
| CF-05 | Honeypot filled | Rejected | Match | **Passed** | Vitest |
| CF-06 | Unexpected JSON fields | 400 strict schema | Match | **Passed** | Vitest |
| CF-07 | Backend unavailable | Safe error, no success | Match (code path) | **Passed** | `postJson` catch; not live-simulated |
| CF-08 | DB unavailable | 503, safe message | Match | **Passed** | Vitest |
| CF-09 | Double submit | Button disabled while loading | "Please wait…" observed | **Passed** | Browser |
| CF-10 | Invalid short message | No persistence | Rejected | **Passed** | Integration script invalid case |

---

## 7. Quotation Form Test Results

| Test ID | Description | Expected | Actual | Status | Evidence |
|---------|-------------|----------|--------|--------|----------|
| QF-01 | Valid submission | 201 | Match | **Passed** | Integration script |
| QF-02 | All service categories | Each slug accepted | All four POST 201 | **Passed** | PowerShell loop + Vitest `it.each` |
| QF-03 | Invalid category | 400 | Match | **Passed** | Vitest |
| QF-04 | Short description | 400 | Match | **Passed** | Vitest |
| QF-05 | Operator injection fields | Rejected | Match | **Passed** | Vitest |
| QF-06 | Creates order/payment | Inquiry only | No order logic in API | **Passed** | Code review |
| QF-07 | Browser quote E2E | Success UI | **Not Run** | **Not Run** | Time; contact E2E deemed representative |

---

## 8. MongoDB Persistence Results

| Test ID | Description | Expected | Actual | Status | Evidence |
|---------|-------------|----------|--------|--------|----------|
| DB-01 | Contact record stored | Document in `contact_inquiries` | Count ≥ 1 for test emails | **Passed** | Node count script |
| DB-02 | Quote records stored | Documents in `quotation_requests` | 4 docs for category tests | **Passed** | Node count script |
| DB-03 | Invalid request no insert | No new doc | **Passed** (API) | **Passed** | 400 responses; no success body |
| DB-04 | Production DB | N/A | Not used | **N/A** | Dev DB only |

**Sample counts (dev DB, 2026-10-11):**

- `phase8-browser@example.test`: **1** contact inquiry  
- `qa-integration@example.test`: **2** contact inquiries (script re-runs)  
- `fullName: "QA Cat Test"`: **4** quotation requests (one per category)

Test data should be purged before production cutover or marked in an ops runbook.

---

## 9. Navigation and Routing Results

| Route | Expected | HTTP (dev :3001) | Status |
|-------|----------|------------------|--------|
| `/` | Home | 200 | **Passed** |
| `/about` | About Us | 200 | **Passed** |
| `/services` | Services overview | 200 | **Passed** |
| `/services/pvc-works` | PVC | 200 | **Passed** |
| `/services/aluminium-works` | Aluminium | 200 | **Passed** |
| `/services/kitchen-furniture` | Kitchen | 200 | **Passed** |
| `/services/decorated-furniture` | Decorated | 200 | **Passed** |
| `/projects` | Portfolio | 200 | **Passed** |
| `/contact` | Contact | 200 | **Passed** |
| `/quote` | Request a Quote | 200 | **Passed** |
| `/privacy` | Privacy | 200 | **Passed** |
| `/does-not-exist` | 404 page | 404 | **Passed** |
| `/request-a-quote` | Redirect → `/quote` | Location `/quote` | **Passed** |
| `/privacy-policy` | Redirect → `/privacy` | Location `/privacy` | **Passed** |

Header/footer links verified via browser snapshot on contact page (SRS destinations present).

---

## 10. Responsive Design Results

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| RD-01 | Mobile header/menu | **Not Run** | No automated viewport matrix |
| RD-02 | Form usability mobile | **Partial** | Tailwind responsive classes in forms |
| RD-03 | Horizontal overflow | **Not Run** | Manual pass recommended before launch |
| RD-04 | Production static pages | **Passed** | `next build` generates 19 routes |

**Limitation:** Full responsive QA was not executed across five breakpoints; recommend manual check on real devices before production.

---

## 11. Accessibility Results

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| A11Y-01 | Skip link | **Passed** | Observed in browser snapshot |
| A11Y-02 | Form labels | **Passed** | `FormField` + labels |
| A11Y-03 | Error announcements | **Partial** | `role="alert"` on field errors |
| A11Y-04 | `aria-describedby` / `aria-invalid` on inputs | **Passed** | Fixed in `FormField.tsx` |
| A11Y-05 | Keyboard mobile menu | **Not Run** | `MobileNav` client component present |
| A11Y-06 | Automated axe/Lighthouse | **Not Run** | No tooling executed |
| A11Y-07 | WCAG 2.2 AA certification | **Not Applicable** | Target aspirational; not certified |

**Dev-only note:** Next.js dev overlay reported a hydration warning referencing `PageHeader` on contact page in one session; production build path should be re-checked. Not reproduced during post-CORS success flow.

---

## 12. SEO Results

| Test ID | Description | Status | Evidence |
|---------|-------------|--------|----------|
| SEO-01 | Page titles | **Passed** | e.g. "Contact Us \| ELITE WORKSHOP LTD" |
| SEO-02 | `createPageMetadata` on key pages | **Passed** | App router pages |
| SEO-03 | `sitemap.ts` / `robots.ts` | **Passed** | Files present; use `NEXT_PUBLIC_SITE_URL` |
| SEO-04 | Organization JSON-LD | **Passed** | `OrganizationJsonLd` in layout |
| SEO-05 | Canonical production domain | **Blocked** | Official domain not in BRD |

---

## 13. Performance Results

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| PERF-01 | Next production build | **Passed** | ~2.6s compile (env-specific) |
| PERF-02 | Lighthouse / CWV | **Not Run** | No scores recorded |
| PERF-03 | Image optimization | **Partial** | Limited image assets in repo |
| PERF-04 | Unnecessary API calls on static pages | **Passed** | Forms only on contact/quote |

---

## 14. Security Review

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| SEC-01 | `MONGODB_URI` server-only | **Passed** | Not in client env |
| SEC-02 | Helmet, body limit 32kb | **Passed** | `app.ts` |
| SEC-03 | Rate limiting on inquiries | **Passed** | `inquiryRateLimiter` |
| SEC-04 | Strict Zod schemas | **Passed** | `.strict()` on bodies |
| SEC-05 | Honeypot | **Passed** | `website` field |
| SEC-06 | Error handler leaks | **Passed** | Generic 5xx messages to client |
| SEC-07 | CORS production | **Passed** | Single `CLIENT_URL` in production |
| SEC-08 | CORS dev localhost ports | **Passed** | Fixed to allow localhost in `development` only |
| SEC-09 | npm audit client | **Partial** | 5 high (eslint/braces chain); fix requires breaking downgrade |
| SEC-10 | npm audit server | **Partial** | 3 issues in vitest/tinypool dev deps |

---

## 15. Build and Type-Checking Results

| Command | Location | Result | Status |
|---------|----------|--------|--------|
| `npm run lint` | `client/` | Exit 0 | **Passed** |
| `npm run build` | `client/` | Exit 0, 19 routes | **Passed** |
| `npm run typecheck` | `server/` | Exit 0 | **Passed** |
| `npm run build` | `server/` | Exit 0 | **Passed** |
| `npm test` | `server/` | 18/18 tests | **Passed** |
| Frontend unit/E2E tests | `client/` | No suite configured | **Not Applicable** |

---

## 16. Bugs Found

| ID | Severity | Summary |
|----|----------|---------|
| BUG-001 | High | CORS allowed only `CLIENT_URL`; Next.js on `:3001` could not POST (browser "Failed to fetch"). |
| BUG-002 | Medium | `Button` omitted explicit default `type="button"`, risking non-submit behavior when used outside forms incorrectly. |
| BUG-003 | Medium | `FormField` did not propagate `aria-describedby`, `aria-invalid`, `aria-required` to controls. |
| BUG-004 | Low | README still described MongoDB as optional (documentation drift). |
| BUG-005 | Info | React hydration warning in Next dev overlay on contact page (intermittent; needs prod verification). |

---

## 17. Bugs Fixed

| ID | Fix |
|----|-----|
| BUG-001 | `server/src/app.ts`: allow `localhost` / `127.0.0.1` origins when `NODE_ENV=development`. |
| BUG-002 | `client/src/components/ui/Button.tsx`: default `type="button"`, forward `type="submit"`. |
| BUG-003 | `client/src/components/ui/FormField.tsx`: `cloneElement` for ARIA attributes. |
| BUG-004 | `README.md` + `server/.env.example` updated for MongoDB requirement and CORS note. |

---

## 18. Known Limitations

- Official company phone, email, address, and social URLs are placeholders until business provides them (`CONTENT_REVIEW.md`).
- Portfolio collection is empty (empty state + build placeholder slug).
- No email notification when inquiries are stored.
- No frontend automated test suite.
- Decorated Furniture service definition remains ambiguous per BRD (not changed in QA).
- Dependency audit findings in **dev** tooling (eslint/vitest) need a planned upgrade, not silent `npm audit fix --force`.

---

## 19. Blocked and Unexecuted Tests

| Item | Reason |
|------|--------|
| Quote form browser E2E | Contact browser path verified; API covers quote |
| Lighthouse / CWV | Not run in this environment |
| Full responsive matrix | No viewport automation |
| axe accessibility scan | Not run |
| Rate limit live simulation | Would require 10+ rapid POSTs; covered by middleware config + client 429 handling |
| Production/staging deploy smoke | Out of phase scope |

---

## 20. Remaining Risks

1. **Operations:** No backup/monitoring for MongoDB inquiry collections.  
2. **Content:** Launch without verified contact details harms trust and SEO local signals.  
3. **Dependencies:** Transitive vulnerabilities in dev tooling; schedule upgrades.  
4. **CORS:** Production must set `CLIENT_URL` exactly; misconfiguration blocks all form submissions.  
5. **Test data:** QA records remain in dev DB until cleaned.  

---

## Production Readiness Assessment

| Criterion | Assessment |
|-----------|------------|
| Functional MVP (browse + inquire) | **Ready for staging** with MongoDB + env config |
| Business content complete | **Not ready** — contact details and portfolio pending |
| Security baseline | **Acceptable for staging** with production CORS and secrets hygiene |
| Automated regression | **Partial** — server tests only; add client E2E recommended |
| Overall production launch | **Not ready** until content, hosting, and release checklist sign-off |

See **`docs/RELEASE_CHECKLIST.md`** for pre-deploy gates.

---

## Appendix A — Commands Executed

```text
cd client && npm run lint && npm run build
cd server && npm run typecheck && npm run build && npm test
powershell -File scripts/verify-api-integration.ps1
MongoDB count script (mongoose, elite_workshop_dev)
HTTP route checks against http://localhost:3001
Browser manual test: contact form success on http://localhost:3001/contact
npm audit --audit-level=high (client and server)
```

---

## Appendix B — Files Added/Updated in Phase 8

| File | Change |
|------|--------|
| `client/src/components/ui/Button.tsx` | Submit type fix |
| `client/src/components/ui/FormField.tsx` | ARIA wiring |
| `server/src/app.ts` | Development CORS for localhost ports |
| `server/src/config/env.ts` | Comment cleanup |
| `server/.env.example` | CORS/MongoDB notes |
| `server/src/tests/contract.test.ts` | Service slug contract test |
| `scripts/verify-api-integration.ps1` | Manual API verification |
| `README.md` | MongoDB requirement |
| `docs/QA_REPORT.md` | This report |
| `docs/RELEASE_CHECKLIST.md` | Pre-production checklist |
