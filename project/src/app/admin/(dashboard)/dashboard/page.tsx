'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, BookOpen, Target, Trophy, Activity, TrendingUp,
  Clock, Loader2, Shield,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { getAdminStats, type AdminStats } from '@/app/actions/admin';

function StatCard({ label, value, icon: Icon, color, bg, suffix }: {
  label: string; value: string | number; icon: typeof Users;
  color: string; bg: string; suffix?: string;
}) {
  return (
    <Card className="border-border/40 bg-card/40">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <div className={cn('p-2.5 rounded-xl', bg)}>
            <Icon className={cn('h-5 w-5', color)} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold font-mono tracking-tight">
              {value}{suffix}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex items-center justify-center py-32">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats()
      .then(r => { if (r.success) setStats(r.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSkeleton />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
          <Shield className="h-5 w-5 text-rose-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Platform overview and key metrics</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={stats?.totalUsers ?? 0} icon={Users}
          color="text-blue-400" bg="bg-blue-500/10" />
        <StatCard label="Lessons Done" value={stats?.lessonsCompletedTotal ?? 0} icon={BookOpen}
          color="text-emerald-400" bg="bg-emerald-500/10" />
        <StatCard label="Sims Graded" value={stats?.simsGradedTotal ?? 0} icon={Target}
          color="text-amber-400" bg="bg-amber-500/10" />
        <StatCard label="Total XP" value={(stats?.totalXpAwarded ?? 0).toLocaleString()} icon={Trophy}
          color="text-violet-400" bg="bg-violet-500/10" />
      </div>

      {/* Activity row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Modules Done" value={stats?.modulesCompletedTotal ?? 0} icon={BookOpen}
          color="text-cyan-400" bg="bg-cyan-500/10" />
        <StatCard label="Quizzes Passed" value={stats?.quizzesPassedTotal ?? 0} icon={Activity}
          color="text-indigo-400" bg="bg-indigo-500/10" />
        <StatCard label="Active Today" value={stats?.activeToday ?? 0} icon={Clock}
          color="text-orange-400" bg="bg-orange-500/10" />
        <StatCard label="Active This Week" value={stats?.activeThisWeek ?? 0} icon={TrendingUp}
          color="text-green-400" bg="bg-green-500/10" />
      </div>

      {/* Module completion rates */}
      {stats?.moduleCompletionRates && stats.moduleCompletionRates.length > 0 && (
        <Card className="border-border/40 bg-card/40">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              Module Completion Rates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.moduleCompletionRates.map((mod, i) => (
              <motion.div
                key={mod.moduleNumber}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="space-y-1.5"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Module {mod.moduleNumber}: {mod.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {mod.completed}/{mod.enrolled} enrolled
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={mod.rate} className="flex-1 h-2" />
                  <span className={cn(
                    'text-xs font-mono w-10 text-right',
                    mod.rate >= 70 ? 'text-emerald-400' : mod.rate >= 40 ? 'text-amber-400' : 'text-rose-400'
                  )}>
                    {mod.rate}%
                  </span>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      )}

      {!stats && (
        <Card className="border-border/40 bg-card/40">
          <CardContent className="py-16 text-center text-muted-foreground">
            <Activity className="h-8 w-8 mx-auto mb-3 opacity-50" />
            <p>No platform data yet. Stats appear once users start learning.</p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
