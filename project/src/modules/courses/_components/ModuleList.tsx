import { CheckCircle, Circle, Lock, Play, Clock } from '@phosphor-icons/react';
import Link from "next/link";
import type { ModuleSummary } from "../_types";

const statusIcons = {
  COMPLETED: CheckCircle,
  IN_PROGRESS: Play,
  NOT_STARTED: Circle,
  LOCKED: Lock,
};

const statusColors = {
  COMPLETED: "text-emerald-400",
  IN_PROGRESS: "text-primary",
  NOT_STARTED: "text-muted-foreground",
  LOCKED: "text-muted-foreground/40",
};

export function ModuleList({
  modules,
  courseSlug,
  isEnrolled,
}: {
  modules: ModuleSummary[];
  courseSlug: string;
  isEnrolled: boolean;
}) {
  return (
    <div className="space-y-3">
      {modules.map((mod) => {
        const status = isEnrolled ? mod.progressStatus : "LOCKED";
        const Icon = statusIcons[status];
        const color = statusColors[status];
        const isLocked = status === "LOCKED";
        const href = isLocked ? "#" : `/courses/${courseSlug}/modules/${mod.id}`;

        return (
          <Link key={mod.id} href={href} className={`block ${isLocked ? "cursor-default" : ""}`}>
            <div
              className={`group relative rounded-xl border ${
                isLocked
                  ? "border-border/20 bg-card/30 opacity-60"
                  : "border-border/40 bg-card/50 hover:border-primary/30 hover:bg-card/80"
              } transition-all duration-300 p-5`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`mt-0.5 ${color} transition-colors ${
                    !isLocked && "group-hover:text-primary"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                      Module {mod.moduleNumber}
                    </span>
                  </div>
                  <h4 className="font-medium text-sm">{mod.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                    {mod.description}
                  </p>
                  <div className="flex items-center gap-3 mt-3 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Play className="h-3 w-3" />
                      {mod.lessonCount} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {mod.estimatedMinutes} min
                    </span>
                    {mod.progressStatus === "COMPLETED" && (
                      <span className="text-emerald-400 font-medium">Completed</span>
                    )}
                    {mod.progressStatus === "IN_PROGRESS" && (
                      <span className="text-primary font-medium">In progress</span>
                    )}
                    {isLocked && <span className="text-muted-foreground/60">Enroll to access</span>}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
