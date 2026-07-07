# Design System: AMPH Academy

## 1. Visual Theme & Atmosphere

A bold, high-contrast learning platform for Filipino VAs leveling up to Amazon PPC specialists. Dark navy canvas (#1A1A2E) creates focus and premium positioning, with orange (#FF6B35) as the single energetic accent. The atmosphere is urgent yet empowering — clinical urgency meets aspirational growth. Motion is purposeful, not decorative.

---

## 2. Color Palette & Roles

### Core Brand Colors
- **Deep Navy** (#1A1A2E) — Primary background canvas. Oklch: `oklch(0.12 0.02 280)`
- **Primary Orange** (#FF6B35) — CTAs, active states, focus rings, brand moments. Oklch: `oklch(0.65 0.18 35)`
- **Warm Gray** (#F5F5F5) — Card backgrounds, light sections, content containers. Oklch: `oklch(0.96 0 0)`
- **Success Green** (#28A745) — Achievement states, positive metrics, completion indicators. Oklch: `oklch(0.55 0.15 160)`
- **Gold** (#FFD700) — Badge accents, premium highlights, milestone celebrations. Oklch: `oklch(0.75 0.15 85)`

### Semantic Tokens
- **Background** (`--background`): Deep Navy #1A1A2E — main canvas
- **Foreground** (`--foreground`): Near-white — primary text on dark
- **Card** (`--card`): Warm Gray #F5F5F5 — white card surfaces (CRITICAL)
- **Primary** (`--primary`): Orange #FF6B35 — CTAs and brand elements
- **Muted** (`--muted`): Light gray for secondary content
- **Border** (`--border`): Subtle gray dividers
- **Ring** (`--ring`): Orange focus indicator

### Chart & Data Colors
- Chart 1: Orange (#FF6B35) — primary metrics
- Chart 2: Green (#28A745) — growth/success
- Chart 3: Slate — secondary data
- Chart 4: Amber — warnings
- Chart 5: Violet — special indicators

---

## 3. Typography Rules

### Font Stack (BRAND STANDARD: Inter)
- **Display/Headings**: `Inter` weight 600-700, track-tight, controlled scale
- **Body**: `Inter` weight 400-500, relaxed leading (1.6), max 65ch per line
- **Mono**: `JetBrains Mono` — code, metrics, timestamps

### Font Loading
```tsx
// FROM:
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono }

// TO:
import { Inter, JetBrains_Mono }
```

### Scale
- Hero: 4xl-7xl (clamp-based)
- H1: 3xl, semibold, tracking-tight
- H2: 2xl, semibold, tracking-tight
- H3: xl, medium, tracking-tight
- Body: base-lg, relaxed leading
- Small: sm-xs for metadata

---

## 4. Component Stylings

### Buttons
- **Primary**: `bg-primary` (#FF6B35), white text, rounded-lg (8px), h-10-12px
- **Secondary/Ghost**: `border-border` outline, transparent bg
- **Hover**: `hover:bg-primary/90` for primary, `hover:bg-secondary` for ghost
- **Active**: Subtle scale or opacity shift
- **Focus**: Orange ring (2px offset)
- **NEVER**: Outer glow, neon shadows, gradient fills on buttons

### Cards (CRITICAL FIX)
- **Background**: Warm Gray #F5F5F5 (NOT transparent navy)
- **Border-radius**: 8-12px (matching --radius: 0.75rem)
- **Shadow**: Subtle, diffused — `shadow-sm` or custom whisper shadow
- **Border**: Optional subtle border
- **Current WRONG**: `bg-card/50` (50% opacity transparent)
- **Correct**: Solid white `bg-card` with warm gray text

### Inputs
- Label above input
- Rounded-md (6px)
- Focus ring in orange
- Error states in red with clear messaging

### Badges
- Rounded-full (pill shape)
- Small text (xs)
- Subtle background tints
- Orange for primary/active states

### Loading States
- Skeletal shimmer matching layout dimensions
- No generic circular spinners

---

## 5. Layout Principles

### Grid System
- Container max-width: 1280px centered
- Section padding: `py-24 md:py-32`
- Content padding: `px-4 lg:px-6`
- Grid gaps: 4-6 (gap-4 to gap-6)

### Responsive Strategy
- Mobile-first collapse below 768px
- All multi-column layouts → single column on mobile
- Typography scales via `clamp()`
- No horizontal overflow ever

### Section Structure
- Hero: Full viewport, centered content, gradient backgrounds
- Content sections: Alternating backgrounds (subtle gradients or solid)
- Cards: Grid layouts (1-col mobile, 2-3 cols desktop)

---

## 6. Motion & Interaction

### Animation Philosophy
- Purposeful, not decorative
- Staggered reveals for lists (100ms delays)
- Fade + translate for section entries
- Spring physics: `ease: [0.25, 0.1, 0.25, 1]`
- Duration: 0.4-0.6s for most transitions

### Hover States
- Cards: Subtle background shift, border highlight
- Buttons: Background opacity change
- Links: Underline or color shift

### No Motion Anti-Patterns
- No bouncing arrows
- No pulsing scroll indicators
- No auto-playing carousels
- No excessive particle effects

---

## 7. Iconography

### Standard: Lucide Icons
- Line-style, 2px stroke weight
- Size: 4-6 (icon-4 to icon-6) for inline, 8-10 (icon-8 to icon-10) for standalone
- Color: Inherit or semantic color

### Usage Pattern
```tsx
import { Icon } from '@/components/icons'
<Icon name="lightning" className="h-5 w-5 text-primary" />
```

---

## 8. Pricing Display

### Tier Structure (Landing Page)
| Tier | Price | Positioning |
|------|-------|-------------|
| Foundations | ₱2,999/month | Entry, all core content |
| Accelerated | ₱5,999/month | **Most Popular** — highlighted |
| Ultimate | ₱9,999/month | Premium — coaching + placement |

### Display Format
- Price: Large bold text (text-3xl)
- Period: Smaller muted text after price
- Features: Bullet list with checkmark icons
- CTA: Full-width button at card bottom

---

## 9. Anti-Patterns (BANNED)

- **WRONG FONT**: Space Grotesk, Plus Jakarta Sans — must be Inter
- **WRONG CARD BG**: Transparent/translucent navy cards — must be white (#F5F5F5)
- **No Emojis** in UI text
- **No Pure Black** (#000000) — use charcoal or zinc
- **No Neon Glows** on buttons or cards
- **No AI Purple/Blue** aesthetic
- **No Generic Names**: "John Doe", "Acme Corp"
- **No 3-Column Equal Grids** — prefer asymmetric
- **No Centered Hero** (for variance > 4)
- **No Filler Metrics**: "99.9% uptime" without real data
- **No Inter Font** in premium/creative contexts (taste-design constraint — but BRAND requires Inter here)

---

## 10. Implementation Checklist

### Priority 1 (Critical)
- [ ] Replace Space Grotesk + Plus Jakarta Sans → Inter
- [ ] Fix cards: transparent → white background (#F5F5F5)
- [ ] Add Warm Gray to CSS tokens

### Priority 2 (Important)
- [ ] Update globals.css card definitions
- [ ] Verify all page sections use correct card component
- [ ] Update button focus rings to orange

### Priority 3 (Polish)
- [ ] Audit all text colors on white cards (need dark text)
- [ ] Ensure contrast ratios meet WCAG AA
- [ ] Test responsive card layouts
