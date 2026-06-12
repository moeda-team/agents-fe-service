"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, LayoutGrid, Activity, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/chat", icon: MessageSquare, label: "Chat" },
  { href: "/workspace", icon: LayoutGrid, label: "Workspace" },
  { href: "/aktivitas", icon: Activity, label: "Aktivitas" },
  { href: "/profil", icon: User, label: "Profil" },
];

interface BottomNavProps {
  className?: string;
}

export function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center border-t bg-background", className)}>
      {tabs.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-3 text-xs transition-colors",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Icon className="size-5" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
