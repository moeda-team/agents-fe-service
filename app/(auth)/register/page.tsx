import Link from "next/link";
import { User, Mail, ShieldCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthCard } from "@/components/auth/auth-card";
import { GoogleButton } from "@/components/auth/google-button";
import { OrDivider } from "@/components/auth/or-divider";
import { AuthInput } from "@/components/auth/auth-input";
import { PasswordInput } from "@/components/auth/password-input";

export default function RegisterPage() {
  return (
    <>
      <AuthHeader
        showBack
        title="Buat Akun 👋"
        subtitle="Daftar dan mulai perjalanan produktivitasmu hari ini."
      />
      <AuthCard>
        <div className="space-y-4">
          <GoogleButton>Daftar dengan Google</GoogleButton>
          <OrDivider />

          <div className="space-y-1.5">
            <Label htmlFor="name">Nama Lengkap</Label>
            <AuthInput
              id="name"
              icon={User}
              placeholder="Masukkan nama lengkap"
            />
          </div>

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
            <PasswordInput id="password" placeholder="Minimal 8 karakter" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirm">Konfirmasi Kata Sandi</Label>
            <PasswordInput
              id="confirm"
              placeholder="Masukkan ulang kata sandi"
            />
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <Checkbox id="terms" className="mt-0.5" />
            <label
              htmlFor="terms"
              className="text-sm font-normal leading-relaxed text-muted-foreground"
            >
              Saya menyetujui{" "}
              <Link
                href="#"
                className="font-medium text-primary hover:underline"
              >
                Syarat & Ketentuan
              </Link>{" "}
              dan{" "}
              <Link
                href="#"
                className="font-medium text-primary hover:underline"
              >
                Kebijakan Privasi
              </Link>
            </label>
          </div>

          <Button className="h-12 w-full rounded-xl text-base">Daftar</Button>

          <p className="text-center text-sm text-muted-foreground">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </AuthCard>

      <p className="mt-5 flex items-center justify-center gap-2 px-4 text-xs text-muted-foreground">
        <ShieldCheck className="size-4 shrink-0 text-primary" />
        Akunmu aman bersama kami.
        <br /> Kami tidak akan membagikan data pribadimu.
      </p>
    </>
  );
}
