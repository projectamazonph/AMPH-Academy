# STORY-009: Dashboard Polish & Mobile

**Epic:** Quality & Polish
**Priority:** Should Have
**Points:** 5
**Dependencies:** None

## Acceptance Criteria

- [ ] Analytics dashboard renders on dashboard home tab
- [ ] Leaderboard tab renders with data
- [ ] Streak counter visible in header
- [ ] Dashboard responsive on mobile (375px breakpoint)
- [ ] Loading skeletons for async sections
- [ ] No console errors on any dashboard tab
- [ ] Build passes, all routes 200

## Technical Notes

- `dashboard.tsx` already receives `streakDays` — verify it passes to `stats-row.tsx`
- `AnalyticsDashboard` and `Leaderboard` already imported in dashboard page — check they render in correct tabs
- Mobile: test sidebar collapse, grid layouts, font sizes
- Skeleton components already exist via shadcn — use `Skeleton` from `@/components/ui/skeleton` if available
