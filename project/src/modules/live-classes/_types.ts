// ─── Live Class ───────────────────────────────────────────────────

export type LiveClassSummary = {
  id: string;
  title: string;
  description: string;
  instructorName: string;
  scheduledAt: Date;
  durationMinutes: number;
  meetingUrl: string | null;
  recordingUrl: string | null;
  maxAttendees: number;
  isPublished: boolean;
  courseId: string;
  courseTitle: string;
  registrationCount: number;
};

export type LiveClassDetail = LiveClassSummary & {
  isRegistered: boolean;
  remainingSpots: number;
  isFull: boolean;
};

// ─── Registration ─────────────────────────────────────────────────

export type RegistrationResponse = {
  success: boolean;
  status?: "REGISTERED" | "UNREGISTERED" | "FULL" | "ALREADY_STARTED";
  error?: string;
};

export type RegistrationCheck = {
  registered: boolean;
  registrationId: string | null;
};
