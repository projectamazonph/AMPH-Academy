# Design System: AMPH Academy

> Premium Amazon PPC training platform for Filipino VAs — confident, authoritative, anti-generic.
>
> **Brand:** ProjectAmazonPH | **Voice:** Direct, encouraging, specific, bilingual Taglish
> **Tagline:** "From Zero to ₱80k+/Month"
> **Founder Authority:** 14yr VA + 8yr Amazon PPC specialist, ₱50M+ ad spend managed

---

## 1. Visual Theme & Atmosphere

A confident, high-agency interface built on **Deep Navy warmth and Orange energy**. The palette comes straight from ProjectAmazonPH — no borrowed startup gradients, no cold corporate blues. Think a premium command center at golden hour: calm authority (navy) with decisive action (orange).

**Density:** 5/10 (Daily App Balanced)
**Variance:** 7/10 (Offset Asymmetric — never centered Hero, zig-zag content sections)
**Motion:** 6/10 (Fluid spring — perpetual micro-interactions, no gratuitous animation)

The design communicates **trust and expertise** through generous negative space, warm-dark surfaces, and a single authoritative orange accent. Every pixel earns its place. No decoration for decoration's sake.

---

## 2. Color Palette & Roles

> Colors drawn from ProjectAmazonPH brand identity.

**Canvas** (#1A1A2E) — Primary background. Deep Navy, the brand's signature dark base. Warm, authoritative, never cold.

**Surface** (#16213E) — Card and container fill. Navy lifted one step above canvas for depth.

**Elevated Surface** (#0F3460) — Dropdowns, modals, selected states. Deeper navy with purpose.

**Border** (rgba(255, 255, 255, 0.06)) — Subtle structural dividers.

**Primary Text** (#F5F5F5) — Headlines, body copy. Warm White from the brand palette.

**Secondary Text** (#A0A0B0) — Descriptions, metadata, timestamps. Muted for hierarchy.

**Muted Text** (#6B6B80) — Placeholder text, disabled labels.

**Accent — Orange** (#FF6B35) — SINGLE accent color. CTAs, active states, progress indicators, focus rings. Warm, energetic, authoritative. No purple. No neon.

**Accent Hover** (#FF8C5A) — Lighter orange for hover states.

**Success — Green** (#28A745) — Completion, earned badges, positive metrics. From brand palette.

**Error — Red** (#DC3545) — Error states, destructive actions. From brand palette.

**Gold — accent secondary** (#FFD700) — Reserved for special achievements, milestone badges, top-tier content.

---

### Banned Colors

- Pure Black (`#000000`) — NEVER
- Purple or Violet tones — BANNED
- Blue neon / electric blue — BANNED
- Oversaturated reds — BANNED
- Gradient backgrounds on large surfaces — BANNED
- Warm/cool gray fluctuation — stick to Deep Navy family

---

## 3. Typography Rules

### Font Stack

> Brand standard: Inter system. Clean, readable, professional — the same typeface used across ProjectAmazonPH.

- **Display / Headlines:** `Inter` — Weight-driven hierarchy (Bold 700 for H1, SemiBold 600 for H2, Medium 500 for H3). Track-tight (-0.02em). Never size-driven chaos.
- **Body:** `Inter` — 400 weight, relaxed leading (1.6). Max 65 characters per line.
- **Mono:** `JetBrains Mono` — For code, bid values, percentages, metrics, timestamps. All high-density data uses Mono.

**Scale (Desktop):**
- H1: 40px Inter Bold, -0.02em tracking
- H2: 32px Inter SemiBold, -0.015em tracking
- H3: 24px Inter Medium, -0.01em tracking
- H4: 20px Inter Medium, normal tracking
- Body: 16px Inter Regular, 1.6 line-height
- Small: 14px Inter Regular, 1.5 line-height
- Mono: 14px JetBrains Mono, 1.5 line-height
- CTA: 16px Inter Bold

**Scale (Mobile):**
- H1: 28px
- H2: 24px
- H3: 20px
- Body: 16px (minimum — prevents iOS zoom)

### Banned Typography

- Serif fonts (`Times New Roman`, `Georgia`, `Garamond`, `Palatino`) — BANNED in all contexts
- System UI font stacks for premium surfaces — BANNED
- ALL CAPS headlines — BANNED
- Letter-spacing above 0.05em — BANNED

---

## 4. Component Stylings

### Buttons

**Primary Button:**
- Shape: Pill-shaped (rounded-full, 9999px radius)
- Height: 48px
- Padding: 20px 32px
- Background: Orange (#FF6B35)
- Text: White, Inter Bold 16px
- Hover: Orange Hover (#FF8C5A), translateY(-1px) spring
- Active: scale(0.97), deepen orange (#E55A2B)
- Disabled: Opacity 35%, cursor not-allowed
- No outer glow. No neon. No custom cursor.
- Loading: Centered spinner (SVG), text hidden during load

**Secondary Button:**
- Ghost background
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Text: Warm White (#F5F5F5)
- Hover: Surface (#16213E) background shift
- Same height/padding as primary

**Tertiary Button (Text Link):**
- No background, no border
- Text: Orange (#FF6B35)
- Hover: Orange Hover (#FF8C5A), underline

### Cards

- Border-radius: 16px (rounded-2xl)
- Background: Surface (#16213E)
- Border: 1px solid Border (rgba(255,255,255,0.06))
- Padding: 24px
- No shadow — depth is communicated through color in dark theme
- Hover: Border intensifies, subtle scale(1.02)
- Used ONLY when elevation communicates hierarchy
- **High-density contexts:** Replace cards with border-top dividers (1px rgba(255,255,255,0.06)) and negative space

### Inputs / Forms

- Height: 48px
- Background: Surface (#16213E)
- Border: 1px solid rgba(255, 255, 255, 0.1)
- Border-radius: 12px
- Padding: 14px 16px
- Font: 16px Inter Regular (prevents iOS zoom)
- Label: Above input, 14px Inter SemiBold, Primary Text (#F5F5F5)
- Focus: Border shifts to Orange (#FF6B35), ring 2px rgba(255, 107, 53, 0.2)
- Error: Border shifts to Red (#DC3545), ring 2px rgba(220, 53, 69, 0.2)
- Placeholder: Muted Text (#6B6B80)
- No floating labels. Label always above input.
- Helper text: Below input, 13px, Secondary Text (#A0A0B0)
- Error text: Below input, 13px, Red (#DC3545)

### Badges

- Size: 72px × 72px (earned) / 56px × 56px (compact inline)
- Shape: Circle
- Border: 2px gradient (Indigo-400 → Emerald-400) for earned; Zinc-700 for locked
- Earned: Full color fill, animated spring entry
- Locked: Grayscale, "🔒" overlay icon, 50% opacity
- Just-earned: Brief scale-pulse animation (1 → 1.1 → 1, spring)
- Tooltip on hover showing unlock criteria for locked badges

### Loading States

- **Skeletal loaders** matching exact layout dimensions and border-radius — never circular spinners
- Shimmer animation: gradient sweep left to right over Zinc-800 base
- **Content sections:** Individual skeleton blocks per content area
- **Interactive tools:** Skeleton of the tool panel layout before tool loads
- **Page transitions:** Content fades in (300ms spring), no spinner

### Empty States

- Composed illustration or icon (no broken image placeholders)
- Heading: "Nothing here yet" or contextual message
- Description: How to populate this section
- CTA: Primary action to fill the empty state
- Example: Empty dashboard for new student → "Start Module 1 to see your progress here"

### Error States

- **Inline errors:** Below the field, Rose-400 text, error icon (SVG)
- **Page-level errors:** Center-aligned card, icon + heading + description + retry button
- **API errors:** Toast notification top-right, auto-dismiss 6 seconds
- Never use full-page error screens for recoverable errors

---

## 5. Layout Principles

- **CSS Grid first.** Never flexbox percentage math or `calc()` for layout.
- **Max-width containment:** 1400px centered for desktop content.
- **Full-height sections:** Use `min-h-[100dvh]` — never `h-screen` (iOS Safari catastrophic jump).
- **Generous internal whitespace:** Cards 24px padding minimum. Section gaps clamp(3rem, 8vw, 6rem).
- **Single-column collapse below 768px.** No exceptions for multi-column.
- **No overlapping elements.** Every element occupies its own clear spatial zone. No absolute-positioned content stacking.
- **Centered Hero sections:** BANNED. Use Left-Aligned, Split Screen, or Asymmetric Whitespace.
- **Generic "3 equal cards horizontally":** BANNED. Use 2-column zig-zag, asymmetric grid, or horizontal scroll.
- **No horizontal overflow on mobile.** Critical failure if any content scrolls sideways.

### Page Templates

**Dashboard:**
```
┌─────────────────────────────────────────────┐
│  Header — 64px fixed                         │
├─────────────────────────────────────────────┤
│  Welcome Card (2/3 width)  |  Progress (1/3) │
│  ─────────────────────────────────────────── │
│  Tool Cards — asymmetric grid                │
│  ┌────────┐  ┌──────────┐  ┌──────────┐    │
│  │Builder │  │ Elevator │  │  Triage  │    │
│  │ (wide) │  │ (narrow) │  │ (narrow) │    │
│  └────────┘  └──────────┘  └──────────┘    │
│  ─────────────────────────────────────────── │
│  Live Classes — horizontal scroll            │
│  ┌─────┐  ┌─────┐  ┌─────┐                  │
│  │Card │  │Card │  │Card │                  │
│  └─────┘  └─────┘  └─────┘                  │
├─────────────────────────────────────────────┤
│  Footer                                      │
└─────────────────────────────────────────────┘
```

**Course View:**
```
┌─────────────────────────────────────────────┐
│  Header                                      │
├─────────────────────────────────────────────┤
│  ┌───────────────────┐  ┌───────────────┐   │
│  │  Content (2/3)    │  │  Sidebar (1/3)│   │
│  │                   │  │               │   │
│  │  Video            │  │  Progress      │   │
│  │  Takeaways        │  │  Lessons       │   │
│  │  Resources        │  │  Badge preview │   │
│  └───────────────────┘  └───────────────┘   │
├─────────────────────────────────────────────┤
│  Module pagination / quiz entry              │
└─────────────────────────────────────────────┘
```

---

## 6. Motion & Interaction

### Spring Physics (Default)

```
stiffness: 100, damping: 20
```

- All interactive transitions use spring physics. No linear easing. No CSS ease-in-out on interactive elements.
- Button press: scale(0.97) spring
- Card hover: scale(1.02) spring
- Modal entry: scale(0.95 → 1) + opacity(0 → 1), spring 200ms
- Page transitions: fade + translateY(8px → 0), 300ms

### Staggered Orchestration

- Lists never mount instantly. Use cascade delays (50ms stagger per item) for waterfall reveals.
- Dashboard sections load in priority order: Progress → Tools → Classes (not all at once)

### Perpetual Micro-Interactions

- **Progress bar fill:** Animated on load (width animates from 0 to target, spring)
- **Badge collection:** Gentle float animation on earned badges (translateY: ±2px, 3s loop)
- **Tool score display:** Count-up animation on score reveal (0 → 85, spring)
- **Live class countdown:** Minute-by-minute update with subtle pulse when < 1 hour away
- **Header:** Subtle border-bottom fade-in on scroll (opacity 0 → 1, 200ms)

### Performance Rules

- Animate exclusively via `transform` and `opacity`. Never animate `top`, `left`, `width`, `height`.
- Grain/noise filter effects: Fixed pseudo-elements only (::before/::after), never on animated containers.
- CPU-heavy animations in isolated Client Components (Next.js).
- `will-change: transform` on elements that animate continuously (badge float).

---

## 7. Anti-Patterns (Banned)

These are **AI tells** that make interfaces feel generic, templated, or amateur. They are explicitly forbidden in every screen.

- **No emojis anywhere** — Not in buttons, not in headings, not in empty states. Use SVG icons only.
- **No generic serif fonts** — `Times New Roman`, `Georgia`, `Garamond`, `Palatino` all banned.
- **No pure black (`#000000`)** — Use Deep Navy (#1A1A2E) or Surface (#16213E) instead.
- **No neon/outer glow shadows** — Not on buttons, not on cards, not anywhere.
- **No oversaturated accents** — Orange (#FF6B35) at ~75% saturation is the ceiling. No hot pink, no lime green.
- **No gradient text on large headers** — Single solid color for readability.
- **No custom mouse cursors** — Default cursor everywhere except interactive tool drag areas.
- **No overlapping elements** — Clean spatial separation always.
- **No 3-column equal card layouts** — Use asymmetric grids, zig-zag, or horizontal scroll.
- **No generic placeholder names** — Not "John Doe", not "Acme Corp", not "Nexus".
- **No fake round numbers** — Not "99.99%", not "50% improvement". Use realistic data or N/A.
- **No AI copywriting clichés** — "Elevate", "Seamless", "Unleash", "Next-Gen", "Revolutionize", "Supercharge" — all banned.
- **No filler UI text** — "Scroll to explore", "Swipe down", scroll arrows, bouncing chevrons — all banned.
- **No broken image links** — Use SVG placeholders of the same dimensions, never `picsum.photos` with random seeds.
- **No centered Hero sections** — Left-aligned or split-screen only (variance > 4).
- **No "Learn More" secondary buttons** — A primary CTA, or no CTA at all.
- **No circular loading spinners** — Skeletal loaders matching layout dimensions only.
- **No floating labels in forms** — Label above input always.

---

## 8. Assets & Iconography

- **Icons:** Phosphor Icons (light weight) — consistent stroke width, no filled/outline mixing.
- **Logos:** SVG format only. AMPH wordmark in Satoshi Bold.
- **Images:** WebP format preferred. Aspect ratios maintained with `object-fit`.
- **Avatars:** SVG initials placeholder (white text on Indigo-500 circle, 32px–48px). No generic user icons.

---

## 9. Design System Summary

| Category | Choice | Rationale |
|----------|--------|-----------|
| Theme | Dark only (Deep Navy) | Saves dev time, brand-aligned, better for evening learners |
| Accent | Orange (#FF6B35) | Warm authority — ProjectAmazonPH brand color |
| Headings | Inter Bold/SemiBold | Brand standard, clean, professional |
| Body | Inter Regular | Brand consistency across all platforms |
| Grid | CSS Grid | Modern, predictable, no percentage hacks |
| Motion | Spring physics | Weighty, premium feel, not robotic |
| Cards | 16px radius | Modern, soft, not aggressive |
| Forms | Label above | Accessible, predictable, no float animation |
| Loading | Skeletal | Contextual, less jarring than spinners |

---

*Generated for Google Stitch · Design Taste System v1.0 · 2026-07-02*
