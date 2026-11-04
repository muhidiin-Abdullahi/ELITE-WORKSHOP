# ELITE WORKSHOP LTD — Corporate Website

Professional corporate and service showcase website (development repository).

**Current status:** Phases 6–8 complete: public Next.js site, Express inquiry APIs with MongoDB persistence, and Phase 8 integration QA (`docs/QA_REPORT.md`). Email notifications and admin tools are **not** implemented.

## Technology stack

| Layer | Technologies |
|-------|----------------|
| Frontend | Next.js (App Router), React, TypeScript, Tailwind CSS, ESLint |
| Backend | Node.js, Express.js, TypeScript |
| Database | MongoDB with Mongoose (required for API startup outside `NODE_ENV=test`) |

Package manager: **npm**

## Repository structure

```text
├── client/          # Next.js frontend
├── server/          # Express API
├── docs/            # BRD, SRS, architecture, design
├── .env.example     # Root reference (see per-app examples)
└── README.md
```

## Prerequisites

- **Node.js** 20.9+ LTS (or newer stable; this project was verified with Node 24.x)
- **npm** 10+
- **MongoDB** (local or hosted instance for development and production API)

## Installation

```powershell
cd client
npm install

cd ..\server
npm install
```

## Environment configuration

Do **not** commit real `.env` files.

1. **Frontend:** copy `client/.env.local.example` → `client/.env.local`
2. **Backend:** copy `server/.env.example` → `server/.env`

| Variable | Where | Public? | Purpose |
|----------|-------|---------|---------|
| `NEXT_PUBLIC_SITE_URL` | client | Yes | Canonical site URL |
| `NEXT_PUBLIC_API_BASE_URL` | client | Yes | API root including `/api/v1` |
| `NEXT_PUBLIC_COMPANY_*` | client | Yes | Contact display when provided |
| `PORT` | server | No | API port (default **5010**) |
| `CLIENT_URL` | server | No | CORS allowlist for frontend |
| `MONGODB_URI` | server | No | MongoDB connection string (required at startup) |

Never prefix secrets such as `MONGODB_URI` with `NEXT_PUBLIC_`.

## Development

Run in **two terminals**:

### Frontend (port 3020)

```powershell
cd client
npm run dev
```

### Backend (port 5010)

```powershell
cd server
npm run dev
```

### Expected local URLs

| Service | URL |
|---------|-----|
| Website | http://localhost:3020 |
| API health | http://localhost:5010/api/v1/health |

### Verify health endpoint

```powershell
Invoke-RestMethod http://localhost:5010/api/v1/health
```

Expected JSON includes `"status": "ok"` inside `data` without exposing secrets.

## Build and quality commands

### Frontend (`client/`)

```powershell
npm run build
npm run start
npm run lint
```

### Backend (`server/`)

```powershell
npm run typecheck
npm run build
npm run start
```

## Troubleshooting

| Issue | Suggestion |
|-------|------------|
| Port in use | Change `PORT` in `server/.env` and update `NEXT_PUBLIC_API_BASE_URL` accordingly |
| CORS errors | Ensure `CLIENT_URL` matches the exact frontend origin (scheme + host + port) |
| `npm install` slow or fails | Retry on a stable network; delete `node_modules` and reinstall |
| Node version errors | Use Node 20.9+ per [Next.js requirements](https://nextjs.org/docs/app/getting-started/installation) |

## Documentation

- [Business Requirements](docs/BRD.md)
- [Software Requirements](docs/SRS.md)
- [Technical Architecture](docs/TECHNICAL_ARCHITECTURE.md)
- [UI/UX Design](docs/UI_UX_DESIGN.md)
- [Design System](docs/DESIGN_SYSTEM.md)

## Implementation scope (Phase 5)

**Included:** project scaffolding, provisional design tokens in Tailwind/CSS, placeholder home page, Express health check.

**Not included:** service pages, portfolio, contact/quote APIs, MongoDB connection, authentication, admin, e-commerce, production deployment.
