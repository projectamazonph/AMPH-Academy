# REFACTORING PLAN — AMPH Academy

> **Campaign:** Unified Ecosystem Refactoring (Q3 2026)
> **Owner:** Ryan Roland Dabao
> **Target:** v1.0 Production Readiness
> **Created:** 2026-07-02

---

## 🔗 Cross-Project Dependencies

This plan is part of a **4-project unified refactoring campaign** — the others being:
- [PPC Companion](../ppc-companion/REFACTORING-PLAN.md)
- [Interview Lab](../Interview-lab/REFACTORING-PLAN.md)
- [Ad Console](../ad-console/REFACTORING-PLAN.md)

Shared design system, component library, security patterns, and dev tooling must be developed **once and consumed across all four**.

---

## Phase 0: Pre-Flight Audit

| Task | Detail | Effort |
|------|--------|--------|
| ⬜ **Inventory all components** | Map every `.tsx` in `src/components/` and `src/app/` — count unique vs. duplicated | 1h |
| ⬜ **Dependency audit** | Strip unused deps from `package.json`; verify Tailwind v4 is the only CSS framework | 1h |
| ⬜ **Security scan** | Check for hardcoded secrets, missing headers, SQL injection surfaces | 1h |
| ⬜ **Performance baseline** | Lighthouse and `next build` bundle analysis — capture current scores | 1h |
| ⬜ **SEO audit** | Check meta tags, sitemap, structured data, heading hierarchy on every route | 1h |
| ⬜ **Accessibility check** | Tab order, focus indicators, ARIA labels, color contrast ratios | 1h |
| ⬜ **Content inventory** | Catalog every string, label, error message, tooltip, and CTA | 1h |

---

## Phase 1: Unified Brand System (Cross-Project)

**Goal:** One design token system consumed by all four projects via a shared npm workspace or git submodule.

### 1.1 Design Token Definition

Create `packages/design-tokens/` at the Hermes monorepo level (or as a reference repo):

```typescript
// tokens/colors.ts
export const brand = {
  primary:    { 50: '#eef2ff', ..., 900: '#312e81' }, // Indigo
  secondary:  { 50: '#ecfdf5', ..., 900: '#064e3b' }, // Emerald
  accent:     { 50: '#fffbeb', ..., 900: '#78350f' }, // Amber
  neutral:    { 50: '#fafafa', ..., 900: '#0a0a0a' }, // Zinc
  surface:    '#050505',     // OLED black (Interview Lab)
  glass:      'rgba(255, 255, 255, 0.05)', // Glass morphism
} as const;

// tokens/typography.ts
export const typography = {
  heading:    '"Space Grotesk", sans-serif',
  body:       '"Plus Jakarta Sans", sans-serif',
  mono:       '"JetBrains Mono", monospace',
} as const;

// tokens/spacing.ts — 4px base unit
export const space = { 0: '0', 1: '4px', 2: '8px', 3: '12px', ... };
```

### 1.2 Shared Component Library

Extract common UI into `packages/ui/` (or a standalone repo):

| Component | Priority | Notes |
|-----------|----------|-------|
| `Button` | P0 | Variants: primary, secondary, ghost, danger. Pill shape. |
| `Card` | P0 | Glass-morphism base with variants (interactive, stat, form) |
| `Navigation` | P0 | Sidebar + topbar shared across all projects |
| `Input` | P0 | Text, select, textarea, search — all with consistent styling |
| `Modal/Dialog` | P0 | Radix-based with glass overlay |
| `Toast` | P0 | Notification system (success, error, info, warning) |
| `Avatar` | P1 | User avatar with initials fallback |
| `Badge` | P1 | Status, tier, role badges |
| `Progress` | P1 | Linear progress for quizzes, modules |
| `Table` | P1 | Data tables with sort, filter, pagination |
| `Tabs` | P1 | Section navigation |
| `Accordion` | P1 | FAQ, collapsible content |
| `Skeleton` | P1 | Loading states |
| `EmptyState` | P1 | Zero-data illustrations |

### 1.3 Icon Standardization

- **Choose ONE icon set:** Phosphor (light weight) — already in Interview Lab, adopt across all.
- Remove Heroicons, Lucide, or any other set from individual projects.
- Create an `Icon` wrapper component that maps names to Phosphor components.

### 1.4 Font Strategy

- **Headings:** Space Grotesk (all projects)
- **Body:** Plus Jakarta Sans (all projects)
- **Monospace:** JetBrains Mono (code, data, bid values)
- Self-host via `next/font` — no Google Fonts CDN calls

### 1.5 Storybook / Documentation

- Set up Storybook or a simple page that renders all components with code examples.
- Place at `packages/ui/docs/` or a standalone design-system site.

---

## Phase 2: Codebase Lean & Fast — AMPH Specific

**Current state:** 60+ components in `components/amph/`, many large single files, duplicated logic.

### 2.1 Architecture Restructure

```
AMPH-Academy/
└── project/
    └── src/
        ├── app/                  ← App Router (routes + API)
        ├── components/
        │   ├── ui/               ← Shared UI (from design system)
        │   ├── features/         ← Feature-specific (per domain)
        │   │   ├── campaign-builder/
        │   │   ├── bid-elevator/
        │   │   ├── search-term-triage/
        │   │   ├── curriculum/
        │   │   ├── quizzes/
        │   │   ├── badges/
        │   │   └── admin/
        │   └── layout/           ← Shell (sidebar, header, footer)
        ├── lib/
        │   ├── auth.ts           ← Auth utilities (shared pattern)
        │   ├── db.ts             ← Prisma client singleton
        │   ├── validation.ts     ← Zod schemas
        │   ├── analytics.ts      ← Event tracking
        │   └── utils.ts          ← Shared helpers (cn, format, etc.)
        ├── hooks/                ← Custom hooks
        ├── stores/               ← Zustand stores
        ├── styles/               ← Global CSS (minimal — Tailwind)
        ├── types/                ← TypeScript types
        └── middleware.ts         ← Auth middleware, CSP, rate limiting
```

### 2.2 Component Refactoring

| Current Pattern | Target | Benefit |
|----------------|--------|---------|
| Monolithic 800+ line components | Max 250 lines per file | Maintainability |
| Props drilling through 4+ levels | Zustand store or context | Reduced coupling |
| Inline Tailwind in every file | Shared design tokens + `cn()` | Consistency, smaller bundles |
| Duplicate loading/error/empty states | Shared `Skeleton`, `EmptyState` | DRY |
| Mixed concerns (logic + UI + data) | Custom hooks for data; pure UI components | Testability |

### 2.3 Bundle Optimization

- [ ] Tree-shake unused components and utilities
- [ ] Dynamic imports for heavy interactive tools (Campaign Builder, Bid Elevator)
- [ ] Route-level code splitting via Next.js App Router (automatic)
- [ ] Image optimization — use `next/image` for all assets
- [ ] Remove bundle bloat: check for duplicate dependencies, large libraries
- [ ] Enable `reactStrictMode`, `swcMinify`, `compress` in `next.config.ts`

### 2.4 Performance Targets

| Metric | Current (estimated) | Target |
|--------|--------------------|--------|
| Lighthouse Performance | — | >85 |
| First Contentful Paint | — | <1.5s |
| Time to Interactive | — | <2.5s |
| Bundle size (initial) | — | <150KB JS |
| Total page weight | — | <500KB |

---

## Phase 3: Security Hardening

### 3.1 Authentication

- [ ] Migrate from NextAuth.js to the unified JWT pattern (jose + HttpOnly cookies — matching Interview Lab / PPC Companion)
- [ ] Add JWT refresh token rotation
- [ ] Add session expiry and idle timeout
- [ ] Implement rate limiting on auth endpoints (login, signup, password reset)
- [ ] Add CSRF token validation on all mutation endpoints

### 3.2 HTTP Security Headers

```typescript
// In next.config.ts or middleware
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https:;
  font-src 'self' data:;
  connect-src 'self' https:;
  frame-src 'none';
  object-src 'none';
`.replace(/\s+/g, ' ').trim();
```

| Header | Value |
|--------|-------|
| `Content-Security-Policy` | As above |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Strict-Transport-Security` | `max-age=63072000` |

### 3.3 Input Validation

- [ ] Add Zod schemas for **all** API route inputs (don't trust the client)
- [ ] Server-side validation on every mutation
- [ ] Sanitize user-generated content (if any) before rendering
- [ ] Use parameterized queries via Prisma (already safe, but audit)

### 3.4 Data Protection

- [ ] Verify no sensitive data in client-side bundles
- [ ] Add audit logging for admin actions (user management, content changes)
- [ ] Sanitize error messages — don't leak database details to clients
- [ ] Rate limit all API routes (use a shared middleware or Vercel WAF)

---

## Phase 4: SEO Foundation

### 4.1 Per-Route Meta

Create a shared `generateMetadata` helper:

```typescript
// src/lib/seo.ts
export function seo(config: SEOConfig): Metadata {
  return {
    title: `${config.title} | AMPH Academy`,
    description: config.description,
    openGraph: {
      title: config.ogTitle ?? `${config.title} | AMPH Academy`,
      description: config.ogDescription ?? config.description,
      type: 'website',
      locale: 'en_PH',
      siteName: 'AMPH Academy',
    },
    robots: { index: true, follow: true },
    alternates: { canonical: config.canonical },
  };
}
```

### 4.2 Required SEO Tasks

| Task | Details |
|------|---------|
| [ ] Title tags | Every page has unique `<title>` |
| [ ] Meta descriptions | Every page has unique `description` (150-160 chars) |
| [ ] Open Graph tags | `og:title`, `og:description`, `og:image`, `og:url` on every page |
| [ ] Twitter cards | `summary_large_image` with same data |
| [ ] Canonical URLs | Prevent duplicate content |
| [ ] Semantic HTML | Proper H1-H6 hierarchy, `<main>`, `<nav>`, `<article>` |
| [ ] Structured data | JSON-LD for Course, Article, and Organization schemas |
| [ ] Sitemap | Dynamic `sitemap.ts` covering all routes |
| [ ] Robots.txt | Production robots.txt allowing indexing |
| [ ] Core Web Vitals | LCP <2.5s, FID <100ms, CLS <0.1 |
| [ ] alt text | Every image has descriptive alt text |

### 4.3 Structured Data: Course Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Amazon Advertising Mastery",
  "description": "Master Amazon advertising through hands-on practice...",
  "provider": {
    "@type": "Organization",
    "name": "Project Amazon PH",
    "url": "https://projectamazonph.com"
  }
}
```

---

## Phase 5: Tasteful UI Design

### 5.1 Design Language — "Project Aurora"

**Visual Foundation:**

| Element | Specification |
|---------|---------------|
| **Surface** | Deep charcoal `#0a0a0a` → OLED `#050505` gradient |
| **Glass panels** | `backdrop-blur-xl` with `rgba(255,255,255,0.03)` fill, 1px `rgba(255,255,255,0.06)` bevel |
| **Orbs** | Subtle radial gradients on hero sections (indigo/violet) |
| **Accents** | Indigo (actions), Emerald (success), Amber (warning), Rose (danger) |
| **Border radius** | `xl` (12px) for cards, `full` for pills/buttons |
| **Shadows** | Soft glow on interactive elements (indigo tint) |
| **Motion** | One easing curve: `cubic-bezier(0.16, 1, 0.3, 1)` — apply everywhere |

### 5.2 Component Design Rules

| Rule | Implementation |
|------|---------------|
| Glass cards | `className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10"` |
| Interactive hover | Scale up + glow: `hover:scale-[1.02] hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]` |
| Focus states | Visible ring: `focus-visible:ring-2 focus-visible:ring-indigo-500` |
| Loading states | Every async action has skeleton or spinner |
| Empty states | Illustrative, with CTA to take action |
| Error states | Inline validation, toast for system errors, 404 page with navigation |
| Responsive | Mobile-first, sidebar collapses to bottom nav at <768px |

### 5.3 Accessibility (WCAG 2.1 AA)

- [ ] Color contrast ratio ≥ 4.5:1 for all text
- [ ] All interactive elements focusable and activatable via keyboard
- [ ] Focus order follows visual order
- [ ] ARIA labels on icon-only buttons
- [ ] Form inputs have associated `<label>` elements
- [ ] Error messages are announced to screen readers
- [ ] Skip-to-content link at the top of every page

---

## Phase 6: Humanized Content

### 6.1 Voice & Tone Guide

| Context | Tone | Example (old → new) |
|---------|------|---------------------|
| Welcome / Hero | Aspirational, warm | "Welcome to AMPH" → "Master Amazon Ads. Build Your Future." |
| Error messages | Helpful, action-oriented | "Invalid input" → "That doesn't look right. Care to try again?" |
| Success messages | Celebratory, personal | "Quiz passed" → "Nice work! You crushed that module." |
| Empty states | Encouraging, guiding | "No results" → "Nothing here yet — let's start your first campaign!" |
| Tooltips | Concise, instructional | "Bid" → "Your max cost-per-click. Higher bids = more visibility." |
| CTA buttons | Active, confident | "Submit" → "Save Campaign" |

### 6.2 Content Refactoring Tasks

| Task | Detail |
|------|--------|
| [ ] Audit all UI strings | Catalog every label, placeholder, tooltip, error message |
| [ ] Create copy guide | Document voice, tone, banned phrases, preferred terms |
| [ ] Rewrite system messages | Errors, confirmations, empty states, loading states |
| [ ] Add micro-copy | Helpful hints under form fields, tooltips on jargon |
| [ ] Localization prep | Extract all strings to i18n structure (even if English-only) |
| [ ] Tool descriptions | Every interactive tool has a clear "what does this do" |

### 6.3 Jargon Buster (for PPC tools)

| Term Plain English |
|------|-----------------|
| ACoS | "How much you spend to make each sale" |
| Bids | "Your max cost per click" |
| Keywords | "The search terms you want your ads to show for" |
| Match Types | "How closely a search term must match your keyword" |
| Campaign | "A group of ad sets with the same budget and targeting" |

---

## Phase 7: Navigation & User Paths

### 7.1 Site Architecture (AMPH)

```
/ (Landing)
├── /auth/signin
├── /auth/signup
├── /dashboard (Student home)
│   ├── /curriculum (Course modules)
│   │   └── /curriculum/[moduleId] (Module detail + lessons)
│   ├── /tools (Interactive tools)
│   │   ├── /tools/campaign-builder
│   │   ├── /tools/bid-elevator
│   │   └── /tools/search-term-triage
│   ├── /quizzes
│   ├── /badges
│   ├── /progress
│   ├── /downloads
│   └── /settings
└── /admin (Admin panel)
    ├── /admin/users
    ├── /admin/content
    ├── /admin/analytics
    └── /admin/settings
```

### 7.2 Navigation Component

- **Sidebar** (desktop): Icons + labels, active state with indigo accent, collapsible
- **Bottom nav** (mobile): 4-5 primary destinations
- **Breadcrumbs**: Subpage navigation (Tools → Campaign Builder)
- **Back navigation**: Consistent back button on detail pages
- **User menu**: Dropdown in top-right: Profile, Settings, Sign Out

### 7.3 Key User Flows

#### New Student Onboarding
```
Sign Up → Welcome Tour → First Module → Interactive Tool → Badge Earned 🔄
```

#### Tool Workflow (Campaign Builder)
```
Dashboard → Tools → Campaign Builder → Build Campaign → Score → Save → Badge
```

#### Quiz Flow
```
Module Complete → Quiz → Score → Review Mistakes → Retry or Next Module
```

### 7.4 Clear CTAs Per Page

| Page | Primary CTA | Secondary CTA |
|------|-------------|---------------|
| Landing | "Start Learning" (→ Sign Up) | "Explore Tools" (→ scroll) |
| Dashboard | "Continue Module" | "Practice Tools" |
| Tool page | "Build a Campaign" | "See Example" |
| Quiz | "Start Quiz" | "Review Module First" |
| Empty state | "Begin First Lesson" | — |

---

## Implementation Roadmap

| Phase | Tasks | Duration | Dependencies |
|-------|-------|----------|-------------|
| **P0: Audit & Prep** | Inventory all code, assets, content, security gaps | 3 days | None |
| **P1: Design System** | Shared tokens, component library, Storybook | 5 days | P0 |
| **P2: Security** | Auth migration, HTTP headers, CSP, rate limiting, validation | 4 days | P0 |
| **P3: Code Lean** | Architecture restructure, component splitting, bundle opt | 5 days | P1, P2 |
| **P4: UI Refresh** | Apply design system, glass morphism, motion, responsive | 5 days | P1 |
| **P5: SEO** | Meta tags, sitemap, structured data, semantic HTML | 2 days | P3 |
| **P6: Content** | Copy audit, rewrite, micro-copy, jargon buster | 3 days | P3 |
| **P7: UX Flows** | Navigation refactor, breadcrumbs, onboarding, CTAs | 3 days | P1, P4 |
| **P8: QA & Polish** | Accessibility audit, cross-browser, performance validation | 3 days | All |

**Total:** ~33 days (full-time) | **Parallel tracks:** Brand (P1) + Security (P2) can run concurrently

---

## Ad Console Integration

AMPH Academy will link to the **Ad Console** as the primary hands-on practice environment:

```
Curriculum → Lesson on Campaign Creation → "Open Ad Console" (deep link)
Tools → "Practice in Live Simulator" → Opens Ad Console with pre-seeded data
```

Ad Console will be the **lab**; AMPH Academy is the **classroom**. Students learn in AMPH, then practice in Ad Console.

---

## Success Criteria

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥85 |
| Lighthouse Accessibility | ≥90 |
| Lighthouse Best Practices | ≥90 |
| Lighthouse SEO | ≥95 |
| First Contentful Paint | <1.5s |
| Bundle size (initial route) | <150KB JS |
| Pages with unique meta tags | 100% |
| Components using shared design tokens | 100% |
| API routes with validation | 100% |
| All pastel/JWT/CORS security | All headers set |

---

*This plan is living — update as work progresses. See `KANBAN.md` for current sprint tasks.*
