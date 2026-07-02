"use client";

import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CoursesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 mb-4">
          <BookOpen className="h-8 w-8 text-red-400" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Failed to Load Courses</h2>
        <p className="text-sm text-muted-foreground mb-6">
          We couldn&apos;t load the course catalog. Please try again.
        </p>
        <Button onClick={reset} variant="outline">
          Try Again
        </Button>
      </div>
    </div>
  );
}
