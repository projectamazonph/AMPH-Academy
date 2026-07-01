# Development Plan — Adcraft Academy

**Version:** 1.0 | **Status:** Development | **Last Updated:** 2026-07-02

---

## Architecture Overview

```
Adcraft-Academy/
├── project/          ← Next.js application (main codebase)
│   ├── src/          ← App Router pages and components
│   ├── docs/         ← Project-level documentation
│   ├── fixtures/     ← Quiz data, badges, tool packs (JSON)
│   ├── downloads/    ← Downloadable resources
│   └── hooks/        ← Campaign hooks data
├── .omh/             ← OMH planning artifacts
│   ├── plans/        ← Implementation plans
│   └── specs/        ← Specifications
├── .github/          ← CI/CD workflows
├── codegraphs/       ← Dependency graphs
└── docs/             ← Project-level documentation
```

---

## Phase 1: Foundation & Auth

**Status:** ✅ COMPLETE

| Task | Details |
|------|---------|
| Next.js scaffold | App Router, TypeScript, Tailwind |
| Prisma schema | Users, Courses, Progress, Badges, Quizzes |
| JWT auth | jose HttpOnly cookies |
| Core layouts | Public, student layouts |

---

## Phase 2: Course Content & Tools

**Status:** ✅ COMPLETE

| Task | Details |
|------|---------|
| Course curriculum | Structured modules |
| Campaign Builder tool | Interactive campaign design |
| Bid Elevator tool | Bid optimization practice |
| Search Term Triage tool | Keyword analysis |
| Quiz system | Knowledge checkpoint quizzes |

---

## Phase 3: Gamification & Polish

**Status:** ✅ COMPLETE

| Task | Details |
|------|---------|
| Badge system | Achievement badges for completion |
| Progress tracking | Per-module and per-course |
| Download center | Resource templates |
| CI/CD pipeline | GitHub Actions → Vercel |

---

## Phase 4: Expansion (Planned)

| Task | Priority |
|------|----------|
| Advanced course modules | Medium |
| Community features | Low |
| Mobile optimization | Medium |
| Multi-language | Low |
