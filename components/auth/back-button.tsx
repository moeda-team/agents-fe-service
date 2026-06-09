"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Kembali"
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted",
        className
      )}
    >
      <ChevronLeft className="size-5" />
    </button>
  );
}
