# Sprint Plan: Adcraft Academy — Sprint 2

- **Sprint Number:** 2
- **Sprint Dates:** 2026-07-02 — 2026-07-16
- **Sprint Duration:** 2 weeks
- **Created:** 2026-07-02

---

## Sprint Overview

**Sprint Goal:** Ship engagement features — daily streaks, event tracking, learning analytics, leaderboard, and certificate generation.

**Sprint Capacity:** 20 story points
**Stories Planned:** 5 stories
**Total Story Points:** 20 points

**Capacity Calculation:**
- **Base capacity:** 20 points (solo dev × 10 working days × 2.0 pts/day — based on Sprint 1 velocity of 20 pts/day)
- **Adjustments:** Landing page rebuild completed in Sprint 2 window (1 story worth of scope absorbed)
- **Final capacity:** 20 points

## Velocity

| Sprint | Points | Notes |
|--------|--------|-------|
| Sprint 1 | 20 | Foundation + Auth + Catalog — delivered in 1 day |
| Sprint 2 | 20 | Target |

## Sprint Backlog

### Epic 1: Engagement Features (20 points)

**Epic Goal:** Give students visible progress tracking, competitive motivation, and verifiable credentials.

#### STORY-006: Daily Streaks & XP Header Display (3 pts)
- **Priority:** Must Have
- **Points:** 3
- **Dependencies:** None (DB fields exist: `streakDays`, `xp`, `level`, `lastActiveAt`)
- **Brief:** Create server action to update daily streak on login. Display XP + streak + level in the nav/header bar. Fires on page load for authenticated users. Streak resets if more than 48h since last active.

#### STORY-007: Event Tracking Pipeline (3 pts)
- **Priority:** Must Have
- **Points:** 3
- **Dependencies:** STORY-006
- **Brief:** Create event logging API endpoint and client-side tracking utility. Log key actions: page views, course enrollments, quiz completions, tool usage, badge awards. Store in EventLog model (already in schema). Provide query interface for analytics.

#### STORY-008: Learning Analytics Dashboard (5 pts)
- **Priority:** Must Have
- **Points:** 5
- **Dependencies:** STORY-007
- **Brief:** Build `/dashboard` into a full analytics hub. Show XP growth chart, completion rate per course, badges earned, weak areas (low quiz scores), recent activity feed. Use recharts for visualizations.

#### STORY-009: Leaderboard (4 pts)
- **Priority:** Should Have
- **Points:** 4
- **Dependencies:** STORY-006 (XP data)
- **Brief:** Weekly and all-time leaderboard by XP. Top 10 with rank, name, XP, level, badges. Public page at `/leaderboard`. Skeleton loading states. Refreshes on navigation.

#### STORY-010: Certificate Generation (5 pts)
- **Priority:** Should Have
- **Points:** 5
- **Dependencies:** STORY-008 (needs progress data)
- **Brief:** PDF certificate generation on course completion. Verification code system (hash-based). Certificate page at `/certificates/[id]`. Download as PDF using a server-side generation approach.

## Story Prioritization

### Must Have (Critical Path)
1. **STORY-006** — Streaks & XP (3 pts) — Prerequisite for leaderboard and analytics
2. **STORY-007** — Event tracking (3 pts) — Prerequisite for analytics dashboard
3. **STORY-008** — Learning analytics (5 pts) — Core student facing feature

### Should Have
4. **STORY-009** — Leaderboard (4 pts) — Depends on streak XP data
5. **STORY-010** — Certificates (5 pts) — Depends on progress tracking

**Total Must Have:** 11 points
**Total Should Have:** 9 points

## Dependencies

```
STORY-006 (streaks/XP — no deps)
  ├── STORY-007 (event tracking — needs auth context from STORY-006)
  │    └── STORY-008 (analytics — needs event data)
  └── STORY-009 (leaderboard — needs XP data from STORY-006)

STORY-010 (certificates — needs progress/completion data from courses module)
```

## Implementation Order

1. **STORY-006** — Daily Streaks & XP — Quick win, foundation for everything else
2. **STORY-007** — Event Tracking — Need events before analytics
3. **STORY-008** — Learning Analytics Dashboard — Core student-facing feature
4. **STORY-009** — Leaderboard — Gamification layer
5. **STORY-010** — Certificates — Verification and credentialing

## Risks

- **Risk 1: PDF generation complexity** — Certificate PDFs may need a library like `@react-pdf/renderer` or `puppeteer`. Mitigation: use a lightweight HTML-to-PDF approach or an MCP tool.
- **Risk 2: Analytics performance** — Large event tables could slow queries. Mitigation: pagination and aggregation limits. SQLite handles 10k+ rows fine for MVP.
- **Risk 3: Streak timezone logic** — What counts as "daily" across timezones? Mitigation: use UTC dates, define a day as the last 24h window.

**END OF SPRINT PLAN**
