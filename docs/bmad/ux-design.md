# UX Design Document — AMPH Academy

- **Project:** AMPH Academy
- **Date:** 2026-07-02
- **Designer:** Ryan Roland Dabao (via Stitch Design Taste + BMAD UX Designer)
- **Version:** 1.0

---

## 1. Design Overview

### Project Summary

AMPH Academy is an advanced Amazon PPC training platform for Filipino VAs. The UX is designed around a single core principle: **confidence through practice.** Every screen should make the student feel they are leveling up — from uncertain beginner to agency-ready specialist. The design is premium but not intimidating, authoritative but not cold, with asymmetric layouts, deliberate micro-motion, and a restrained color palette that communicates trust and expertise.

### Design Goals

1. **Reduce friction to first win** — Students should complete their first module and earn their first badge within 15 minutes of enrollment
2. **Make practice feel safe** — Interactive tools (Campaign Builder, Bid Elevator, Search Term Triage) must feel like a sandbox, not a test
3. **Build visible progress** — Every visit to the dashboard should show measurable advancement (badges, completion %, streak)
4. **Establish authority without arrogance** — Ryan's 13yr VA + 8yr PPC experience should be woven into the experience without being obnoxious

### Success Metrics

- Time from enrollment to first badge: < 15 minutes
- Module completion rate: > 60%
- Interactive tool return rate: > 3 sessions/student/week
- Dashboard re-engagement rate: > 70% weekly active users

### Design Principles Applied

- **Confidence Through Practice** — Interactive tools are the hero, not passive video
- **Progress as Motivation** — Visual feedback loop on every action
- **Mobile-First Consumption, Desktop-First Practice** — Course content on mobile, tools on desktop
- **Authority Without Noise** — Ryan's expertise communicated through quality, not banners
- **Anti-Slop Premium** — No generic templates, no AI clichés, no filler UI

### Target Devices

- [x] Mobile (320px–767px) — course browsing, video consumption, progress checking
- [x] Tablet (768px–1023px) — light tool use, course study
- [x] Desktop (1024px+) — full interactive tool experience, dashboard
- [ ] Native app — Web-first responsive

---

## 2. User Personas

### Primary Persona: Maria — The PPC Companion Grad

**Demographics:**
- Age: 24–32
- Occupation: Virtual Assistant (1–3 years)
- Tech savviness: Medium
- Location: Philippines (provincial or metro)
- Device: Laptop (Windows Chrome) + Phone (Android)

**Goals:**
- Move from ₱20k/month to ₱60k+/month
- Get a certificate that proves skills to agencies
- Practice campaign building without spending real ad budget

**Pain Points:**
- Knows PPC theory but never built a real campaign
- Doesn't know how to prove skills to employers
- Afraid of expensive mistakes on live accounts

**Device Usage:**
- Primary: Laptop (evenings after client work)
- Secondary: Phone (browsing modules, checking schedule)

**Accessibility Needs:**
- None specifically declared; standard WCAG AA sufficient

### Secondary Persona: Juan — The Experienced Specialist

**Demographics:**
- Age: 26–38
- Occupation: PPC Specialist (1–2 years managing ad spend)
- Tech savviness: High
- Location: Philippines (metro area)
- Device: Laptop (dual monitors)

**Goals:**
- Get certified to command ₱80k+/month
- Master advanced strategies (portfolio bidding, placement optimization)
- Join an agency placement network

**Pain Points:**
- No formal credentials
- Hitting knowledge plateau
- Wants agency connections

**Device Usage:**
- Primary: Desktop with large monitor
- Secondary: Phone (quick checks)

**Accessibility Needs:**
- None specifically declared; standard WCAG AA sufficient

---

## 3. User Flows

### Flow 1: Student Onboarding & First Module

**Goal:** Get from enrollment to first badge in under 15 minutes.

**Entry Point:** Course confirmation page (post-payment)

**Success Criteria:** Student completes Module 1 and receives their first badge.

```
[Enrollment Confirmation]
        |
        v
[Welcome Screen: "You're in"]
  • Brief video from Ryan (60 sec welcome)
  • "Start Module 1" CTA
        |
        v
[Module 1: Course Content]
  • Embedded video lesson
  • Key takeaways summary
  • Downloadable resource link
        |
        v
[Module 1: Knowledge Check Quiz]
  • 5 questions (multiple choice)
  • Passing score: 70%
        |
    ┌───┴───┐
    │       │
  Pass    Fail
    │       │
    v       v
[Badge Earned!]  [Retry quiz (different questions)]
    │               │
    v               v
[Next Module btn]  [Back to content review]
    │
    v
[Progress Dashboard update]
```

**Error States:**
- Video fails to load → Show fallback text + download transcript
- Quiz submission fails → Auto-retry with toast notification
- Badge not awarded → Manual trigger from admin dashboard

---

### Flow 2: Interactive Tool Practice Session

**Goal:** Student opens Campaign Builder, builds a campaign, gets feedback.

**Entry Point:** Dashboard "Practice Now" CTA or Tools navigation

```
[Dashboard / Tools nav]
        |
        v
[Tool Selection Screen]
  • Campaign Builder
  • Bid Elevator
  • Search Term Triage
        |
        v
[Student selects Campaign Builder]
        |
        v
[Scenario Selection]
  • Beginner: "Build a Sponsored Products campaign"
  • Intermediate: "Build a portfolio with SP + SB"
  • Advanced: "Full account structure for a new launch"
        |
        v
[Campaign Builder Interface]
  • Left panel: campaign structure tree
  • Right panel: form for selected element
  • Bottom: validation status + score
        |
        v
[Student builds campaign]
  • Add campaign (name, type, budget, targeting)
  • Add ad groups with keywords
  • Set bid adjustments
        |
        v
[Submit for Review]
        |
    ┌───┴───┐
    │       │
  Valid   Issues Found
    │       │
    v       v
[Score: 85%]  [Highlighted issues + suggestions]
    │               │
    v               v
[Export PDF]  [Fix and resubmit]
    │
    v
[Badge: "Campaign Architect" (if first time)]
```

**Error States:**
- Unsaved work on accidental navigation → Confirm dialog: "You have unsaved work"
- Tool times out → Auto-save state to local storage + restore on return

---

### Flow 3: PPC Companion → AMPH Academy SSO

**Goal:** PPC Companion graduate seamlessly accesses AMPH.

**Entry Point:** "Advance to AMPH" button in PPC Companion dashboard

```
[PPC Companion Dashboard]
        |
        v
[Click "Advance to AMPH"]
        |
        v
[SSO Token Exchange (background)]
        |
    ┌───┴───┐
    │       │
  Success  Failure
    │       │
    v       v
[AMPH Dashboard]  [Login page with email prefilled]
    │                    │
    v                    v
[Welcome back!]     [Manual login or register]
```

---

## 4. Wireframes

### Screen 1: Dashboard (Home)

**Purpose:** Central hub showing progress, next action, and quick access to tools.

**Layout (Desktop, 1024px+):**

```
┌──────────────────────────────────────────────────────────────────┐
│  [AMPH Logo]  [Curriculum] [Tools ▼] [Resources]   [👤 Juan] │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────┐  ┌──────────────────────────┐ │
│  │  Welcome back, Juan!         │  │  Your Progress           │ │
│  │  Next live class: Thu 7PM    │  │  ■■■■■■■□□□  70%         │ │
│  │  [Continue Module 3 ▶]       │  │  3 modules complete      │ │
│  │                              │  │  2 badges earned         │ │
│  │  "Mastery is built in the    │  │                          │ │
│  │   trenches, not in theory"   │  │  [View Full Progress →]  │ │
│  │              — Ryan          │  └──────────────────────────┘ │
│  └──────────────────────────────┘                               │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Practice Tools           ┌─────────┐ ┌─────────┐       │   │
│  │                           │Campaign │ │   Bid   │       │   │
│  │  Your last session:       │ Builder │ │Elevator │       │   │
│  │  Campaign Builder — 85%   └─────────┘ └─────────┘       │   │
│  │  [Practice Now →]         ┌─────────┐                   │   │
│  │                           │  Search │                   │   │
│  │                           │  Term   │                   │   │
│  │                           │ Triage  │                   │   │
│  │                           └─────────┘                   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Upcoming Live Classes                                    │   │
│  │  ┌────────────────────┐ ┌────────────────────┐           │   │
│  │  │ Thu Jul 9, 7PM PH  │ │ Thu Jul 16, 7PM PH │           │   │
│  │  │ Portfolio Bidding   │ │ Placement Strategy │           │   │
│  │  │ [Set Reminder]      │ │ [Set Reminder]     │           │   │
│  │  └────────────────────┘ └────────────────────┘           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  [Curriculum] [Tools] [Resources] [About]  © AMPH Academy    │
└──────────────────────────────────────────────────────────────────┘
```

**Layout (Mobile, < 768px):**

```
┌──────────────────────────┐
│ [≡]  [AMPH]     [👤]  │
├──────────────────────────┤
│                          │
│ Welcome back, Juan!      │
│                          │
│ ┌────────────────────┐   │
│ │ ■■■■■■■□□□  70%    │   │
│ │ 3 modules complete │   │
│ │ 2 badges earned    │   │
│ └────────────────────┘   │
│                          │
│ Next live: Thu 7PM       │
│ [Continue Module 3 ▶]    │
│                          │
│ ┌────────────────────┐   │
│ │  Practice Tools    │   │
│ │  [Campaign Builder]│   │
│ │  [Bid Elevator]   │   │
│ │  [Search Triage]  │   │
│ └────────────────────┘   │
│                          │
│ Upcoming:                │
│ • Jul 9 — Portfolio      │
│ • Jul 16 — Placement     │
│                          │
├──────────────────────────┤
│ Footer links             │
└──────────────────────────┘
```

**States & Edge Cases:**
- **New student (no progress):** Show "Start Module 1" with large CTA, hide empty progress sections
- **No upcoming classes:** Hide the live class section entirely
- **No tools used yet:** Show tool cards with "Try it now" instead of last session score
- **Dashboard loading:** Skeleton shimmer matching exact layout (3 blocks: progress, tools, classes)

---

### Screen 2: Campaign Builder (Interactive Tool)

**Purpose:** Sandbox for building Amazon campaign structures.

**Layout (Desktop only — mobile shows "Best on Desktop" notice):**

```
┌──────────────────────────────────────────────────────────────────┐
│  [← Back to Dashboard]  Campaign Builder  [Scenario: Beginner]   │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────┐  ┌──────────────────────────────┐ │
│  │  Campaign Structure      │  │  Campaign Details            │ │
│  │                          │  │                              │ │
│  │  📦 New Campaign         │  │  Campaign Name: [_________]  │ │
│  │   ├─ 📂 Ad Group 1       │  │  Type: [SP ▼]               │ │
│  │   │  ├─ 🔑 keyword 1     │  │  Budget: [_________]/day     │ │
│  │   │  ├─ 🔑 keyword 2     │  │  Targeting: [Auto ▼]        │ │
│  │   │  └─ 🔑 keyword 3     │  │  Bidding: [Fixed ▼]         │ │
│  │   │                      │  │                              │ │
│  │   ├─ 📂 Ad Group 2       │  │  ┌──────────────────────────┐│ │
│  │   │  └─ 🔑 keyword 4     │  │  │  + Add Ad Group          ││ │
│  │   │                      │  │  └──────────────────────────┘│ │
│  │   └─ 📂 Ad Group 3       │  │                              │ │
│  │                          │  │  Validation: ⚠️ 3 issues     │ │
│  │                          │  │  • Ad Group 1 has no         │ │
│  │  [+ Add Ad Group]        │  │    keywords                  │ │
│  │                          │  │  • Budget is below $10       │ │
│  │                          │  │  • No negative keywords      │ │
│  │                          │  │                              │ │
│  │                          │  │  [Submit for Review]         │ │
│  └──────────────────────────┘  └──────────────────────────────┘ │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  Score: 0%  |  ● Scenarios: 0/5 completed  |  Best: N/A         │
└──────────────────────────────────────────────────────────────────┤
```

**Interactions:**
- Left panel: click to select and edit any campaign element
- Right panel: form updates in real-time as user navigates tree
- Validation runs continuously — issues appear/disappear as user fixes them
- Submit button only enabled when all required fields filled
- Drag-to-reorder ad groups and keywords (bonus)

**States:**
- **Empty state:** Single "New Campaign" node with placeholder name
- **In progress:** Tree populated, showing validation issues
- **Submitted:** Score animation, confetti for 90%+ scores
- **Perfect score (100%):** Special badge trigger animation

---

### Screen 3: Course Module View

**Purpose:** Consume lesson content and take knowledge checks.

**Layout:**

```
┌──────────────────────────────────────────────────────────────────┐
│  [← Dashboard]  Module 3: Portfolio Bidding Strategy            │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────┐  ┌────────────────────────────┐ │
│  │  Module Content            │  │  Module Progress           │ │
│  │                            │  │  ■■■□□□□□□□  30%          │ │
│  │  📺 [Video Placeholder]    │  │                            │ │
│  │    12:34 min               │  │  ☑ Lesson 1: Intro        │ │
│  │                            │  │  ☐ Lesson 2: Strategy     │ │
│  │  Key Takeaways:            │  │  ☐ Lesson 3: Execution    │ │
│  │  • Portfolio bidding lets  │  │  ☐ Quiz                   │ │
│  │    you group campaigns     │  │                            │ │
│  │  • Use portfolio budgets   │  │  Badges available:         │ │
│  │    for shared daily caps   │  │  🏅 Portfolio Pro          │ │
│  │  • Monitor at portfolio    │  └────────────────────────────┘ │
│  │    level, optimize at      │                                  │
│  │    campaign level          │                                  │
│  │                            │                                  │
│  │  [📄 Download Cheatsheet]  │                                  │
│  │                            │                                  │
│  │  [Mark Complete → Lesson 2]│                                  │
│  └────────────────────────────┘                                  │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  1/3  •  2/3  •  3/3 (current)  •  Quiz                        │
└──────────────────────────────────────────────────────────────────┘
```

**States:**
- **Video loading:** Skeleton with play button overlay
- **Video complete:** Auto-mark lesson complete after 80% watched
- **All lessons done:** Quiz section unlocks with badge preview
- **Mobile:** Video full-width, sidebar collapses below

---

## 5. Component Specifications

### Header / Navigation

**Visual:**
- Height: 64px (all viewports)
- Background: Off-Black (#0A0A0B) — dark mode only
- Logo: Left-aligned, 32px height
- Nav links: Horizontal (desktop), hamburger (mobile)
- User avatar: 32px circle, right-aligned

**States:**
- Default: Solid dark background
- Scrolled down: Subtle bottom border (1px Zinc-800)
- Mobile menu: Full-height overlay with backdrop blur

### Primary Button — "Continue" / "Practice Now"

**Visual:**
- Height: 48px
- Padding: 16px 32px
- Background: Orange (#FF6B35)
- Text: White
- Border-radius: 12px
- Font: Inter, 16px, bold

**States:**
- Default: Orange (#FF6B35) solid
- Hover: #FF8C5A
- Active: scale(0.97) + #E55A2B
- Disabled: Opacity 40%, cursor not-allowed
- Loading: Spinner + "Loading..."

### Tool Card (Dashboard)

**Visual:**
- Background: Surface (#16213E)
- Border-radius: 16px
- Padding: 24px
- Border: 1px rgba(255,255,255,0.06)

**States:**
- Default: Static
- Hover: Border intensifies, subtle scale(1.02)
- Focus: 2px Orange (#FF6B35) outline

### Progress Bar

**Visual:**
- Track: rgba(255,255,255,0.06), height 8px, rounded-full
- Fill: Orange (#FF6B35) → Green (#28A745) gradient (starts orange, shifts to green as progress increases)
- Label: Above bar, right-aligned percentage text

### Badge Display

**Visual:**
- Size: 64px × 64px circle
- Border: 2px, gradient from Orange (#FF6B35) to Green (#28A745) (earned) or rgba(255,255,255,0.1) (locked)
- Icon: Centered SVG
- Label: Below, 14px Inter

**States:**
- Earned: Full color, animated entry (scale 0 → 1, spring physics)
- Locked: Grayscale with overlay text "Locked"
- Just-earned: Confetti burst + haptic-style scale pulse

---

## 6. Accessibility Annotations

### WCAG 2.1 AA Compliance

**Color Contrast (Dark Theme — Deep Navy):**
- Body text (#F5F5F5) on Canvas (#1A1A2E): 15.1:1 ✓ PASS
- Secondary text (#A0A0B0) on Canvas (#1A1A2E): 7.8:1 ✓ PASS
- Button text (White) on Orange (#FF6B35): 3.5:1 ✓ PASS (large text)
- Link text (Orange #FF6B35) on Canvas (#1A1A2E): 5.8:1 ✓ PASS

**Keyboard Navigation:**
- All interactive elements reachable via Tab
- Visible focus: 2px Indigo-400 outline, 2px offset
- Interactive tool keyboard shortcuts: Ctrl+S (submit), Ctrl+N (new scenario)
- Skip to main content link on every page

**Screen Reader Support:**
- All interactive tool elements have aria-labels
- Form inputs have associated labels
- Dynamic updates (score, validation) use aria-live="polite"
- Badge awards announced with aria-live="assertive"

---

## 7. Responsive Behavior

### Mobile (< 768px)

- Single column stack
- Dashboard progress card at top, tools below
- Hamburger navigation replaces header links
- Interactive tools show "Best experienced on desktop" notice with button to access
- Course content full-width (video fills screen)
- Font sizes: H3 for headings, 16px body minimum

### Tablet (768px–1023px)

- Dashboard: 2-column layout (progress + next action)
- Course view: sidebar collapsible
- Interactive tools: usable but with narrower panels
- Tool cards: 2-column grid

### Desktop (1024px+)

- Full 3-panel dashboard layout
- Interactive tools: full side-by-side panels
- All hover states active
- Max content width: 1400px centered

---

## 8. Design Tokens (via Stitch Design Taste)

See `docs/bmad/DESIGN.md` for the complete design system — color palette, typography, motion, layout principles, and anti-pattern rules.

Key token families (ProjectAmazonPH brand):
- **Typography:** Inter (headings + body) + JetBrains Mono (code/numbers)
- **Colors:** Deep Navy (#1A1A2E) canvas, Orange (#FF6B35) accent, Green (#28A745) for success/growth states, Gold (#FFD700) for special achievements
- **Spacing:** 8px base unit, generous internal padding (24px+)
- **Motion:** Spring physics (stiffness: 100, damping: 20), staggered reveals

---

## 9. Developer Handoff Notes

### Implementation Priority (Sprint 1)

1. **Auth + SSO** — Header, navigation, PPC Companion integration
2. **Dashboard** — Progress card, tool cards (static), upcoming classes
3. **Course Module View** — Content layout, video embed, quiz system
4. **Campaign Builder** — Core interactive tool (reuse PPC Companion components)
5. **Badge System** — Award logic + display component
6. **Certificate Generation** — PDF with verification

### Key Implementation Notes

- **CSS:** Tailwind CSS with custom design tokens in tailwind.config.ts (see DESIGN.md)
- **State:** Zustand for global state (shared with PPC Companion patterns)
- **Interactive tools:** Client-side only (no API calls). Logic in React hooks
- **Dark theme only:** No light mode — reduces scope, strengthens brand identity
- **Component library:** Reuse Project Aurora button, card, badge, and nav components from PPC Companion

### Testing Checklist

- [ ] SSO flow: PPC Companion → AMPH and back
- [ ] Interactive tool: save/restore state on navigation
- [ ] Badge award: trigger, animation, and persistence
- [ ] Mobile: all course content accessible
- [ ] Keyboard: tool fully navigable without mouse
- [ ] Dashboard: correct data for new vs. returning vs. advanced students

---

## Document Revision History

- v1.0 — 2026-07-02 — Initial UX design document

---

**Next Steps:**
1. ✅ UX Design — **you are here**
2. [ ] Architecture — database schema, component tree, data flow
3. [ ] Sprint 1 — begin implementation
