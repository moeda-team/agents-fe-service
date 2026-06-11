"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, AtSign } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { GoogleButton } from "@/components/auth/google-button";
import { OrDivider } from "@/components/auth/or-divider";
import { AuthInput } from "@/components/auth/auth-input";
import { PasswordInput } from "@/components/auth/password-input";
import { registerAction } from "@/actions/auth";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";

export function RegisterForm() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { agreed: false },
  });

  async function onSubmit(data: RegisterFormData) {
    const result = await registerAction({
      fullName: data.fullName,
      email: data.email,
      username: data.username,
      password: data.password,
      acceptTerms: data.agreed,
      acceptPrivacy: data.agreed,
    });

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Akun berhasil dibuat!");
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <GoogleButton>Daftar dengan Google</GoogleButton>
      <OrDivider />

      <div className="space-y-1.5">
        <Label htmlFor="fullName">Nama Lengkap</Label>
        <AuthInput
          id="fullName"
          icon={User}
          placeholder="Masukkan nama lengkap"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-xs text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <AuthInput
          id="email"
          icon={Mail}
          type="email"
          placeholder="nama@email.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="username">Username</Label>
        <AuthInput
          id="username"
          icon={AtSign}
          placeholder="Masukkan username"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-xs text-destructive">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password">Kata Sandi</Label>
        <PasswordInput
          id="password"
          placeholder="Minimal 8 karakter"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="confirm">Konfirmasi Kata Sandi</Label>
        <PasswordInput
          id="confirm"
          placeholder="Masukkan ulang kata sandi"
          {...register("confirm")}
        />
        {errors.confirm && (
          <p className="text-xs text-destructive">{errors.confirm.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-start gap-2.5 pt-1">
          <Controller
            name="agreed"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="terms"
                className="mt-0.5"
                checked={field.value}
                onCheckedChange={(v) => field.onChange(v === true)}
              />
            )}
          />
          <label
            htmlFor="terms"
            className="text-sm font-normal leading-relaxed text-muted-foreground"
          >
            Saya menyetujui{" "}
            <Link href="#" className="font-medium text-primary hover:underline">
              Syarat & Ketentuan
            </Link>{" "}
            dan{" "}
            <Link href="#" className="font-medium text-primary hover:underline">
              Kebijakan Privasi
            </Link>
          </label>
        </div>
        {errors.agreed && (
          <p className="text-xs text-destructive">{errors.agreed.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="h-12 w-full rounded-xl text-base"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Mendaftar..." : "Daftar"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Sudah punya akun?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Masuk di sini
        </Link>
      </p>
    </form>
  );
}
