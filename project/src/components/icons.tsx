'use client';

import {
  ArrowClockwise,
  ArrowLeft,
  ArrowRight,
  BarChart,
  BookOpen,
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUp,
  Check,
  CheckCircle,
  Circle,
  Clock,
  Desktop,
  Download,
  Eye,
  EyeOff,
  Funnel,
  GraduationCap,
  Layout,
  Lightning,
  Lock,
  MagnifyingGlass,
  Mail,
  Medal,
  Play,
  Printer,
  Pulse,
  Shield,
  Sparkle,
  Spinner,
  TrendUp,
  Trophy,
  User,
  Warning,
  X,
  XCircle,
} from '@phosphor-icons/react';
import type { Icon, IconProps } from '@phosphor-icons/react';

export type IconName =
  | 'arrow-clockwise'
  | 'arrow-left'
  | 'arrow-right'
  | 'bar-chart'
  | 'book-open'
  | 'caret-down'
  | 'caret-left'
  | 'caret-right'
  | 'caret-up'
  | 'check'
  | 'check-circle'
  | 'circle'
  | 'clock'
  | 'desktop'
  | 'download'
  | 'eye'
  | 'eye-off'
  | 'funnel'
  | 'graduation-cap'
  | 'layout'
  | 'lightning'
  | 'lock'
  | 'magnifying-glass'
  | 'mail'
  | 'medal'
  | 'play'
  | 'printer'
  | 'pulse'
  | 'shield'
  | 'sparkle'
  | 'spinner'
  | 'trend-up'
  | 'trophy'
  | 'user'
  | 'warning'
  | 'x'
  | 'x-circle';

const ICON_MAP: Record<IconName, React.ComponentType<IconProps>> = {
  'arrow-clockwise': ArrowClockwise,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'bar-chart': BarChart,
  'book-open': BookOpen,
  'caret-down': CaretDown,
  'caret-left': CaretLeft,
  'caret-right': CaretRight,
  'caret-up': CaretUp,
  check: Check,
  'check-circle': CheckCircle,
  circle: Circle,
  clock: Clock,
  desktop: Desktop,
  download: Download,
  eye: Eye,
  'eye-off': EyeOff,
  funnel: Funnel,
  'graduation-cap': GraduationCap,
  layout: Layout,
  lightning: Lightning,
  lock: Lock,
  'magnifying-glass': MagnifyingGlass,
  mail: Mail,
  medal: Medal,
  play: Play,
  printer: Printer,
  pulse: Pulse,
  shield: Shield,
  sparkle: Sparkle,
  spinner: Spinner,
  'trend-up': TrendUp,
  trophy: Trophy,
  user: User,
  warning: Warning,
  x: X,
  'x-circle': XCircle,
};

export function getIcon(name: IconName): Icon {
  return ICON_MAP[name] as Icon;
}

export interface IconWrapperProps extends Omit<IconProps, 'icon'> {
  name: IconName;
}

export function Icon({ name, ...props }: IconWrapperProps) {
  const Component = ICON_MAP[name];
  if (!Component) return null;
  return <Component {...props} />;
}

export { type Icon, type IconProps } from '@phosphor-icons/react';
