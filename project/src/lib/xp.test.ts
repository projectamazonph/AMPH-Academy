import { Prisma } from '@prisma/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  ledgerCreate: vi.fn(),
  userUpdate: vi.fn(),
  transaction: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  db: {
    $transaction: mocks.transaction,
  },
}));

import { awardXp } from '@/lib/xp';

describe('awardXp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.transaction.mockImplementation(async (callback) =>
      callback({
        xpLedger: { create: mocks.ledgerCreate },
        user: { update: mocks.userUpdate },
      })
    );
    mocks.ledgerCreate.mockResolvedValue({ id: 'ledger-1' });
    mocks.userUpdate
      .mockResolvedValueOnce({ xp: 750 })
      .mockResolvedValueOnce({ xp: 750 });
  });

  it('creates one ledger entry and updates the cached XP projection', async () => {
    const granted = await awardXp(
      'user-1',
      'SIMULATION',
      'attempt-1',
      200,
      { simulationType: 'BID_ELEVATOR' }
    );

    expect(granted).toBe(true);
    expect(mocks.ledgerCreate).toHaveBeenCalledOnce();
    expect(mocks.userUpdate).toHaveBeenCalledTimes(2);
    expect(mocks.userUpdate).toHaveBeenNthCalledWith(1, {
      where: { id: 'user-1' },
      data: {
        xp: { increment: 200 },
        lastActiveAt: expect.any(Date),
      },
      select: { xp: true },
    });
    expect(mocks.userUpdate).toHaveBeenNthCalledWith(2, {
      where: { id: 'user-1' },
      data: { level: 2 },
    });
  });

  it('does not update cached XP when the source was already awarded', async () => {
    mocks.ledgerCreate.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
        code: 'P2002',
        clientVersion: '6.19.3',
      })
    );

    const granted = await awardXp(
      'user-1',
      'SIMULATION',
      'attempt-1',
      200
    );

    expect(granted).toBe(false);
    expect(mocks.userUpdate).not.toHaveBeenCalled();
  });

  it('rejects invalid awards before opening a transaction', async () => {
    await expect(awardXp('', 'SIMULATION', 'attempt-1', 200)).resolves.toBe(false);
    await expect(awardXp('user-1', 'SIMULATION', 'attempt-1', 0)).resolves.toBe(false);
    await expect(
      awardXp('user-1', 'SIMULATION', 'attempt-1', Number.NaN)
    ).resolves.toBe(false);

    expect(mocks.transaction).not.toHaveBeenCalled();
  });
});
