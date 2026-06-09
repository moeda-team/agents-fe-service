import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthCard } from "@/components/auth/auth-card";
import { GoogleButton } from "@/components/auth/google-button";
import { OrDivider } from "@/components/auth/or-divider";
import { AuthInput } from "@/components/auth/auth-input";
import { PasswordInput } from "@/components/auth/password-input";

export default function LoginPage() {
  return (
    <>
      <AuthHeader
        title="Selamat Datang 👋"
        subtitle="Masuk untuk melanjutkan dan tingkatkan produktivitasmu."
      />
      <AuthCard>
        <div className="space-y-4">
          <GoogleButton>Masuk dengan Google</GoogleButton>
          <OrDivider />

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <AuthInput
              id="email"
              icon={Mail}
              type="email"
              placeholder="nama@email.com"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Kata Sandi</Label>
            <PasswordInput id="password" placeholder="Masukkan kata sandi" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label
                htmlFor="remember"
                className="text-sm font-normal text-muted-foreground"
              >
                Ingat saya
              </Label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              Lupa kata sandi?
            </Link>
          </div>

          <Button className="h-12 w-full rounded-xl text-base">Masuk</Button>

          <p className="text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Daftar sekarang
            </Link>
          </p>
        </div>
      </AuthCard>

      <p className="mt-5 flex items-center justify-center gap-2 px-4 text-xs text-muted-foreground">
        <ShieldCheck className="size-4 shrink-0 text-primary" />
        <span>
          Dengan masuk, kamu menyetujui
          <br />
          <Link
            href="#"
            className="font-medium text-foreground hover:underline"
          >
            Syarat & Ketentuan
          </Link>{" "}
          dan{" "}
          <Link
            href="#"
            className="font-medium text-foreground hover:underline"
          >
            Kebijakan Privasi
          </Link>
        </span>
      </p>
    </>
  );
}
