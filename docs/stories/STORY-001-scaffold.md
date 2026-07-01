# Initialize Next.js Project Scaffold

- **ID:** STORY-001
- **Epic:** Foundation
- **Priority:** Must Have
- **Story Points:** 3
- **Status:** Not Started

## User Story

As a **developer**
I want to **initialize the Next.js project with Tailwind, Prisma, shadcn/ui, and Project Aurora design system**
So that **I have a working scaffold with consistent styling, database access, and shared components from PPC Companion**

## Acceptance Criteria

- [ ] Next.js 16 (App Router) project initialized with TypeScript
- [ ] Tailwind CSS configured with Project Aurora theme tokens (Deep Navy #1A1A2E background, Orange #FF6B35 accent, Space Grotesk + Plus Jakarta Sans fonts)
- [ ] Prisma installed with SQLite datasource configured
- [ ] shadcn/ui initialized with base components (Button, Card, Input, Badge, Toast)
- [ ] Project Aurora shared UI components copied from PPC Companion (`components/ui/` and `components/layout/`)
- [ ] Folder structure follows architecture doc: `modules/auth/`, `modules/courses/`, `modules/tools/`, `modules/badges/`, `modules/progress/`, `modules/certificates/`, `modules/quizzes/`, `modules/resources/`
- [ ] `lib/` directory with `db.ts` (Prisma singleton), `utils.ts`, `types.ts`
- [ ] `.env.example` with required environment variables documented
- [ ] ESLint + Prettier configured
- [ ] Project builds successfully with `npm run build`

## Technical Notes

### Implementation Approach
1. `npx create-next-app@latest adcraft-academy --typescript --tailwind --eslint --app --src-dir --import-alias @/*`
2. Install shadcn/ui: `npx shadcn@latest init`
3. Add base shadcn components: button, card, input, badge, toast, dialog
4. Install Prisma: `npm install prisma @prisma/client`
5. `npx prisma init --datasource sqlite`
6. Configure Tailwind with Project Aurora theme colors
7. Copy `components/ui/` and `components/layout/` from PPC Companion
8. Create empty module directories
9. Create `lib/db.ts`, `lib/utils.ts`, `lib/types.ts`
10. Create `.env.example`

### Files/Modules Affected
- Root: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `.env.example`, `.eslintrc.json`, `.prettierrc`
- `components/ui/` — shadcn + Aurora components
- `components/layout/` — shared layout components
- `lib/db.ts` — Prisma client singleton
- `lib/utils.ts` — cn() helper and utilities
- `lib/types.ts` — shared TypeScript types
- `modules/*/` — empty module directories

### Data Model Changes
- None (schema created in STORY-002)

### Edge Cases
- **PPC Companion has different package versions:** Pin versions to what works, don't blindly copy package.json
- **shadcn component conflicts:** Only copy components that exist in PPC Companion's Aurora library, skip any with business logic

## Dependencies

### Story Dependencies
- **Blocked by:** None
- **Blocks:** STORY-003, STORY-004, STORY-005

## Testing Requirements

### Manual Testing
- [ ] `npm run build` completes without errors
- [ ] `npm run dev` starts and serves the home page
- [ ] Tailwind theme colors render correctly on a test component
- [ ] Prisma CLI recognizes the schema

## Definition of Done

- [ ] Code is written and follows project coding standards
- [ ] Build passes
- [ ] Scaffold is pushed to main branch
- [ ] Project runs locally with `npm run dev`
