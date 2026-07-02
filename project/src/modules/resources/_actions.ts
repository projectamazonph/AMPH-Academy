'use server';

import { db } from '@/lib/db';
import { getAuthUserId } from '@/lib/auth-guard';
import { logger } from '@/lib/logger';
import { RESOURCES } from './resources-data';
import type { ResourceMeta } from './_types';
import type { ActionResult } from '@/app/actions/types';

export async function getResources(): Promise<ActionResult<ResourceMeta[]>> {
  try {
    const userId = await getAuthUserId();
    if (!userId) return { success: false, error: 'Not authenticated', code: 'UNAUTHENTICATED' };

    return { success: true, data: RESOURCES };
  } catch (err) {
    logger.error('Failed to fetch resources', err instanceof Error ? err : new Error(String(err)));
    return { success: false, error: 'Failed to load resources', code: 'INTERNAL_ERROR' };
  }
}

export async function getResourcesByCategory(category: string): Promise<ActionResult<ResourceMeta[]>> {
  try {
    const userId = await getAuthUserId();
    if (!userId) return { success: false, error: 'Not authenticated', code: 'UNAUTHENTICATED' };

    const filtered = RESOURCES.filter((r) => r.category === category);
    return { success: true, data: filtered };
  } catch (err) {
    logger.error('Failed to fetch resources by category', err instanceof Error ? err : new Error(String(err)));
    return { success: false, error: 'Failed to load resources', code: 'INTERNAL_ERROR' };
  }
}
