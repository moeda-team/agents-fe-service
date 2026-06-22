import type { ApiMessage } from "@/types/chat";

export interface SseStepEvent {
  type: "step_start";
  step: string;
}

export interface SseDeltaEvent {
  type: "delta";
  content: string;
}

export interface SseDoneEvent {
  type: "done";
  message?: ApiMessage;
}

export type SseEvent = SseStepEvent | SseDeltaEvent | SseDoneEvent;

export interface StreamOptions {
  skillName?: string;
  attachments?: string[];
}

export async function streamChatMessage(
  conversationId: string,
  content: string,
  options: StreamOptions,
  onEvent: (event: SseEvent) => void,
  onError: (error: Error) => void,
): Promise<void> {
  // Calls the local Next.js route handler — avoids CORS and keeps auth server-side
  let response: Response;
  try {
    response = await fetch(
      `/api/conversations/${conversationId}/messages/stream`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          attachments: options.attachments ?? [],
          skillName: options.skillName ?? "",
        }),
      },
    );
  } catch {
    onError(new Error("Tidak dapat terhubung ke server."));
    return;
  }

  if (!response.ok) {
    onError(new Error(`Terjadi kesalahan. (${response.status})`));
    return;
  }

  const reader = response.body?.getReader();
  if (!reader) {
    onError(new Error("Streaming tidak didukung."));
    return;
  }

  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const raw = line.slice(6).trim();
        if (!raw || raw === "[DONE]") continue;

        try {
          const event = JSON.parse(raw);
          if (event.type === "step_start") {
            const step = event.step ?? event.stepName ?? event.data?.step ?? "";
            onEvent({ type: "step_start", step });
          } else if (event.type === "delta") {
            const chunk =
              event.content ?? event.delta ?? event.data?.content ?? "";
            onEvent({ type: "delta", content: chunk });
          } else if (event.type === "done") {
            onEvent({
              type: "done",
              message: event.message ?? event.data?.message,
            });
          }
        } catch {
          // skip malformed events
        }
      }
    }
  } catch (err) {
    onError(err instanceof Error ? err : new Error("Terjadi kesalahan."));
  } finally {
    reader.releaseLock();
  }
}
