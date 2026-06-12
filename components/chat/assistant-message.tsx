import { Copy, ThumbsUp, ThumbsDown, RotateCcw, Table, BarChart2, FileDown } from "lucide-react";
import type { Message } from "@/types/chat";
import { AgentSteps } from "@/components/chat/agent-steps";

const ACTION_ICON_MAP = { Table, BarChart2, FileDown } as const;
type ActionIconKey = keyof typeof ACTION_ICON_MAP;

interface AssistantMessageProps {
  message: Message;
}

export function AssistantMessage({ message }: AssistantMessageProps) {
  const isProcessing = !!message.agentSteps && !message.content;

  return (
    <div className="px-4 py-3">
      <div className="flex items-start gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary">
          <span className="text-xs font-bold text-primary-foreground">ai</span>
        </div>

        <div className="flex-1 space-y-3">
          {isProcessing && message.agentSteps && (
            <AgentSteps skillName={message.skillName!} steps={message.agentSteps} />
          )}

          {message.content && (
            <>
              <div className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                {message.content}
              </div>

              {message.actions && message.actions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {message.actions.map((action) => {
                    const Icon = ACTION_ICON_MAP[action.icon as ActionIconKey];
                    return (
                      <button
                        key={action.id}
                        className="flex items-center gap-1.5 rounded-lg border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
                      >
                        {Icon && <Icon className="size-3.5" />}
                        {action.label}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="flex items-center gap-0.5 text-muted-foreground">
                {[
                  { icon: ThumbsUp, label: "Suka" },
                  { icon: ThumbsDown, label: "Tidak suka" },
                  { icon: Copy, label: "Salin" },
                  { icon: RotateCcw, label: "Coba lagi" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    title={label}
                    className="flex size-7 items-center justify-center rounded-lg transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="size-3.5" />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
