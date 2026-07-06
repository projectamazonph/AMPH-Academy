'use client';

/**
 * ProjectAMPH Academy: Quiz Player Component
 *
 * Interactive quiz interface with:
 * - Step-by-step question navigation
 * - Answer selection with visual feedback
 * - Timer (optional, per quiz config)
 * - Results screen with per-question explanations
 * - XP award animation on pass
 * - Retry capability
 * - History of past attempts
 *
 * Phases: loading → ready → answering → submitted
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { getMistakeAnalysis } from '@/app/actions/mistake-analysis';
import { MistakeReplay } from '@/components/amph/mistake-replay';
import type { MistakeAnalysisResult } from '@/app/actions/mistake-analysis';
import { getQuiz, submitQuiz, getQuizHistory } from '@/app/actions/quiz';
import type {
  QuizView,
  GradedQuestion,
  QuizAttemptSummary,
} from '@/app/actions/types';
import { QuizReadyCard } from './quiz-ready-card';
import { QuizQuestionCard } from './quiz-question-card';
import { QuizResultsCard } from './quiz-results-card';

// ============================================================================
// Types
// ============================================================================

type Phase = 'loading' | 'ready' | 'answering' | 'submitted';

interface QuizPlayerProps {
  moduleNumber: number;
  onBack: () => void;
  onComplete: (moduleNumber: number, xpEarned: number) => void;
}

// ============================================================================
// Component
// ============================================================================

export function QuizPlayer({ moduleNumber, onBack, onComplete }: QuizPlayerProps) {
  // Core state
  const [phase, setPhase] = useState<Phase>('loading');
  const [quiz, setQuiz] = useState<QuizView | null>(null);
  const [currentQ, setCurrentQ] = useState(0); // 0-based index
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D>>({});
  const [result, setResult] = useState<GradedQuestion[] | null>(null);
  const [submitData, setSubmitData] = useState<{
    score: number;
    correctCount: number;
    totalQuestions: number;
    xpEarned: number;
    passed: boolean;
    attemptNumber: number;
    attemptId: string;
  } | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<QuizAttemptSummary[]>([]);

  // Timer
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [mistakeAnalysis, setMistakeAnalysis] = useState<MistakeAnalysisResult | null>(null);
  const [showMistakeReview, setShowMistakeReview] = useState(false);
  const [loadingMistakeAnalysis, setLoadingMistakeAnalysis] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load quiz on mount
  useEffect(() => {
    loadQuiz();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [moduleNumber]);

  const loadQuiz = useCallback(async () => {
    setPhase('loading');
    setError(null);
    const res = await getQuiz(moduleNumber);
    if (res.success) {
      setQuiz(res.data);
      const histRes = await getQuizHistory(res.data.quizId);
      if (histRes.success) setHistory(histRes.data);
      setPhase('ready');
    } else {
      setError(res.error);
      setPhase('ready');
    }
  }, [moduleNumber]);

  // Start answering (reset state)
  const startQuiz = useCallback(() => {
    if (!quiz) return;
    setCurrentQ(0);
    setAnswers({});
    setResult(null);
    setSubmitData(null);
    setElapsedSeconds(0);
    setPhase('answering');

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
  }, [quiz]);

  // Select answer for current question
  const selectAnswer = useCallback((option: 'A' | 'B' | 'C' | 'D') => {
    if (!quiz) return;
    const questionOrder = quiz.questions[currentQ].order;
    setAnswers((prev) => ({ ...prev, [questionOrder]: option }));
  }, [quiz, currentQ]);

  // Navigate to next question
  const nextQuestion = useCallback(() => {
    if (!quiz) return;
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ((prev) => prev + 1);
    }
  }, [quiz, currentQ]);

  // Navigate to previous question
  const prevQuestion = useCallback(() => {
    if (currentQ > 0) {
      setCurrentQ((prev) => prev - 1);
    }
  }, [currentQ]);

  // Submit quiz
  const handleSubmit = useCallback(async () => {
    if (!quiz || saving) return;

    if (timerRef.current) clearInterval(timerRef.current);

    setSaving(true);
    try {
      const res = await submitQuiz(quiz.quizId, answers, elapsedSeconds);
      if (res.success) {
        setResult(res.data.gradedQuestions);
        setSubmitData({
          score: res.data.score,
          correctCount: res.data.correctCount,
          totalQuestions: res.data.totalQuestions,
          xpEarned: res.data.xpEarned,
          passed: res.data.passed,
          attemptId: res.data.attemptId,
          attemptNumber: res.data.attemptNumber,
        });
        setPhase('submitted');

        if (res.data.xpEarned > 0) {
          onComplete(moduleNumber, res.data.xpEarned);
        }

        const histRes = await getQuizHistory(quiz.quizId);
        if (histRes.success) setHistory(histRes.data);
      } else {
        setError(res.error);
      }
    } finally {
      setSaving(false);
    }
  }, [quiz, answers, elapsedSeconds, saving, moduleNumber, onComplete]);

  // Retry quiz
  const handleRetry = useCallback(() => {
    startQuiz();
  }, [startQuiz]);

  // Review quiz mistakes
  const handleReviewMistakes = useCallback(async (attemptId: string) => {
    setLoadingMistakeAnalysis(true);
    try {
      const result = await getMistakeAnalysis(attemptId);
      if (result.success && result.data) {
        setMistakeAnalysis(result.data);
        setShowMistakeReview(true);
      }
    } finally {
      setLoadingMistakeAnalysis(false);
    }
  }, []);

  // Format seconds as mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Derived values
  const totalQuestions = quiz?.questions.length ?? 0;
  const allAnswered = Object.keys(answers).length === totalQuestions;
  const currentQuestion = quiz?.questions[currentQ];
  const currentAnswer = currentQuestion ? answers[currentQuestion.order] : undefined;

  // ============================================================================
  // RENDER: Loading
  // ============================================================================
  if (phase === 'loading') {
    return (
      <div className="flex items-center justify-center py-20">
        <Icon name="spinner" className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">Loading quiz...</span>
      </div>
    );
  }

  // ============================================================================
  // RENDER: Error
  // ============================================================================
  if (error && !quiz) {
    return (
      <div className="text-center py-20 space-y-4">
        <svg className="h-12 w-12 mx-auto text-muted-foreground/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
        <p className="text-muted-foreground">No quiz available for this module yet</p>
        <Button variant="outline" size="sm" onClick={onBack}>
          Back to Modules
        </Button>
      </div>
    );
  }

  if (!quiz) return null;

  // ============================================================================
  // RENDER: Ready
  // ============================================================================
  if (phase === 'ready') {
    return (
      <QuizReadyCard
        quiz={quiz}
        history={history}
        onStart={startQuiz}
        onBack={onBack}
      />
    );
  }

  // ============================================================================
  // RENDER: Answering
  // ============================================================================
  if (phase === 'answering' && currentQuestion) {
    return (
      <QuizQuestionCard
        quiz={quiz}
        currentQ={currentQ}
        totalQuestions={totalQuestions}
        currentQuestion={currentQuestion}
        currentAnswer={currentAnswer}
        answers={answers}
        onSelectAnswer={selectAnswer}
        onNext={nextQuestion}
        onPrev={prevQuestion}
        onSubmit={handleSubmit}
        elapsedSeconds={elapsedSeconds}
        formatTime={formatTime}
        allAnswered={allAnswered}
        saving={saving}
        onBack={onBack}
      />
    );
  }

  // ============================================================================
  // RENDER: Submitted
  // ============================================================================
  if (phase === 'submitted' && submitData && result) {
    return (
      <>
        <QuizResultsCard
          submitData={submitData}
          result={result}
          elapsedSeconds={elapsedSeconds}
          formatTime={formatTime}
          onRetry={handleRetry}
          onReviewMistakes={handleReviewMistakes}
          loadingMistakeAnalysis={loadingMistakeAnalysis}
          onBack={onBack}
          quiz={quiz}
        />
        <AnimatePresence>
          {showMistakeReview && mistakeAnalysis && (
            <MistakeReplay
              analysis={mistakeAnalysis}
              onClose={() => setShowMistakeReview(false)}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  return null;
}
