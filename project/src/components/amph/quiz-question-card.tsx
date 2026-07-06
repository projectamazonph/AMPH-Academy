'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/components/icons';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { QuizView, QuizQuestionView } from '@/app/actions/types';

interface QuizQuestionCardProps {
  quiz: QuizView;
  currentQ: number;
  totalQuestions: number;
  currentQuestion: QuizQuestionView;
  currentAnswer?: 'A' | 'B' | 'C' | 'D';
  answers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  onSelectAnswer: (option: 'A' | 'B' | 'C' | 'D') => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  elapsedSeconds: number;
  formatTime: (secs: number) => string;
  allAnswered: boolean;
  saving: boolean;
  onBack: () => void;
}

export function QuizQuestionCard({
  quiz,
  currentQ,
  totalQuestions,
  currentQuestion,
  currentAnswer,
  answers,
  onSelectAnswer,
  onNext,
  onPrev,
  onSubmit,
  elapsedSeconds,
  formatTime,
  allAnswered,
  saving,
  onBack,
}: QuizQuestionCardProps) {
  const progressPercent = Math.round(((currentQ + 1) / totalQuestions) * 100);
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" className="gap-2" onClick={onBack}>
          <Icon name="arrow-left" className="h-4 w-4" />
          Exit Quiz
        </Button>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-1 text-[10px]">
            <Icon name="clock" className="h-3 w-3" />
            {formatTime(elapsedSeconds)}
          </Badge>
          <Badge variant="outline" className="gap-1 text-[10px]">
            {answeredCount}/{totalQuestions} answered
          </Badge>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Question {currentQ + 1} of {totalQuestions}</span>
          <span>{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} className="h-1.5" />
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Question text */}
              <div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  Question {currentQuestion.order}
                </span>
                <h3 className="text-base font-semibold mt-1 leading-relaxed">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {(['A', 'B', 'C', 'D'] as const).map((option) => {
                  const optionText = currentQuestion[`option${option}` as keyof QuizQuestionView] as string;
                  if (!optionText) return null;

                  const isSelected = currentAnswer === option;

                  return (
                    <button
                      key={option}
                      onClick={() => onSelectAnswer(option)}
                      className={cn(
                        'w-full flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all',
                        isSelected
                          ? 'border-primary/40 bg-primary/8 ring-1 ring-primary/20'
                          : 'border-border bg-card hover:bg-muted/30 hover:border-muted-foreground/20'
                      )}
                    >
                      <span
                        className={cn(
                          'shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors',
                          isSelected
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-muted/50 text-muted-foreground border-border'
                        )}
                      >
                        {option}
                      </span>
                      <span className="text-sm pt-0.5 leading-relaxed">{optionText}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1"
          onClick={onPrev}
          disabled={currentQ === 0}
        >
          <Icon name="arrow-left" className="h-3.5 w-3.5" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {/* Question dots */}
          <div className="flex gap-1">
            {quiz.questions.map((q, i) => {
              const isAnswered = answers[q.order] !== undefined;
              const isCurrent = i === currentQ;
              return (
                <button
                  key={q.order}
                  onClick={() => {
                    const diff = i - currentQ;
                    if (diff > 0) for (let j = 0; j < diff; j++) onNext();
                    else if (diff < 0) for (let j = 0; j < Math.abs(diff); j++) onPrev();
                  }}
                  className={cn(
                    'w-2 h-2 rounded-full transition-colors',
                    isCurrent
                      ? 'bg-primary'
                      : isAnswered
                      ? 'bg-emerald-400'
                      : 'bg-muted-foreground/30'
                  )}
                />
              );
            })}
          </div>
        </div>

        {currentQ < totalQuestions - 1 ? (
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={onNext}
          >
            Next
            <Icon name="arrow-right" className="h-3.5 w-3.5" />
          </Button>
        ) : (
          <Button
            size="sm"
            className="gap-2"
            onClick={onSubmit}
            disabled={!allAnswered || saving}
          >
            {saving ? (
              <Icon name="spinner" className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Icon name="check-circle" className="h-3.5 w-3.5" />
            )}
            {saving ? 'Grading...' : 'Submit Quiz'}
          </Button>
        )}
      </div>

      {/* Submit button (always visible when all answered, not on last Q) */}
      {allAnswered && currentQ < totalQuestions - 1 && (
        <div className="flex justify-center pt-2">
          <Button size="sm" className="gap-2" onClick={onSubmit} disabled={saving}>
            {saving ? (
              <Icon name="spinner" className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Icon name="check-circle" className="h-3.5 w-3.5" />
            )}
            {saving ? 'Grading...' : 'Submit Quiz Early'}
          </Button>
        </div>
      )}
    </div>
  );
}
