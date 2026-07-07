/**
 * Shared session types for AMPH Academy
 *
 * NextAuth's default Session.User type doesn't include our custom fields
 * (id, role) that we add via JWT callbacks. These interfaces bridge the gap.
 */

import type { UserRole } from '@prisma/client';

/** Session user object with AMPH-specific fields added by our JWT callback */
export interface AMPHSessionUser {
  id?: string;
  role?: UserRole;
}

/** JWT token with AMPH-specific fields added by our JWT callback */
export interface AMPHToken {
  id?: string;
  role?: string;
}
