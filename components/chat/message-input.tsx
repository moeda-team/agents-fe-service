"use client";

import { useState, useRef } from "react";
import {
  Paperclip,
  ImageIcon,
  ChevronDown,
  ArrowUp,
  Zap,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Skill } from "@/types/skill";

const MODEL_NAME = "Claude Opus 4.0";

interface MessageInputProps {
  className?: string;
  placeholder?: string;
  onSend?: (message: string, skillName?: string) => void;
  tokenCount?: { estimatedTokens: number; messageCount: number };
  disabled?: boolean;
  skills?: Skill[];
}

export function MessageInput({
  className,
  placeholder = "Tanyakan apa saja pada AI Assistant...",
  onSend,
  tokenCount,
  disabled = false,
  skills = [],
}: MessageInputProps) {
  const [value, setValue] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<string | undefined>();
  const [skillOpen, setSkillOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend?.(trimmed, selectedSkill);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
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

  const activeSkill = skills.find((s) => s.name === selectedSkill);

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

              {skills.length > 0 && (
                <Popover open={skillOpen} onOpenChange={setSkillOpen}>
                  <PopoverTrigger asChild>
                    {activeSkill ? (
                      <button
                        type="button"
                        className="flex items-center gap-1 rounded-lg bg-primary/10 px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                      >
                        <Zap className="size-3" />
                        <span>{activeSkill.name}</span>
                        <span
                          role="button"
                          tabIndex={0}
                          aria-label="Hapus skill"
                          className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSkill(undefined);
                            setSkillOpen(false);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.stopPropagation();
                              setSelectedSkill(undefined);
                              setSkillOpen(false);
                            }
                          }}
                        >
                          <X className="size-3" />
                        </span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label="Pilih skill"
                      >
                        <Zap className="size-4" />
                      </button>
                    )}
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-72 p-1">
                    <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                      Pilih Skill
                    </p>
                    <div className="max-h-56 overflow-y-auto">
                      {skills.map((skill) => (
                        <button
                          key={skill.name}
                          type="button"
                          onClick={() => {
                            setSelectedSkill(
                              skill.name === selectedSkill
                                ? undefined
                                : skill.name,
                            );
                            setSkillOpen(false);
                          }}
                          className={cn(
                            "flex w-full flex-col items-start gap-0.5 rounded-md px-2 py-2 text-left transition-colors hover:bg-muted",
                            skill.name === selectedSkill &&
                              "bg-primary/10 text-primary",
                          )}
                        >
                          <span className="text-xs font-medium">
                            {skill.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground line-clamp-1">
                            {skill.description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              )}

              {tokenCount && (
                <span className="ml-1 text-[11px] text-muted-foreground">
                  ~{tokenCount.estimatedTokens.toLocaleString()} token
                </span>
              )}
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
                disabled={!value.trim() || disabled}
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
