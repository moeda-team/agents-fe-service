import { cn } from "@/lib/utils";
import { BackButton } from "./back-button";

export function AuthHeader({
  title,
  subtitle,
  showBack = false,
  align = "left",
}: {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  showBack?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className="mb-6">
      {showBack && <BackButton className="-ml-2 mb-4" />}
      <div className={cn(align === "center" && "text-center")}>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
