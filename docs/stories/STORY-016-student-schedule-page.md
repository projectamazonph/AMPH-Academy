# STORY-016: Student LiveClass Schedule Page

**Sprint:** 4 | **Points:** 2 | **Priority:** Must Have
**Epic:** Live Classes
**Dependencies:** STORY-015
**Status:** Pending

---

## Description

Add a "Live Classes" tab to the student dashboard that displays upcoming and past live classes with registration functionality.

## Acceptance Criteria

- [x] New "Live Classes" tab visible in the dashboard sidebar navigation
- [x] NavTab type extended with 'live-classes' option
- [x] Upcoming classes displayed as card grid with: title, course name (badge), instructor, scheduled date/time (formatted), duration, spots remaining (e.g., "12/50"), Register button
- [x] Past classes section shows recording link when available
- [x] Register button calls `registerForClass` — transitions to "Registered" state with visual feedback
- [x] Unregister button available before class starts (shows 5 min before class)
- [x] Fully booked classes show "Full" badge and disabled register button
- [x] Loading, empty, and error states handled
- [x] Matches existing dashboard UI patterns (motion animations, color config, glass cards)

## Technical Notes

- File: `project/src/app/dashboard/page.tsx`
- Add 'live-classes' to the NavTab type and the sidebar mapping
- Create `LiveClassesView` function component in the same file (or as a separate component)
- Pattern for sidebar: see `components/amph/sidebar.tsx` for nav structure
- Date formatting: `Intl.DateTimeFormat('en-PH', { ... })` for Filipino timezone-friendly display
- Color scheme: use a distinctive color (e.g., indigo/purple) to differentiate from existing module/simulation tabs

```tsx
// In the main Dashboard component, add a new case:
{activeTab === 'live-classes' && <LiveClassesView />}

// Sidebar tab config — add:
{ id: 'live-classes', label: 'Live Classes', icon: Video }
```

## Files Changed

- `project/src/app/dashboard/page.tsx` — add LiveClassesView component + tab routing
- `project/components/amph/sidebar.tsx` — add live-classes NavTab option
- `project/src/modules/live-classes/_actions.ts` — already created in STORY-015
