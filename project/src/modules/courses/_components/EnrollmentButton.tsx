"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner, CheckCircle, GraduationCap } from '@phosphor-icons/react';
import { enrollCourse } from "../_actions";
import type { EnrollmentStatus } from "../_types";

export function EnrollmentButton({
  courseId,
  initialStatus,
}: {
  courseId: string;
  initialStatus: EnrollmentStatus;
}) {
  const [status, setStatus] = useState<EnrollmentStatus>(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    setLoading(true);
    const result = await enrollCourse(courseId);
    if (result.success && result.status) {
      setStatus(result.status);
    }
    setLoading(false);
  };

  if (status === "COMPLETED") {
    return (
      <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
        <CheckCircle className="h-4 w-4" />
        Completed
      </div>
    );
  }

  if (status === "ACTIVE") {
    return (
      <Button className="gap-2">
        <GraduationCap className="h-4 w-4" />
        Continue Learning
      </Button>
    );
  }

  return (
    <Button onClick={handleEnroll} disabled={loading} className="gap-2">
      {loading ? (
        <Spinner className="h-4 w-4 animate-spin" />
      ) : (
        <GraduationCap className="h-4 w-4" />
      )}
      {loading ? "Enrolling..." : "Enroll Now"}
    </Button>
  );
}
