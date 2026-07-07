# Brand Guidelines — ProjectAMPH Academy

## Parent Brand

**ProjectAmazonPH** — "Learn • Earn • Empower"

## App Identity

ProjectAMPH Academy is the flagship learning platform under ProjectAmazonPH.
Built for Filipino VAs who want to break the ₱15k ceiling and bill ₱60k–₱80k/month
as Amazon PPC specialists.

## Logo

Primary mark: **Concept 2** — Bold "A" letterform with three ascending sky blue bars
(inner bar chart motif) + Amazon smile arrow underneath.
Source: `/public/icons/icon-og.png`

Umbrella ProjectAmazonPH brand mark (shared across all apps): Concept 2 on dark navy.
Source: `/public/icons/icon-og.png`

## Colors

| Token | Hex | Usage |
|---|---|---|
| Primary | `#007EFF` | CTAs, active states, accents, links |
| Background | `#1A1A2E` | Deep Navy canvas |
| Card | `#F5F5F5` | White card surfaces (dark mode) |
| Gold | `#FFD700` | Achievement badges, milestones |
| Green | `#28A745` | Success states, correct answers |

See `src/app/globals.css` for full design token system.

## Typography

- **Headings / Body:** Inter (Google Fonts) — `--font-inter`
- **Code / Mono:** JetBrains Mono — `--font-mono`

## Icon System

Phosphor Icons (named imports from `@phosphor-icons/react`).
Fallback if icons fail to resolve: namespace import `import * as Phosphor from '@phosphor-icons/react'`
and access as `Phosphor.IconName`.

## Motion

- Achievement pulse: gold glow animation on milestone completion
- Progress bars: sky blue gradient slide-in
- Cards: glass morphism with backdrop blur
- Noise overlay: subtle grain texture for depth

## Favicon & App Icons

| File | Use |
|---|---|
| `/public/icons/icon-32.png` | Browser tab favicon |
| `/public/icons/icon-180.png` | Apple Touch / iOS home screen |
| `/public/icons/icon-192.png` | PWA manifest |
| `/public/icons/icon-512.png` | PWA manifest high-res |
| `/public/icons/icon-og.png` | OG social share image (1200×630) |

## Metadata

- **Site name:** ProjectAMPH Academy
- **Author:** Ryan Dabao — ProjectAmazonPH
- **Canonical:** https://amph-academy.vercel.app
- **OG image:** `/public/og/amph-og.png` (1200×630 composed — navy + sky blue icon + tagline)
