import { Bot, MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
        <Bot className="size-7" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          AI Agent Chat
        </h1>
        <p className="max-w-md text-sm text-muted-foreground sm:text-base">
          Foundation siap — shadcn/ui (zinc), lucide-react, dan dark mode
          otomatis aktif. Halaman chat akan di-slice dari desain.
        </p>
      </div>
      <Button size="lg">
        <MessageSquarePlus />
        Mulai Chat
      </Button>
    </main>
  );
}
