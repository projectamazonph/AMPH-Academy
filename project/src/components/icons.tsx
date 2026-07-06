import { Icon } from '@/components/icons';
/**
 * ProjectAMPH Academy: Centralized Icon Registry
 *
 * Single source of truth for all Phosphor icon imports.
 * Enables:
 *  - Dynamic icon rendering (e.g. badge system: `icons[name]` where name is a string)
 *  - Tree-shaking: each icon is a named import (bundler drops unused ones)
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
};

/** Icon type re-export for convenience */
export type { Icon };

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
export const icons: Record<string, Icon> = {
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
};

/** All icon names — useful for typeahead/documentation */
export type IconName = keyof typeof icons;
