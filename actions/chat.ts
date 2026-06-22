"use server";

import serverApi from "@/lib/api/server";
import { withAction, type ActionResult } from "@/lib/action";
import type {
  Conversation,
  PaginatedConversations,
  ConversationDetail,
  TokenCount,
  SendMessageResponse,
} from "@/types/chat";

export async function getConversationsAction(
  page?: number,
): Promise<ActionResult<{ data: Conversation[] }>> {
  return withAction(async () => {
    const res = await serverApi.get<PaginatedConversations>(
      "/v1/conversations",
      {
        params: page ? { page } : undefined,
      },
    );
    return { data: Array.isArray(res.data.items) ? res.data.items : [] };
  });
}

export async function getConversationAction(
  id: string,
): Promise<ActionResult<ConversationDetail>> {
  return withAction(async () => {
    const res = await serverApi.get<ConversationDetail>(
      `/v1/conversations/${id}`,
    );
    return res.data;
  });
}

export async function getTokenCountAction(
  id: string,
): Promise<ActionResult<TokenCount>> {
  return withAction(async () => {
    const res = await serverApi.get<TokenCount>(
      `/v1/conversations/${id}/token-count`,
    );
    return res.data;
  });
}

export async function createConversationAction(
  title: string,
): Promise<ActionResult<Conversation>> {
  return withAction(async () => {
    const res = await serverApi.post<Conversation>("/v1/conversations", {
      title,
    });
    return res.data;
  });
}

export async function sendMessageAction(
  conversationId: string,
  content: string,
  skillName?: string,
): Promise<ActionResult<SendMessageResponse>> {
  return withAction(async () => {
    const res = await serverApi.post<SendMessageResponse>(
      `/v1/conversations/${conversationId}/messages`,
      { content, attachments: [], skillName: skillName ?? "" },
    );
    return res.data;
  });
}

export async function deleteConversationAction(
  id: string,
): Promise<ActionResult<{ ok: true }>> {
  return withAction(async () => {
    await serverApi.delete(`/v1/conversations/${id}`);
    return { ok: true as const };
  });
}
