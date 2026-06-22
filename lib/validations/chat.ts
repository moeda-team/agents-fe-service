import { z } from "zod";

export const newConversationSchema = z.object({
  title: z
    .string()
    .min(1, "Judul wajib diisi.")
    .max(100, "Judul maksimal 100 karakter."),
});

export type NewConversationFormData = z.infer<typeof newConversationSchema>;
