export type MessageRole = "user" | "assistant";
export type StepStatus = "done" | "in_progress" | "pending";

export interface AgentStep {
  id: string;
  label: string;
  status: StepStatus;
  duration?: string;
}

export interface MessageAction {
  id: string;
  label: string;
  icon: string;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  skillName?: string;
  agentSteps?: AgentStep[];
  actions?: MessageAction[];
}

export interface ChatItem {
  id: string;
  title: string;
  updatedAt: string;
}

export interface ChatGroup {
  label: string;
  chats: ChatItem[];
}

export interface Conversation {
  id: string;
  title: string;
  model: string | null;
  organizationId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    messages: number;
  };
}

export interface PaginatedConversations {
  items: Conversation[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SendMessageRequest {
  content: string;
  attachments?: string[];
  skillName?: string;
}

export interface MessageUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface SendMessageResponse {
  userMessage: ApiMessage;
  assistantMessage: ApiMessage;
  usage: MessageUsage;
}

export interface TokenCount {
  estimatedTokens: number;
  messageCount: number;
}

export interface ApiMessage {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  tokens: number;
  createdAt: string;
}

export interface ConversationDetail extends Conversation {
  messages: ApiMessage[];
}
