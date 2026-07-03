'use server';

import { db } from '@/lib/db';
import { getAuthUserId } from '@/lib/auth-guard';
import { logger } from '@/lib/logger';
import type { ActionResult } from './types';

// ─── Types ───────────────────────────────────────────────────────

export interface ConversationSummary {
  id: string;
  title: string;
  messageCount: number;
  lastMessageAt: Date;
}

export interface MessageData {
  id: string;
  role: 'USER' | 'ASSISTANT';
  content: string;
  createdAt: Date;
}

// ─── List Conversations ──────────────────────────────────────────

export async function getConversations(): Promise<ActionResult<ConversationSummary[]>> {
  try {
    const userId = await getAuthUserId();
    if (!userId) return { success: false, error: 'Not authenticated', code: 'UNAUTHENTICATED' };

    const conversations = await db.mentorConversation.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      take: 20,
      include: {
        _count: { select: { messages: true } },
      },
    });

    return {
      success: true,
      data: conversations.map((c) => ({
        id: c.id,
        title: c.title,
        messageCount: c._count.messages,
        lastMessageAt: c.updatedAt,
      })),
    };
  } catch (error) {
    logger.error('getConversations failed', { error: String(error) });
    return { success: false, error: 'Failed to load conversations', code: 'MENTOR_ERROR' };
  }
}

// ─── Get Messages ───────────────────────────────────────────────

export async function getMessages(
  conversationId: string
): Promise<ActionResult<MessageData[]>> {
  try {
    const userId = await getAuthUserId();
    if (!userId) return { success: false, error: 'Not authenticated', code: 'UNAUTHENTICATED' };

    // Verify ownership
    const conv = await db.mentorConversation.findUnique({
      where: { id: conversationId },
      select: { userId: true },
    });
    if (!conv || conv.userId !== userId) {
      return { success: false, error: 'Conversation not found', code: 'NOT_FOUND' };
    }

    const messages = await db.mentorMessage.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
      take: 50,
    });

    return { success: true, data: messages };
  } catch (error) {
    logger.error('getMessages failed', { error: String(error) });
    return { success: false, error: 'Failed to load messages', code: 'MENTOR_ERROR' };
  }
}

// ─── Send Message ───────────────────────────────────────────────

const MENTOR_INTRO = `You are AMPH Mentor, an AI assistant that helps Filipino VAs learn Amazon PPC. 
Keep answers practical and focused on Amazon advertising. Use simple language. 
Give real examples from actual campaign data. Be direct — no fluff.`;

// ponytail: placeholder mentor response — replace with real AI inference
function generateMentorResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  if (lower.includes('acosh') || lower.includes('acos') || lower.includes('tacos')) {
    return `ACoS (Advertising Cost of Sale) is ad spend divided by attributed sales. For example, if you spend ₱500 and make ₱2,500 in sales, your ACoS is 20%.

Target ACoS depends on your margin. A common starting point for Filipino VAs managing US campaigns is 25-30%. TACoS includes total sales (organic + ad), so it's always lower than ACoS.

Pro tip: Don't optimize for the lowest ACoS — optimize for the ACoS that maximizes profitable volume. A 15% ACoS on ₱1k spend is worse than 30% ACoS on ₱10k spend.`;
  }

  if (lower.includes('bid') || lower.includes('bidding') || lower.includes('bid elevator')) {
    return `Bidding is where most campaigns win or lose. Three things matter:

1. **Bid by placement**: Top of search usually converts 2-3x better but costs more. Use placement multipliers.
2. **Dynamic bids**: Start with "dynamic bids - down only" for new campaigns. Switch to "up and down" once you have data.
3. **Budget pacing**: If you're burning budget before noon, lower your bids. If you're not spending by evening, raise them.

The Bid Elevator simulation in your dashboard lets you practice this risk-free. Try the intermediate scenario.`;
  }

  if (lower.includes('keyword') || lower.includes('search term') || lower.includes('negative')) {
    return `Search term optimization is where you earn your rate. Here's the process:

1. **Download search term report** every 7 days minimum
2. **Tag each term**: Keep (profitable), Negative (waste), Pause (high spend, low conversion)
3. **Add negatives early**: Non-converting terms burn budget fast. Add them at campaign level.
4. **Mine winners**: Low-volume, high-conversion terms → move to exact match in a dedicated campaign

Most VAs skip step 3. That's why their ACoS is 40%+ while the pros run at 20%.`;
  }

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return `Hey! I'm your AMPH Mentor. Ask me anything about Amazon PPC — campaign structure, bidding, keywords, ACoS, TACoS, search term optimization, or how to land your first PPC client.

What's on your mind?`;
  }

  return `Great question. Here's what I know about "${userMessage.slice(0, 60)}...":

This is something you can practice in the simulations. Try the Campaign Builder to experiment with different structures, or run the Bid Elevator to test bidding strategies. Every scenario uses real Amazon PPC data.

What specific part do you want to dive deeper into?`;
}

export async function sendMentorMessage(
  conversationId: string | null,
  content: string
): Promise<ActionResult<{ conversationId: string; userMessage: MessageData; mentorMessage: MessageData }>> {
  try {
    const userId = await getAuthUserId();
    if (!userId) return { success: false, error: 'Not authenticated', code: 'UNAUTHENTICATED' };

    if (!content.trim()) {
      return { success: false, error: 'Message cannot be empty', code: 'VALIDATION' };
    }

    // Truncate very long messages
    const truncated = content.slice(0, 2000);

    // Find or create conversation
    let convId = conversationId;
    if (!convId) {
      // Auto-title from first message
      const title = truncated.length > 60 ? truncated.slice(0, 57) + '...' : truncated;
      const conv = await db.mentorConversation.create({
        data: { userId, title },
      });
      convId = conv.id;
    } else {
      // Verify ownership
      const conv = await db.mentorConversation.findUnique({
        where: { id: convId },
        select: { userId: true },
      });
      if (!conv || conv.userId !== userId) {
        return { success: false, error: 'Conversation not found', code: 'NOT_FOUND' };
      }
    }

    // Save user message
    const userMessage = await db.mentorMessage.create({
      data: {
        conversationId: convId,
        role: 'USER',
        content: truncated,
      },
    });

    // Generate mentor response
    const responseContent = generateMentorResponse(truncated);

    const mentorMessage = await db.mentorMessage.create({
      data: {
        conversationId: convId,
        role: 'ASSISTANT',
        content: responseContent,
      },
    });

    // Update conversation timestamp
    await db.mentorConversation.update({
      where: { id: convId },
      data: { updatedAt: new Date() },
    });

    // Auto-truncate old messages (keep last 50)
    const totalMessages = await db.mentorMessage.count({
      where: { conversationId: convId },
    });
    if (totalMessages > 50) {
      const excess = totalMessages - 50;
      const oldest = await db.mentorMessage.findMany({
        where: { conversationId: convId },
        orderBy: { createdAt: 'asc' },
        take: excess,
        select: { id: true },
      });
      await db.mentorMessage.deleteMany({
        where: { id: { in: oldest.map((m) => m.id) } },
      });
    }

    return {
      success: true,
      data: { conversationId: convId, userMessage, mentorMessage },
    };
  } catch (error) {
    logger.error('sendMentorMessage failed', { error: String(error) });
    return { success: false, error: 'Failed to send message', code: 'MENTOR_ERROR' };
  }
}

// ─── Delete Conversation ────────────────────────────────────────

export async function deleteConversation(
  conversationId: string
): Promise<ActionResult<null>> {
  try {
    const userId = await getAuthUserId();
    if (!userId) return { success: false, error: 'Not authenticated', code: 'UNAUTHENTICATED' };

    const conv = await db.mentorConversation.findUnique({
      where: { id: conversationId },
      select: { userId: true },
    });
    if (!conv || conv.userId !== userId) {
      return { success: false, error: 'Conversation not found', code: 'NOT_FOUND' };
    }

    await db.mentorConversation.delete({ where: { id: conversationId } });

    return { success: true, data: null };
  } catch (error) {
    logger.error('deleteConversation failed', { error: String(error) });
    return { success: false, error: 'Failed to delete conversation', code: 'MENTOR_ERROR' };
  }
}
