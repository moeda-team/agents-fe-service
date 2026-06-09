import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function InfoBox({
  icon: Icon,
  className,
  children,
}: {
  icon?: LucideIcon;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl bg-muted/70 p-3.5 text-sm text-muted-foreground",
        className
      )}
    >
      {Icon && <div className="bg-primary/10 p-2 rounded-full"><Icon className="mt-0.5 size-5 shrink-0 text-primary" /></div>}
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}
