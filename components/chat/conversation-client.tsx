"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Conversation } from "@/components/chat/conversation";
import { MessageInput } from "@/components/chat/message-input";
import { streamChatMessage } from "@/lib/stream";
import { sendMessageAction } from "@/actions/chat";
import type { Message, AgentStep, TokenCount } from "@/types/chat";
import type { Skill } from "@/types/skill";

interface StreamingState {
  steps: AgentStep[];
  content: string;
  stepsFinished: boolean;
}

interface ConversationClientProps {
  conversationId: string;
  initialMessages: Message[];
  userInitial: string;
  tokenCount?: TokenCount;
  skills?: Skill[];
}

export function ConversationClient({
  conversationId,
  initialMessages,
  userInitial,
  tokenCount,
  skills = [],
}: ConversationClientProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [streaming, setStreaming] = useState<StreamingState | null>(null);
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const streamingContentRef = useRef("");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, streaming?.content]);

  async function handleSend(content: string, skillName?: string) {
    if (isSending) return;
    setIsSending(true);
    streamingContentRef.current = "";

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setStreaming({ steps: [], content: "", stepsFinished: false });

    await streamChatMessage(
      conversationId,
      content,
      { skillName },
      (event) => {
        if (event.type === "step_start") {
          setStreaming((prev) => {
            if (!prev) return prev;
            const updatedSteps = prev.steps.map((s) =>
              s.status === "in_progress" ? { ...s, status: "done" as const } : s,
            );
            return {
              ...prev,
              steps: [
                ...updatedSteps,
                { id: crypto.randomUUID(), label: event.step, status: "in_progress" as const },
              ],
            };
          });
        } else if (event.type === "delta") {
          streamingContentRef.current += event.content;
          const accumulated = streamingContentRef.current;
          setStreaming((prev) => {
            if (!prev) return prev;
            const finishedSteps = prev.stepsFinished
              ? prev.steps
              : prev.steps.map((s) => ({ ...s, status: "done" as const }));
            return { steps: finishedSteps, content: accumulated, stepsFinished: true };
          });
        } else if (event.type === "done") {
          const finalContent = streamingContentRef.current;
          const src = event.message;
          const finalMessage: Message = src
            ? { id: src.id, role: src.role, content: src.content, createdAt: src.createdAt }
            : { id: crypto.randomUUID(), role: "assistant", content: finalContent, createdAt: new Date().toISOString() };
          setMessages((prev) => [...prev, finalMessage]);
          setStreaming(null);
          setIsSending(false);
        }
      },
      async (error) => {
        // streaming failed — fall back to non-streaming endpoint
        console.warn("Stream error, falling back:", error.message);
        setStreaming({ steps: [], content: "...", stepsFinished: true });

        const result = await sendMessageAction(conversationId, content, skillName);
        if (result.success) {
          const m = result.assistantMessage;
          setMessages((prev) => [
            ...prev,
            { id: m.id, role: m.role, content: m.content, createdAt: m.createdAt },
          ]);
        } else {
          toast.error(result.error);
        }
        setStreaming(null);
        setIsSending(false);
      },
    );
  }

  const displayMessages: Message[] = [
    ...messages,
    ...(streaming
      ? [
          {
            id: "streaming",
            role: "assistant" as const,
            content: streaming.content,
            createdAt: new Date().toISOString(),
            agentSteps:
              !streaming.stepsFinished && streaming.steps.length > 0
                ? streaming.steps
                : undefined,
          },
        ]
      : []),
  ];

  return (
    <div className="flex h-full flex-col">
      <Conversation
        messages={displayMessages}
        userInitial={userInitial}
        bottomRef={bottomRef}
      />
      <MessageInput
        onSend={handleSend}
        disabled={isSending}
        tokenCount={tokenCount}
        skills={skills}
      />
    </div>
  );
}
