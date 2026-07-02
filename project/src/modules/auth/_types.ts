import type { DefaultSession } from "next-auth";

// --- User ---

export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
};

// --- Session ---

export type AuthSession = {
  user: AuthUser;
  expires: string;
};

// Extend NextAuth's built-in session types
declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
  interface User {
    role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  }
}

// --- Signup ---

export type SignupInput = {
  name: string;
  email: string;
  password: string;
};

export type SignupResult = {
  success: boolean;
  error?: string;
  code?: string;
  user?: { id: string; email: string; name: string | null };
};

// --- Login ---

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResult = {
  success: boolean;
  error?: string;
  code?: string;
};

// --- Auth Result ---

export type AuthResult = {
  authenticated: boolean;
  user: AuthUser | null;
};
