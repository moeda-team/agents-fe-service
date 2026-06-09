import type { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function AuthInput({
  icon: Icon,
  className,
  ...props
}: React.ComponentProps<"input"> & { icon: LucideIcon }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input className={cn("h-11 rounded-xl pl-10", className)} {...props} />
    </div>
  );
}
