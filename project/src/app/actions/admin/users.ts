'use server';

import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/auth-guard';
import { logger } from '@/lib/logger';
import type { UserRole } from '@prisma/client';
import type { ActionResult } from '../types';

export interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  role: string;
  xp: number;
  level: number;
  streakDays: number;
  modulesCompleted: number;
  createdAt: Date;
  lastActiveAt: Date;
  status: 'active' | 'disabled';
}

export async function getUsers(): Promise<ActionResult<AdminUser[]>> {
  try {
    const admin = await requireAdmin();
    if (!admin.success) return admin;
    const uid = admin.data.userId;

    const users = await db.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, name: true, email: true, role: true,
        xp: true, level: true, streakDays: true,
        createdAt: true, lastActiveAt: true,
      },
    });

    // Count modules completed per user
    const entries: AdminUser[] = await Promise.all(
      users.map(async (u) => {
        const completed = await db.moduleProgress.count({
          where: { userId: u.id, status: 'COMPLETED' },
        });
        return {
          ...u,
          modulesCompleted: completed,
          status: 'active' as const,
        };
      })
    );

    return { success: true, data: entries };
  } catch (error) {
    logger.error('getUsers failed', { error: String(error) });
    return { success: false, error: 'Failed to fetch users', code: 'ADMIN_ERROR' };
  }
}

export async function deleteUser(userId: string): Promise<ActionResult<null>> {
  try {
    const admin = await requireAdmin();
    if (!admin.success) return admin;
    const uid = admin.data.userId;

    // Cascade delete user data
    await db.$transaction([
      db.eventLog.deleteMany({ where: { userId } }),
      db.moduleProgress.deleteMany({ where: { userId } }),
      db.quizAttempt.deleteMany({ where: { userId } }),
      db.toolSession.deleteMany({ where: { userId } }),
      db.simulationAttempt.deleteMany({ where: { userId } }),
      db.userBadge.deleteMany({ where: { userId } }),
      db.certificate.deleteMany({ where: { userId } }),
      db.liveClassRegistration.deleteMany({ where: { userId } }),
      db.teamMember.deleteMany({ where: { userId } }),
      db.session.deleteMany({ where: { userId } }),
      db.account.deleteMany({ where: { userId } }),
      db.enrollment.deleteMany({ where: { userId } }),
      db.user.delete({ where: { id: userId } }),
    ]);

    logger.info('Admin deleted user', { targetUserId: userId, adminId: uid });
    return { success: true, data: null };
  } catch (error) {
    logger.error('deleteUser failed', { error: String(error) });
    return { success: false, error: 'Failed to delete user', code: 'ADMIN_ERROR' };
  }
}

export async function updateUserRole(userId: string, role: string): Promise<ActionResult<null>> {
  try {
    const admin = await requireAdmin();
    if (!admin.success) return admin;
    const uid = admin.data.userId;

    const valid = ['STUDENT', 'INSTRUCTOR', 'ADMIN'];
    if (!valid.includes(role)) {
      return { success: false, error: 'Invalid role', code: 'INVALID_ROLE' };
    }

    await db.user.update({
      where: { id: userId },
      data: { role: role as UserRole },
    });

    return { success: true, data: null };
  } catch (error) {
    logger.error('updateUserRole failed', { error: String(error) });
    return { success: false, error: 'Failed to update role', code: 'ADMIN_ERROR' };
  }
}
