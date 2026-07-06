'use client';
import { Icon } from '@/components/icons';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getResources } from '@/modules/resources/_actions';
import {
  RESOURCES,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
} from '@/modules/resources/resources-data';
import type { ResourceMeta, ResourceCategory } from '@/modules/resources/_types';
import { cn } from '@/lib/utils';

const categoryIcons: Record<ResourceCategory, typeof FileText> = {
  template: FileText,
  checklist: CheckSquare,
  guide: BookOpen,
  framework: Grid3X3,
};

const categoryColors: Record<ResourceCategory, string> = {
  template: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
  checklist: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  guide: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  framework: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
};

export function ResourcesView() {
  const [resources, setResources] = useState<ResourceMeta[]>(RESOURCES);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ResourceCategory | 'all'>('all');
  const [downloading, setDownloading] = useState<string | null>(null);

  const filtered = resources.filter((r) => {
    const matchesSearch =
      searchQuery === '' ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || r.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = async (resource: ResourceMeta) => {
    setDownloading(resource.id);
    // Simulate download — in production this would serve from /downloads/
    const link = document.createElement('a');
    link.href = `/downloads/${resource.filename}`;
    link.download = resource.filename;
    link.click();
    setTimeout(() => setDownloading(null), 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Resources</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Downloadable templates, checklists, and guides to use in your client work
        </p>
      </div>

      {/* MagnifyingGlass & filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Icon name="magnifying-glass" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="MagnifyingGlass resources..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveCategory('all')}
        >
          <FolderOpen className="h-3.5 w-3.5 mr-1.5" />
          All
        </Button>
        {CATEGORY_ORDER.map((cat) => {
          const Icon = categoryIcons[cat];
          return (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat)}
            >
              <Icon className="h-3.5 w-3.5 mr-1.5" />
              {CATEGORY_LABELS[cat]}
            </Button>
          );
        })}
      </div>

      {/* Resource grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <FolderOpen className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p>No resources match your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((resource, index) => {
            const Icon = categoryIcons[resource.category];
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="group h-full flex flex-col hover:border-primary/30 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div
                        className={cn(
                          'p-2 rounded-lg border',
                          categoryColors[resource.category]
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-[10px]',
                          categoryColors[resource.category].split(' ')[0]
                        )}
                      >
                        {CATEGORY_LABELS[resource.category]}
                      </Badge>
                    </div>
                    <CardTitle className="text-sm mt-3 leading-snug">
                      {resource.title}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {resource.description}
                    </p>
                  </CardHeader>
                  <CardContent className="mt-auto pt-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">
                        {resource.tags.slice(0, 2).map((t) => `#${t}`).join(' ')}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDownload(resource)}
                        disabled={downloading === resource.id}
                      >
                        {downloading === resource.id ? (
                          <Icon name="spinner" className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Icon name="download" className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
