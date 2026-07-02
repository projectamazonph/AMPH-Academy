# STORY-008: Testing Expansion

**Epic:** Engagement Features
**Priority:** Should Have
**Points:** 5
**Dependencies:** None

## Acceptance Criteria

- [ ] Component tests for auth module (actions, types)
- [ ] Component tests for courses module (actions, types)
- [ ] Component tests for progress/streak logic
- [ ] E2e smoke test covers landing page, signin, signup, dashboard redirect
- [ ] All 117 existing tests still pass
- [ ] `npm run test` green

## Technical Notes

- Vitest already configured — just add test files
- Auth actions: test registration validation, email format, password rules
- Courses actions: test query, filtering
- Keep tests fast — mock Prisma with `vitest-mock-prisma` or manual mock
- E2e: extend `e2e/smoke.spec.ts` with Playwright
