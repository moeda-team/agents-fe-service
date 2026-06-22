import { BarChart2, FileText, Database, AlignLeft } from "lucide-react";

const quickActions = [
  {
    icon: BarChart2,
    title: "Riset & Analisis",
    subtitle: "Cari insight, data, dan tren terbaru",
  },
  {
    icon: FileText,
    title: "Buat Konten",
    subtitle: "Artikel, caption, email, dan lainnya",
  },
  {
    icon: Database,
    title: "Analisis Data",
    subtitle: "Olah dan visualisasi data dengan mudah",
  },
  {
    icon: AlignLeft,
    title: "Rangkuman",
    subtitle: "Ringkas dokumen manjadi poin penting",
  },
];

interface WelcomeProps {
  userName: string;
}

export function Welcome({ userName }: WelcomeProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-12">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
        <span className="text-xl font-bold text-primary-foreground">ai</span>
      </div>

      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold">
          Selamat Datang, {userName}! 👋
        </h1>
        <p className="text-muted-foreground">
          Ada yang bisa saya{" "}
          <span className="font-semibold text-primary">bantu</span> hari ini?
        </p>
      </div>

      <div className="grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
        {quickActions.map(({ icon: Icon, title, subtitle }) => (
          <button
            key={title}
            className="flex flex-col items-start gap-3 rounded-xl border bg-card p-4 text-left transition-colors hover:bg-muted"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
