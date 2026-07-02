# STORY-012: LiveClass Prisma Migration

**Sprint:** 4 | **Points:** 1 | **Priority:** Must Have
**Epic:** Live Classes
**Dependencies:** None
**Status:** Pending

---

## Description

Run Prisma migration for the existing `LiveClass` and `LiveClassRegistration` models that are already defined in `project/prisma/schema.prisma`. These models currently exist only as schema definitions — they need to be materialized in the SQLite database.

## Acceptance Criteria

- [x] `prisma migrate dev` runs successfully and creates a new migration file
- [x] The Prisma client regenerates with `LiveClass` and `LiveClassRegistration` query methods
- [x] Database tables are verified to exist with all required columns
- [x] No data loss from existing tables

## Technical Notes

- The models are already defined in schema.prisma at lines 251-291
- `LiveClass` has a FK to `Course`; `LiveClassRegistration` has FKs to both `LiveClass` and `User`
- Composite unique on `LiveClassRegistration`: `[liveClassId, userId]`
- Use `prisma migrate dev --name add_live_classes` to name the migration
- Verify with `prisma db push` to ensure no drift

## Files Changed

- `project/prisma/migrations/` — new migration directory (auto-generated)
- `project/prisma/schema.prisma` — already defined, no changes needed
