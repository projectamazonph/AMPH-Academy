'use client';

import { motion } from 'framer-motion';
import { Icon } from '@/components/icons';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { QuizView, QuizAttemptSummary } from '@/app/actions/types';

interface QuizReadyCardProps {
  quiz: QuizView;
  history: QuizAttemptSummary[];
  onStart: () => void;
  onBack: () => void;
}

export function QuizReadyCard({ quiz, history, onStart, onBack }: QuizReadyCardProps) {
  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" className="gap-2" onClick={onBack}>
        <Icon name="arrow-left" className="h-4 w-4" />
        Back to Modules
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: 0.4 }}
      >
        <Card className="border-primary/20 overflow-hidden">
          <div className="bg-gradient-to-br from-primary/8 via-card to-card px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
              <svg className="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
              {quiz.description}
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                {quiz.questions.length} questions
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                {quiz.passThreshold}% to pass
              </span>
              <span className="flex items-center gap-1">
                <Icon name="lightning" className="h-3 w-3 text-amber-400" />
                {100} XP on pass
              </span>
            </div>
          </div>

          {quiz.bestScore !== null && (
            <div className="px-6 py-3 bg-muted/20 border-b border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Your best score</span>
                <Badge
                  variant="outline"
                  className={cn(
                    quiz.bestScore >= quiz.passThreshold
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  )}
                >
                  {quiz.bestScore}%
                </Badge>
              </div>
            </div>
          )}

          {history.length > 0 && (
            <div className="px-6 py-3 border-b border-border">
              <p className="text-xs text-muted-foreground mb-2">Previous attempts</p>
              <div className="flex gap-2 flex-wrap">
                {history.slice(0, 5).map((h) => (
                  <Badge
                    key={h.id}
                    variant="outline"
                    className={cn(
                      'text-[10px]',
                      h.passed
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    )}
                  >
                    Attempt {h.attemptNumber}: {h.score}%
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="px-6 py-4 flex justify-center">
            <Button size="lg" className="gap-2 px-8" onClick={onStart}>
              {quiz.bestScore !== null ? 'Retake Quiz' : 'Start Quiz'}
              <Icon name="caret-right" className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
