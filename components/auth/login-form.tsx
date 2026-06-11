"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { GoogleButton } from "@/components/auth/google-button";
import { OrDivider } from "@/components/auth/or-divider";
import { AuthInput } from "@/components/auth/auth-input";
import { PasswordInput } from "@/components/auth/password-input";
import { loginAction } from "@/actions/auth";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";

export function LoginForm() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });

  async function onSubmit(data: LoginFormData) {
    const result = await loginAction({
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe ?? false,
    });

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Berhasil masuk!");
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <GoogleButton>Masuk dengan Google</GoogleButton>
      <OrDivider />

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
        <Label htmlFor="password">Kata Sandi</Label>
        <PasswordInput
          id="password"
          placeholder="Masukkan kata sandi"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="remember"
                checked={field.value}
                onCheckedChange={(v) => field.onChange(v === true)}
              />
            )}
          />
          <Label
            htmlFor="remember"
            className="text-sm font-normal text-muted-foreground"
          >
            Ingat saya
          </Label>
        </div>
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-primary hover:underline"
        >
          Lupa kata sandi?
        </Link>
      </div>

      <Button
        type="submit"
        className="h-12 w-full rounded-xl text-base"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Masuk..." : "Masuk"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          Daftar sekarang
        </Link>
      </p>
    </form>
  );
}
