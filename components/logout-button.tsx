"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/actions/auth";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logoutAction();
    router.replace("/login");
  }

  return (
    <Button size="lg" variant="outline" onClick={() => void handleLogout()}>
      <LogOut />
      Keluar
    </Button>
  );
}
