import Link from "next/link";
import {
  Mail,
  MailOpen,
  RotateCw,
  AtSign,
  Check,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { BackButton } from "@/components/auth/back-button";
import { InfoBox } from "@/components/auth/info-box";
import { ResendTimer } from "@/components/auth/resend-timer";

export default function CheckEmailPage() {
  return (
    <>
      <BackButton className="-ml-2 mb-4" />

      <div className="relative mx-auto -mt-2 mb-5 flex size-24 items-center justify-center rounded-full bg-primary/10">
        <Mail className="size-10 text-primary" />
        <span className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full bg-emerald-500 text-white ring-4 ring-background">
          <Check className="size-4" />
        </span>
      </div>

      <div className="mb-5 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Cek Email Anda 📧
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Kami telah mengirimkan tautan pemulihan ke:
        </p>
      </div>

      <div className="mb-5 rounded-xl bg-muted px-4 py-3 text-center text-sm font-medium text-foreground">
        rizal@email.com
      </div>

      <div className="space-y-3">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 transition-colors hover:bg-muted/50"
        >
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <MailOpen className="size-5" />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-medium text-foreground">
              Buka Email
            </span>
            <span className="block text-xs text-muted-foreground">
              Buka aplikasi email Anda
            </span>
          </span>
          <ChevronRight className="size-4 text-muted-foreground" />
        </Link>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl border border-border/60 bg-card p-4 text-left transition-colors hover:bg-muted/50"
        >
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <RotateCw className="size-5" />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-medium text-foreground">
              Kirim Ulang Email
            </span>
            <span className="block text-xs text-muted-foreground">
              <ResendTimer />
            </span>
          </span>
          <ChevronRight className="size-4 text-muted-foreground" />
        </button>

        <Link
          href="/forgot-password"
          className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 transition-colors hover:bg-muted/50"
        >
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <AtSign className="size-5" />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-medium text-foreground">
              Ganti Email
            </span>
            <span className="block text-xs text-muted-foreground">
              Gunakan email lain
            </span>
          </span>
          <ChevronRight className="size-4 text-muted-foreground" />
        </Link>
      </div>

      <InfoBox icon={ShieldAlert} className="mt-5">
        Jika tidak menemukan email, periksa folder Spam atau Promosi.
      </InfoBox>
    </>
  );
}
