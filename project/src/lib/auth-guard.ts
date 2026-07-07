/**
 * ProjectAMPH Academy: Auth Guard Utility
 *
 * Server-side helpers to get the current authenticated user from the session
 * and to enforce role-based access control.
 *
 * Usage in server actions (regular user):
 *   const userId = await getAuthUserId();
 *   if (!userId) return { success: false, error: 'Not authenticated', code: 'UNAUTHENTICATED' };
 *
 * Usage in server actions (admin only):
 *   const admin = await requireAdmin();
 *   if (!admin.success) return admin;
 *   // admin.userId is now guaranteed to be a session-authenticated ADMIN
 */

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import type { ActionResult } from '@/app/actions/types';

/**
 * Get the current authenticated user's ID from the session.
 * Returns null if not authenticated.
 */
export async function getAuthUserId(): Promise<string | null> {
  const session = await getServerSession(authOptions);
  return (session?.user as { id?: string })?.id ?? null;
}

/**
 * Get the current authenticated user's full session.
 * Returns null if not authenticated.
 */
export async function getAuthSession() {
  return getServerSession(authOptions);
}

/**
 * Require that the current session belongs to an ADMIN user.
 *
 * Verifies both authentication AND that the user's role in the database is
 * 'ADMIN'. This closes the broken-access-control gap where any signed-in user
 * could call admin server actions.
 *
 * Returns an ActionResult so callers can do:
 *   const admin = await requireAdmin();
 *   if (!admin.success) return admin;
 *
 * Note: we re-read the user from the DB on every admin check (rather than
 * trusting session.role) so a role downgrade takes effect on the next
 * request rather than at session expiry.
 */
export async function requireAdmin(): Promise<ActionResult<{ userId: string; role: 'ADMIN' }>> {
  const userId = await getAuthUserId();
  if (!userId) {
    return { success: false, error: 'Not authenticated', code: 'UNAUTHENTICATED' };
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!user) {
    return { success: false, error: 'User account not found', code: 'USER_NOT_FOUND' };
  }

  if (user.role !== 'ADMIN') {
    return { success: false, error: 'Admin privileges required', code: 'FORBIDDEN' };
  }

  return { success: true, data: { userId, role: 'ADMIN' } };
}