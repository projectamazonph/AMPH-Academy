# STORY-013: Admin LiveClass CRUD Actions

**Sprint:** 4 | **Points:** 3 | **Priority:** Must Have
**Epic:** Live Classes
**Dependencies:** STORY-012
**Status:** Pending

---

## Description

Create server actions for admin CRUD operations on LiveClass entities. Follow the existing admin action patterns in `src/app/actions/admin/` (e.g., `courses.ts`, `users.ts`).

## Acceptance Criteria

- [x] `createLiveClass` server action — validates required fields, creates record, returns ActionResult
- [x] `updateLiveClass` server action — updates existing record by ID, returns ActionResult
- [x] `deleteLiveClass` server action — deletes record by ID, returns ActionResult
- [x] `getLiveClasses` server action — lists all live classes with course title, registration count, sorted by scheduledAt desc
- [x] `getLiveClassById` server action — returns single live class with registrations
- [x] `toggleLiveClassPublish` server action — toggles isPublished flag
- [x] All actions use `getAuthUserId` auth guard (ADMIN role check)
- [x] All actions use `logger.error` for failure logging
- [x] All actions return `ActionResult<T>` type

## Technical Notes

- File: `src/app/actions/admin/live-classes.ts`
- Follow the exact pattern from `src/app/actions/admin/courses.ts`:
  ```typescript
  export async function getLiveClasses(): Promise<ActionResult<AdminLiveClass[]>>
  ```
- AdminLiveClass interface should include:
  - id, title, description, instructorName, scheduledAt, durationMinutes
  - meetingUrl, recordingUrl, maxAttendees, isPublished
  - courseId, courseTitle (joined)
  - registrationCount, createdAt
- Validation: title required (non-empty), scheduledAt must be a valid future/past DateTime, durationMinutes >= 15, maxAttendees >= 1

## Data Model Reference

```prisma
model LiveClass {
  id              String    @id @default(cuid())
  courseId        String
  title           String
  description     String
  instructorName  String    @default("Ryan Dabao")
  scheduledAt     DateTime
  durationMinutes Int       @default(60)
  meetingUrl      String?
  recordingUrl    String?
  maxAttendees    Int       @default(50)
  isPublished     Boolean   @default(false)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  course          Course    @relation(fields: [courseId], references: [id])
  registrations   LiveClassRegistration[]
}
```

## Files Changed

- `project/src/app/actions/admin/live-classes.ts` — new file (all CRUD actions)
- `project/src/app/actions/admin/types.ts` — may need AdminLiveClass types
