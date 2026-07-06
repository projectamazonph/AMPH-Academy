'use client';

import { Icon } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCampaignBuilderStore } from '@/stores/campaign-builder-store';
import {
  campaignTypeDescriptions,
  targetingTypeDescriptions,
  bidStrategyDescriptions,
} from './campaign-workshop-data';
import type { CampaignType, TargetingType, BidStrategy } from '@/engine';

export function CampaignSettingsCard() {
  const {
    campaign,
    setCampaignField,
  } = useCampaignBuilderStore();

  return (
    <Card className="border-emerald-500/15">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Icon name="layout" className="h-4 w-4 text-emerald-400" />
          Campaign Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Campaign Name */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium">Campaign Name</Label>
          <Input
            placeholder="e.g., SP - Garlic Press - Exact"
            value={campaign.name}
            onChange={(e) => setCampaignField('name', e.target.value)}
            className="h-9 text-sm"
          />
        </div>

        {/* Campaign Type */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium">Campaign Type</Label>
          <Select
            value={campaign.type}
            onValueChange={(v) => setCampaignField('type', v as CampaignType)}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(campaignTypeDescriptions).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[11px] text-muted-foreground leading-snug">
            {campaignTypeDescriptions[campaign.type].desc}
          </p>
        </div>

        {/* Targeting Type */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium">Targeting Type</Label>
          <Select
            value={campaign.targetingType}
            onValueChange={(v) => setCampaignField('targetingType', v as TargetingType)}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(targetingTypeDescriptions).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[11px] text-muted-foreground leading-snug">
            {targetingTypeDescriptions[campaign.targetingType].desc}
          </p>
        </div>

        {/* Bid Strategy */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium">Bid Strategy</Label>
          <Select
            value={campaign.bidStrategy}
            onValueChange={(v) => setCampaignField('bidStrategy', v as BidStrategy)}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(bidStrategyDescriptions).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[11px] text-muted-foreground leading-snug">
            {bidStrategyDescriptions[campaign.bidStrategy].desc}
          </p>
        </div>

        <Separator />

        {/* Daily Budget */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium">Daily Budget</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
            <Input
              type="number"
              min={5}
              max={1000}
              step={1}
              value={campaign.dailyBudget}
              onChange={(e) => setCampaignField('dailyBudget', parseFloat(e.target.value) || 0)}
              className="h-9 text-sm pl-7 font-mono"
            />
          </div>
          <p className="text-[11px] text-muted-foreground">Min $5 · Max $1,000 per day</p>
        </div>

        {/* Default Bid */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium">Default Bid</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
            <Input
              type="number"
              min={0.01}
              max={50}
              step={0.05}
              value={campaign.defaultBid}
              onChange={(e) => setCampaignField('defaultBid', parseFloat(e.target.value) || 0)}
              className="h-9 text-sm pl-7 font-mono"
            />
          </div>
          <p className="text-[11px] text-muted-foreground">
            Applied to keywords without explicit bids
          </p>
        </div>

        {/* Ad Group Name */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium">
            Ad Group Name <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            placeholder="e.g., Exact Match - Core"
            value={campaign.adGroupName ?? ''}
            onChange={(e) => setCampaignField('adGroupName', e.target.value)}
            className="h-9 text-sm"
          />
        </div>

        <Separator />

        {/* Product ASINs */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium">Product ASINs</Label>
          <div className="flex flex-wrap gap-1.5">
            {campaign.asins.map((asin) => (
              <Badge
                key={asin}
                variant="outline"
                className="text-[11px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20 gap-1"
              >
                {asin}
              </Badge>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Pre-selected product for this campaign
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
