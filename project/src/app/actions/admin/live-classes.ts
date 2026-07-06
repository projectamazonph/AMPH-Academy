'use server';

import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/auth-guard';
import { logger } from '@/lib/logger';
import type { ActionResult } from '../types';

// ============================================================================
// TYPES
// ============================================================================

export interface AdminLiveClass {
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
  createdAt: Date;
}

export interface CreateLiveClassInput {
  title: string;
  description: string;
  courseId: string;
  scheduledAt: string;   // ISO string
  instructorName?: string;
  durationMinutes?: number;
  meetingUrl?: string;
  maxAttendees?: number;
}

export interface UpdateLiveClassInput {
  title?: string;
  description?: string;
  courseId?: string;
  scheduledAt?: string;
  instructorName?: string;
  durationMinutes?: number;
  meetingUrl?: string;
  recordingUrl?: string;
  maxAttendees?: number;
  isPublished?: boolean;
}

// ============================================================================
// HELPERS
// ============================================================================

function validateCreate(data: CreateLiveClassInput): string | null {
  if (!data.title || data.title.trim().length === 0) return 'Title is required';
  if (!data.courseId || data.courseId.trim().length === 0) return 'Course is required';
  if (!data.scheduledAt) return 'Scheduled date/time is required';
  if (data.durationMinutes !== undefined && data.durationMinutes < 15) return 'Duration must be at least 15 minutes';
  if (data.maxAttendees !== undefined && data.maxAttendees < 1) return 'Max attendees must be at least 1';
  return null;
}

// ============================================================================
// QUERIES
// ============================================================================

export async function getLiveClasses(): Promise<ActionResult<AdminLiveClass[]>> {
  try {
    const admin = await requireAdmin();
    if (!admin.success) return admin;
    const uid = admin.data.userId;

    const classes = await db.liveClass.findMany({
      orderBy: { scheduledAt: 'desc' },
      include: {
        course: { select: { title: true } },
        registrations: { select: { id: true } },
      },
    });

    const entries: AdminLiveClass[] = classes.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      instructorName: c.instructorName,
      scheduledAt: c.scheduledAt,
      durationMinutes: c.durationMinutes,
      meetingUrl: c.meetingUrl,
      recordingUrl: c.recordingUrl,
      maxAttendees: c.maxAttendees,
      isPublished: c.isPublished,
      courseId: c.courseId,
      courseTitle: c.course.title,
      registrationCount: c.registrations.length,
      createdAt: c.createdAt,
    }));

    return { success: true, data: entries };
  } catch (error) {
    logger.error('getLiveClasses failed', { error: String(error) });
    return { success: false, error: 'Failed to fetch live classes', code: 'ADMIN_ERROR' };
  }
}

export async function getLiveClassById(
  id: string
): Promise<ActionResult<AdminLiveClass & { registrations: { userId: string; userName: string | null; attended: boolean; registeredAt: Date }[] }>> {
  try {
    const admin = await requireAdmin();
    if (!admin.success) return admin;
    const uid = admin.data.userId;

    const liveClass = await db.liveClass.findUnique({
      where: { id },
      include: {
        course: { select: { title: true } },
        registrations: {
          include: { user: { select: { id: true, name: true } } },
          orderBy: { registeredAt: 'desc' },
        },
      },
    });

    if (!liveClass) {
      return { success: false, error: 'Live class not found', code: 'NOT_FOUND' };
    }

    return {
      success: true,
      data: {
        id: liveClass.id,
        title: liveClass.title,
        description: liveClass.description,
        instructorName: liveClass.instructorName,
        scheduledAt: liveClass.scheduledAt,
        durationMinutes: liveClass.durationMinutes,
        meetingUrl: liveClass.meetingUrl,
        recordingUrl: liveClass.recordingUrl,
        maxAttendees: liveClass.maxAttendees,
        isPublished: liveClass.isPublished,
        courseId: liveClass.courseId,
        courseTitle: liveClass.course.title,
        registrationCount: liveClass.registrations.length,
        createdAt: liveClass.createdAt,
        registrations: liveClass.registrations.map((r) => ({
          userId: r.userId,
          userName: r.user.name,
          attended: r.attended,
          registeredAt: r.registeredAt,
        })),
      },
    };
  } catch (error) {
    logger.error('getLiveClassById failed', { id, error: String(error) });
    return { success: false, error: 'Failed to fetch live class', code: 'ADMIN_ERROR' };
  }
}

// ============================================================================
// MUTATIONS
// ============================================================================

export async function createLiveClass(
  data: CreateLiveClassInput
): Promise<ActionResult<AdminLiveClass>> {
  try {
    const admin = await requireAdmin();
    if (!admin.success) return admin;
    const uid = admin.data.userId;

    const validationError = validateCreate(data);
    if (validationError) {
      return { success: false, error: validationError, code: 'VALIDATION_ERROR' };
    }

    const liveClass = await db.liveClass.create({
      data: {
        title: data.title.trim(),
        description: data.description || '',
        courseId: data.courseId,
        scheduledAt: new Date(data.scheduledAt),
        instructorName: data.instructorName || 'Ryan Dabao',
        durationMinutes: data.durationMinutes ?? 60,
        meetingUrl: data.meetingUrl || null,
        maxAttendees: data.maxAttendees ?? 50,
      },
      include: {
        course: { select: { title: true } },
        registrations: { select: { id: true } },
      },
    });

    return {
      success: true,
      data: {
        id: liveClass.id,
        title: liveClass.title,
        description: liveClass.description,
        instructorName: liveClass.instructorName,
        scheduledAt: liveClass.scheduledAt,
        durationMinutes: liveClass.durationMinutes,
        meetingUrl: liveClass.meetingUrl,
        recordingUrl: liveClass.recordingUrl,
        maxAttendees: liveClass.maxAttendees,
        isPublished: liveClass.isPublished,
        courseId: liveClass.courseId,
        courseTitle: liveClass.course.title,
        registrationCount: 0,
        createdAt: liveClass.createdAt,
      },
    };
  } catch (error) {
    logger.error('createLiveClass failed', { error: String(error) });
    return { success: false, error: 'Failed to create live class', code: 'ADMIN_ERROR' };
  }
}

export async function updateLiveClass(
  id: string,
  data: UpdateLiveClassInput
): Promise<ActionResult<AdminLiveClass>> {
  try {
    const admin = await requireAdmin();
    if (!admin.success) return admin;
    const uid = admin.data.userId;

    // Check record exists
    const existing = await db.liveClass.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: 'Live class not found', code: 'NOT_FOUND' };
    }

    // Validate if duration or maxAttendees are being updated
    if (data.durationMinutes !== undefined && data.durationMinutes < 15) {
      return { success: false, error: 'Duration must be at least 15 minutes', code: 'VALIDATION_ERROR' };
    }
    if (data.maxAttendees !== undefined && data.maxAttendees < 1) {
      return { success: false, error: 'Max attendees must be at least 1', code: 'VALIDATION_ERROR' };
    }

    const updateData: Record<string, unknown> = {};
    if (data.title !== undefined) updateData.title = data.title.trim();
    if (data.description !== undefined) updateData.description = data.description;
    if (data.courseId !== undefined) updateData.courseId = data.courseId;
    if (data.scheduledAt !== undefined) updateData.scheduledAt = new Date(data.scheduledAt);
    if (data.instructorName !== undefined) updateData.instructorName = data.instructorName;
    if (data.durationMinutes !== undefined) updateData.durationMinutes = data.durationMinutes;
    if (data.meetingUrl !== undefined) updateData.meetingUrl = data.meetingUrl || null;
    if (data.recordingUrl !== undefined) updateData.recordingUrl = data.recordingUrl || null;
    if (data.maxAttendees !== undefined) updateData.maxAttendees = data.maxAttendees;
    if (data.isPublished !== undefined) updateData.isPublished = data.isPublished;

    const liveClass = await db.liveClass.update({
      where: { id },
      data: updateData,
      include: {
        course: { select: { title: true } },
        registrations: { select: { id: true } },
      },
    });

    return {
      success: true,
      data: {
        id: liveClass.id,
        title: liveClass.title,
        description: liveClass.description,
        instructorName: liveClass.instructorName,
        scheduledAt: liveClass.scheduledAt,
        durationMinutes: liveClass.durationMinutes,
        meetingUrl: liveClass.meetingUrl,
        recordingUrl: liveClass.recordingUrl,
        maxAttendees: liveClass.maxAttendees,
        isPublished: liveClass.isPublished,
        courseId: liveClass.courseId,
        courseTitle: liveClass.course.title,
        registrationCount: liveClass.registrations.length,
        createdAt: liveClass.createdAt,
      },
    };
  } catch (error) {
    logger.error('updateLiveClass failed', { id, error: String(error) });
    return { success: false, error: 'Failed to update live class', code: 'ADMIN_ERROR' };
  }
}

export async function deleteLiveClass(id: string): Promise<ActionResult<{ id: string }>> {
  try {
    const admin = await requireAdmin();
    if (!admin.success) return admin;
    const uid = admin.data.userId;

    const existing = await db.liveClass.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: 'Live class not found', code: 'NOT_FOUND' };
    }

    await db.liveClass.delete({ where: { id } });

    return { success: true, data: { id } };
  } catch (error) {
    logger.error('deleteLiveClass failed', { id, error: String(error) });
    return { success: false, error: 'Failed to delete live class', code: 'ADMIN_ERROR' };
  }
}

export async function toggleLiveClassPublish(id: string): Promise<ActionResult<AdminLiveClass>> {
  try {
    const admin = await requireAdmin();
    if (!admin.success) return admin;
    const uid = admin.data.userId;

    const existing = await db.liveClass.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: 'Live class not found', code: 'NOT_FOUND' };
    }

    const liveClass = await db.liveClass.update({
      where: { id },
      data: { isPublished: !existing.isPublished },
      include: {
        course: { select: { title: true } },
        registrations: { select: { id: true } },
      },
    });

    return {
      success: true,
      data: {
        id: liveClass.id,
        title: liveClass.title,
        description: liveClass.description,
        instructorName: liveClass.instructorName,
        scheduledAt: liveClass.scheduledAt,
        durationMinutes: liveClass.durationMinutes,
        meetingUrl: liveClass.meetingUrl,
        recordingUrl: liveClass.recordingUrl,
        maxAttendees: liveClass.maxAttendees,
        isPublished: liveClass.isPublished,
        courseId: liveClass.courseId,
        courseTitle: liveClass.course.title,
        registrationCount: liveClass.registrations.length,
        createdAt: liveClass.createdAt,
      },
    };
  } catch (error) {
    logger.error('toggleLiveClassPublish failed', { id, error: String(error) });
    return { success: false, error: 'Failed to toggle publish', code: 'ADMIN_ERROR' };
  }
}
