# Create Prisma Database Schema

- **ID:** STORY-002
- **Epic:** Foundation
- **Priority:** Must Have
- **Story Points:** 5
- **Status:** Not Started

## User Story

As a **developer**
I want to **define all database models in Prisma schema with seed data**
So that **AMPH Academy has a complete data model for users, courses, progress, badges, and certificates**

## Acceptance Criteria

- [ ] All models defined in `prisma/schema.prisma`: User, Session, Course, Module, Enrollment, LiveClass, ModuleProgress, ToolSession, ToolResult, Badge, BadgeAward, Certificate, QuizAttempt, Resource
- [ ] User model has email (unique), name, passwordHash, authProvider, providerId fields
- [ ] Course model has title, description, slug (unique), published status
- [ ] Module model has courseId (FK to Course), title, order, videoUrl (optional), contentBody, duration (minutes)
- [ ] Enrollment model links User to Course with status and timestamps
- [ ] ModuleProgress model tracks per-user module completion (enrollmentId FK, moduleId FK, status, score)
- [ ] ToolSession and ToolResult models for practice tool data storage
- [ ] Badge model with name, description, slug (unique), iconUrl, criteria JSON
- [ ] BadgeAward model linking User to Badge with timestamp
- [ ] Certificate model with userId, verificationCode (unique), metadata JSON
- [ ] QuizAttempt model with userId, moduleId, score, passed, answers JSON
- [ ] Resource model with moduleId (nullable for global resources), title, type, fileUrl
- [ ] All models have `id` (String, cuid), `createdAt`, `updatedAt`
- [ ] SQLite `prisma db push` works and creates all tables
- [ ] Seed script (`prisma/seed.ts`) populates sample course structure matching the three AMPH Academy tiers
- [ ] Prisma Client generates successfully with `prisma generate`

## Technical Notes

### Implementation Approach
1. Write `prisma/schema.prisma` with all 14 models
2. Configure SQLite datasource
3. Create `prisma/seed.ts` with:
   - 3 courses (PPC Foundations, Accelerated Mastery, Ultimate Transformation)
   - 3-5 modules per course with realistic content outlines
   - Sample badges (First Campaign, Perfect Score, Module Master)
   - A demo admin user
4. Run `npx prisma db push` to create tables
5. Run `npx prisma db seed` to populate seed data
6. Verify with `npx prisma studio`

### Files/Modules Affected
- `prisma/schema.prisma` — All 14 models
- `prisma/seed.ts` — Seed data
- `package.json` — Add `"prisma": { "seed": "tsx prisma/seed.ts" }`
- `lib/db.ts` — (created in STORY-001, uses PrismaClient)

### Data Model Changes
- All new (first schema creation)

### Edge Cases
- **authProvider enum:** Store as string, not enum, to allow future providers
- **JSON fields (criteria, answers, metadata, details):** Use Prisma's `Json` type for flexibility
- **cuid vs uuid:** Use `cuid()` for shorter, URL-friendly IDs

## Dependencies

### Story Dependencies
- **Blocked by:** STORY-001 (needs Prisma installed in project)
- **Blocks:** STORY-004, STORY-005

## Testing Requirements

### Manual Testing
- [ ] `npx prisma db push` creates all 14 tables
- [ ] `npx prisma db seed` populates data without errors
- [ ] `npx prisma studio` shows all tables with data
- [ ] `npx prisma generate` produces types

## Definition of Done

- [ ] All 14 models defined and pushed
- [ ] Seed data populates 3 courses with modules
- [ ] `prisma generate` succeeds
- [ ] Changes merged to main
