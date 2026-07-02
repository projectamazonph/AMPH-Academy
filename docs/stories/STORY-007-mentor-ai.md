# STORY-007: Mentor AI Foundation

**Epic:** Engagement Features
**Priority:** Must Have
**Points:** 6
**Dependencies:** None

## Acceptance Criteria

- [ ] Prisma models: `MentorConversation` and `MentorMessage`
- [ ] Server action `sendMentorMessage()` — appends user message, calls AI, stores AI response
- [ ] Server action `getMentorConversations()` — list user's conversations
- [ ] Server action `getMentorMessages()` — get messages for a conversation
- [ ] UI component `MentorChat` — sidebar panel with chat bubble UI
- [ ] Wired into dashboard sidebar as a tab
- [ ] Build passes, no errors

## Technical Notes

- Keep it simple: SQLite conversation store, inline AI inference or placeholder response
- For MVP, use a mock AI response ("Great question! Here's what I know about [topic]...")
- Conversation title auto-generated from first user message
- Messages ordered by createdAt asc
- Soft limit: 50 messages per conversation, auto-truncate oldest
