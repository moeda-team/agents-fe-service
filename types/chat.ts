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
