import { LoginForm } from "@/components/forms/LoginForm";
import { APP_NAME } from "@/lib/constants";

export const metadata = {
  title: "Sign In",
  description: `Sign in to ${APP_NAME}`,
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#ecfdf5] via-[#f0fdf4] to-[#dcfce7] p-4 sm:p-8">
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#22C55E]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-16 h-64 w-64 rounded-full bg-[#86efac]/30 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-white/40 blur-3xl" />

      <LoginForm />
    </div>
  );
}
