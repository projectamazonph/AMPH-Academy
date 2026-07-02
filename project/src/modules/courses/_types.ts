import type { AuthUser } from "@/modules/auth/_types";

// ─── Course ───────────────────────────────────────────────────────

export type CourseSummary = {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  difficulty: string;
  price: number | null;
  tier: string | null;
  estimatedHours: number;
  moduleCount: number;
  isPublished: boolean;
};

export type CourseDetail = CourseSummary & {
  modules: ModuleSummary[];
  enrollmentStatus?: EnrollmentStatus;
};

// ─── Module ───────────────────────────────────────────────────────

export type ModuleSummary = {
  id: string;
  moduleNumber: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  estimatedMinutes: number;
  lessonCount: number;
  progressStatus: ProgressStatus;
};

export type ModuleDetail = ModuleSummary & {
  lessons: LessonSummary[];
};

// ─── Lesson ───────────────────────────────────────────────────────

export type LessonSummary = {
  id: string;
  lessonNumber: number;
  title: string;
  slug: string;
  type: string;
  videoUrl: string | null;
  estimatedMinutes: number;
  xpReward: number;
  progressStatus: ProgressStatus;
};

// ─── Enrollment ──────────────────────────────────────────────────

export type EnrollmentStatus = "NOT_ENROLLED" | "ACTIVE" | "COMPLETED";

export type EnrollmentResponse = {
  success: boolean;
  status?: EnrollmentStatus;
  error?: string;
};

// ─── Progress ─────────────────────────────────────────────────────

export type ProgressStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export type UserProgress = {
  courseId: string;
  completedModules: number;
  totalModules: number;
  completedLessons: number;
  totalLessons: number;
  overallPercent: number;
};
