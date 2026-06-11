import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z.string().min(1, "Nama lengkap wajib diisi"),
    email: z.string().email("Format email tidak valid"),
    username: z.string().min(3, "Username minimal 3 karakter"),
    password: z.string().min(8, "Kata sandi minimal 8 karakter"),
    confirm: z.string(),
    agreed: z.boolean().refine((v) => v, "Kamu harus menyetujui syarat & ketentuan"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Kata sandi tidak cocok",
    path: ["confirm"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(1, "Kata sandi wajib diisi"),
  rememberMe: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Format email tidak valid"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Kata sandi minimal 8 karakter"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Kata sandi tidak cocok",
    path: ["confirm"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
