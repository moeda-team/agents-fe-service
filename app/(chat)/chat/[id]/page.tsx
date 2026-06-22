import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/user";
import { getConversationAction, getTokenCountAction } from "@/actions/chat";
import { getSkillsAction } from "@/actions/skill";
import { ConversationClient } from "@/components/chat/conversation-client";
import type { Message } from "@/types/chat";

interface ConversationPageProps {
  params: Promise<{ id: string }>;
}

export default async function ConversationPage({ params }: ConversationPageProps) {
  const { id } = await params;

  const [convResult, userResult, tokenResult, skillsResult] = await Promise.all([
    getConversationAction(id),
    getCurrentUser(),
    getTokenCountAction(id),
    getSkillsAction(),
  ]);

  if (!convResult.success) notFound();

  const messages: Message[] = convResult.messages.map((m) => ({
    id: m.id,
    role: m.role,
    content: m.content,
    createdAt: m.createdAt,
  }));

  const userInitial = userResult.success ? userResult.fullName[0].toUpperCase() : "R";
  const tokenCount = tokenResult.success
    ? { estimatedTokens: tokenResult.estimatedTokens, messageCount: tokenResult.messageCount }
    : undefined;
  const skills = skillsResult.success ? skillsResult.data : [];

  return (
    <ConversationClient
      conversationId={id}
      initialMessages={messages}
      userInitial={userInitial}
      tokenCount={tokenCount}
      skills={skills}
    />
  );
}
