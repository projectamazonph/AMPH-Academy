'use client';
import { Icon } from '@/components/icons';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getEventLog } from '@/app/actions/events';
import { cn } from '@/lib/utils';

const eventColors: Record<string, string> = {
  session_started: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  lesson_started: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  lesson_completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  quiz_started: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  quiz_completed: 'bg-green-500/10 text-green-400 border-green-500/20',
  simulation_started: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  simulation_graded: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  mistake_review: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  certificate_issued: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<{ eventType: string; metadata: string | null; createdAt: Date }[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const pageSize = 25;

  useEffect(() => {
    queueMicrotask(() => {
      setLoading(true);
      getEventLog(200)
        .then(r => { if (r.success) setEvents(r.data); })
        .catch(() => {})
        .finally(() => setLoading(false));
    });
  }, []);

  const filtered = filter
    ? events.filter(e => e.eventType.includes(filter))
    : events;

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const uniqueTypes = [...new Set(events.map(e => e.eventType))];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
          <Icon name="pulse" className="h-5 w-5 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Event Log</h1>
          <p className="text-sm text-muted-foreground">{events.length} total events</p>
        </div>
      </div>

      {/* Funnel chips */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => { setFilter(''); setPage(0); }}
          className={cn('px-3 py-1 text-xs rounded-full border transition-colors',
            !filter ? 'bg-primary/10 border-primary/20 text-primary' : 'border-border/40 text-muted-foreground hover:text-foreground'
          )}>
          All
        </button>
        {uniqueTypes.map(type => (
          <button key={type} onClick={() => { setFilter(type); setPage(0); }}
            className={cn('px-3 py-1 text-xs rounded-full border transition-colors',
              filter === type ? 'bg-primary/10 border-primary/20 text-primary' : 'border-border/40 text-muted-foreground hover:text-foreground'
            )}>
            {type.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* Event list */}
      <Card className="border-border/40 bg-card/40">
        {loading ? (
          <div className="flex justify-center py-16"><Icon name="spinner" className="h-5 w-5 animate-spin text-muted-foreground" /></div>
        ) : paged.length === 0 ? (
          <CardContent className="py-16 text-center text-muted-foreground">
            <Icon name="pulse" className="h-8 w-8 mx-auto mb-3 opacity-50" />
            No events found.
          </CardContent>
        ) : (
          <div className="divide-y divide-border/20">
            {paged.map((event, i) => (
              <div key={i} className="p-3 flex items-center gap-3 hover:bg-muted/10 transition-colors">
                <Badge variant="outline" className={cn('text-[10px] px-2 py-0.5 shrink-0', eventColors[event.eventType] || '')}>
                  {event.eventType.replace(/_/g, ' ')}
                </Badge>
                <span className="text-xs text-muted-foreground ml-auto shrink-0 font-mono">
                  {new Date(event.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Page {page + 1} of {totalPages}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
              <Icon name="caret-left" className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>
              <Icon name="caret-right" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
