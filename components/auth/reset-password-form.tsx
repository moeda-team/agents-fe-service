"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "./password-input";
import { PasswordStrength } from "./password-strength";

export function ResetPasswordForm() {
  const [password, setPassword] = React.useState("");

  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="new-password">Kata Sandi Baru</Label>
          <PasswordInput
            id="new-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <PasswordStrength value={password} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="confirm-password">Konfirmasi Kata Sandi</Label>
        <PasswordInput id="confirm-password" placeholder="••••••••" />
      </div>

      <Button type="submit" className="h-12 w-full rounded-xl text-base">
        Simpan Password Baru
      </Button>
    </form>
  );
}
