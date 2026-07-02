# STORY-015: Student LiveClass Registration Actions

**Sprint:** 4 | **Points:** 2 | **Priority:** Must Have
**Epic:** Live Classes
**Dependencies:** STORY-012
**Status:** Pending

---

## Description

Create server actions for students to browse and register for live classes. Follow the courses module patterns in `src/modules/courses/_actions.ts`.

## Acceptance Criteria

- [x] `getUpcomingClasses` — returns published LiveClass records with scheduledAt >= now, sorted ascending, includes course title and registration count
- [x] `getPastClasses` — returns published LiveClass records with scheduledAt < now, sorted descending, includes recordingUrl if available
- [x] `getRegisteredClasses` — returns LiveClass records where the current user has a registration
- [x] `registerForClass(liveClassId)` — creates LiveClassRegistration for current user, checks maxAttendees cap (reject if full)
- [x] `unregisterFromClass(liveClassId)` — deletes the user's registration, errors if already started
- [x] `checkRegistration(liveClassId)` — returns whether current user is registered for a specific class
- [x] All actions use `getSession` auth guard (must be authenticated, any role)
- [x] Proper error handling with user-friendly messages

## Technical Notes

- File: `src/modules/live-classes/_actions.ts`
- New module directory: `src/modules/live-classes/`
- Type definitions in `src/modules/live-classes/_types.ts`
- Follow the exact pattern from `src/modules/courses/_actions.ts`
- Registration count query: use `_count: { select: { registrations: true } }` on the LiveClass query
- For the max attendees check:
  ```typescript
  const regCount = await db.liveClassRegistration.count({ where: { liveClassId } });
  const liveClass = await db.liveClass.findUnique({ where: { id: liveClassId } });
  if (regCount >= liveClass.maxAttendees) {
    return { success: false, error: 'This class is fully booked.' };
  }
  ```
- Export types for: `LiveClassSummary`, `LiveClassDetail`, `RegistrationResponse`
