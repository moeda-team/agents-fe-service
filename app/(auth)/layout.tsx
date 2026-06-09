import { AuthBackground } from "@/components/auth/auth-background";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-background px-4 py-10">
      <AuthBackground />
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}
