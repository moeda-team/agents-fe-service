import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <>
      <AuthHeader
        title="Selamat Datang 👋"
        subtitle="Masuk untuk melanjutkan dan tingkatkan produktivitasmu."
      />
      <AuthCard>
        <LoginForm />
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
