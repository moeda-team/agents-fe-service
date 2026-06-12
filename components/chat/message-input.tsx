"use client";

import { useState, useRef } from "react";
import { Paperclip, ImageIcon, ChevronDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const MODEL_NAME = "Claude Opus 4.0";

interface MessageInputProps {
  className?: string;
  placeholder?: string;
  onSend?: (message: string) => void;
}

export function MessageInput({
  className,
  placeholder = "Tanyakan apa saja pada AI Assistant...",
  onSend,
}: MessageInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend?.(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  return (
    <div className={cn("shrink-0 border-t bg-background px-4 py-3", className)}>
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col rounded-2xl border bg-card shadow-sm focus-within:ring-2 focus-within:ring-ring/30">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className="resize-none overflow-hidden rounded-t-2xl bg-transparent px-4 pt-3 pb-1 text-sm outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Paperclip className="size-4" />
              </button>
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ImageIcon className="size-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted"
              >
                <span>{MODEL_NAME}</span>
                <ChevronDown className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={handleSend}
                disabled={!value.trim()}
                className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
              >
                <ArrowUp className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
