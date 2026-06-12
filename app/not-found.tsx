import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-primary">
        <span className="text-lg font-bold text-primary-foreground">ai</span>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          404
        </p>
        <h1 className="text-2xl font-semibold">Halaman tidak ditemukan</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Halaman yang kamu cari tidak ada atau sudah dipindahkan.
        </p>
      </div>

      <Button asChild>
        <Link href="/chat">
          <Home />
          Kembali ke beranda
        </Link>
      </Button>
    </div>
  );
}
