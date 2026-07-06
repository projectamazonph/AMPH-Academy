/**
 * AMPH Academy Design Tokens — Spacing
 * 4px base unit system
 * Usage: import { space } from '@/tokens/spacing'
 */

export const space = {
  0:  '0',
  px: '1px',
  0.5: '2px',
  1:  '4px',
  2:  '8px',
  3:  '12px',
  4:  '16px',
  5:  '20px',
  6:  '24px',
  8:  '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const;

/** Border radius tokens (referencing --radius: 0.75rem) */
export const radius = {
  none: '0',
  sm:  'calc(0.75rem - 4px)',
  md:  'calc(0.75rem - 2px)',
  lg:  '0.75rem',
  xl:  'calc(0.75rem + 4px)',
  full: '9999px',
} as const;
