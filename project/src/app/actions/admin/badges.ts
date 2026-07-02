'use server';

import { db } from '@/lib/db';
import { getAuthUserId } from '@/lib/auth-guard';
import { logger } from '@/lib/logger';
import type { ActionResult } from './types';

export interface AdminBadge {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  xpReward: number;
  awarded: number;
}

export async function getAdminBadges(): Promise<ActionResult<AdminBadge[]>> {
  try {
    const uid = await getAuthUserId();
    if (!uid) return { success: false, error: 'Not authenticated', code: 'UNAUTHENTICATED' };

    const badges = await db.badge.findMany({ orderBy: { name: 'asc' } });
    const entries: AdminBadge[] = await Promise.all(
      badges.map(async (b) => {
        const awarded = await db.userBadge.count({ where: { badgeId: b.id } });
        return {
          id: b.id, name: b.name, slug: b.slug,
          description: b.description, category: b.category,
          xpReward: b.xpReward, awarded,
        };
      })
    );

    return { success: true, data: entries };
  } catch (error) {
    logger.error('getAdminBadges failed', { error: String(error) });
    return { success: false, error: 'Failed', code: 'ADMIN_ERROR' };
  }
}
