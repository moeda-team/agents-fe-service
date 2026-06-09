"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const REQUIREMENTS = [
  { label: "Minimal 8 karakter", test: (v: string) => v.length >= 8 },
  { label: "Huruf besar (A-Z)", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Huruf kecil (a-z)", test: (v: string) => /[a-z]/.test(v) },
  { label: "Mengandung angka (0-9)", test: (v: string) => /[0-9]/.test(v) },
  {
    label: "Mengandung simbol (!@#$%^)",
    test: (v: string) => /[^A-Za-z0-9]/.test(v),
  },
];

const LABELS = ["Lemah", "Sedang", "Kuat"] as const;

export function PasswordStrength({ value }: { value: string }) {
  const passed = REQUIREMENTS.filter((r) => r.test(value)).length;
  const level = passed <= 2 ? 0 : passed <= 4 ? 1 : 2;
  const filled = value ? level + 2 : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex flex-1 gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                i < filled ? "bg-primary" : "bg-border"
              )}
            />
          ))}
        </div>
        {value && (
          <span
            className={cn(
              "text-xs font-medium",
              level === 2
                ? "text-emerald-600 dark:text-emerald-400"
                : level === 1
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-muted-foreground"
            )}
          >
            {LABELS[level]}
          </span>
        )}
      </div>

      <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
        {REQUIREMENTS.map((r) => {
          const ok = r.test(value);
          return (
            <li key={r.label} className="flex items-center gap-1.5 text-xs">
              <Check
                className={cn(
                  "size-3.5 shrink-0",
                  ok ? "text-emerald-500" : "text-muted-foreground/40"
                )}
              />
              <span className={ok ? "text-foreground" : "text-muted-foreground"}>
                {r.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
