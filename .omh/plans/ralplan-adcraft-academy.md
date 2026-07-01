# AdCraft Academy — Execution Plan

## Workstream 1: Landing Page (Phase 1 — Immediate)

### Task 1: Routing Restructure
- Create `src/app/dashboard/page.tsx` — move existing dashboard from `src/app/page.tsx`
- Update `src/app/page.tsx` → completely rewrite as public marketing landing page
- Update `src/middleware.ts`: add `/` to `PUBLIC_PATHS`, redirect authenticated users to `/dashboard`
- Update `src/app/layout.tsx`: update metadata for landing/marketing

### Task 2: Landing Page Sections
All in `src/app/page.tsx`:
- **Navbar** — Public nav (Logo, Features, Pricing, Sign In, Sign Up), sticky, glass effect
- **Hero** — Bold tagline, animated subtext, dual CTA buttons, background gradient/grid
- **Trust Bar** — Stats counters (X Modules, Y Simulations, Z Learners, AI-Powered)
- **Features Grid** — 6 cards: Interactive Sims, AI Mentor, Structured Curriculum, Real-time Analytics, Gamification, Certification
- **How It Works** — 3-step process with visual connectors
- **Curriculum Preview** — Show module overview cards
- **Pricing** — 3 tiers (Free, Pro, Enterprise)
- **Final CTA** — Closing section with signup prompt
- **Footer** — Links, copyright, gradient divider

### Task 3: Build & Verify
- `npm run build` passes
- Landing page renders at `/` without auth
- Dashboard works at `/dashboard` with auth
- Authenticated users redirected from `/` to `/dashboard`
- Mobile responsive

## Workstream 2: Phase 2 Features (Phase 2 — After Landing Page)

Ordered by dependency:
1. **A2: Daily Streaks** — DB migration for streak tracking, header component
2. **C3: Event Tracking Pipeline** — Structured event logging
3. **C1: Learning Analytics Dashboard** — Personal stats view
4. **A3: Leaderboard** — Top learners by XP (weekly/monthly)
5. **B5: Mentor Context Memory** — Per-user conversation persistence
6. **A5: XP Multiplier Events** — Time-limited 2x XP
7. **D1: Certificate Generation** — PDF certificates with verification
