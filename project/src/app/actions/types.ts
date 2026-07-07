/**
 * ProjectAmazonPH Academy: Shared types for Server Actions
 *
 * IMPORTANT: This file does NOT have 'use server' — it only exports
 * TypeScript types and interfaces that are shared between the server
 * action files and their consumers.
 *
 * Next.js 16 enforces that 'use server' files can ONLY export async
 * functions. Type exports from those files cause "Invalid Server Actions
 * request" errors at runtime.
 */

// ============================================================================
// LESSON ACTION TYPES
// ============================================================================

export interface LessonMeta {
  title: string;
  slug: string;
  moduleNumber: number;
  lessonNumber: number;
  type: string;
  estimatedMinutes: number;
  xpReward: number;
}

export interface LessonContent {
  meta: LessonMeta;
  body: string;
}

// ============================================================================
// SIMULATION ACTION TYPES
// ============================================================================

/** Result of any server action — follows the "result" pattern */
export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; code: string };

/** Input for starting a new simulation attempt */
export interface StartAttemptInput {
  userId?: string;
  simulationType: 'STR_TRIAGE_ARENA' | 'BID_ELEVATOR' | 'CAMPAIGN_BUILDER';
  simulationSlug: string;
}

/** Output for starting an attempt */
export interface StartAttemptOutput {
  attemptId: string;
  attemptNumber: number;
}

// NOTE: The original GradeAttemptOutput (lines 54-62 in the old file) was removed.
// The correctly-typed version is at lines 206-213 below (evaluation uses engine types).

/** Output for attempt history */
export interface AttemptHistoryItem {
  id: string;
  attemptNumber: number;
  previewScore: number;
  officialScore: number | null;
  scoreDiscrepancy: boolean;
  status: string;
  timeSpentSeconds: number;
  startedAt: string;
  submittedAt: string | null;
  gradedAt: string | null;
}

/** Output for user stats */
export interface UserStatsOutput {
  userId: string;
  xp: number;
  level: number;
  totalAttempts: number;
  bestScores: Record<string, number>;
}

// ============================================================================
// PROGRESS TRACKING TYPES
// ============================================================================

/** Input for marking a lesson complete */
export interface MarkLessonCompleteInput {
  moduleNumber: number;
  lessonNumber: number;
  userId?: string;
}

/** Output for marking a lesson complete */
export interface MarkLessonCompleteOutput {
  lessonSlug: string;
  xpEarned: number;
  moduleStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  lessonsCompletedInModule: number;
  totalLessonsInModule: number;
}

/** Progress for a single lesson */
export interface LessonProgressItem {
  lessonNumber: number;
  lessonSlug: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  completedAt: string | null;
}

/** Progress for a single module */
export interface ModuleProgressItem {
  moduleNumber: number;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  lessonsCompleted: number;
  totalLessons: number;
  score: number;
  xpEarned: number;
}

/** Full progress overview for dashboard */
export interface ProgressOverview {
  userId: string;
  xp: number;
  level: number;
  streakDays: number;
  modulesCompleted: number;
  totalModules: number;
  simsPassed: number;
  totalSims: number;
  bestSimScores: Record<string, number>;
  moduleProgress: ModuleProgressItem[];
}

// ============================================================================
// CERTIFICATE

/** Badge view for display */
export interface BadgeView {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  tier: string;
  xpReward: number;
  order: number;
  isSecret: boolean;
  earnedAt: string | null;
  isEarned: boolean;
}

/** Result of badge award check */
export interface BadgeAwardResult {
  newlyAwarded: BadgeView[];
  totalEarned: number;
  totalAvailable: number;
}


// ============================================================================
// SIMULATION GRADING TYPES (replaces `any` in Grade*Input and GradeAttemptOutput)
// ============================================================================

import type {
  StrUserAction,
  StrExpectedAction,
  BidDecision,
  CampaignStructure,
  StrTriageEvaluation,
  BidElevatorEvaluation,
  CampaignBuilderEvaluation,
} from '@/engine/types';

/** Input for grading a STR Triage attempt */
export interface GradeStrTriageInput {
  attemptId: string;
  previewScore: number;
  searchTerms: import('@/engine/types').SearchTermEntry[];
  userActions: StrUserAction[];
  expectedActions: StrExpectedAction[];
  context: import('@/engine/types').SimulationContext;
  timeSpentSeconds: number;
}

/** Input for grading a Bid Elevator attempt */
export interface GradeBidElevatorInput {
  attemptId: string;
  previewScore: number;
  scenarios: import('@/engine/types').BidScenario[];
  decisions: BidDecision[];
  context: import('@/engine/types').SimulationContext;
  timeSpentSeconds: number;
}

/** Input for grading a Campaign Builder attempt */
export interface GradeCampaignBuilderInput {
  attemptId: string;
  previewScore: number;
  campaign: CampaignStructure;
  evaluation: CampaignBuilderEvaluation;
  timeSpentSeconds: number;
}

/** Output for grading any attempt */
export interface GradeAttemptOutput {
  attemptId: string;
  officialScore: number;
  previewScore: number;
  scoreDiscrepancy: boolean;
  xpEarned: number;
  evaluation: StrTriageEvaluation | BidElevatorEvaluation | CampaignBuilderEvaluation;
}

// ============================================================================
// QUIZ TYPES (added 2026-07-06 to fix TSC errors)
// ============================================================================

/** Single question as exposed to the client (no correct answer). */
export interface QuizQuestionView {
  id: string;
  order: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  points: number;
}

/** Full quiz view returned by getQuiz(). */
export interface QuizView {
  quizId: string;
  lessonId: string;
  title: string;
  description: string;
  passThreshold: number;
  timeLimitSeconds: number | null;
  questions: QuizQuestionView[];
  bestScore: number | null;
  attemptCount: number;
}

/** Question with both selected and correct answers, returned after grading. */
export interface GradedQuestion {
  id: string;
  order: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  points: number;
  selectedAnswer: 'A' | 'B' | 'C' | 'D';
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  explanation: string | null;
}

/** Result returned by submitQuiz(). */
export interface SubmitQuizOutput {
  attemptId: string;
  attemptNumber: number;
  score: number;
  correctCount: number;
  totalQuestions: number;
  xpEarned: number;
  passed: boolean;
  gradedQuestions: GradedQuestion[];
}

/** Per-attempt summary for quiz history views. */
export interface QuizAttemptSummary {
  id: string;
  attemptNumber: number;
  score: number;
  correctCount: number;
  totalQuestions: number;
  xpEarned: number;
  passed: boolean;
  timeSpentSeconds: number;
  completedAt: string | null;
}

// ============================================================================
// FIXTURE TYPES (used by quiz.ts and badge.ts for typed fixtureCache)
// ============================================================================

export interface QuizQuestionFixture {
  order: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation?: string;
  points?: number;
}

export interface QuizFixtures {
  _meta?: { description?: string; version?: string; passThreshold?: number; xpRewardPerQuiz?: number };
  quizzes: QuizFixture[];
}

export interface QuizFixture {
  moduleNumber: number;
  title: string;
  description?: string;
  passThreshold?: number;
  timeLimitSeconds?: number | null;
  questions: QuizQuestionFixture[];
}

export interface BadgeFixture {
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  tier: string;
  xpReward?: number;
  criteria: string;
  order: number;
  isSecret?: boolean;
}
