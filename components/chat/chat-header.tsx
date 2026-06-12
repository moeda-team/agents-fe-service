import { Settings, Bell } from "lucide-react";

interface ChatHeaderProps {
  user: { fullName: string; username: string };
}

export function ChatHeader({ user }: ChatHeaderProps) {
  const initial = user.fullName[0]?.toUpperCase() ?? "U";
  const firstName = user.fullName.split(" ")[0];

  return (
    <header className="flex shrink-0 items-center justify-end gap-1 border-b px-4 py-2.5">
      <button className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
        <Settings className="size-4" />
      </button>
      <button className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
        <Bell className="size-4" />
      </button>
      <div className="ml-1 flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
          {initial}
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium leading-none">{firstName}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">@{user.username}</p>
        </div>
      </div>
    </header>
  );
}
