import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/user";
import { SidebarNav } from "@/components/chat/sidebar-nav";
import { HistoryPanel } from "@/components/chat/history-panel";
import { BottomNav } from "@/components/chat/bottom-nav";
import { ChatHeader } from "@/components/chat/chat-header";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await getCurrentUser();
  if (!result.success) redirect("/login");

  const user = { fullName: result.fullName, username: result.username };

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-background">
        <SidebarNav className="hidden md:flex" />
        <HistoryPanel className="hidden md:flex" />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <ChatHeader user={user} />
          <main className="flex-1 overflow-hidden pb-16 md:pb-0">
            {children}
          </main>
        </div>
      </div>
      <BottomNav className="fixed inset-x-0 bottom-0 z-50 md:hidden" />
    </>
  );
}
