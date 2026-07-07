/**
 * Phosphor Icons — namespace import for Turbopack compatibility.
 *
 * Turbopack (Next.js 16) cannot statically resolve named exports from
 * @phosphor-icons/react v2.1.7 — the compiled dist/index.es.js does not
 * include all icons as named exports, causing "Export X doesn't exist in
 * target module" errors for 26 icons.
 *
 * Solution: use `import * as Phosphor from '@phosphor-icons/react'` and
 * reference icons via the namespace. This defers resolution to runtime,
 * bypassing Turbopack's static analysis.
 *
 * References:
 *   - https://github.com/phosphor-icons/react/issues/133
 *   - https://github.com/vercel/next.js/discussions/86223
 */
import * as Phosphor from '@phosphor-icons/react';
import type { IconProps as PhosphorIconProps } from '@phosphor-icons/react';

/** Convert kebab-case name (e.g. "caret-down") to PascalCase key (e.g. "CaretDown") */
function toPascalCase(name: string): string {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

/** Dynamic Icon component — renders icons by name from the registry */
export function Icon({ name, className, ...props }: PhosphorIconProps & { name: string }) {
  const key = toPascalCase(name);
  const IconComponent = icons[key];
  if (!IconComponent) return null;
  return <IconComponent className={className} {...props} />;
}

/**
 * ProjectAMPH Academy: Centralized Icon Registry
 *
 * Single source of truth for all Phosphor icon imports.
 * Enables:
 *  - Dynamic icon rendering (e.g. badge system: `icons[name]` where name is a string)
 *  - Tree-shaking: each icon is a named property (bundler drops unused ones)
 *  - One place to audit/replace any icon across the entire codebase
 *
 * Usage:
 *   import { icons } from '@/components/icons';
 *   // dynamic
 *   <Icon icon={icons[name]} />
 *   // or spread into props
 *   <SomeIconComponent {...icons.ArrowLeft} />
 */

/**
 * Named icon exports — use these for static JSX imports.
 * Tree-shakeable: bundler removes icons you don't import.
 *
 * Example:
 *   import { icons, type IconName } from '@/components/icons';
 *   import { icons.BookOpen } from '@/components/icons';
 */
export {
  // Navigation
  ArrowLeft,
  ArrowRight,
  ArrowSquareOut,
  ArrowUpRight,
  ArrowDownRight,
  CaretLeft,
  CaretRight,
  CaretDown,
  CaretUp,
  ArrowUpDown,
  ArrowClockwise,
  // Actions
  Check,
  X,
  Plus,
  Minus,
  Trash2,
  Pencil,
  Copy,
  Share2,
  Download,
  Printer,
  Send,
  LogOut,
  Menu,
  Settings,
  // Status
  CheckCircle,
  XCircle,
  Warning,
  AlertCircle,
  Ban,
  Spinner,
  HelpCircle,
  Lock,
  // Media
  Play,
  Video,
  Pause,
  // Social
  Users,
  User,
  UserPlus,
  UserCog,
  Building2,
  Mail,
  Bot,
  // Data & Charts
  BarChart,
  TrendUp,
  TrendingDown,
  Pulse,
  Sliders,
  // Objects
  Target,
  Trophy,
  Medal,
  Crown,
  Star,
  Flame,
  Lightning,
  BookOpen,
  Clock,
  Calculator,
  Shield,
  Layout,
  LayoutDashboard,
  Lightbulb,
  Sparkle,
  Sparkles,
  Funnel,
  MagnifyingGlass,
  FolderOpen,
  FileText,
  Grid3X3,
  CheckSquare,
  Layers,
  GraduationCap,
  FlaskConical,
  Rocket,
  Coins,
  Cursor,
  MousePointerClick,
  Gauge,
  Brain,
  Circle,
  CircleDot,
  Info,
  Database,
  Server,
  Globe,
  Eye,
  EyeOff,
  Desktop,
  Calendar,
  Bell,
  TriangleAlert,
} from '@phosphor-icons/react';

/** Icon type — the runtime function component for dynamic icon rendering */
export type Icon = React.ComponentType<PhosphorIconProps>;

/**
 * Icon registry — maps string names to Phosphor icon components.
 * Use for dynamic icon rendering (e.g. database-driven badge/feature icons).
 *
 * IMPORTANT: Keep in sync with the named exports above.
 * Only icons listed in the registry can be looked up dynamically.
 *
 * Example:
 *   const badgeIconName = 'Trophy'; // from database
 *   const IconComponent = icons[badgeIconName]; // Icon | undefined
 *   {IconComponent && <IconComponent size={16} />}
 */
export const icons: Record<string, Phosphor.ComponentType<PhosphorIconProps>> = {
  // Navigation
  ArrowLeft: Phosphor.ArrowLeft,
  ArrowRight: Phosphor.ArrowRight,
  ArrowSquareOut: Phosphor.ArrowSquareOut,
  ArrowUpRight: Phosphor.ArrowUpRight,
  ArrowDownRight: Phosphor.ArrowDownRight,
  CaretLeft: Phosphor.CaretLeft,
  CaretRight: Phosphor.CaretRight,
  CaretDown: Phosphor.CaretDown,
  CaretUp: Phosphor.CaretUp,
  ArrowUpDown: Phosphor.ArrowUpDown,
  ArrowClockwise: Phosphor.ArrowClockwise,
  // Actions
  Check: Phosphor.Check,
  X: Phosphor.X,
  Plus: Phosphor.Plus,
  Minus: Phosphor.Minus,
  Trash2: Phosphor.Trash2,
  Pencil: Phosphor.Pencil,
  Copy: Phosphor.Copy,
  Share2: Phosphor.Share2,
  Download: Phosphor.Download,
  Printer: Phosphor.Printer,
  Send: Phosphor.Send,
  LogOut: Phosphor.LogOut,
  Menu: Phosphor.Menu,
  Settings: Phosphor.Settings,
  // Status
  CheckCircle: Phosphor.CheckCircle,
  XCircle: Phosphor.XCircle,
  Warning: Phosphor.Warning,
  AlertCircle: Phosphor.AlertCircle,
  Ban: Phosphor.Ban,
  Spinner: Phosphor.Spinner,
  HelpCircle: Phosphor.HelpCircle,
  Lock: Phosphor.Lock,
  // Media
  Play: Phosphor.Play,
  Video: Phosphor.Video,
  Pause: Phosphor.Pause,
  // Social
  Users: Phosphor.Users,
  User: Phosphor.User,
  UserPlus: Phosphor.UserPlus,
  UserCog: Phosphor.UserCog,
  Building2: Phosphor.Building2,
  Mail: Phosphor.Mail,
  Bot: Phosphor.Bot,
  // Data & Charts
  BarChart: Phosphor.BarChart,
  TrendUp: Phosphor.TrendUp,
  TrendingDown: Phosphor.TrendingDown,
  Pulse: Phosphor.Pulse,
  Sliders: Phosphor.Sliders,
  // Objects
  Target: Phosphor.Target,
  Trophy: Phosphor.Trophy,
  Medal: Phosphor.Medal,
  Crown: Phosphor.Crown,
  Star: Phosphor.Star,
  Flame: Phosphor.Flame,
  Lightning: Phosphor.Lightning,
  BookOpen: Phosphor.BookOpen,
  Clock: Phosphor.Clock,
  Calculator: Phosphor.Calculator,
  Shield: Phosphor.Shield,
  Layout: Phosphor.Layout,
  LayoutDashboard: Phosphor.LayoutDashboard,
  Lightbulb: Phosphor.Lightbulb,
  Sparkle: Phosphor.Sparkle,
  Sparkles: Phosphor.Sparkles,
  Funnel: Phosphor.Funnel,
  MagnifyingGlass: Phosphor.MagnifyingGlass,
  FolderOpen: Phosphor.FolderOpen,
  FileText: Phosphor.FileText,
  Grid3X3: Phosphor.Grid3X3,
  CheckSquare: Phosphor.CheckSquare,
  Layers: Phosphor.Layers,
  GraduationCap: Phosphor.GraduationCap,
  FlaskConical: Phosphor.FlaskConical,
  Rocket: Phosphor.Rocket,
  Coins: Phosphor.Coins,
  Cursor: Phosphor.Cursor,
  MousePointerClick: Phosphor.MousePointerClick,
  Gauge: Phosphor.Gauge,
  Brain: Phosphor.Brain,
  Circle: Phosphor.Circle,
  CircleDot: Phosphor.CircleDot,
  Info: Phosphor.Info,
  Database: Phosphor.Database,
  Server: Phosphor.Server,
  Globe: Phosphor.Globe,
  Eye: Phosphor.Eye,
  EyeOff: Phosphor.EyeOff,
  Desktop: Phosphor.Desktop,
  Calendar: Phosphor.Calendar,
  Bell: Phosphor.Bell,
  TriangleAlert: Phosphor.TriangleAlert,
};

/** All icon names — useful for typeahead/documentation */
export type IconName = keyof typeof icons;
