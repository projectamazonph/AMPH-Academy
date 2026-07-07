'use client'
import { Bot, Send, Sparkles, Trash2 } from '@/components/icons';
;
import { Icon } from '@/components/icons';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  getConversations,
  getMessages,
  sendMentorMessage,
  deleteConversation,
  type ConversationSummary,
  type MessageData,
} from '@/app/actions/mentor';

export function MentorChat() {
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load conversations on mount
  useEffect(() => {
    getConversations().then((res) => {
      if (res.success) {
        setConversations(res.data);
        // Auto-select most recent
        if (res.data.length > 0 && !activeConvId) {
          setActiveConvId(res.data[0].id);
        }
      }
      setLoading(false);
    });
  }, []);

  // Load messages when conversation changes
  useEffect(() => {
    if (!activeConvId) return;
    getMessages(activeConvId).then((res) => {
      if (res.success) setMessages(res.data);
    });
  }, [activeConvId]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend() {
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    setInput('');

    const res = await sendMentorMessage(activeConvId, text);
    if (res.success) {
      setActiveConvId(res.data.conversationId);
      setMessages((prev) => [
        ...prev,
        res.data.userMessage,
        res.data.mentorMessage,
      ]);

      // Refresh conversation list
      getConversations().then((r) => {
        if (r.success) setConversations(r.data);
      });
    }
    setSending(false);
  }

  async function handleNewChat() {
    setActiveConvId(null);
    setMessages([]);
    setInput('');
  }

  async function handleDelete(id: string) {
    await deleteConversation(id);
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConvId === id) {
      setActiveConvId(null);
      setMessages([]);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-[calc(100vh-12rem)] gap-4"
    >
      {/* Conversation sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="w-[260px] shrink-0"
          >
            <Card className="h-full border-border/40">
              <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-semibold">Chats</CardTitle>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowSidebar(false)}>
                  <Icon name="caret-left" className="h-3.5 w-3.5" />
                </Button>
              </CardHeader>
              <CardContent className="p-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mb-2 text-xs border-dashed"
                  onClick={handleNewChat}
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  New Chat
                </Button>
                <ScrollArea className="h-[calc(100vh-20rem)]">
                  <div className="space-y-1">
                    {conversations.map((conv) => (
                      <div key={conv.id} className="flex items-center gap-1 group">
                        <button
                          onClick={() => setActiveConvId(conv.id)}
                          className={cn(
                            'flex-1 text-left px-3 py-2 rounded-lg text-xs transition-colors truncate',
                            activeConvId === conv.id
                              ? 'bg-primary/10 text-foreground'
                              : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                          )}
                        >
                          {conv.title}
                        </button>
                        <button
                          onClick={() => handleDelete(conv.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-rose-400 transition-all"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    {conversations.length === 0 && !loading && (
                      <p className="text-xs text-muted-foreground text-center py-8">
                        No conversations yet. Start a new chat!
                      </p>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {!showSidebar && (
        <button
          onClick={() => setShowSidebar(true)}
          className="shrink-0 p-2 h-fit mt-2 rounded-lg border border-border/40 hover:bg-muted/50 transition-colors"
        >
          <Icon name="caret-right" className="h-4 w-4 text-muted-foreground" />
        </button>
      )}

      {/* Main chat area */}
      <Card className="flex-1 border-border/40 flex flex-col">
        <CardHeader className="p-4 border-b border-border/20 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold">AMPH Mentor</CardTitle>
              <p className="text-[10px] text-muted-foreground">Your PPC learning assistant</p>
            </div>
          </div>
        </CardHeader>

        <ScrollArea className="flex-1 p-4">
          {!activeConvId && messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                <Bot className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Ask AMPH Mentor</h3>
                <p className="text-sm text-muted-foreground max-w-sm mt-1">
                  Ask me anything about Amazon PPC — bidding, keywords, ACoS, campaign structure, or landing your first PPC client.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center max-w-md">
                {[
                  'What is a good ACoS target?',
                  'How do I optimize search terms?',
                  'How to set bids for new campaigns?',
                  'What is TACoS?',
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setInput(q);
                    }}
                    className="px-3 py-1.5 rounded-lg border border-border/40 text-xs text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex gap-3',
                    msg.role === 'USER' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {msg.role === 'ASSISTANT' && (
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed',
                      msg.role === 'USER'
                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                        : 'bg-muted/50 text-foreground rounded-bl-sm border border-border/20'
                    )}
                  >
                    {msg.content}
                  </div>
                  {msg.role === 'USER' && (
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                        <Icon name="user" className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          )}
        </ScrollArea>

        {/* Input area */}
        <div className="p-4 border-t border-border/20">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Amazon PPC..."
              className="flex-1 min-h-[44px] max-h-[120px] resize-none rounded-lg border border-input bg-transparent px-3 py-2.5 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              rows={1}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || sending}
              size="icon"
              className="shrink-0 h-11 w-11"
            >
              {sending ? (
                <Icon name="spinner" className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground/60 mt-1.5">
            Mentor responses are generated by AI. Verify important decisions before applying.
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
