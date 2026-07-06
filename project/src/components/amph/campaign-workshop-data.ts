import type { MatchType } from '@/engine';

// ---------------------------------------------------------------------------
// Campaign type descriptions
// ---------------------------------------------------------------------------

export const campaignTypeDescriptions: Record<string, { label: string; desc: string }> = {
  'sponsored-products': {
    label: 'Sponsored Products',
    desc: 'Individual product ads that appear in search results and product pages. Best for promoting a single ASIN.',
  },
  'sponsored-brands': {
    label: 'Sponsored Brands',
    desc: 'Brand headline ads featuring a custom headline and multiple products. Requires brand registry.',
  },
  'sponsored-display': {
    label: 'Sponsored Display',
    desc: 'Audience-based ads that reach shoppers on and off Amazon. Good for retargeting.',
  },
};

export const targetingTypeDescriptions: Record<string, { label: string; desc: string }> = {
  manual: {
    label: 'Manual Targeting',
    desc: 'You choose which keywords trigger your ads. Full control over bids and match types.',
  },
  auto: {
    label: 'Auto Targeting',
    desc: 'Amazon automatically targets relevant searches. Less control but easier to set up. Limited keyword-level data.',
  },
};

export const bidStrategyDescriptions: Record<string, { label: string; desc: string }> = {
  'dynamic-up-down': {
    label: 'Dynamic Bids - Up and Down',
    desc: 'Amazon can raise or lower your bid based on conversion likelihood. Most aggressive optimization.',
  },
  'dynamic-up-only': {
    label: 'Dynamic Bids - Up Only',
    desc: 'Amazon can raise your bid for likely conversions but never lowers it. Safe with upside potential.',
  },
  legacy: {
    label: 'Legacy (Fixed Bids)',
    desc: 'Your bid stays exactly as set. No automatic adjustments. Less common in modern campaigns.',
  },
};

export const matchTypeLabels: Record<MatchType, string> = {
  broad: 'Broad',
  phrase: 'Phrase',
  exact: 'Exact',
};

// ---------------------------------------------------------------------------
// Relevance color helper
// ---------------------------------------------------------------------------

export function relevanceColor(score: number): string {
  if (score >= 0.7) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
  if (score >= 0.4) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
  return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
}

export function competitionColor(level: string): string {
  if (level === 'low') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
  if (level === 'medium') return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
  return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
}
