import Link from "next/link";
import { Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthInput } from "@/components/auth/auth-input";
import { InfoBox } from "@/components/auth/info-box";

export default function ForgotPasswordPage() {
  return (
    <>
      <AuthHeader
        showBack
        title="Lupa Kata Sandi? 🤔"
        subtitle="Jangan khawatir. Masukkan email yang terdaftar dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi."
      />
      <AuthCard>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <AuthInput
              id="email"
              icon={Mail}
              type="email"
              placeholder="nama@email.com"
            />
          </div>

          <Button
            asChild
            className="h-12 w-full rounded-xl text-base"
          >
            <Link href="/check-email">Kirim Link Pemulihan</Link>
          </Button>

          <InfoBox icon={Mail}>
            Link pemulihan akan dikirim ke email Anda dan berlaku selama{" "}
            <span className="font-medium text-foreground">30 menit</span>.
          </InfoBox>
        </div>
      </AuthCard>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Ingat kata sandi?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Masuk di sini
        </Link>
      </p>
    </>
  );
}
