import type { ChatGroup, Message } from "@/types/chat";

export const mockChatGroups: ChatGroup[] = [
  {
    label: "Hari ini",
    chats: [
      { id: "1", title: "Analisis kompetitor Saas di Indonesia...", updatedAt: "09:41" },
      { id: "2", title: "Strategi konten Q2", updatedAt: "08:22" },
    ],
  },
  {
    label: "Kemarin",
    chats: [
      { id: "3", title: "Ide konten untuk kompetitor", updatedAt: "14:35" },
      { id: "4", title: "Analisis shuru shu", updatedAt: "10:14" },
    ],
  },
  {
    label: "2 Hari lalu",
    chats: [
      { id: "5", title: "Report catatan bulan April", updatedAt: "16:22" },
      { id: "6", title: "Brainstorming fitur baru", updatedAt: "09:50" },
    ],
  },
  {
    label: "7 Hari lalu",
    chats: [
      { id: "7", title: "Riset pasar aplikasi HR", updatedAt: "11:30" },
    ],
  },
];

export const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      role: "user",
      content:
        "Buatkan analisis kompetitor untuk 5 perusahaan Saas di Indonesia. fokus ke pricing, fitur utama, dan keunggulan kompetitif mereka.",
      createdAt: "09:41",
    },
    {
      id: "m2",
      role: "assistant",
      content: "",
      createdAt: "09:41",
      skillName: "Riset Kompetitor",
      agentSteps: [
        { id: "s1", label: "Memahami permintaan", status: "done", duration: "00:04" },
        { id: "s2", label: "Mencari & mengumpulkan data", status: "in_progress", duration: "00:04" },
        { id: "s3", label: "Menganalisis data", status: "pending" },
        { id: "s4", label: "Menyusun laporan", status: "pending" },
        { id: "s5", label: "Menyesuaikan", status: "pending" },
      ],
    },
    {
      id: "m3",
      role: "assistant",
      content: `Berikut hasil analisis 5 kompetitor SaaS di Indonesia yang mencakup pricing, fitur utama, dan keunggulan kompetitif mereka.

Ringkasan Perbandingan

Jurnal — Rp 247rb/bln — Akuntansi, Pajak, Inventory — Reputasi solid di kalangan enterprise
HashMicro — Rp Qty/bln — ERP, CRM, Inventory, Accounting — Modular & dapat dikustomisasi
Mekari — Rp 350rb/bln — HR, Payroll, Akuntansi, Automation — Ekosistem produk terintegrasi
Qontak — Rp 300rb/bln — CRM, Omnichannel, Automation — Omnichannel communication built-in
Bride — Rp 200rb/bln — CRM, Omnichannel, Inventory — Fokus di e-commerce & omnichannel

Insight Utama
• Jurnal unggul untuk enterprise & pajak lokal Indonesia
• HashMicro cocok untuk enterprise yang butuh solusi ERP menyeluruh
• Mekari menjadi pilihan utama untuk HR & payroll dengan integrasi produk
• Qontak satu unggul untuk bisnis dengan kebutuhan omnichannel communication
• Bride satu unggul untuk bisnis e-commerce dengan fitur end-to-end`,
      createdAt: "09:41",
      actions: [
        { id: "a1", label: "Buat tabel lengkap", icon: "Table" },
        { id: "a2", label: "Buat visual perbandingan", icon: "BarChart2" },
        { id: "a3", label: "Export ke PDF", icon: "FileDown" },
      ],
    },
  ],
};
