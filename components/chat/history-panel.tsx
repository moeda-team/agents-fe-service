"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  Trash2,
  MoreHorizontal,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { createConversationAction, deleteConversationAction } from "@/actions/chat";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  newConversationSchema,
  type NewConversationFormData,
} from "@/lib/validations/chat";
import type { Conversation, ChatGroup, ChatItem } from "@/types/chat";

function groupConversationsByDate(conversations: Conversation[]): ChatGroup[] {
  if (!Array.isArray(conversations)) return [];
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfToday.getDate() - 1);
  const startOf7DaysAgo = new Date(startOfToday);
  startOf7DaysAgo.setDate(startOfToday.getDate() - 7);

  const buckets: { label: string; chats: ChatItem[] }[] = [
    { label: "Hari ini", chats: [] },
    { label: "Kemarin", chats: [] },
    { label: "7 Hari lalu", chats: [] },
    { label: "Lebih lama", chats: [] },
  ];

  for (const conv of conversations) {
    const updated = new Date(conv.updatedAt);
    const startOfUpdated = new Date(
      updated.getFullYear(),
      updated.getMonth(),
      updated.getDate(),
    );

    const displayTime =
      startOfUpdated >= startOfToday
        ? updated.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : updated.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
          });

    const item: ChatItem = {
      id: conv.id,
      title: conv.title,
      updatedAt: displayTime,
    };

    if (startOfUpdated >= startOfToday) {
      buckets[0].chats.push(item);
    } else if (startOfUpdated >= startOfYesterday) {
      buckets[1].chats.push(item);
    } else if (startOfUpdated >= startOf7DaysAgo) {
      buckets[2].chats.push(item);
    } else {
      buckets[3].chats.push(item);
    }
  }

  return buckets.filter((g) => g.chats.length > 0);
}

interface HistoryPanelProps {
  className?: string;
  initialConversations: Conversation[];
}

export function HistoryPanel({
  className,
  initialConversations,
}: HistoryPanelProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeletePending, setIsDeletePending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewConversationFormData>({
    resolver: zodResolver(newConversationSchema),
  });

  const chatGroups = groupConversationsByDate(initialConversations);

  function onSubmit(data: NewConversationFormData) {
    setIsPending(true);
    createConversationAction(data.title).then((result) => {
      setIsPending(false);
      if (result.success) {
        setModalOpen(false);
        reset();
        router.push(`/chat/${result.id}`);
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  }

  function handleDelete() {
    if (!deletingId) return;
    setIsDeletePending(true);
    deleteConversationAction(deletingId).then((result) => {
      setIsDeletePending(false);
      if (result.success) {
        setDeletingId(null);
        if (pathname === `/chat/${deletingId}`) router.push("/chat");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setModalOpen(true);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleMenuToggle(e: React.MouseEvent, chatId: string) {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenuId((prev) => (prev === chatId ? null : chatId));
  }

  return (
    <>
      <Dialog
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) reset();
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Percakapan baru</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title">Judul</Label>
              <Input
                id="title"
                placeholder="Masukkan judul percakapan..."
                autoFocus
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalOpen(false)}
                disabled={isPending}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
                Buat
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!deletingId}
        onOpenChange={(open) => { if (!open) setDeletingId(null); }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Hapus percakapan?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Percakapan ini akan dihapus secara permanen dan tidak dapat dikembalikan.
          </p>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeletingId(null)}
              disabled={isDeletePending}
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeletePending}
            >
              {isDeletePending && <Loader2 className="mr-2 size-4 animate-spin" />}
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
              <button
                onClick={() => setModalOpen(true)}
                disabled={isPending}
                className="flex w-full items-center gap-2 rounded-xl border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-60"
              >
                {isPending ? (
                  <Loader2 className="size-4 shrink-0 animate-spin" />
                ) : (
                  <Plus className="size-4 shrink-0" />
                )}
                <span className="flex-1 whitespace-nowrap text-left">
                  New Chat
                </span>
                <kbd className="inline-flex h-5 items-center rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
                  ⌘ K
                </kbd>
              </button>
            </div>

            {/* Chat list */}
            <div className="flex-1 overflow-y-auto py-2">
              {chatGroups.length === 0 ? (
                <p className="px-4 py-3 text-xs text-muted-foreground">
                  Belum ada percakapan.
                </p>
              ) : (
                chatGroups.map((group) => (
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
                              className="absolute right-2 top-9 z-50 min-w-35 rounded-xl border bg-popover p-1 shadow-lg"
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
                                onClick={() => {
                                  setDeletingId(chat.id);
                                  setOpenMenuId(null);
                                }}
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
                ))
              )}
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
