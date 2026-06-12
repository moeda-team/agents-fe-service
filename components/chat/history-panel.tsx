"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Trash2,
  MoreHorizontal,
  Pencil,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockChatGroups } from "@/lib/mock/chat";

interface HistoryPanelProps {
  className?: string;
}

export function HistoryPanel({ className }: HistoryPanelProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        router.push("/chat");
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  function handleMenuToggle(e: React.MouseEvent, chatId: string) {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenuId((prev) => (prev === chatId ? null : chatId));
  }

  return (
    <>
      {openMenuId && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpenMenuId(null)}
        />
      )}

      <div
        style={{ width: collapsed ? 40 : 256 }}
        className={cn(
          "flex shrink-0 flex-col overflow-hidden border-r bg-background transition-[width] duration-200",
          className,
        )}
      >
        {collapsed ? (
          /* Collapsed strip */
          <div className="flex flex-col items-center pt-3">
            <button
              onClick={() => setCollapsed(false)}
              title="Buka riwayat"
              className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        ) : (
          /* Expanded content */
          <>
            {/* Header */}
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h2 className="whitespace-nowrap text-sm font-semibold">
                History Chat
              </h2>
              <button
                onClick={() => setCollapsed(true)}
                title="Tutup riwayat"
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ChevronLeft className="size-4" />
              </button>
            </div>

            {/* New Chat */}
            <div className="border-b p-3">
              <Link
                href="/chat"
                className="flex w-full items-center gap-2 rounded-xl border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Plus className="size-4 shrink-0" />
                <span className="flex-1 whitespace-nowrap">New Chat</span>
                <kbd className="inline-flex h-5 items-center rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
                  ⌘K
                </kbd>
              </Link>
            </div>

            {/* Chat list */}
            <div className="flex-1 overflow-y-auto py-2">
              {mockChatGroups.map((group) => (
                <div key={group.label}>
                  <p className="whitespace-nowrap px-4 py-1.5 text-xs font-medium text-muted-foreground">
                    {group.label}
                  </p>
                  {group.chats.map((chat) => {
                    const isActive = pathname === `/chat/${chat.id}`;
                    const isHovered = hoveredId === chat.id;
                    const isMenuOpen = openMenuId === chat.id;
                    const showActions = isHovered || isMenuOpen;

                    return (
                      <div
                        key={chat.id}
                        className="relative"
                        onMouseEnter={() => setHoveredId(chat.id)}
                        onMouseLeave={() => {
                          if (!isMenuOpen) setHoveredId(null);
                        }}
                      >
                        <Link
                          href={`/chat/${chat.id}`}
                          className={cn(
                            "flex items-center py-2 pl-4 pr-10 text-sm transition-colors hover:bg-muted",
                            isActive && "bg-muted",
                          )}
                        >
                          <span className="flex-1 truncate text-foreground">
                            {chat.title}
                          </span>
                          {!showActions && (
                            <span className="ml-2 shrink-0 text-xs text-muted-foreground">
                              {chat.updatedAt}
                            </span>
                          )}
                        </Link>

                        {showActions && (
                          <button
                            onClick={(e) => handleMenuToggle(e, chat.id)}
                            className={cn(
                              "absolute right-2 top-1/2 z-50 flex size-7 -translate-y-1/2 items-center justify-center rounded-lg transition-colors",
                              isMenuOpen
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            )}
                          >
                            <MoreHorizontal className="size-4" />
                          </button>
                        )}

                        {isMenuOpen && (
                          <div
                            className="absolute right-2 top-9 z-50 min-w-[140px] rounded-xl border bg-popover p-1 shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
                              onClick={() => setOpenMenuId(null)}
                            >
                              <Pencil className="size-3.5 text-muted-foreground" />
                              Rename
                            </button>
                            <button
                              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
                              onClick={() => setOpenMenuId(null)}
                            >
                              <Trash2 className="size-3.5" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t p-3">
              <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <Trash2 className="size-3.5" />
                <span className="whitespace-nowrap">Clear history</span>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
