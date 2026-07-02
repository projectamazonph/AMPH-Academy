'use server';

import { db } from '@/lib/db';
import { logger } from '@/lib/logger';

/**
 * Check and update the user's daily streak.
 * Call this on login and any daily page visit.
 *
 * Logic:
 * - Same day as lastActiveAt → just update timestamp (streak continues)
 * - Next day → increment streakDays
 * - Gap of 2+ days → reset streakDays to 1
 * - First time (null lastActiveAt) → start at 1
 */
export async function checkStreak(userId: string): Promise<{
  streakDays: number;
  isNewDay: boolean;
}> {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { streakDays: true, lastActiveAt: true },
    });

    if (!user) return { streakDays: 0, isNewDay: false };

    const now = new Date();
    const lastDate = new Date(
      user.lastActiveAt.getFullYear(),
      user.lastActiveAt.getMonth(),
      user.lastActiveAt.getDate()
    );
    const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffDays = Math.round(
      (todayDate.getTime() - lastDate.getTime()) / 86_400_000
    );

    let streakDays = user.streakDays;
    let isNewDay = false;

    if (diffDays === 0) {
      // Same day — just refresh timestamp
      await db.user.update({
        where: { id: userId },
        data: { lastActiveAt: now },
      });
    } else if (diffDays === 1) {
      // Consecutive day — increment streak
      streakDays += 1;
      isNewDay = true;
      await db.user.update({
        where: { id: userId },
        data: { streakDays, lastActiveAt: now },
      });
    } else {
      // Gap of 2+ days — reset streak
      streakDays = 1;
      isNewDay = true;
      await db.user.update({
        where: { id: userId },
        data: { streakDays, lastActiveAt: now },
      });
    }

    return { streakDays, isNewDay };
  } catch (error) {
    logger.error('checkStreak failed', { error: String(error), userId });
    return { streakDays: 0, isNewDay: false };
  }
}
