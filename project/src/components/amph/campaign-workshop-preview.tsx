'use client';

import { useMemo } from 'react';
import { Icon } from '@/components/icons';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCampaignBuilderStore } from '@/stores/campaign-builder-store';
import { cn } from '@/lib/utils';
import {
  campaignTypeDescriptions,
  targetingTypeDescriptions,
} from './campaign-workshop-data';

export function PreviewBar() {
  const { campaign, positiveKeywords, negativeKeywords, submitCampaign } = useCampaignBuilderStore();

  const previewScore = useMemo(() => {
    let score = 0;
    if (campaign.name) score += 20;
    if (campaign.type) score += 10;
    if (campaign.targetingType) score += 10;
    if (campaign.bidStrategy) score += 10;
    if (campaign.dailyBudget >= 5) score += 15;
    if (campaign.defaultBid > 0) score += 10;
    if (positiveKeywords.length > 0) score += 15;
    if (negativeKeywords.length > 0) score += 10;
    return Math.min(100, score);
  }, [campaign, positiveKeywords, negativeKeywords]);

  const canSubmit = previewScore >= 50;
  const validationErrors: string[] = [];
  const validationWarnings: string[] = [];

  if (!campaign.name.trim()) validationErrors.push('Campaign name is required');
  if (campaign.dailyBudget < 5) validationErrors.push('Daily budget must be at least $5');
  if (positiveKeywords.length === 0) validationErrors.push('Add at least one keyword');
  if (campaign.defaultBid <= 0) validationWarnings.push('Default bid is $0 — consider setting a bid');

  const totalKeywords = campaign.keywords.length;

  return (
    <Card className="border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 via-card to-teal-400/3">
      <CardContent className="py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Preview Score */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Icon name="trophy" className="h-4 w-4 text-emerald-400" />
              <span className="text-xs text-muted-foreground">Preview</span>
              <span className="text-xl font-bold font-mono text-emerald-400">
                {previewScore}
              </span>
              <span className="text-xs text-muted-foreground">/ 100</span>
            </div>
          </div>

          {/* Campaign summary chips */}
          <div className="flex flex-wrap items-center gap-2 flex-1">
            <Badge variant="outline" className="text-[10px] bg-emerald-500/5 text-emerald-400 border-emerald-500/20">
              {campaignTypeDescriptions[campaign.type]?.label}
            </Badge>
            <Badge variant="outline" className="text-[10px] bg-teal-500/5 text-teal-400 border-teal-500/20">
              {targetingTypeDescriptions[campaign.targetingType]?.label}
            </Badge>
            <Badge variant="outline" className="text-[10px] bg-muted/30 text-muted-foreground border-border">
              ${campaign.dailyBudget.toFixed(2)}/day
            </Badge>
            <Badge variant="outline" className="text-[10px] bg-muted/30 text-muted-foreground border-border">
              {positiveKeywords.length} kw · {negativeKeywords.length} neg
            </Badge>
          </div>

          {/* Submit */}
          <Button
            size="lg"
            className={cn(
              'gap-2 font-semibold min-w-[180px]',
              canSubmit
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            )}
            disabled={!canSubmit}
            onClick={submitCampaign}
          >
            Submit Campaign
            <Icon name="caret-right" className="h-4 w-4" />
          </Button>
        </div>

        {/* Validation errors */}
        {validationErrors.length > 0 && (
          <div className="mt-3 space-y-1">
            {validationErrors.map((err, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs text-rose-400"
              >
                <Icon name="warning" className="h-3 w-3 shrink-0" />
                <span>{err}</span>
              </div>
            ))}
          </div>
        )}

        {/* Validation warnings */}
        {validationWarnings.length > 0 && (
          <div className="mt-2 space-y-1">
            {validationWarnings.map((warn, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs text-amber-400"
              >
                <Icon name="warning" className="h-3 w-3 shrink-0" />
                <span>{warn}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
