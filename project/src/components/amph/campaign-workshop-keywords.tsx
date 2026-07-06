'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/icons';
import { Card, CardContent } from '@/components/ui/card';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCampaignBuilderStore, generateId } from '@/stores/campaign-builder-store';
import { cn } from '@/lib/utils';
import {
  matchTypeLabels,
  relevanceColor,
  competitionColor,
} from './campaign-workshop-data';
import type { MatchType } from '@/engine';

export function KeywordsPanel() {
  const {
    campaign,
    suggestedKeywords,
    suggestedNegatives,
    addKeyword,
    removeKeyword,
    updateKeyword,
  } = useCampaignBuilderStore();

  const [activeTab, setActiveTab] = useState('keywords');
  const [customKeywordText, setCustomKeywordText] = useState('');
  const [customKeywordMatch, setCustomKeywordMatch] = useState<MatchType>('exact');
  const [customNegText, setCustomNegText] = useState('');
  const [customNegMatch, setCustomNegMatch] = useState<MatchType>('broad');

  const positiveKeywords = campaign.keywords.filter((k) => !k.isNegative);
  const negativeKeywords = campaign.keywords.filter((k) => k.isNegative);

  const addedKeywordIds = new Set(campaign.keywords.map((k) => k.id));

  const keywordExists = (text: string, matchType: MatchType, isNegative = false) => {
    return campaign.keywords.some(
      (k) => k.text.toLowerCase() === text.toLowerCase() && k.matchType === matchType && !!k.isNegative === isNegative
    );
  };

  const handleAddSuggestedKeyword = (kw: typeof suggestedKeywords[0]) => {
    if (keywordExists(kw.text, kw.matchType as MatchType)) return;
    addKeyword({
      id: kw.id,
      text: kw.text,
      matchType: kw.matchType as MatchType,
      bid: kw.suggestedBid,
      isNegative: false,
    });
  };

  const handleAddCustomKeyword = () => {
    if (!customKeywordText.trim() || keywordExists(customKeywordText, customKeywordMatch)) return;
    addKeyword({
      id: generateId(),
      text: customKeywordText.trim().toLowerCase(),
      matchType: customKeywordMatch,
      bid: campaign.defaultBid,
      isNegative: false,
    });
    setCustomKeywordText('');
  };

  const handleAddSuggestedNegative = (neg: typeof suggestedNegatives[0]) => {
    if (keywordExists(neg.text, neg.matchType as MatchType, true)) return;
    addKeyword({
      id: neg.id,
      text: neg.text,
      matchType: neg.matchType as MatchType,
      bid: 0,
      isNegative: true,
    });
  };

  const handleAddCustomNegative = () => {
    if (!customNegText.trim() || keywordExists(customNegText, customNegMatch, true)) return;
    addKeyword({
      id: generateId(),
      text: customNegText.trim().toLowerCase(),
      matchType: customNegMatch,
      bid: 0,
      isNegative: true,
    });
    setCustomNegText('');
  };

  return (
    <Card className="border-emerald-500/15">
      <CardContent className="pt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="keywords" className="flex-1 text-xs">
              Keywords ({positiveKeywords.length})
            </TabsTrigger>
            <TabsTrigger value="negatives" className="flex-1 text-xs">
              Negatives ({negativeKeywords.length})
            </TabsTrigger>
          </TabsList>

          {/* Keywords Tab */}
          <TabsContent value="keywords" className="space-y-4 mt-0">
            {/* Suggested Keywords */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon name="sparkles" className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                  Suggested Keywords
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {suggestedKeywords.map((kw) => {
                  const isAdded = addedKeywordIds.has(kw.id);
                  const existsByText = keywordExists(kw.text, kw.matchType as MatchType);
                  const relClass = relevanceColor(kw.relevanceScore);
                  const compClass = competitionColor(kw.competition);

                  return (
                    <motion.button
                      key={kw.id}
                      type="button"
                      disabled={isAdded || existsByText}
                      className={cn(
                        'group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] transition-all',
                        isAdded || existsByText
                          ? 'bg-muted/30 border-border text-muted-foreground cursor-not-allowed opacity-50'
                          : 'bg-card hover:bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40 cursor-pointer'
                      )}
                      onClick={() => handleAddSuggestedKeyword(kw)}
                      whileTap={!isAdded && !existsByText ? { scale: 0.95 } : {}}
                    >
                      <span className="font-medium">{kw.text}</span>
                      <Badge variant="outline" className={cn('text-[9px] px-1 py-0', relClass)}>
                        {matchTypeLabels[kw.matchType as MatchType]}
                      </Badge>
                      <Badge variant="outline" className={cn('text-[9px] px-1 py-0', compClass)}>
                        {kw.competition}
                      </Badge>
                      <span className="font-mono text-muted-foreground">${kw.suggestedBid.toFixed(2)}</span>
                      <span className={cn('font-mono font-medium', relClass.split(' ')[0])}>
                        {Math.round(kw.relevanceScore * 100)}%
                      </span>
                      {!isAdded && !existsByText && (
                        <Icon name="plus" className="h-3 w-3 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Your Keywords */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                Your Keywords
              </span>
              {positiveKeywords.length === 0 ? (
                <div className="p-6 rounded-lg border border-dashed border-border text-center">
                  <Icon name="magnifying-glass" className="h-6 w-6 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No keywords added yet. Click suggested keywords above or add a custom one.
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                  {positiveKeywords.map((kw) => (
                    <motion.div
                      key={kw.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-2 rounded-lg bg-muted/20 border border-border"
                    >
                      <span className="text-sm font-medium flex-1 min-w-0 truncate">
                        {kw.text}
                      </span>
                      <Select
                        value={kw.matchType}
                        onValueChange={(v) => updateKeyword(kw.id, { matchType: v as MatchType })}
                      >
                        <SelectTrigger className="h-7 w-[90px] text-[11px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="broad">Broad</SelectItem>
                          <SelectItem value="phrase">Phrase</SelectItem>
                          <SelectItem value="exact">Exact</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="relative w-20">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">$</span>
                        <Input
                          type="number"
                          min={0.01}
                          max={50}
                          step={0.05}
                          value={kw.bid}
                          onChange={(e) => updateKeyword(kw.id, { bid: parseFloat(e.target.value) || 0 })}
                          className="h-7 text-[11px] pl-5 font-mono"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 shrink-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                        onClick={() => removeKeyword(kw.id)}
                        aria-label={`Remove keyword ${kw.text}`}
                      >
                        <Icon name="x" className="h-3.5 w-3.5" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Add Custom Keyword */}
              <div className="flex items-center gap-2 mt-2">
                <Input
                  placeholder="Custom keyword..."
                  value={customKeywordText}
                  onChange={(e) => setCustomKeywordText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCustomKeyword()}
                  className="h-8 text-sm flex-1"
                />
                <Select
                  value={customKeywordMatch}
                  onValueChange={(v) => setCustomKeywordMatch(v as MatchType)}
                >
                  <SelectTrigger className="h-8 w-[90px] text-[11px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="broad">Broad</SelectItem>
                    <SelectItem value="phrase">Phrase</SelectItem>
                    <SelectItem value="exact">Exact</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1 text-xs border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                  onClick={handleAddCustomKeyword}
                  disabled={!customKeywordText.trim()}
                >
                  <Icon name="plus" className="h-3 w-3" />
                  Add
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Negative Keywords Tab */}
          <TabsContent value="negatives" className="space-y-4 mt-0">
            {/* Suggested Negatives */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon name="warning" className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                  Suggested Negatives
                </span>
              </div>
              <div className="space-y-1.5">
                {suggestedNegatives.map((neg) => {
                  const isAdded = addedKeywordIds.has(neg.id);
                  const existsByText = keywordExists(neg.text, neg.matchType as MatchType, true);

                  return (
                    <motion.button
                      key={neg.id}
                      type="button"
                      disabled={isAdded || existsByText}
                      className={cn(
                        'w-full text-left flex items-start gap-3 p-3 rounded-lg border text-[11px] transition-all',
                        isAdded || existsByText
                          ? 'bg-muted/20 border-border opacity-50 cursor-not-allowed'
                          : 'bg-card hover:bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40 cursor-pointer'
                      )}
                      onClick={() => handleAddSuggestedNegative(neg)}
                      whileTap={!isAdded && !existsByText ? { scale: 0.98 } : {}}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-foreground">{neg.text}</span>
                          <Badge variant="outline" className="text-[9px] px-1 py-0 bg-rose-500/10 text-rose-400 border-rose-500/20">
                            {matchTypeLabels[neg.matchType as MatchType]}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-snug">
                          {neg.reasoning}
                        </p>
                      </div>
                      {!isAdded && !existsByText && (
                        <Icon name="plus" className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Your Negative Keywords */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                Your Negative Keywords
              </span>
              {negativeKeywords.length === 0 ? (
                <div className="p-6 rounded-lg border border-dashed border-border text-center">
                  <Icon name="warning" className="h-6 w-6 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No negative keywords added. Add them to filter out irrelevant traffic.
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {negativeKeywords.map((kw) => (
                    <motion.div
                      key={kw.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-2 rounded-lg bg-rose-500/5 border border-rose-500/15"
                    >
                      <span className="text-sm font-medium flex-1 min-w-0 truncate">
                        {kw.text}
                      </span>
                      <Select
                        value={kw.matchType}
                        onValueChange={(v) => updateKeyword(kw.id, { matchType: v as MatchType })}
                      >
                        <SelectTrigger className="h-7 w-[90px] text-[11px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="broad">Broad</SelectItem>
                          <SelectItem value="phrase">Phrase</SelectItem>
                          <SelectItem value="exact">Exact</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 shrink-0 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                        onClick={() => removeKeyword(kw.id)}
                        aria-label={`Remove negative keyword ${kw.text}`}
                      >
                        <Icon name="x" className="h-3.5 w-3.5" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Add Custom Negative */}
              <div className="flex items-center gap-2 mt-2">
                <Input
                  placeholder="Custom negative keyword..."
                  value={customNegText}
                  onChange={(e) => setCustomNegText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCustomNegative()}
                  className="h-8 text-sm flex-1"
                />
                <Select
                  value={customNegMatch}
                  onValueChange={(v) => setCustomNegMatch(v as MatchType)}
                >
                  <SelectTrigger className="h-8 w-[90px] text-[11px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="broad">Broad</SelectItem>
                    <SelectItem value="phrase">Phrase</SelectItem>
                    <SelectItem value="exact">Exact</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1 text-xs border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                  onClick={handleAddCustomNegative}
                  disabled={!customNegText.trim()}
                >
                  <Icon name="plus" className="h-3 w-3" />
                  Add
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
