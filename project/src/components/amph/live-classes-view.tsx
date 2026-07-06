'use client';
import { Icon } from '@/components/icons';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  getUpcomingClasses,
  getPastClasses,
  getRegisteredClasses,
  registerForClass,
  unregisterFromClass,
  checkRegistration,
} from '@/modules/live-classes/_actions';

import type { LiveClassSummary } from '@/modules/live-classes/_types';

// ============================================================================
// TYPES
// ============================================================================

interface RegistrationMap {
  [liveClassId: string]: boolean;
}

// ============================================================================
// HELPERS
// ============================================================================

function formatDate(d: Date): string {
  const date = new Date(d);
  return date.toLocaleDateString('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(d: Date): string {
  const date = new Date(d);
  return date.toLocaleTimeString('en-PH', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function isWithin5Minutes(scheduledAt: Date): boolean {
  const fiveMinBefore = new Date(scheduledAt).getTime() - 5 * 60 * 1000;
  return Date.now() >= fiveMinBefore;
}

function spotsLeftStr(lc: LiveClassSummary): string {
  const left = lc.maxAttendees - lc.registrationCount;
  return `${lc.registrationCount}/${lc.maxAttendees}`;
}

function isClassFull(lc: LiveClassSummary): boolean {
  return lc.registrationCount >= lc.maxAttendees;
}

function isPast(scheduledAt: Date): boolean {
  return new Date(scheduledAt) < new Date();
}

// ============================================================================
// LIVE CLASSES VIEW
// ============================================================================

export function LiveClassesView() {
  const [upcoming, setUpcoming] = useState<LiveClassSummary[]>([]);
  const [past, setPast] = useState<LiveClassSummary[]>([]);
  const [registered, setRegistered] = useState<RegistrationMap>({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [acting, setActing] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    const [upcomingRes, pastRes, registeredRes] = await Promise.all([
      getUpcomingClasses(),
      getPastClasses(),
      getRegisteredClasses(),
    ]);
    setUpcoming(upcomingRes);
    setPast(pastRes);

    // Build registration map
    const regMap: RegistrationMap = {};
    for (const lc of registeredRes) {
      regMap[lc.id] = true;
    }
    setRegistered(regMap);
    setLoading(false);
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  const handleRegister = async (liveClassId: string) => {
    setActing(liveClassId);
    const result = await registerForClass(liveClassId);
    if (result.success) {
      setRegistered((prev) => ({ ...prev, [liveClassId]: true }));
      // Refresh to update counts
      loadAll();
    }
    setActing(null);
  };

  const handleUnregister = async (liveClassId: string) => {
    setActing(liveClassId);
    const result = await unregisterFromClass(liveClassId);
    if (result.success) {
      setRegistered((prev) => ({ ...prev, [liveClassId]: false }));
      loadAll();
    }
    setActing(null);
  };

  // Merge registered status into upcoming/past
  const upcomingWithReg = upcoming.map((lc) => ({
    ...lc,
    isRegistered: registered[lc.id] ?? false,
  }));

  const pastWithReg = past.map((lc) => ({
    ...lc,
    isRegistered: registered[lc.id] ?? false,
  }));

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Icon name="spinner" className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const displayClasses = tab === 'upcoming' ? upcomingWithReg : pastWithReg;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Live Classes</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Attend live coaching sessions with Ryan Dabao and fellow students
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-muted/30 border border-border/20 w-fit">
        <button onClick={() => setTab('upcoming')}
          className={cn('px-4 py-1.5 text-sm rounded-lg transition-colors',
            tab === 'upcoming' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
          )}>
          Upcoming
        </button>
        <button onClick={() => setTab('past')}
          className={cn('px-4 py-1.5 text-sm rounded-lg transition-colors',
            tab === 'past' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
          )}>
          Past ({past.length})
        </button>
      </div>

      {/* Empty state */}
      {displayClasses.length === 0 && (
        <Card className="border-border/40 bg-card/40">
          <CardContent className="py-20 text-center text-muted-foreground">
            <Video className="h-10 w-10 mx-auto mb-4 opacity-30" />
            <p className="text-sm">
              {tab === 'upcoming' ? 'No upcoming live classes scheduled yet.' : 'No past live classes.'}
            </p>
            <p className="text-xs mt-1 opacity-70">
              {tab === 'upcoming' ? 'Check back soon for new sessions.' : 'Attend a class to see it here.'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Class Cards */}
      {displayClasses.length > 0 && (
        <div className="grid gap-4">
          {displayClasses.map((lc, index) => {
            const full = isClassFull(lc);
            const canUnregister = lc.isRegistered && !isWithin5Minutes(lc.scheduledAt) && !isPast(lc.scheduledAt);
            const cantUnregisterBecauseStarted = lc.isRegistered && isWithin5Minutes(lc.scheduledAt) && !isPast(lc.scheduledAt);

            return (
              <motion.div
                key={lc.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className={cn(
                  'border-border/40 bg-card/40 hover:bg-card/60 transition-colors overflow-hidden',
                  lc.isRegistered && 'border-indigo-500/30 bg-indigo-500/5'
                )}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        {/* Title + badges */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 shrink-0">
                            <Video className="h-4 w-4 text-indigo-400" />
                          </div>
                          <h3 className="font-semibold">{lc.title}</h3>
                          {lc.isRegistered && (
                            <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                              <Icon name="check-circle" className="h-3 w-3 mr-1" />
                              Registered
                            </Badge>
                          )}
                          {full && !lc.isRegistered && (
                            <Badge variant="outline" className="text-[10px] bg-rose-500/10 text-rose-400 border-rose-500/20">
                              Full
                            </Badge>
                          )}
                        </div>

                        {/* Course badge */}
                        <div className="flex items-center gap-1 mb-2">
                          <Badge variant="outline" className="text-[10px] bg-sky-500/10 text-sky-400 border-sky-500/20">
                            <Icon name="book-open" className="h-3 w-3 mr-1" />
                            {lc.courseTitle}
                          </Badge>
                        </div>

                        {/* Details */}
                        <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1"><Icon name="user" className="h-3 w-3" />{lc.instructorName}</span>
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(lc.scheduledAt)}</span>
                          <span className="flex items-center gap-1"><Icon name="clock" className="h-3 w-3" />{formatTime(lc.scheduledAt)}</span>
                          <span className="flex items-center gap-1"><Icon name="clock" className="h-3 w-3" />{lc.durationMinutes} min</span>
                          <span className={cn(
                            'flex items-center gap-1',
                            full ? 'text-rose-400' : lc.maxAttendees - lc.registrationCount <= 5 ? 'text-amber-400' : ''
                          )}>
                            <Users className="h-3 w-3" />
                            {spotsLeftStr(lc)} spots
                          </span>
                        </div>

                        {/* Recording link (past classes) */}
                        {tab === 'past' && lc.recordingUrl && (
                          <a href={lc.recordingUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 mt-2">
                            <ArrowSquareOut className="h-3 w-3" />
                            Watch recording
                          </a>
                        )}

                        {/* Meeting link (upcoming, registered) */}
                        {tab === 'upcoming' && lc.isRegistered && lc.meetingUrl && (
                          <a href={lc.meetingUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 mt-2">
                            <ArrowSquareOut className="h-3 w-3" />
                            Join meeting
                          </a>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="shrink-0">
                        {tab === 'upcoming' && !lc.isRegistered && (
                          <Button
                            size="sm"
                            disabled={full || acting === lc.id}
                            onClick={() => handleRegister(lc.id)}
                            className="h-8 text-xs"
                          >
                            {acting === lc.id ? (
                              <Icon name="spinner" className="h-3 w-3 animate-spin mr-1" />
                            ) : full ? (
                              'Full'
                            ) : (
                              'Register'
                            )}
                          </Button>
                        )}
                        {tab === 'upcoming' && lc.isRegistered && (
                          <div className="flex items-center gap-2">
                            {canUnregister && (
                              <Button
                                variant="ghost"
                                size="sm"
                                disabled={acting === lc.id}
                                onClick={() => handleUnregister(lc.id)}
                                className="h-8 text-xs text-muted-foreground"
                              >
                                {acting === lc.id ? (
                                  <Icon name="spinner" className="h-3 w-3 animate-spin mr-1" />
                                ) : (
                                  'Unregister'
                                )}
                              </Button>
                            )}
                            {cantUnregisterBecauseStarted && (
                              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                Starts soon
                              </span>
                            )}
                          </div>
                        )}
                      </div>
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
