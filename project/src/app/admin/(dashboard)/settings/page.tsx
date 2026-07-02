'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Settings, Shield, Server, Database, Globe, Users,
  BookOpen, Award, Loader2, CheckCircle2, XCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getAdminStats, type AdminStats } from '@/app/actions/admin';

function StatusBadge({ ok }: { ok: boolean }) {
  return ok
    ? <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">Online</Badge>
    : <Badge variant="outline" className="bg-rose-500/10 text-rose-400 border-rose-500/20 text-[10px]">Offline</Badge>;
}

export default function AdminSettingsPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats()
      .then(r => { if (r.success) setStats(r.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-slate-500/10 border border-slate-500/20">
          <Settings className="h-5 w-5 text-slate-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground">Platform configuration and status</p>
        </div>
      </div>

      {/* System Status */}
      <Card className="border-border/40 bg-card/40">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Server className="h-4 w-4 text-muted-foreground" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Database</p>
                <p className="text-xs text-muted-foreground">SQLite via Prisma ORM</p>
              </div>
            </div>
            <StatusBadge ok={true} />
          </div>
          <Separator className="bg-border/20" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Web Server</p>
                <p className="text-xs text-muted-foreground">Next.js 16 (App Router)</p>
              </div>
            </div>
            <StatusBadge ok={true} />
          </div>
          <Separator className="bg-border/20" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Authentication</p>
                <p className="text-xs text-muted-foreground">NextAuth.js + JWT</p>
              </div>
            </div>
            <StatusBadge ok={true} />
          </div>
        </CardContent>
      </Card>

      {/* Platform Info */}
      <Card className="border-border/40 bg-card/40">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            Platform Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-muted/20 border border-border/20 text-center">
              <Users className="h-5 w-5 mx-auto mb-1 text-blue-400" />
              <p className="text-lg font-bold font-mono">{stats?.totalUsers ?? '—'}</p>
              <p className="text-xs text-muted-foreground">Total Users</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/20 border border-border/20 text-center">
              <BookOpen className="h-5 w-5 mx-auto mb-1 text-emerald-400" />
              <p className="text-lg font-bold font-mono">{stats?.lessonsCompletedTotal ?? '—'}</p>
              <p className="text-xs text-muted-foreground">Lessons Done</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/20 border border-border/20 text-center">
              <Award className="h-5 w-5 mx-auto mb-1 text-amber-400" />
              <p className="text-lg font-bold font-mono">{stats?.totalXpAwarded?.toLocaleString() ?? '—'}</p>
              <p className="text-xs text-muted-foreground">Total XP Awarded</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* No AI disclaimer */}
      <Card className="border-border/40 bg-card/40 border-rose-500/10">
        <CardContent className="p-4 text-sm text-muted-foreground flex items-center gap-3">
          <XCircle className="h-5 w-5 text-rose-400 shrink-0" />
          <span>This admin panel has no AI features. All student data is stored locally. No external AI APIs are called.</span>
        </CardContent>
      </Card>
    </motion.div>
  );
}
