import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  DATABASE_AUTH_TOKEN: z.string().min(1).optional(),
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET must be at least 32 characters'),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  DEMO_MODE: z.enum(['true', 'false']).optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export type AppEnv = z.infer<typeof envSchema>;

export function validateEnv(): AppEnv | null {
  const parsed = envSchema.safeParse(process.env);
  if (parsed.success) return parsed.data;

  const message = parsed.error.issues
    .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
    .join('; ');

  if (process.env.NODE_ENV === 'production') {
    throw new Error(`Invalid production environment: ${message}`);
  }

  console.warn(`[WARN] Environment validation failed: ${message}`);
  return null;
}
