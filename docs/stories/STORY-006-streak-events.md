# STORY-006: Streak & Event Wiring

**Epic:** Platform Infrastructure
**Priority:** Must Have
**Points:** 4
**Dependencies:** None

## Acceptance Criteria

- [ ] Login/visit triggers streak check-in: `lastActiveAt` checked, `streakDays` incremented or reset
- [ ] Streak counter displays in dashboard header (`stats-row.tsx`)
- [ ] Dashboard page calls `trackEvent()` on page load and key interactions
- [ ] Event tracking fires silently (no user-facing errors)
- [ ] Build passes, no TypeScript errors

## Technical Notes

- `progress.ts` already has `updateProgress` streak logic — extract into a `checkStreak()` helper and call from login flow
- `events.ts` has `trackEvent()` ready — wire into dashboard page mount and key component actions
- Components that call trackEvent: dashboard page view, tool starts, quiz attempts
- Use `useEffect` in dashboard page to fire `trackEvent('session_started')`
- Streak counter already rendered in `stats-row.tsx` via `streakDays` prop — ensure data flows
