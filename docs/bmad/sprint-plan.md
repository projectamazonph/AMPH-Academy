# Sprint 6 Plan — Platform Integration & Polish

**Sprint:** 6
**Project:** Adcraft Academy (Level 3)
**Start:** 2026-07-03
**End:** 2026-07-17
**Capacity:** 13 pts (sustainable pace from retrospective)
**Theme:** Platform Integration & Mobile Polish

---

## Goal

Deliver the final touches that transition Adcraft Academy from feature-complete to production-ready: activate the dormant Team tab, build the Resources library, make the platform mobile-friendly, and expand the curriculum with an advanced competitive intelligence module.

---

## Velocity Context

| Sprint | Points | Notes |
|--------|:------:|-------|
| 1 | 20 | Greenfield codegen — auth, schema, scaffold |
| 2 | 20 | Gamification — streaks, events, analytics |
| 3 | 13 | Admin dashboard (monolithic, should've been split) |
| 4 | 13 | Live Classes — full CRUD + student registration |
| 5 | 12 | Enrichment — content expansion + interactive tools |
| **6** | **13** | **Planned — platform polish + mobile** |

Rolling average: 16 pts | Sustainable pace: **12-13 pts**

---

## Stories

### STORY-024: Team Dashboard — Wire Tab & Fix Footer (2 pts)

**Description:**
The Team tab is defined in the sidebar and the TeamDashboard component exists (`src/components/adcraft/team-dashboard.tsx`) with server actions (`src/app/actions/team.ts`), but the tab is **not rendered** in the dashboard page switch. Also, the dashboard footer still says "5 Modules" when the platform now has 8.

**Acceptance Criteria:**
- Clicking the Team sidebar tab renders the TeamDashboard component
- Team data loads from server actions (team members, progress, XP data)
- Footer updates "5 Modules · 3 Simulations" → "8 Modules · 3 Simulations"
- No console errors on tab switch

**Files:**
- `src/app/dashboard/page.tsx` — add `{activeTab === 'team' && <TeamDashboard />}` in the render switch
- `src/app/dashboard/page.tsx` — update footer module count

**Points:** 2
**Priority:** Must Have
**Dependencies:** None (component + actions already built)

---

### STORY-025: Resources Library — MVP (3 pts)

**Description:**
Build the Resources tab for downloadable templates, checklists, and guides. The `src/modules/resources/` directory exists but is empty. The cheatsheet action (`src/app/actions/cheatsheet.ts`) provides an API foundation. This story creates the resources module actions, populates the directory with starter resource metadata, and builds a tab view in the dashboard sidebar.

**Acceptance Criteria:**
- Resources tab appears in the dashboard sidebar
- Tab displays resource cards with title, description, type badge (Template/Checklist/Guide), and download button
- Resources are grouped by category
- At least 6 starter resources shipped (2 templates, 2 checklists, 2 guides)
- Files are served from the `downloads/` directory
- Add `resources` NavTab to sidebar and render switch

**Files to create:**
- `src/modules/resources/_actions.ts` — server actions for fetching resources
- `src/modules/resources/_types.ts` — resource type definitions
- `src/components/adcraft/resources-view.tsx` — tab UI component
- `src/modules/resources/resources-data.ts` — resource metadata
- Starter resource files in `downloads/`

**Points:** 3
**Priority:** Should Have
**Dependencies:** None

---

### STORY-026: Mobile Responsiveness Pass (5 pts)

**Description:**
The UX Design doc specifies "Mobile-First Consumption, Desktop-First Practice." The sidebar has a mobile toggle but several areas need responsive fixes: dashboard grids, module cards, tables in analytics, simulation tool layouts, and course content pages.

**Acceptance Criteria:**
- Dashboard grid layouts collapse to single column on mobile (< 768px)
- Module cards stack vertically with readable font sizes
- Analytics charts resize for small viewports
- Simulation tools show "Best on Desktop" notice on mobile with core functionality accessible
- Landing page sections stack and images scale
- Auth pages (signin, signup) center vertically on mobile
- Admin tables horizontally scrollable on mobile
- No horizontal overflow on any page at 360px viewport width

**Points:** 5
**Priority:** Should Have
**Dependencies:** None

---

### STORY-027: Module 8 — Competitive Intelligence (3 pts)

**Description:**
Create a new advanced module on competitive analysis. Covers Brand Analytics, Share of Voice analysis, competitor benchmarking, and strategic positioning. This is the first expansion module beyond the original 8, targeting the "Advanced course modules" expansion item from DEV-PLAN Phase 4.

**Acceptance Criteria:**
- Module appears as Module 8 in the curriculum (after Module 7)
- At least 3 MDX lessons with illustrated diagrams
- Lessons cover: Brand Analytics dashboard navigation, Share of Voice calculation, Competitor ad positioning analysis
- Real ₱ figures and examples from actual Amazon categories
- Module registered in progress.ts MODULE_META and dashboard moduleDetails
- Module unlock requires Module 7 completion

**Files:**
- `project/content/modules/8-competitive-intelligence/` — MDX lesson files
- `project/src/app/actions/progress.ts` — add MODULE_META entry
- `project/src/app/dashboard/page.tsx` — add moduleDetails entry

**Points:** 3
**Priority:** Nice to Have
**Dependencies:** None

---

## Sprint Summary

| Story | Title | Pts | Priority | Risk |
|-------|-------|:---:|:--------:|:----:|
| STORY-024 | Team Dashboard — Wire Tab | 2 | Must Have | Low |
| STORY-025 | Resources Library — MVP | 3 | Should Have | Low |
| STORY-026 | Mobile Responsiveness Pass | 5 | Should Have | Medium |
| STORY-027 | Module 8 — Competitive Intelligence | 3 | Nice to Have | Low |
| **Total** | | **13** | | |

**Risk Register:**
- Mobile responsiveness (5 pts) has medium risk — some layouts (simulation tools, analytics charts) may need non-trivial refactoring to be truly mobile-friendly. Consider splitting into "core pages" (dashboard, modules) and "deep tools" (simulations, analytics) if time runs short.

---

## Scope Buffer

If one story slips, STORY-027 (3 pts) is the first candidate to defer — the content can be written in a future sprint and the platform still ships polish and Team/Resources features.

---

## Done Criteria

- [ ] All 4 stories implemented and passing build
- [ ] `npm run dev` starts cleanly (no compilation errors)
- [ ] Dashboard with all 11 tabs renders without console errors
- [ ] Key pages responsive at 360px/768px/1024px breakpoints
- [ ] Team tab loads and displays org data
- [ ] Resources tab shows downloadable starter assets
- [ ] Module 8 has 3+ lessons accessible after Module 7 completion
- [ ] `bmad/sprint-status.yaml` updated with Sprint 6 state

---

*Prepared 2026-07-03 — Sprint 6 adds ~1,500+ lines of UI/content to the platform.*
