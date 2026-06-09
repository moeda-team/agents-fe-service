import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/auth/back-button";
import { InfoBox } from "@/components/auth/info-box";

export default function ResetPasswordSuccessPage() {
  return (
    <>
      <BackButton className="-ml-2 mb-4" />

      <div className="relative mx-auto -mt-2 mb-6 flex size-24 items-center justify-center">
        <span className="flex size-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
          <Check className="size-10" strokeWidth={3} />
        </span>
        <span className="absolute left-0 top-3 size-2 rounded-full bg-amber-400" />
        <span className="absolute right-1 top-0 size-1.5 rounded-full bg-violet-400" />
        <span className="absolute bottom-3 right-0 size-2 rounded-full bg-sky-400" />
        <span className="absolute bottom-1 left-4 size-1.5 rounded-full bg-rose-400" />
      </div>

      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Kata Sandi Berhasil Diperbarui 🎉
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Kata sandi akun Anda telah berhasil diperbarui. Silakan masuk
          menggunakan kata sandi baru.
        </p>
      </div>

      <Button asChild className="h-12 w-full rounded-xl text-base">
        <Link href="/login">Masuk Sekarang</Link>
      </Button>

      <InfoBox icon={ShieldCheck} className="mt-5">
        <span className="block font-medium text-foreground">
          Akun Anda Lebih Aman
        </span>
        Jangan bagikan kata sandi Anda kepada siapa pun untuk menjaga keamanan
        akun.
      </InfoBox>
    </>
  );
}
