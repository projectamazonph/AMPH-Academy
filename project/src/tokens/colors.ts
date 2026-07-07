/**
 * AMPH Academy Design Tokens — Colors
 * Extracted from globals.css @theme inline block
 * Usage: import { brand, semantic } from '@/tokens/colors'
 *
 * Design system: Project Aurora
 * Canvas: Deep Navy (#1A1A2E), Sky Blue accent (#007EFF), dark-only
 */

export const brand = {
  /** Deep Navy — page background */
  background: 'oklch(0.12 0.02 280)',
  /** Near-white with cool tint — default text */
  foreground: 'oklch(0.96 0.005 280)',
} as const;

export const surface = {
  /** Slightly lighter navy — cards, popovers */
  card: 'oklch(0.15 0.025 280)',
  cardForeground: 'oklch(0.96 0.005 280)',
  popover: 'oklch(0.15 0.025 280)',
  popoverForeground: 'oklch(0.96 0.005 280)',
  /** Lighter navy surface */
  secondary: 'oklch(0.22 0.03 280)',
  secondaryForeground: 'oklch(0.88 0.01 280)',
  /** Muted navy */
  muted: 'oklch(0.18 0.02 280)',
  mutedForeground: 'oklch(0.55 0.02 280)',
} as const;

export const action = {
  /** Sky Blue #007EFF — primary actions, links, focus rings */
  primary: 'oklch(0.65 0.2 245)',
  primaryForeground: 'oklch(0.98 0 0)',
  /** Sky Blue as subtle accent tint */
  accent: 'oklch(0.65 0.2 245 / 12%)',
  accentForeground: 'oklch(0.88 0.01 280)',
  /** Sky Blue focus ring */
  ring: 'oklch(0.65 0.2 245)',
} as const;

export const semantic = {
  /** Red for errors/destructive */
  destructive: 'oklch(0.7 0.19 22.216)',
  destructiveForeground: 'oklch(0.98 0 0)',
  /** Subtle border on navy */
  border: 'oklch(1 0 0 / 8%)',
  /** Input background */
  input: 'oklch(1 0 0 / 12%)',
} as const;

export const chart = {
  /** Sky Blue — primary metric */
  1: 'oklch(0.65 0.2 245)',
  /** Green — growth/success */
  2: 'oklch(0.55 0.15 160)',
  /** Blue — secondary data */
  3: 'oklch(0.6 0.12 280)',
  /** Amber — warnings */
  4: 'oklch(0.6 0.16 75)',
  /** Violet — special */
  5: 'oklch(0.55 0.18 300)',
} as const;

export const sidebar = {
  background: 'oklch(0.1 0.02 280)',
  foreground: 'oklch(0.88 0.01 280)',
  primary: 'oklch(0.65 0.2 245)',
  primaryForeground: 'oklch(0.98 0 0)',
  accent: 'oklch(0.65 0.2 245 / 10%)',
  accentForeground: 'oklch(0.88 0.01 280)',
  border: 'oklch(1 0 0 / 6%)',
  ring: 'oklch(0.65 0.2 245)',
} as const;

export const glass = {
  fill: 'oklch(1 0 0 / 6%)',
  border: 'oklch(1 0 0 / 10%)',
  highlight: 'oklch(1 0 0 / 40%)',
  shadow: '0 8px 32px oklch(0 0 0 / 12%), 0 1px 2px oklch(0 0 0 / 6%)',
} as const;

export const special = {
  /** Gold #FFD700 — achievements */
  gold: 'oklch(0.75 0.15 85)',
  /** Green #28A745 — success states */
  greenAccent: 'oklch(0.55 0.15 160)',
  /** Sky Blue glow for effects */
  skyGlow: 'oklch(0.65 0.2 245 / 20%)',
} as const;

export const radius = {
  sm: 'calc(0.75rem - 4px)',
  md: 'calc(0.75rem - 2px)',
  lg: '0.75rem',
  xl: 'calc(0.75rem + 4px)',
} as const;
