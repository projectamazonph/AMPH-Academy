'use server';

import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/auth-guard';
import { logger } from '@/lib/logger';
import type { ActionResult } from '../types';

export interface AdminCourse {
  id: string;
  title: string;
  slug: string;
  description: string;
  tier: string | null;
  difficulty: string;
  isPublished: boolean;
  moduleCount: number;
  enrollmentCount: number;
  createdAt: Date;
}

export async function getCourses(): Promise<ActionResult<AdminCourse[]>> {
  try {
    const admin = await requireAdmin();
    if (!admin.success) return admin;
    const uid = admin.data.userId;

    const courses = await db.course.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, title: true, slug: true, description: true,
        tier: true, difficulty: true, isPublished: true, createdAt: true,
      },
    });

    const entries: AdminCourse[] = await Promise.all(
      courses.map(async (c) => {
        const moduleCount = await db.module.count({ where: { courseId: c.id } });
        const enrollmentCount = await db.enrollment.count({ where: { courseId: c.id } });
        return { ...c, moduleCount, enrollmentCount };
      })
    );

    return { success: true, data: entries };
  } catch (error) {
    logger.error('getCourses failed', { error: String(error) });
    return { success: false, error: 'Failed', code: 'ADMIN_ERROR' };
  }
}
