// ===========================================================================
// Shared TypeScript types for ProjectAmazonPH Academy
// ===========================================================================

// --- User & Auth ---

export type UserRole = "student" | "admin";

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  image: string | null;
  createdAt: string;
}

// --- Course & Module ---

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  modules: Module[];
  difficulty: "foundations" | "intermediate" | "advanced" | "mastery";
  estimatedHours: number;
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: ModuleContent[];
  order: number;
}

export interface ModuleContent {
  type: "video" | "article" | "quiz" | "exercise" | "simulation";
  title: string;
  duration: number; // minutes
  completed: boolean;
}

// --- Progress & Achievements ---

export interface UserProgress {
  userId: string;
  courseId: string;
  completedModules: string[];
  quizScores: Record<string, number>;
  startedAt: string;
  lastActivityAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  awardedAt?: string;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  issuedAt: string;
  verificationHash: string;
}

// --- Interactive Tools ---

export interface CampaignSimulation {
  id: string;
  type: "campaign_builder" | "bid_elevator" | "str_triage";
  scenario: Scenario;
  decisions: Decision[];
  score: number;
  feedback: string;
}

export interface Scenario {
  title: string;
  description: string;
  initialBudget: number;
  metrics: {
    impressions: number;
    clicks: number;
    spend: number;
    sales: number;
    acos: number;
    roas: number;
  };
}

export interface Decision {
  prompt: string;
  options: DecisionOption[];
  selected?: string;
  correct: string;
  explanation: string;
}

export interface DecisionOption {
  id: string;
  label: string;
  impact: Partial<Scenario["metrics"]>;
}

// --- API Responses ---

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// --- Environment ---

export interface AppConfig {
  databaseUrl: string;
  nextAuthUrl: string;
  nextAuthSecret: string;
  aiApiKey?: string;
  isProduction: boolean;
}
