'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, BookOpen, Medal, Pulse, Settings,
  Menu, X, CaretLeft, Lightning, LogOut, Shield,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { signOut, useSession } from 'next-auth/react';

const adminNavItems: { href: string; label: string; icon: typeof LayoutDashboard }[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/courses', label: 'Content', icon: BookOpen },
  { href: '/admin/events', label: 'Events', icon: Pulse },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || 'Admin';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full border-r border-border/40 bg-card/30 backdrop-blur-xl transition-all duration-300',
          'hidden lg:flex',
          sidebarOpen && '!flex',
          collapsed ? 'w-[68px]' : 'w-[250px]',
        )}
        animate={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { width: collapsed ? 68 : 250 } : {}}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-4 pb-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-400/5 border border-rose-500/20 shrink-0">
            <Shield className="h-5 w-5 text-rose-400" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="text-sm font-bold tracking-tight">AMPH Admin</h1>
              <p className="text-[9px] text-muted-foreground tracking-wider uppercase">Control Panel</p>
            </div>
          )}
        </div>

        <Separator className="mx-3" />

        {/* Nav items */}
        <nav className="flex-1 p-2 space-y-1 mt-2 overflow-y-auto">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start gap-3 h-10 transition-all',
                    collapsed && 'justify-center px-0',
                    isActive
                      ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/15 hover:text-rose-300 border border-rose-500/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  <Icon className={cn('h-4 w-4 shrink-0', isActive && 'text-rose-400')} />
                  {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                  {isActive && !collapsed && (
                    <motion.div layoutId="adminIndicator" className="ml-auto h-1.5 w-1.5 rounded-full bg-rose-400" />
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>

        <Separator className="mx-3" />

        {/* Collapse + Logout */}
        <div className="p-2 space-y-1">
          <Button
            variant="ghost" size="sm"
            className="w-full justify-center hidden lg:flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            <CaretLeft className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
          </Button>

          <div className={cn('flex items-center gap-3 p-2', collapsed && 'justify-center')}>
            <Avatar className="h-7 w-7 shrink-0">
              <AvatarFallback className="bg-rose-500/15 text-rose-400 text-xs font-semibold border border-rose-500/20">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{userName}</p>
                <p className="text-[9px] text-muted-foreground">Admin</p>
              </div>
            )}
            <Button
              variant="ghost" size="icon"
              className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              title="Sign out"
            >
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Top bar (mobile) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 h-14 border-b border-border/40 bg-background/80 backdrop-blur-xl flex items-center px-4 gap-3">
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="shrink-0">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-rose-400" />
          <span className="text-sm font-semibold">AMPH Admin</span>
        </div>
      </div>

      {/* Main content */}
      <div className={cn(
        'min-h-screen transition-all duration-300',
        'lg:ml-[250px]',
        collapsed && 'lg:ml-[68px]',
        'pt-14 lg:pt-0',
      )}>
        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
