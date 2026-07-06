'use client';
import { Icon } from '@/components/icons';

import { cn } from '@/lib/utils';

interface DesktopNoticeProps {
  className?: string;
}

export function DesktopNotice({ className }: DesktopNoticeProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 text-xs text-amber-400/80',
        'lg:hidden', // only show below desktop breakpoint
        className,
      )}
    >
      <Icon name="desktop" className="h-3.5 w-3.5 shrink-0" />
      <span>
        <strong>Best experienced on desktop.</strong> This interactive tool is designed for larger screens. You can still use it on mobile, but some features may be constrained.
      </span>
    </div>
  );
}
