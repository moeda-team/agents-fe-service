import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/user";
import { mockMessages } from "@/lib/mock/chat";
import { Conversation } from "@/components/chat/conversation";
import { MessageInput } from "@/components/chat/message-input";

interface ConversationPageProps {
  params: Promise<{ id: string }>;
}

export default async function ConversationPage({ params }: ConversationPageProps) {
  const { id } = await params;
  const messages = mockMessages[id];
  if (!messages) notFound();

  const result = await getCurrentUser();
  const userInitial = result.success ? result.fullName[0].toUpperCase() : "R";

  return (
    <div className="flex h-full flex-col">
      <Conversation messages={messages} userInitial={userInitial} />
      <MessageInput />
    </div>
  );
}
