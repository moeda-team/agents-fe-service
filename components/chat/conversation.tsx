import type { Message } from "@/types/chat";
import { UserMessage } from "@/components/chat/user-message";
import { AssistantMessage } from "@/components/chat/assistant-message";

interface ConversationProps {
  messages: Message[];
  userInitial?: string;
}

export function Conversation({ messages, userInitial }: ConversationProps) {
  return (
    <div className="flex-1 overflow-y-auto py-4">
      <div className="mx-auto max-w-3xl divide-y divide-transparent">
        {messages.map((message) =>
          message.role === "user" ? (
            <UserMessage
              key={message.id}
              content={message.content}
              createdAt={message.createdAt}
              userInitial={userInitial}
            />
          ) : (
            <AssistantMessage key={message.id} message={message} />
          )
        )}
      </div>
    </div>
  );
}
