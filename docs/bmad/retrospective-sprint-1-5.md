# Sprint 1–5 Retrospective — AMPH Academy

**Date:** 2026-07-03
**Sprints:** 1 through 5 (Full Project Retrospective)
**Total:** 78 points delivered across 23 stories

---

## 1. Sprint Summaries

### Sprint 1 — Foundation (20 pts)
| Story | Title | Pts |
|-------|-------|:---:|
| STORY-001 | Next.js + TypeScript + Tailwind scaffold | 3 |
| STORY-002 | Prisma schema (27 models) | 3 |
| STORY-003 | Vercel deploy + CI/CD | 2 |
| STORY-004 | JWT auth with jose HttpOnly cookies | 5 |
| STORY-005 | Course catalog with 5 core modules | 7 |

### Sprint 2 — Engagement (20 pts)
| Story | Title | Pts |
|-------|-------|:---:|
| STORY-006 | Streaks/XP system | 5 |
| STORY-007 | Events & notifications | 5 |
| STORY-008 | Analytics dashboard | 5 |
| STORY-009 | Leaderboard | 3 |
| STORY-010 | Certificate generation | 2 |

### Sprint 3 — Admin + Polish (13 pts)
| Story | Title | Pts |
|-------|-------|:---:|
| STORY-011 | Admin dashboard — users, courses, badges, settings | 13 |

### Sprint 4 — Live Classes (13 pts)
| Story | Title | Pts |
|-------|-------|:---:|
| STORY-012 | LiveClass Prisma migration | 1 |
| STORY-013 | Admin LiveClass CRUD actions | 3 |
| STORY-014 | Admin LiveClass UI | 5 |
| STORY-015 | Student registration actions | 2 |
| STORY-016 | Student schedule page | 2 |
| *(STORY-017)* | *Dashboard widget — filtered to Sprint 5* | *1* |

### Sprint 5 — Enrichment (12 pts)
| Story | Title | Pts |
|-------|-------|:---:|
| STORY-021 | Module 2 — Keyword Research (4 lessons) | 3 |
| STORY-022 | Module 3 — Listing Optimization (3 lessons) | 2 |
| STORY-023 | Module 5 — Portfolio Strategy (3 lessons) | 2 |
| STORY-018 | Campaign Builder — 5 scenario packs | 2 |
| STORY-019 | Bid Elevator — 10 bidding scenarios | 2 |
| STORY-020 | STR Triage — 20 search terms | 1 |

---

## 2. Velocity Analysis

```
Sprint 1:  ████████████████████ 20 pts
Sprint 2:  ████████████████████ 20 pts
Sprint 3:  █████████████       13 pts
Sprint 4:  █████████████       13 pts
Sprint 5:  ████████████        12 pts
```

| Sprint | Capacity | Delivered | % |
|--------|:--------:|:---------:|:-:|
| 1 | 20 | 20 | 100% |
| 2 | 20 | 20 | 100% |
| 3 | 15 | 13 | 87% |
| 4 | 13 | 13 | 100% |
| 5 | 12 | 12 | 100% |

**Rolling average:** 16 pts/sprint (down from 17 initial)

**Trend note:** The 20→13 drop after Sprint 2 reflects the shift from greenfield generation (auth, scaffold, schema — highly predictable) to UI-heavy feature work (admin panels, live class forms — higher cognitive load per point). The stabilization at 12-13 is the sustainable pace for UI+content work.

---

## 3. What Went Well ✅

### Full-Ship Cadence
100% delivery across 4 out of 5 sprints. Only Sprint 3 delivered 87% (13/15 committed) — and that was because the epic was a single 13-pointer admin dashboard that absorbed everything.

### Content Volume
28 MDX lessons across 8 modules — from zero to full curriculum in 3 days. The project's original scope was 5 modules; Sprint 5 added 3 more (Modules 2, 3, 5) with illustrated SVGs and real ₱ figures.

### Interactive Tooling
Three working practice tools with realistic scenario banks:
- Campaign Builder: 5 category-specific packs
- Bid Elevator: 10 structured bidding scenarios
- STR Triage: 20 weighted search terms

### Architectural Decisions
- **Modular monolith** — single Next.js deploy with feature-sliced modules. No microservice overhead, solo-dev appropriate.
- **Prisma + SQLite** — zero-infrastructure DB. Correct choice for MVP scale.
- **Zustand stores** for interactive tools — client-side state without API round-trips.
- **Server actions** over REST — Next.js-native, reduced boilerplate vs. Express or tRPC.

### UX Consistency
Project Aurora design system (Deep Navy + Orange, glass morphism) applied consistently across all pages. The student dashboard SPA with sidebar navigation gives a single-page-app feel without the SPA framework overhead.

---

## 4. What Could Be Better ⚠️

### Story Size Distribution
```
Sprint 1:  5 stories @ 4.0 avg pts
Sprint 2:  5 stories @ 4.0 avg pts
Sprint 3:  1 story  @ 13 pts  ← monolithic
Sprint 4:  5 stories @ 2.6 avg pts
Sprint 5:  6 stories @ 2.0 avg pts
```
**Sprint 3** was a single 13-point story. This is an anti-pattern — no parallelization possible, no partial-ship option if it got blocked. Future sprints should fracture admin dashboards into 3-5 smaller stories (sidebar sections, data tables, forms).

### Scope Creep on Sprint 5
The sprint goal was "Content expansion + Interactive tools." The interactive scenario banks (5 packs, 10 bids, 20 terms) exceeded original scope — built because the base tools were already wired. While this added value, it was unbudgeted. Formalize scope buffers.

### Velocity Underestimated
Initial velocity guess of 20 pts/sprint was 54% above the sustainable pace of 13. The rolling average corrected to 16, but sprint 1-2 stats inflated expectations. Baseline new projects at 13-15 for UI-heavy work, not 20.

### Git Hygiene
Only 5 commits covering the entire project. While understandable for an AI-paired solo dev, this makes rollback, blame, and review harder. Target weekly or per-story commits.

### Documentation Gap
No retrospective documents existed before now. Sprint plans exist for Phase 4-5 but earlier sprints lack formal planning docs. Story files exist but are inconsistently distributed (some in `docs/stories/`, some in `docs/bmad/`).

---

## 5. Key Metrics

| Metric | Value |
|--------|-------|
| **Total points** | 78 |
| **Total stories** | 23 |
| **Calendar days** | ~3 (July 1–3) |
| **Avg velocity** | 16 pts/sprint |
| **Sustainable pace** | 12-13 pts/sprint |
| **Avg story size** | 3.4 pts |
| **Codebase size** | ~131 TS/TSX files, 76 TSX components |
| **Database models** | 27 (Prisma) |
| **Content lessons** | 28 (8 modules) |
| **Fixture files** | 9 (scenario packs, quiz, badges) |
| **Build status** | ✅ Passes |

---

## 6. Action Items for Next Phase

| # | Item | Why |
|---|------|-----|
| 1 | **Target 12-13 pts/sprint** for UI+content work | Empirical sustainable pace |
| 2 | **Split stories ≥8 pts** | Avoid Sprint 3's monolithic pattern |
| 3 | **Commit per story** — even if AI-assisted | Enable rollback and review |
| 4 | **Formalize scope buffers** (10% unallocated) | Absorb unbudgeted features gracefully |
| 5 | **Create sprint plans before execution** | Phase 4-5 pattern was correct — apply to all |
| 6 | **Document retrospectives after every sprint** | First one written now |
| 7 | **Preserve velocity history** across project phases | Rolling average only reliable with ≥3 data points |

---

## 7. Lessons for Sprint 6

### What to Keep
- **Full-ship discipline** — commit to what fits velocity; deliver 100%
- **Feature-sliced modules** — each feature in its own folder with server actions collocated
- **Zustand for client state** — interactive tools on the frontend without backend overhead
- **Single-page dashboard** with sidebar — reduces route complexity and feels premium

### What to Change
- **Smaller stories** — max 8 pts per story; fracture anything larger
- **Regular commits** — integrate git into the workflow, not after the fact
- **Pre-sprint plan** — document scope, capacity, and dependencies before execution
- **Scope tracking** — maintain a delta log of unbudgeted features discovered mid-sprint

---

*Retrospective prepared 2026-07-03 — All 5 sprints reviewed. Next: Sprint 6 planning.*
