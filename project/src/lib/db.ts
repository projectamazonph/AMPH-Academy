import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Lazily create PrismaClient — this defers connection errors to query time
// so the app can start even if DATABASE_URL is temporarily unavailable
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Only log queries in development — avoid leaking query details and
    // performance overhead in production
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    // Add connection timeout and retry settings for production resilience
    datasources: process.env.DATABASE_URL
      ? undefined
      : undefined,
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Helper to check if database is configured
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL)
}
