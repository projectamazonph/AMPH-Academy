import Link from "next/link";
import { BookOpen, Clock, BarChart, CaretRight } from '@phosphor-icons/react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CourseSummary } from "../_types";

const difficultyColors: Record<string, string> = {
  FOUNDATIONS: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
  INTERMEDIATE: "text-amber-400 border-amber-500/20 bg-amber-500/10",
  ADVANCED: "text-rose-400 border-rose-500/20 bg-rose-500/10",
  MASTERY: "text-violet-400 border-violet-500/20 bg-violet-500/10",
};

const difficultyLabels: Record<string, string> = {
  FOUNDATIONS: "Foundations",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  MASTERY: "Mastery",
};

export function CourseCard({ course }: { course: CourseSummary }) {
  return (
    <Link href={`/courses/${course.slug}`}>
      <Card className="group relative overflow-hidden border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 h-full">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <Badge
              className={`text-[10px] font-medium ${
                difficultyColors[course.difficulty] || "text-muted-foreground border-border/40"
              }`}
            >
              {difficultyLabels[course.difficulty] || course.difficulty}
            </Badge>
          </div>

          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
            {course.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border/20">
            <span className="flex items-center gap-1">
              <BarChart className="h-3.5 w-3.5" />
              {course.moduleCount} modules
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {course.estimatedHours}h
            </span>
            <span className="flex items-center gap-1 ml-auto text-primary group-hover:gap-2 transition-all">
              View <CaretRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
