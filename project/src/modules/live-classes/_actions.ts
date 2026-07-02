"use server";

import { db } from "@/lib/db";
import { getSession } from "@/modules/auth/_actions";
import type {
  LiveClassSummary,
  RegistrationResponse,
  RegistrationCheck,
} from "./_types";

// ============================================================================
// HELPERS
// ============================================================================

function mapLiveClass(lc: {
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
  course: { title: string };
  _count: { registrations: number };
}): LiveClassSummary {
  return {
    id: lc.id,
    title: lc.title,
    description: lc.description,
    instructorName: lc.instructorName,
    scheduledAt: lc.scheduledAt,
    durationMinutes: lc.durationMinutes,
    meetingUrl: lc.meetingUrl,
    recordingUrl: lc.recordingUrl,
    maxAttendees: lc.maxAttendees,
    isPublished: lc.isPublished,
    courseId: lc.courseId,
    courseTitle: lc.course.title,
    registrationCount: lc._count.registrations,
  };
}

// ============================================================================
// PUBLIC QUERIES (no auth required)
// ============================================================================

/**
 * Get upcoming published live classes, sorted by soonest first.
 */
export async function getUpcomingClasses(): Promise<LiveClassSummary[]> {
  try {
    const now = new Date();
    const classes = await db.liveClass.findMany({
      where: {
        isPublished: true,
        scheduledAt: { gte: now },
      },
      orderBy: { scheduledAt: "asc" },
      include: {
        course: { select: { title: true } },
        _count: { select: { registrations: true } },
      },
    });

    return classes.map(mapLiveClass);
  } catch {
    return [];
  }
}

/**
 * Get past published live classes, sorted by most recent first.
 */
export async function getPastClasses(): Promise<LiveClassSummary[]> {
  try {
    const now = new Date();
    const classes = await db.liveClass.findMany({
      where: {
        isPublished: true,
        scheduledAt: { lt: now },
      },
      orderBy: { scheduledAt: "desc" },
      include: {
        course: { select: { title: true } },
        _count: { select: { registrations: true } },
      },
    });

    return classes.map(mapLiveClass);
  } catch {
    return [];
  }
}

// ============================================================================
// AUTH-REQUIRED QUERIES
// ============================================================================

/**
 * Get the classes the current user is registered for.
 */
export async function getRegisteredClasses(): Promise<LiveClassSummary[]> {
  const session = await getSession();
  if (!session.authenticated || !session.user) return [];

  try {
    const registrations = await db.liveClassRegistration.findMany({
      where: { userId: session.user.id },
      include: {
        liveClass: {
          include: {
            course: { select: { title: true } },
            _count: { select: { registrations: true } },
          },
        },
      },
      orderBy: { registeredAt: "desc" },
    });

    return registrations
      .filter((r) => r.liveClass.isPublished)
      .map((r) => mapLiveClass(r.liveClass));
  } catch {
    return [];
  }
}

/**
 * Check whether the current user is registered for a specific class.
 */
export async function checkRegistration(
  liveClassId: string
): Promise<RegistrationCheck> {
  const session = await getSession();
  if (!session.authenticated || !session.user) {
    return { registered: false, registrationId: null };
  }

  try {
    const reg = await db.liveClassRegistration.findUnique({
      where: {
        liveClassId_userId: { liveClassId, userId: session.user.id },
      },
    });

    return {
      registered: !!reg,
      registrationId: reg?.id ?? null,
    };
  } catch {
    return { registered: false, registrationId: null };
  }
}

// ============================================================================
// MUTATIONS
// ============================================================================

/**
 * Register the current user for a live class.
 */
export async function registerForClass(
  liveClassId: string
): Promise<RegistrationResponse> {
  const session = await getSession();
  if (!session.authenticated || !session.user) {
    return { success: false, status: "UNREGISTERED", error: "You must be logged in to register." };
  }

  try {
    // Check class exists and is published
    const liveClass = await db.liveClass.findUnique({
      where: { id: liveClassId },
      include: { _count: { select: { registrations: true } } },
    });

    if (!liveClass || !liveClass.isPublished) {
      return { success: false, status: "UNREGISTERED", error: "Live class not found." };
    }

    // Check if already registered
    const existing = await db.liveClassRegistration.findUnique({
      where: {
        liveClassId_userId: { liveClassId, userId: session.user.id },
      },
    });

    if (existing) {
      return { success: true, status: "REGISTERED" };
    }

    // Check capacity
    if (liveClass._count.registrations >= liveClass.maxAttendees) {
      return { success: false, status: "FULL", error: "This class is fully booked." };
    }

    await db.liveClassRegistration.create({
      data: {
        liveClassId,
        userId: session.user.id,
      },
    });

    return { success: true, status: "REGISTERED" };
  } catch {
    return { success: false, status: "UNREGISTERED", error: "Failed to register. Please try again." };
  }
}

/**
 * Unregister the current user from a live class.
 */
export async function unregisterFromClass(
  liveClassId: string
): Promise<RegistrationResponse> {
  const session = await getSession();
  if (!session.authenticated || !session.user) {
    return { success: false, status: "UNREGISTERED", error: "You must be logged in." };
  }

  try {
    // Check if class already started
    const liveClass = await db.liveClass.findUnique({
      where: { id: liveClassId },
    });

    if (!liveClass) {
      return { success: false, status: "UNREGISTERED", error: "Live class not found." };
    }

    if (new Date(liveClass.scheduledAt) <= new Date()) {
      return {
        success: false,
        status: "ALREADY_STARTED",
        error: "Cannot unregister from a class that has already started.",
      };
    }

    const existing = await db.liveClassRegistration.findUnique({
      where: {
        liveClassId_userId: { liveClassId, userId: session.user.id },
      },
    });

    if (!existing) {
      return { success: false, status: "UNREGISTERED", error: "You are not registered for this class." };
    }

    await db.liveClassRegistration.delete({
      where: { id: existing.id },
    });

    return { success: true, status: "UNREGISTERED" };
  } catch {
    return { success: false, status: "UNREGISTERED", error: "Failed to unregister. Please try again." };
  }
}
