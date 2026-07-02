# STORY-014: Admin LiveClass UI

**Sprint:** 4 | **Points:** 5 | **Priority:** Must Have
**Epic:** Live Classes
**Dependencies:** STORY-013
**Status:** Pending

---

## Description

Build the admin UI for managing live classes. Add a Live Classes tab to the admin content management panel at `/admin/(dashboard)/courses/page.tsx`, or create a standalone admin page at `/admin/(dashboard)/live-classes/`.

## Acceptance Criteria

- [x] Live Classes tab visible in the admin content management area
- [x] Upcoming/Past filter tabs — default shows upcoming classes
- [x] Table/card listing showing: title, course, instructor, scheduled date/time, duration, spots filled/max, published status
- [x] "Create Live Class" button opens a dialog/modal with form
- [x] Create form fields: course selector (dropdown from existing courses), title, description (textarea), instructor name, date/time picker, duration (minutes), meeting URL, max attendees
- [x] Edit button on each row opens pre-filled edit dialog
- [x] Delete button with confirmation dialog
- [x] Publish/unpublish toggle on each row
- [x] Success/error toast notifications for all actions
- [x] Matches existing admin UI styling (dark glass morphism, motion animations, border/background patterns from courses.tsx)

## Technical Notes

- Follow the Tabs pattern from `admin/(dashboard)/courses/page.tsx` (CoursesTab / BadgesTab)
- Add a new `LiveClassesTab` function component
- Use shadcn/ui Dialog for create/edit modals
- Use shadcn/ui Select for course dropdown
- Date/time: use native `<input type="datetime-local">` for simplicity
- Import actions from `@/app/actions/admin/live-classes`
- Status badges: `isPublished ? 'Live' : 'Draft'` with green/gray colors
- Spots: `${registrationCount}/${maxAttendees}` with color change when full

```tsx
// Tab button to add alongside existing 'Courses' and 'Badges' tabs
<button onClick={() => setTab('live-classes')}
  className={cn('px-4 py-1.5 text-sm rounded-lg transition-colors',
    tab === 'live-classes' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
  )}>
  Live Classes
</button>
```

## Files Changed

- `project/src/app/admin/(dashboard)/courses/page.tsx` — add Live Classes tab (or new page)
- `project/src/app/admin/(dashboard)/live-classes/page.tsx` — optional new page route
