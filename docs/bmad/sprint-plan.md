# Sprint Plan: Adcraft Academy

- **Sprint Number:** 1
- **Sprint Dates:** 2026-07-01 — 2026-07-15
- **Sprint Duration:** 2 weeks (10 working days)
- **Created:** 2026-07-02

---

## Sprint Overview

**Sprint Goal:** Ship the Adcraft Academy foundation — project scaffold, database schema, user authentication, and a working course catalog page.

**Sprint Capacity:** 20 story points  
**Stories Planned:** 5 stories  
**Total Story Points:** 20 points

**Capacity Calculation:**
- **Base capacity:** 20 points (solo dev × 10 working days × 2.0 pts/day — conservative, first sprint)
- **Adjustments:** None (no holidays, no PTO in this window)
- **Final capacity:** 20 points

## Velocity Metrics

**Historical Velocity:** First sprint — no historical data.
**Team Composition:** 1 developer (Ryan). First sprint includes project scaffolding overhead.

## Sprint Backlog

### Epic 1: Foundation (10 points)

**Epic Goal:** Bootstrapped Next.js project with Prisma schema, shared components, and Vercel deployment.

#### STORY-001: Initialize Next.js project scaffold
- **Priority:** Must Have
- **Points:** 3
- **Status:** Not Started
- **Dependencies:** None
- **Brief:** Create Next.js project with Tailwind CSS, Prisma, shadcn/ui, Project Aurora design system components copied from PPC Companion. Set up folder structure per architecture doc.

#### STORY-002: Create Prisma database schema
- **Priority:** Must Have
- **Points:** 5
- **Status:** Not Started
- **Dependencies:** None
- **Brief:** Define all Prisma models: User, Session, Course, Module, Enrollment, LiveClass, ModuleProgress, ToolSession, ToolResult, Badge, BadgeAward, Certificate, QuizAttempt, Resource. Write seed data with sample course structure.

#### STORY-003: Deploy to Vercel with CI/CD
- **Priority:** Must Have
- **Points:** 2
- **Status:** Not Started
- **Dependencies:** STORY-001
- **Brief:** Initialize Git repo, push to GitHub, connect to Vercel, configure environment variables, verify auto-deploy from main branch.

---

### Epic 2: Authentication (5 points)

**Epic Goal:** Students can register, log in, and maintain a session with HttpOnly JWT cookies.

#### STORY-004: User registration and login flow
- **Priority:** Must Have
- **Points:** 5
- **Status:** Not Started
- **Dependencies:** STORY-001, STORY-002
- **Brief:** Registration form (name, email, password) with validation. Login form with email/password. JWT HttpOnly cookie session management. Logout. Shared auth context/provider for client-side auth state.

---

### Epic 3: Course Browsing (5 points)

**Epic Goal:** A working course catalog page that reads from the database so students can see available courses.

#### STORY-005: Course catalog and module listing
- **Priority:** Must Have
- **Points:** 5
- **Status:** Not Started
- **Dependencies:** STORY-002, STORY-004
- **Brief:** Course listing page (server component) showing all published courses. Module detail page with title, description, video embed placeholder. Seed data populates Adcraft's actual course structure (PPC Foundations, Accelerated Mastery, Ultimate Transformation tiers).

---

## Story Prioritization

### Must Have (Critical Path)

1. **STORY-001** — Project scaffold (3 pts) — Everything depends on this
2. **STORY-002** — Database schema (5 pts) — All data models need this
3. **STORY-003** — Vercel deploy (2 pts) — Early deploy catches infra issues
4. **STORY-004** — Auth flow (5 pts) — Gated content needs auth
5. **STORY-005** — Course catalog (5 pts) — Core student-facing value

**Total Must Have:** 20 points (100% of capacity)

### Could Have (Buffer)

None this sprint. All stories are critical path.

---

## Implementation Order

1. **Days 1-2: STORY-001** — Project scaffold
   - Rationale: The foundation. Creates the folder structure, installs deps, configures tooling.

2. **Days 2-4: STORY-002** — Database schema
   - Rationale: Can start day 2 (no deps on story 001 beyond having the project exist). All models, migrations, seed data.

3. **Day 4: STORY-003** — Vercel deploy
   - Rationale: Quick win. Push scaffold to GitHub, auto-deploy to Vercel. Catches build issues early.

4. **Days 5-7: STORY-004** — Auth flow
   - Rationale: Needs User model (STORY-002) and scaffold (STORY-001). Registration → login → session → logout. Full auth cycle.

5. **Days 8-10: STORY-005** — Course catalog
   - Rationale: Needs data (STORY-002) and auth (STORY-004 for gated content). Server component renders courses from seed data. Module detail page.

---

## Story Dependencies

### Dependency Graph
```
STORY-001 (no dependencies)
  ├── STORY-003 (depends on STORY-001 — needs a project to deploy)
  └── STORY-004 (depends on STORY-001 — needs scaffold)
       └── STORY-005 (depends on STORY-004 — needs auth check)

STORY-002 (no dependencies, can run day 2)
  └── STORY-004 (depends on STORY-002 — User model)
       └── STORY-005 (depends on STORY-002 — Course/Module models)
```

### Critical Path Stories
- **STORY-001** — Blocks STORY-003, STORY-004, STORY-005
- **STORY-002** — Blocks STORY-004, STORY-005

### External Dependencies
- None. Everything is in-house (Vercel, GitHub, Prisma/SQLite).

---

## Risks and Mitigation

### Risk 1: PPC Companion SSO complexity
- **Probability:** Medium
- **Impact:** Medium
- **Mitigation:** SSO is Sprint 1.5, not Sprint 1. Sprint 1 uses email/password auth only. SSO integration deferred if PPC Companion's auth module needs changes.

### Risk 2: Prisma + SQLite migration issues on Vercel
- **Probability:** Low
- **Impact:** High
- **Mitigation:** Test `prisma db push` locally first. Vercel build hook runs `prisma generate && prisma db push`. If issues, fall back to manual migration.

### Risk 3: Copying Project Aurora components from PPC Companion
- **Probability:** Low
- **Impact:** Low
- **Mitigation:** Components are in `components/ui/`. Copy entire folder, rename imports. One-time setup.

---

## Sprint Milestones

- **Day 3:** STORY-001 complete, STORY-002 in progress — Project scaffold live
- **Day 5:** STORY-002 + STORY-003 complete — Database deployed, Vercel auto-deploy working
- **Day 7:** STORY-004 complete — Auth working (register, login, logout)
- **Day 10:** STORY-005 complete — Course catalog page live with seed data

---

## Definition of Done

A story is complete when:
- [ ] All acceptance criteria are met
- [ ] Code is linted and formatted
- [ ] Tests are written and passing (where applicable)
- [ ] Code is merged to main branch
- [ ] Deployed to Vercel (production)
- [ ] Self-reviewed against acceptance criteria

---

## Sprint Ceremonies

### Daily Standups
- **Format:** Solo retrospective. End-of-day commit with notes on what was done, what's next, blockers.

### Sprint Review
- **Date:** 2026-07-15
- **Format:** Verify all 5 stories deployed and working on Vercel production URL.

### Sprint Retrospective
- **Date:** 2026-07-15
- **Format:** Document lessons, calculate actual velocity, adjust Sprint 2 capacity.

---

## Success Criteria

This sprint is successful if:
1. **Sprint goal achieved:** Foundation, auth, and course catalog are live
2. **Velocity target:** Complete 20 story points (±3)
3. **Quality maintained:** Auth works end-to-end (register → login → session → logout)
4. **Deployable:** Main branch auto-deploys to Vercel green

---

## Burndown Tracking

| Date | Completed | Remaining | Ideal | Notes |
|------|-----------|-----------|-------|-------|
| 2026-07-01 | 0 | 20 | 20 | Sprint starts |
| 2026-07-02 | 0 | 20 | 18 | Planning complete, begin STORY-001 |
| 2026-07-15 | 0 | 20 | 0 | Target: all stories complete |

---

## Team Capacity

**Developer:** Ryan — 10 dev-days available (July 2-15)

**Capacity Adjustments:** None.

---

## Notes

- First sprint of a new project includes scaffolding overhead — velocity will be lower than subsequent sprints
- PPC Companion SSO is Sprint 2 material, not Sprint 1
- Project Aurora components copied from PPC Companion, not built from scratch
- Database will use SQLite locally and on Vercel. Prisma migration to PostgreSQL later

---

**END OF SPRINT PLAN**
