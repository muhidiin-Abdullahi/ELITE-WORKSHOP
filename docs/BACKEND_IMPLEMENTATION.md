# Backend Implementation — ELITE WORKSHOP LTD API

| Version | 1.0 |
| Status | Phase 7 complete |
| Stack | Node.js, Express, TypeScript, MongoDB, Mongoose, Zod |

---

## 1. Backend overview

The Express API (`server/`) handles public inquiry submission for the corporate website. It persists contact and quotation requests to MongoDB and exposes a health check. No authentication, admin, or CRM features are included.

---

## 2. Implemented API endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/v1/health` | Process liveness (no DB details) |
| POST | `/api/v1/contact` | Contact inquiry persistence |
| POST | `/api/v1/quotes` | Quotation inquiry persistence |

---

## 3. Request and response contracts

### Success (201)

```json
{
  "success": true,
  "data": null,
  "meta": { "requestId": "uuid" }
}
```

### Validation error (400)

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input.",
    "fields": [{ "path": "phone", "message": "..." }]
  },
  "meta": { "requestId": "uuid" }
}
```

### Rate limit (429)

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Please try again later."
  }
}
```

### Service unavailable (503)

Used when MongoDB is not connected or persistence fails. No stack traces or connection strings in responses.

---

## 4. POST `/api/v1/contact`

| Field | Required | Rules |
|-------|----------|-------|
| `fullName` | Yes | 2–100 chars |
| `email` | Conditional | Valid email if present; **at least one of** email or phone |
| `phone` | Conditional | 6–30 chars if present |
| `message` | Yes | 10–5000 chars |
| `preferredContactMethod` | No | `phone`, `email`, `whatsapp` |
| `website` | No | Honeypot — must be empty |

---

## 5. POST `/api/v1/quotes`

| Field | Required | Rules |
|-------|----------|-------|
| `fullName` | Yes | 2–100 chars |
| `phone` | Yes | 6–30 chars |
| `email` | No | Valid if present |
| `serviceCategory` | Yes | `pvc-works`, `aluminium-works`, `kitchen-furniture`, `decorated-furniture` |
| `projectDescription` | Yes | 20–8000 chars |
| `projectLocation` | No | 2–200 if present |
| `preferredContactMethod` | No | enum |
| `website` | No | Honeypot — must be empty |

Quotation records are **inquiries only** (`status: new`). They do not create orders or binding quotes.

---

## 6. Database models

### Collection: `contact_inquiries`

Stores general contact form submissions.

### Collection: `quotation_requests`

Stores structured quotation inquiries with service category slug and `status: new`.

Both collections include optional `clientMeta.ipHash` (SHA-256 truncated) and `clientMeta.userAgent` (truncated). Mongoose `timestamps` enabled. Index on `createdAt` descending; quotation requests also index `{ serviceCategory, createdAt }`.

---

## 7. Environment configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | No | `development`, `production`, `test` |
| `PORT` | No | Default `5010` |
| `CLIENT_URL` | Production | CORS allowlist (e.g. `http://localhost:3020`) |
| `MONGODB_URI` | Yes (except automated tests) | Server-only MongoDB connection string |
| `RATE_LIMIT_WINDOW_MS` | No | Default 15 minutes |
| `RATE_LIMIT_MAX` | No | Default 10 per IP |

---

## 8. Validation

- **Zod** schemas in `server/src/validators/` with `.strict()` allowlists.
- Controllers reject non-object bodies before parsing.
- Mongoose `strict: "throw"` on schemas.

---

## 9. Security controls

- Helmet security headers
- CORS restricted to `CLIENT_URL`
- JSON body limit 32 KB
- Rate limiting on contact and quote routes (disabled in `NODE_ENV=test`)
- Honeypot field `website`
- Hashed IP storage (no raw IP in DB)
- No secrets in API responses
- Trust proxy enabled for accurate IP behind reverse proxies

---

## 10. Error handling

Central middleware (`errorHandler.ts`) maps `ApiError` to consistent JSON. Unexpected errors log server-side only; clients receive generic `INTERNAL_ERROR` in production.

---

## 11. Testing strategy

- **Vitest** + **Supertest** API tests with Mongoose `create` spies (no production DB)
- Optional manual verification against local MongoDB or Atlas using `server/.env`
- Tests cover validation, persistence calls, honeypot, unknown routes, operator injection attempts, and DB-down behavior

Run: `npm test` in `server/`.

---

## 12. Test results

Phase 7 verification (local):

| Command | Result |
|---------|--------|
| `npm run typecheck` | Passed |
| `npm run build` | Passed |
| `npm run test` | **17/17 passed** (Supertest + Mongoose spies) |

End-to-end persistence against a live MongoDB instance should be verified manually with `server/.env` configured.

---

## 13. Remaining limitations

- No email notification (DEC-002 optional — not implemented)
- No admin read API for inquiries
- Data retention TTL not configured — **requires business/legal decision**
- No idempotency keys for duplicate submit prevention beyond frontend UX
- Production MongoDB credentials and network rules are operational concerns outside this repo

---

## 14. Operational and privacy decisions (approval required)

- Retention and deletion policy for inquiries (OQ-007)
- Whether to enable email alerts on new submissions
- Production `CLIENT_URL` and Atlas IP allowlisting
