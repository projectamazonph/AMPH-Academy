"use server";

import { db } from "@/lib/db";
import { hashPassword, isValidEmail, validatePassword, isEmailTaken, sanitizeName } from "./_service";
import { logger } from "@/lib/logger";
import type { SignupInput, SignupResult, AuthResult } from "./_types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Register a new user account.
 */
export async function register(input: SignupInput): Promise<SignupResult> {
  try {
    const { name, email, password } = input;

    // Validate required fields
    if (!email || !password) {
      return { success: false, error: "Email and password are required", code: "MISSING_FIELDS" };
    }

    // Validate email format
    if (typeof email !== "string" || !isValidEmail(email)) {
      return { success: false, error: "Please enter a valid email address", code: "INVALID_EMAIL" };
    }

    // Validate password
    const pwCheck = validatePassword(password);
    if (!pwCheck.valid) {
      return { success: false, error: pwCheck.reason!, code: "WEAK_PASSWORD" };
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check duplicate
    const taken = await isEmailTaken(normalizedEmail);
    if (taken) {
      return {
        success: false,
        error: "An account with this email already exists",
        code: "EMAIL_EXISTS",
      };
    }

    // Create user
    const passwordHash = await hashPassword(password);
    const user = await db.user.create({
      data: {
        name: sanitizeName(name) || normalizedEmail.split("@")[0],
        email: normalizedEmail,
        passwordHash,
        role: "STUDENT",
      },
    });

    logger.info("User registered", { userId: user.id, email: normalizedEmail });

    return {
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
    };
  } catch (error) {
    logger.error("Registration failed", { error: String(error) });
    return {
      success: false,
      error: "Failed to create account. Please try again.",
      code: "SIGNUP_ERROR",
    };
  }
}

/**
 * Get the current authenticated user from the server session.
 */
export async function getSession(): Promise<AuthResult> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return { authenticated: false, user: null };
  }

  return {
    authenticated: true,
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      image: session.user.image,
      role: session.user.role || "STUDENT",
    },
  };
}

/**
 * Verify the current session and return user data.
 * Alias for getSession — used by protected server components.
 */
export async function verifySession(): Promise<AuthResult> {
  return getSession();
}
