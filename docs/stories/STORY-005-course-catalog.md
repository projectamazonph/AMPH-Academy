# Course Catalog and Module Listing

- **ID:** STORY-005
- **Epic:** Course Browsing
- **Priority:** Must Have
- **Story Points:** 5
- **Status:** Not Started

## User Story

As a **student**
I want to **browse available courses and view module details**
So that **I can understand the curriculum and start learning**

## Acceptance Criteria

- [ ] Course listing page (`/courses`) shows all published courses as cards
- [ ] Each course card shows: title, description, module count, total duration
- [ ] Courses seeded from database (AMPH's 3 tiers: PPC Foundations, Accelerated Mastery, Ultimate Transformation)
- [ ] Course detail page (`/courses/[slug]`) shows full course info and module list
- [ ] Each module in the list shows: title, duration, completion status (locked/available/completed)
- [ ] Modules display in curriculum order
- [ ] Module detail page (`/courses/[slug]/modules/[moduleId]`) shows:
  - Module title and description
  - Video embed placeholder (YouTube/loom iframe)
  - Content body (rendered markdown or rich text)
  - "Mark Complete" button (UI only — backend in Sprint 2)
- [ ] Enrollment state shown: enrolled courses show "Continue" button, unenrolled show "Enroll" button
- [ ] Server-side rendering (RSC) for course data — no client-side loading spinners
- [ ] Responsive layout: 1 column on mobile, 2-3 columns on desktop for course cards
- [ ] Loading states with Next.js `loading.tsx` skeleton

## Technical Notes

### Implementation Approach
1. Create `modules/courses/_types.ts` — Course, Module, Enrollment types
2. Create `modules/courses/_actions.ts` — getCourses, getCourseBySlug, getModule, getModuleProgress
3. Create `modules/courses/_components/` — CourseCard, ModuleList, ModuleContent, EnrollmentButton
4. Create `app/(auth)/courses/page.tsx` — RSC that fetches and renders course list
5. Create `app/(auth)/courses/[slug]/page.tsx` — Course detail with module tree
6. Create `app/(auth)/courses/[slug]/modules/[moduleId]/page.tsx` — Module content page
7. Create loading.tsx and error.tsx for each route segment
8. Seed data in STORY-002 should already populate courses for this story

### Files/Modules Affected
- `modules/courses/_types.ts` — New
- `modules/courses/_actions.ts` — New (getCourses, getCourseBySlug, getModule, getUserProgress)
- `modules/courses/_components/CourseCard.tsx` — New
- `modules/courses/_components/ModuleList.tsx` — New
- `modules/courses/_components/ModuleContent.tsx` — New
- `modules/courses/_components/EnrollmentButton.tsx` — New
- `app/(auth)/courses/page.tsx` — New
- `app/(auth)/courses/loading.tsx` — New
- `app/(auth)/courses/[slug]/page.tsx` — New
- `app/(auth)/courses/[slug]/loading.tsx` — New
- `app/(auth)/courses/[slug]/modules/[moduleId]/page.tsx` — New
- `app/(auth)/courses/[slug]/modules/[moduleId]/loading.tsx` — New

### Data Model Changes
- None (uses Course, Module, Enrollment models from STORY-002)

### Edge Cases
- **Empty state:** No published courses → show "Courses coming soon" message
- **Loading state:** Skeleton cards while page streams
- **Error state:** Database connection failure → graceful error page with retry button
- **Not found:** Invalid slug → 404 page
- **Not enrolled:** Show module list but lock content with "Enroll to access" overlay
- **Module URL:** Use module ID (cuid) in URL, not numeric index, to avoid ordering issues

### Performance Considerations
- Course list: Single Prisma query, no N+1
- Module content: Static data, RSC renders immediately
- Images: Next/Image with lazy loading
- Responsive images on course cards

## Dependencies

### Story Dependencies
- **Blocked by:** STORY-002 (Course/Module models), STORY-004 (auth for gated content)
- **Blocks:** None

## Testing Requirements

### Manual Testing
- [ ] `/courses` shows 3 course cards with correct data
- [ ] Clicking a course opens detail page with module list
- [ ] Module list shows correct order and durations
- [ ] Module detail page shows video placeholder and content body
- [ ] Logged-out users redirected to login (via middleware)
- [ ] Invalid course slug returns 404
- [ ] Responsive layout works on mobile and desktop
- [ ] Loading skeleton appears on initial load (slow 3G throttle)

## Definition of Done

- [ ] Course catalog pages render with seed data
- [ ] Three course tiers visible and navigable
- [ ] Module content pages display correctly
- [ ] Auth gating works (logged out → login redirect)
- [ ] Loading and error states handled
- [ ] Responsive design verified
- [ ] Merged to main, deployed to Vercel
