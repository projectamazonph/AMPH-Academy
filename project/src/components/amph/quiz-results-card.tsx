'use client';

import { motion } from 'framer-motion';
import { Icon } from '@/components/icons';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { GradedQuestion, QuizView } from '@/app/actions/types';

interface SubmitData {
  score: number;
  correctCount: number;
  totalQuestions: number;
  xpEarned: number;
  passed: boolean;
  attemptId: string;
  attemptNumber: number;
}

interface QuizResultsCardProps {
  submitData: SubmitData;
  result: GradedQuestion[];
  elapsedSeconds: number;
  formatTime: (secs: number) => string;
  onRetry: () => void;
  onReviewMistakes: (attemptId: string) => void;
  loadingMistakeAnalysis: boolean;
  onBack: () => void;
  quiz: QuizView;
}

export function QuizResultsCard({
  submitData,
  result,
  elapsedSeconds,
  formatTime,
  onRetry,
  onReviewMistakes,
  loadingMistakeAnalysis,
  onBack,
  quiz,
}: QuizResultsCardProps) {
  const scoreColor = submitData.passed ? 'text-emerald-400' : 'text-amber-400';
  const scoreBg = submitData.passed ? 'bg-emerald-500/10' : 'bg-amber-500/10';
  const scoreBorder = submitData.passed ? 'border-emerald-500/20' : 'border-amber-500/20';

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" className="gap-2" onClick={onBack}>
        <Icon name="arrow-left" className="h-4 w-4" />
        Back to Modules
      </Button>

      {/* Score hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], type: 'spring' }}
      >
        <Card className={cn('overflow-hidden', scoreBorder)}>
          <div className={cn('px-6 py-8 text-center', scoreBg)}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl border mb-4"
              style={{ borderColor: submitData.passed ? 'rgb(52 211 153 / 0.3)' : 'rgb(251 191 36 / 0.3)' }}
            >
              {submitData.passed ? (
                <Icon name="trophy" className="h-8 w-8 text-emerald-400" />
              ) : (
                <svg className="h-8 w-8 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              )}
            </div>

            <div className={cn('text-4xl font-bold mb-1', scoreColor)}>
              {submitData.score}%
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              {submitData.correctCount} of {submitData.totalQuestions} correct
              {submitData.passed ? ' — You passed!' : ` — Need ${quiz.passThreshold}% to pass`}
            </p>

            {submitData.xpEarned > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Badge className="gap-1 bg-amber-500/15 text-amber-400 border-amber-500/20 text-sm px-3 py-1">
                  <Icon name="lightning" className="h-4 w-4" />
                  +{submitData.xpEarned} XP Earned!
                </Badge>
              </motion.div>
            )}

            <p className="text-[10px] text-muted-foreground/60 mt-3">
              Attempt #{submitData.attemptNumber} • {formatTime(elapsedSeconds)}
            </p>
          </div>

          {/* Action buttons */}
          <div className="px-6 py-4 flex items-center justify-center gap-3">
            <Button variant="outline" size="sm" className="gap-2" onClick={onRetry}>
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              {submitData.passed ? 'Retake Quiz' : 'Try Again'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-2"
              onClick={() => onReviewMistakes(submitData.attemptId)}
              disabled={loadingMistakeAnalysis}
            >
              {loadingMistakeAnalysis ? (
                <Icon name="spinner" className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
              )}
              Review Answers
            </Button>
            {!submitData.passed && (
              <Button size="sm" className="gap-2" onClick={onBack}>
                Review Lessons
              </Button>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Per-question breakdown */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">Question Breakdown</h3>
        {result.map((gq, i) => (
          <motion.div
            key={gq.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className={cn(
              'overflow-hidden',
              gq.isCorrect ? 'border-emerald-500/20' : 'border-red-500/20'
            )}>
              <CardContent className="p-4 space-y-3">
                {/* Question header */}
                <div className="flex items-start gap-2">
                  {gq.isCorrect ? (
                    <Icon name="check-circle" className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  ) : (
                    <Icon name="x-circle" className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-relaxed">{gq.question}</p>
                  </div>
                </div>

                {/* Your answer vs correct answer */}
                <div className="ml-6 space-y-1.5 text-xs">
                  {!gq.isCorrect && (
                    <div className="flex items-center gap-2 text-red-400">
                      <span className="font-mono bg-red-500/10 px-1.5 py-0.5 rounded">
                        {gq.selectedAnswer}
                      </span>
                      <span>
                        {gq[`option${gq.selectedAnswer}` as keyof GradedQuestion] as string}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      {gq.correctAnswer}
                    </span>
                    <span>
                      {gq[`option${gq.correctAnswer}` as keyof GradedQuestion] as string}
                    </span>
                  </div>
                </div>

                {/* Explanation */}
                {gq.explanation && (
                  <div className="ml-6 p-2.5 rounded-lg bg-muted/30 text-xs text-muted-foreground leading-relaxed">
                    {gq.explanation}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
