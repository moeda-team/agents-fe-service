import { redirect } from "next/navigation";
import { Bot, MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMeAction } from "@/actions/auth";
import { LogoutButton } from "@/components/logout-button";

export default async function Home() {
  const result = await getMeAction();
  if (!result.success) redirect("/login");

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
        <Bot className="size-7" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Selamat datang, {result.fullName}! 👋
        </h1>
        <p className="max-w-md text-sm text-muted-foreground sm:text-base">
          Kamu berhasil masuk sebagai{" "}
          <span className="font-medium text-foreground">
            @{result.username}
          </span>
          . Halaman chat akan segera tersedia.
        </p>
      </div>
      <div className="flex gap-3">
        <Button size="lg">
          <MessageSquarePlus />
          Mulai Chat
        </Button>
        <LogoutButton />
      </div>
    </main>
  );
}
