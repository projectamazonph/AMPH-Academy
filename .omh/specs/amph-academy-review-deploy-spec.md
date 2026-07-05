---
title: "AMPH Academy — Full Code Review & Deployment Fix"
status: confirmed
date: 2026-07-04
---

## Overview

AMPH Academy is a Next.js 16 App Router application (TypeScript, Prisma/SQLite, Tailwind CSS, Framer Motion). The app has 6 completed sprints (91 pts / 27 stories) and is deployed on Vercel at amph-academy.vercel.app. This spec covers two workstreams:

### Workstream 1: Full Code Review

Systematic audit across these dimensions:

| Dimension | Scope |
|-----------|-------|
| **Security** | Auth implementation (JWT, HttpOnly cookies), middleware guards, CORS, rate limiting, XSS/CSRF, environment variable exposure, SQL injection via Prisma |
| **Build & Deploy** | Build config, output, dependency audit, Vercel config, CI/CD pipeline, environment management |
| **Architecture** | Route structure, server actions vs API routes, modular organization, data flow, SSR/CSR split |
| **Code Quality** | TypeScript strictness, error handling patterns, dead code, lint violations, test coverage |
| **Performance** | Bundle size, image optimization, caching headers, middleware overhead, db query patterns |
| **Dependencies** | Outdated packages, security advisories, unused deps, peer dep conflicts, lockfile integrity |

### Workstream 2: Fix Deployment

| Task | Description |
|------|-------------|
| D1 | Verify Vercel project config (build command, install, output dir, regions) |
| D2 | Verify GitHub Actions CI/CD workflow exists and works |
| D3 | Fix any build warnings that could block deployment |
| D4 | Ensure middleware/auth routing works correctly in production (no infinite redirects) |
| D5 | Verify health endpoint and API routes respond in production |
| D6 | Document deployment process and rollback procedure |

## Constraints

- Must preserve all existing functionality
- Must pass `npm run build` (already passing ✓)
- No breaking API changes
- Deployed on Vercel (amph-academy.vercel.app)
- Database: SQLite via Prisma

## Success Criteria

1. All audit dimensions produce documented findings with severity ratings
2. All P0/P1 findings have corresponding fix tasks
3. Deployment pipeline is documented with verified success
4. Build passes clean (no warnings that become errors)
5. Auth flow works end-to-end in production
