import { ShieldCheck } from "lucide-react";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthCard } from "@/components/auth/auth-card";
import { InfoBox } from "@/components/auth/info-box";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <>
      <AuthHeader
        showBack
        title="Atur Ulang Kata Sandi 🔒"
        subtitle="Buat kata sandi baru yang kuat dan jangan gunakan kata sandi yang sama."
      />
      <AuthCard>
        <ResetPasswordForm />
      </AuthCard>

      <InfoBox icon={ShieldCheck} className="mt-5">
        Pastikan kata sandi diingat oleh Anda, tetapi sulit ditebak oleh orang
        lain.
      </InfoBox>
    </>
  );
}
