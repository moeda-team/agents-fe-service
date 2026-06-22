import type { Message } from "@/types/chat";
import { UserMessage } from "@/components/chat/user-message";
import { AssistantMessage } from "@/components/chat/assistant-message";

interface ConversationProps {
  messages: Message[];
  userInitial?: string;
  bottomRef?: React.RefObject<HTMLDivElement | null>;
}

export function Conversation({ messages, userInitial, bottomRef }: ConversationProps) {
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
            <AssistantMessage
              key={message.id}
              message={message}
              loading={!message.content && !message.agentSteps}
            />
          )
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
