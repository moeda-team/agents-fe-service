"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageSquare,
  LayoutGrid,
  Activity,
  User,
  Settings,
  ShieldCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Beranda" },
  { href: "/chat", icon: MessageSquare, label: "Chat" },
  { href: "/workspace", icon: LayoutGrid, label: "Workspace" },
  { href: "/aktivitas", icon: Activity, label: "Aktivitas" },
  { href: "/profil", icon: User, label: "Profil" },
  { href: "/settings", icon: Settings, label: "Pengaturan" },
];

interface SidebarNavProps {
  className?: string;
}

export function SidebarNav({ className }: SidebarNavProps) {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <nav
      style={{ width: expanded ? 200 : 60 }}
      className={cn(
        "flex shrink-0 flex-col overflow-hidden border-r bg-background py-4 transition-[width] duration-200",
        className,
      )}
    >
      {/* Logo */}
      <div className="mb-6 flex items-center gap-3 px-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary">
          <span className="text-xs font-bold text-primary-foreground">AI</span>
        </div>
        <span
          className={cn(
            "overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-200",
            expanded ? "max-w-xs opacity-100" : "max-w-0 opacity-0",
          )}
        >
          AI SKILL
        </span>
      </div>

      {/* Nav items */}
      <div className="flex flex-1 flex-col gap-0.5 px-3">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            title={!expanded ? label : undefined}
            className={cn(
              "flex h-10 items-center rounded-xl transition-colors",
              expanded ? "gap-3 px-3" : "justify-center",
              isActive(href)
                ? "bg-primary/10 text-primary font-bold"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-5 shrink-0" />
            <span
              className={cn(
                "overflow-hidden whitespace-nowrap text-sm transition-all duration-200",
                expanded ? "max-w-xs opacity-100" : "max-w-0 opacity-0",
              )}
            >
              {label}
            </span>
          </Link>
        ))}

        {/* Security card — always in DOM, height animated with grid trick */}
        <div
          className={cn(
            "mt-auto grid transition-[grid-template-rows] duration-200",
            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <Link
              href="/settings"
              className={cn(
                "mt-2 flex flex-col gap-2 rounded-xl bg-muted p-3 transition-opacity hover:bg-muted/80",
                expanded
                  ? "opacity-100 delay-[180ms] duration-150"
                  : "pointer-events-none opacity-0 duration-75",
              )}
            >
              <ShieldCheck className="size-5 shrink-0 text-primary" />
              <div className="space-y-1 overflow-hidden">
                <p className="text-xs font-semibold leading-snug text-foreground">
                  Akunmu aman bersama kami.
                </p>
                <p className="text-xs leading-snug text-muted-foreground">
                  Kami tidak akan membagikan data pribadimu.
                </p>
              </div>
              <div className="flex justify-end">
                <ArrowRight className="size-4 text-primary" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Collapse toggle */}
      <div className="px-3 pt-2">
        <button
          onClick={() => setExpanded(!expanded)}
          title={expanded ? "Tutup sidebar" : "Buka sidebar"}
          className="flex h-10 w-full items-center gap-3 rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {expanded ? (
            <>
              <ChevronLeft className="size-5 shrink-0" />
              <span className="overflow-hidden whitespace-nowrap text-sm">
                Sembunyikan
              </span>
            </>
          ) : (
            <ChevronRight className="mx-auto size-5 shrink-0" />
          )}
        </button>
      </div>
    </nav>
  );
}
