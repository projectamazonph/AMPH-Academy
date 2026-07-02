import { hash } from "bcryptjs";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";

/**
 * Hash a plaintext password using bcrypt (cost factor 12).
 */
export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

/**
 * Validate email format.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate password strength.
 * Returns { valid: true } or { valid: false, reason: string }.
 */
export function validatePassword(password: string): {
  valid: boolean;
  reason?: string;
} {
  if (password.length < 8) {
    return { valid: false, reason: "Password must be at least 8 characters" };
  }
  if (password.length > 128) {
    return { valid: false, reason: "Password is too long" };
  }
  return { valid: true };
}

/**
 * Check if an email is already registered.
 */
export async function isEmailTaken(email: string): Promise<boolean> {
  const existing = await db.user.findUnique({
    where: { email: email.toLowerCase().trim() },
    select: { id: true },
  });
  return existing !== null;
}

/**
 * Sanitize user name — strip HTML tags and limit length.
 */
export function sanitizeName(name: string, maxLength = 100): string {
  return name.replace(/<[^>]*>/g, "").slice(0, maxLength).trim();
}
