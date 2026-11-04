# ELITE WORKSHOP LTD — Production Release Checklist

Use this checklist before deploying the public website and Express API. Each item should be verified in a **staging** environment that mirrors production configuration.

## Environment and secrets

- [ ] `client/.env.local` (or host env) sets `NEXT_PUBLIC_SITE_URL` to the **production** canonical URL (not localhost).
- [ ] `NEXT_PUBLIC_API_BASE_URL` points to the production API base including `/api/v1`.
- [ ] `NEXT_PUBLIC_COMPANY_*` values reviewed and approved by the business (no placeholder copy in production).
- [ ] `server/.env` sets `NODE_ENV=production`, `PORT`, `CLIENT_URL` (exact production frontend origin), and `MONGODB_URI` (Atlas or managed MongoDB).
- [ ] No `.env` files committed; no secrets in the frontend bundle (`NEXT_PUBLIC_*` only for non-secret data).
- [ ] MongoDB user has least privilege (write to inquiry collections only if using dedicated DB user).

## Build and automated tests

- [ ] `cd client && npm run lint` — pass.
- [ ] `cd client && npm run build` — pass.
- [ ] `cd server && npm run typecheck` — pass.
- [ ] `cd server && npm run build` — pass.
- [ ] `cd server && npm test` — pass (API validation and contract tests).
- [ ] Optional: `powershell -File scripts/verify-api-integration.ps1` against staging API with test data cleanup plan.

## API and integration

- [ ] `GET /api/v1/health` returns `{ success: true }` without leaking database internals.
- [ ] `POST /api/v1/contact` and `POST /api/v1/quotes` persist to MongoDB and return `201` with `{ success: true, data: null }`.
- [ ] CORS allows **only** the production `CLIENT_URL` (development localhost wildcard must not be enabled in production).
- [ ] Rate limiting active on public inquiry endpoints.
- [ ] Contact and quote forms on the live site show success **only** after API success; failures show safe user messages.

## Content and routes

- [ ] All SRS routes live: `/`, `/about`, `/services`, four service slugs, `/projects`, `/contact`, `/quote`, `/privacy`, custom 404.
- [ ] Redirects work: `/request-a-quote` → `/quote`, `/privacy-policy` → `/privacy`, legacy short service paths where configured.
- [ ] Portfolio/projects content approved or empty state acceptable for launch.
- [ ] Privacy policy text approved for the jurisdictions served.

## SEO and robots

- [ ] Page titles and meta descriptions reviewed on key pages.
- [ ] `sitemap.xml` and `robots.txt` use production `NEXT_PUBLIC_SITE_URL`.
- [ ] Staging/dev hosts blocked from indexing (`robots` or host-level rules).

## Security

- [ ] Dependency audit reviewed (`npm audit` client and server); critical issues addressed or accepted with documented exception.
- [ ] Helmet and JSON body size limits enabled (default server config).
- [ ] No stack traces or MongoDB errors exposed to browsers on 5xx responses.
- [ ] Honeypot field remains present on public forms.

## Accessibility and UX

- [ ] Keyboard navigation through header, mobile menu, and forms.
- [ ] Form labels, errors, and focus states verified on contact and quote pages.
- [ ] Responsive layouts checked at mobile, tablet, and desktop widths.

## Operations (post-deploy, out of MVP scope but plan)

- [ ] Monitoring/alerting for API health and MongoDB connectivity.
- [ ] Backup strategy for `contact_inquiries` and `quotation_requests`.
- [ ] Process for staff to read inquiries (email/CRM/admin — **not** in current MVP).

## Sign-off

| Role | Name | Date | Notes |
|------|------|------|-------|
| Business owner | | | |
| Technical lead | | | |
| QA | | | |
