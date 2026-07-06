/**
 * AMPH Academy Design Tokens — Typography
 * Font stack per PRD spec: Space Grotesk (headings), Plus Jakarta Sans (body), JetBrains Mono (code)
 * Usage: import { font } from '@/tokens/typography'
 *
 * Note: In globals.css @theme block:
 *   --font-sans  → mapped to Space Grotesk
 *   --font-mono  → mapped to JetBrains Mono
 *   --font-body  → Plus Jakarta Sans (custom, used for body copy)
 *
 * Heading hierarchy in globals.css:
 *   h1: text-3xl font-semibold tracking-tight
 *   h2: text-2xl font-semibold tracking-tight
 *   h3: text-xl  font-medium tracking-tight
 *   h4: text-lg  font-medium
 */

export const font = {
  /** Space Grotesk — headings and display text */
  heading: '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',

  /** Plus Jakarta Sans — body copy and UI text */
  body: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',

  /** JetBrains Mono — code, bids, data values */
  mono: '"JetBrains Mono", ui-monospace, monospace',
} as const;

export const headingStyles = {
  h1: 'text-3xl font-semibold tracking-tight',
  h2: 'text-2xl font-semibold tracking-tight',
  h3: 'text-xl font-medium tracking-tight',
  h4: 'text-lg font-medium',
} as const;

export const fontFeatures = {
  /** OpenType features for improved readability */
  body: '"cv02", "cv03", "cv04", "cv11"',
} as const;
