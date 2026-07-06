"use client";
import { Icon } from '@/components/icons';

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
        <Icon name="check-circle" className="h-4 w-4" />
        Completed
      </div>
    );
  }

  if (status === "ACTIVE") {
    return (
      <Button className="gap-2">
        <Icon name="graduation-cap" className="h-4 w-4" />
        Continue Learning
      </Button>
    );
  }

  return (
    <Button onClick={handleEnroll} disabled={loading} className="gap-2">
      {loading ? (
        <Icon name="spinner" className="h-4 w-4 animate-spin" />
      ) : (
        <Icon name="graduation-cap" className="h-4 w-4" />
      )}
      {loading ? "Enrolling..." : "Enroll Now"}
    </Button>
  );
}
