---
title: "AMPH Academy — Finish Line & Landing Page"
status: confirmed
date: 2026-06-30
---

## Overview

AMPH Academy is an Amazon PPC training platform with interactive simulations, structured learning modules, and an AI Mentor. The MVP is 100% shipped. This spec covers two workstreams:

### Workstream 1: Public Landing Page

**Problem**: The root `/` route currently serves the authenticated app dashboard. There is no public-facing marketing landing page. Unauthenticated visitors hit a login wall with no explanation of what AMPH Academy is.

**Solution**: 
- Create a stunning, conversion-optimized landing page at `/`
- Move the existing authenticated app dashboard to `/app/` (or `/app/dashboard`)
- The landing page serves unauthenticated visitors; they sign in/up to access `/app/`

**Landing Page Sections**:
1. **Hero** — Bold headline, subheadline, CTA (Get Started / Watch Demo), animated visual
2. **Trust Bar** — Logos/badges of relevant credentials, stats (X active learners, Y modules, Z simulations)
3. **Features** — Grid of product capabilities: Interactive Simulations, AI Mentor, Structured Curriculum, Real-time Analytics, Gamification, Certificate
4. **How It Works** — 3-step explainer (Learn → Practice → Master)
5. **Curriculum Preview** — Module overview showing 5 modules + 3 simulations
6. **Testimonials** — Social proof cards (can use placeholder content for now)
7. **Pricing** — Tier cards: Free (basic modules), Pro (full access), Enterprise (team plans)
8. **CTA Section** — Final push with signup prompt
9. **Footer** — Links, copyright, social

**Design Direction**:
- Dark theme (matching existing app design system)
- Accent: vibrant gradient (emerald/teal/amber palette from existing components)
- Geist Sans font (already in use)
- Framer Motion animations for scroll reveals
- Responsive, mobile-first
- Clean, modern SaaS aesthetic (Linear/Vercel-inspired)

### Workstream 2: Remaining Phase 2 Features

After the landing page ships, finish these Phase 2 features:

| # | Feature | Priority | Description |
|---|---------|----------|-------------|
| A2 | Daily Streaks | 🔴 P0 | Consecutive-day login tracking, streak counter in header, streak-freeze mechanic |
| A3 | Leaderboard | 🔴 P0 | Top learners by XP (weekly/monthly), tab already exists |
| A5 | XP Multiplier Events | 🟡 P1 | Time-limited 2x XP events, config in DB, visual indicator |
| B5 | Mentor Context Memory | 🟡 P1 | Remember past mentor conversations per user |
| C1 | Learning Analytics Dashboard | 🟡 P1 | Personal stats, completion rate, weak areas, XP trend |
| C3 | Event Tracking Pipeline | 🟡 P1 | Structured events (lesson_started, quiz_answered, etc.) |
| D1 | Certificate Generation | 🟢 P2 | PDF certificates with verification hash |

## Technical Approach

### Landing Page Routing
- `/` → public landing page (static, no auth required)
- `/app/dashboard` → existing dashboard (protected by middleware)
- Middleware update: redirect `/` to `/app/dashboard` only for authenticated users
- All existing `/` routes (API, auth, etc.) remain unchanged

### Landing Page Implementation
- Static page (no 'use client' unless animation requires it)
- Uses Tailwind 4, Framer Motion, existing UI components
- Dark mode only (matches app design)
- src/app/page.tsx → landing page
- src/app/(app)/dashboard/page.tsx → moved dashboard
- OR simpler: src/app/page.tsx → landing, src/app/dashboard/page.tsx → dashboard

### Feature Implementation Order
1. Landing Page ✅ (highest visibility)
2. Daily Streaks (A2) — streak tracking in DB, header indicator
3. Event Tracking Pipeline (C3) — prerequisite for analytics
4. Learning Analytics Dashboard (C1) — depends on C3
5. Leaderboard (A3) — depends on event tracking
6. Mentor Context Memory (B5) — separate concern
7. XP Multiplier Events (A5) — depends on event tracking
8. Certificate Generation (D1) — standalone

## Constraints
- Must preserve all existing functionality
- Dark theme only (no light mode)
- Must pass build (`npm run build`)
- Use existing design tokens and component library
- No additional external dependencies beyond what's already in package.json
