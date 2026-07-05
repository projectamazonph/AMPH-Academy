# AMPH Academy — Code Review & Deployment Fix

## Consensus Plan

**Status:** Confirmed
**Date:** 2026-07-04
**Rounds:** 1 (spec already confirmed)

---

## Workstream A: Code Review (Audit & Fix) — 8 Tasks

### A1: Enable TypeScript Strict Checking
- **Goal:** Remove `ignoreBuildErrors: true` from next.config.ts and fix all 69 TS errors across 29 files
- **Files:** `next.config.ts`, plus 29 TS error files
- **Acceptance:** `tsc --noEmit` passes with 0 errors
- **Priority:** P0

### A2: Enable React StrictMode
- **Goal:** Set `reactStrictMode: true` and fix any double-render side effects
- **Files:** `next.config.ts`
- **Acceptance:** App runs in dev without strict-mode-related errors
- **Priority:** P1

### A3: Fix Module Import Errors
- **Goal:** Fix missing module imports in `admin/live-classes.ts`, `admin/users.ts`, `badge.ts`, `quiz.ts` (types files)
- **Files:** `src/app/actions/admin/live-classes.ts`, `admin/users.ts`, `badge.ts`, `quiz.ts`, and their type files
- **Acceptance:** No `TS2307` (cannot find module) or `TS2305` (no exported member) errors
- **Priority:** P0

### A4: Fix Prisma Type Mismatches
- **Goal:** Fix `published` vs `isPublished`, missing `name` property on badge orderBy, wrong `data` property, missing `certType`, `course` relation, `finalXp` issues
- **Files:** `src/app/actions/admin/courses.ts`, `admin/badges.ts`, `certificate-lifecycle.ts`, `progress.ts`, `quiz.ts`
- **Acceptance:** No `TS2353`, `TS2322`, `TS2339`, or `TS2561` errors in admin actions
- **Priority:** P0

### A5: Fix Component Type Errors
- **Goal:** Fix errors in component files: `badge-showcase.tsx`, `bid-scoring.tsx`, `campaign-scoring.tsx`, `certificate-manager.tsx`, `live-classes-view.tsx`, `module-cards.tsx`, `quiz-player.tsx`, `str-scoring.tsx`, `team-dashboard.tsx`, `xp-progress.tsx`
- **Priority:** P0

### A6: Fix Store & Engine Type Errors
- **Goal:** Fix errors in `stores/bid-elevator-store.ts`, `campaign-builder-store.ts`, `str-triage-store.ts`, `engine/mistake-analysis.ts`, `engine/types.ts`, `modules/resources/_actions.ts`
- **Priority:** P1

### A7: Remove Dead Code & Fix Examples
- **Goal:** Remove or fix `examples/websocket/` files (socket.io imports that don't exist)
- **Files:** `examples/websocket/frontend.tsx`, `server.ts`
- **Acceptance:** No TS errors from examples directory
- **Priority:** P2

### A8: Fix Dashboard & Page Type Errors
- **Goal:** Fix errors in `src/app/dashboard/page.tsx`, `src/app/page.tsx`
- **Priority:** P1

---

## Workstream B: Deployment Fix — 5 Tasks

### B1: Harden CI/CD Pipeline
- **Goal:** Remove placeholder secrets, add verifiable deploy health check, add rollback documentation
- **Files:** `.github/workflows/ci.yml`
- **Acceptance:** CI pipeline deploys with real env management, health check after deploy
- **Priority:** P1

### B2: Fix Vercel Config for Production
- **Goal:** Ensure `vercel.json` or proper config exists, verify build settings, add `allowedDevOrigins` for production
- **Files:** `vercel.json` (create if missing), `next.config.ts`
- **Acceptance:** Vercel deploy works without config warnings
- **Priority:** P1

### B3: Audit & Update Dependencies
- **Goal:** Fix 6 moderate vulnerabilities (uuid, postcss), update packages within semver
- **Acceptance:** `npm audit` returns 0 vulnerabilities
- **Priority:** P1

### B4: Add Deployment Documentation
- **Goal:** Document deployment process, rollback procedure, and environment variable requirements
- **Files:** `docs/deployment.md`
- **Acceptance:** Clear deploy docs with env vars table and rollback steps
- **Priority:** P2

### B5: Verify Production Auth Flow
- **Goal:** Ensure auth middleware doesn't cause infinite redirects, JWT cookies work in production
- **Files:** `src/middleware.ts`
- **Acceptance:** Auth flow works end-to-end in production
- **Priority:** P1

---

## Dependencies

```
A1 → A2 (config changes)
A1 → A3 → A4 → A5 → A6 → A7 → A8 (TS fixing order — base fixes first)
B1 → B2 → B4 (CI, config, docs)
B3 (independent)
B5 (independent — can be manual verification)
```

## Total: 13 tasks
