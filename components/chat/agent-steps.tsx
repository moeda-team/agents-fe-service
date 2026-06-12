"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Check, Loader2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AgentStep } from "@/types/chat";

interface AgentStepsProps {
  skillName: string;
  steps: AgentStep[];
}

export function AgentSteps({ skillName, steps }: AgentStepsProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-xl border bg-muted/40 p-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-2 text-left text-sm font-medium"
      >
        <span>
          Memproses menggunakan skill{" "}
          <span className="text-primary">{skillName}</span>...
        </span>
        {open ? (
          <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
        )}
      </button>

      {open && (
        <div className="mt-3 space-y-2.5">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-3">
              <div
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full",
                  step.status === "done" && "bg-green-100 text-green-600",
                  step.status === "in_progress" && "bg-blue-100 text-blue-600",
                  step.status === "pending" && "text-muted-foreground"
                )}
              >
                {step.status === "done" && <Check className="size-3" />}
                {step.status === "in_progress" && (
                  <Loader2 className="size-3 animate-spin" />
                )}
                {step.status === "pending" && <Circle className="size-3" />}
              </div>
              <span
                className={cn(
                  "flex-1 text-sm",
                  step.status === "pending" && "text-muted-foreground",
                  step.status === "done" && "text-foreground",
                  step.status === "in_progress" && "font-medium text-foreground"
                )}
              >
                {step.label}
              </span>
              {step.duration && (
                <span className="shrink-0 text-xs text-muted-foreground">
                  {step.duration}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
