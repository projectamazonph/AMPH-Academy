# STORY-006: Daily Streaks & XP Header Display

**Sprint:** 2
**Epic:** Engagement Features
**Priority:** Must Have
**Points:** 3
**Status:** In Progress
**Dependencies:** None

---

## Description

Give users visible feedback on their engagement. Show XP, level, and daily streak in the navigation header. The streak updates automatically when the user visits the app. If more than 48 hours since last active, the streak resets to 0.

## Acceptance Criteria

- [x] **AC1:** Server action `updateStreak` checks `lastActiveAt` on User:
  - If last active < 24h ago → do nothing (already counted today)
  - If last active between 24h–48h ago → increment `streakDays` by 1
  - If last active > 48h ago → reset `streakDays` to 1 (new streak)
  - Always update `lastActiveAt` to `now()`
- [x] **AC2:** Server action returns `{ xp, level, streakDays }`
- [x] **AC3:** Header component calls `updateStreak` on mount and displays:
  - XP counter with icon
  - Streak fire icon with day count
  - Level badge
- [x] **AC4:** Display is compact — fits in the nav bar without breaking layout
- [x] **AC5:** Works for both authenticated and unauthenticated (hide on unauthenticated)

## Technical Notes

- DB already has `User.xp`, `User.level`, `User.streakDays`, `User.lastActiveAt`
- No migration needed
- Use server action (not API route) for direct DB access
- Header component is in the layout — check `src/app/layout.tsx` and existing nav components

## Files Touched

- `src/modules/auth/_actions.ts` — add `updateStreak()` server action
- `src/app/layout.tsx` or create `src/components/layout/header.tsx` — add streak/XP display
- Maybe: `src/components/adcraft/` for the XP display component
