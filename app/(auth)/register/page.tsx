import { ShieldCheck } from "lucide-react";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <>
      <AuthHeader
        showBack
        title="Buat Akun 👋"
        subtitle="Daftar dan mulai perjalanan produktivitasmu hari ini."
      />
      <AuthCard>
        <RegisterForm />
      </AuthCard>

      <p className="mt-5 flex items-center justify-center gap-2 px-4 text-xs text-muted-foreground">
        <ShieldCheck className="size-4 shrink-0 text-primary" />
        Akunmu aman bersama kami.
        <br /> Kami tidak akan membagikan data pribadimu.
      </p>
    </>
  );
}
