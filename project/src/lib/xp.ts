import { Prisma } from '@prisma/client';
import { db } from '@/lib/db';

const MAX_XP_AWARD = 1_000_000;
const MAX_METADATA_BYTES = 8_192;

export interface AwardXpInput {
  userId: string;
  sourceType: string;
  sourceId: string;
  amount: number;
  metadata?: unknown;
}

/**
 * Grants XP exactly once for a deterministic source key.
 *
 * The ledger insert and cached user projection update happen in one database
 * transaction. If the unique ledger constraint is hit, the transaction rolls
 * back and the user's XP is left unchanged.
 *
 * @returns true when XP was granted, false when the award was invalid or had
 * already been granted.
 */
export async function awardXp(
  userId: string,
  sourceType: string,
  sourceId: string,
  amount: number,
  metadata?: unknown
): Promise<boolean> {
  const input: AwardXpInput = {
    userId: userId.trim(),
    sourceType: sourceType.trim(),
    sourceId: sourceId.trim(),
    amount,
    metadata,
  };

  if (!input.userId || !input.sourceType || !input.sourceId) return false;
  if (!Number.isFinite(input.amount) || input.amount <= 0) return false;

  const xp = Math.min(Math.floor(input.amount), MAX_XP_AWARD);
  const serializedMetadata = serializeMetadata(input.metadata);

  try {
    await db.$transaction(async (tx) => {
      await tx.xpLedger.create({
        data: {
          userId: input.userId,
          sourceType: input.sourceType,
          sourceId: input.sourceId,
          amount: xp,
          metadata: serializedMetadata,
        },
      });

      const updatedUser = await tx.user.update({
        where: { id: input.userId },
        data: {
          xp: { increment: xp },
          lastActiveAt: new Date(),
        },
        select: { xp: true },
      });

      await tx.user.update({
        where: { id: input.userId },
        data: {
          level: Math.max(1, Math.floor(updatedUser.xp / 500) + 1),
        },
      });
    });

    return true;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return false;
    }

    throw error;
  }
}

function serializeMetadata(metadata: unknown): string | undefined {
  if (metadata === undefined) return undefined;

  const serialized = JSON.stringify(metadata);
  if (Buffer.byteLength(serialized, 'utf8') > MAX_METADATA_BYTES) {
    throw new Error(`XP metadata exceeds ${MAX_METADATA_BYTES} bytes`);
  }

  return serialized;
}
