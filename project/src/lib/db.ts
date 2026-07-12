import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { PrismaClient } from '@prisma/client';

const databaseUrl = process.env.DATABASE_URL;
const databaseAuthToken = process.env.DATABASE_AUTH_TOKEN;

if (process.env.NODE_ENV === 'production' && !databaseUrl) {
  throw new Error('Production startup aborted: DATABASE_URL is not defined');
}

const resolvedDatabaseUrl = databaseUrl ?? 'file:./prisma/dev.db';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const adapter = new PrismaLibSQL({
    url: resolvedDatabaseUrl,
    ...(databaseAuthToken ? { authToken: databaseAuthToken } : {}),
  });

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}

export function isDatabaseConfigured(): boolean {
  return typeof databaseUrl === 'string' && databaseUrl.length > 0;
}
