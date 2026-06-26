"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { loginSchema, type LoginFormValues } from "@/lib/validators";
import { useAuthStore } from "@/store/auth.store";
import { useToast } from "@/components/ui/Toast";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

function SocialButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-full border border-neutral-200 bg-white px-5 py-3.5 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center">{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      <ChevronRight className="h-4 w-4 text-neutral-400" />
    </button>
  );
}

export function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const toast = useToast();
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const email = watch("email");

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const redirectPath = await login(values.email, values.password);
      toast.success("Welcome back!", "You have been signed in successfully.");
      router.push(redirectPath);
      router.refresh();
    } catch {
      toast.error("Sign in failed", "Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="relative w-full max-w-[980px] overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      <div className="grid min-h-[580px] grid-cols-1 lg:grid-cols-2">
        {/* Left — form */}
        <div className="flex flex-col justify-between px-8 py-8 sm:px-10 sm:py-10">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-extrabold tracking-tight text-[#22C55E]">SMS</span>
              <span className="text-xs font-semibold text-[#22C55E]/80">●</span>
            </div>

            <h1 className="mt-10 text-[2rem] font-bold leading-tight text-neutral-900">
              Sign in
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-500">
              {email
                ? `Continue with ${email} to access your ${APP_NAME} account.`
                : `Enter your credentials to access your ${APP_NAME} account.`}
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
              <div>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="Email address"
                  className={cn(
                    "w-full rounded-full border border-neutral-200 bg-white px-5 py-3.5 text-sm outline-none transition-colors",
                    "placeholder:text-neutral-400 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20",
                    errors.email && "border-red-400 focus:border-red-400 focus:ring-red-100"
                  )}
                  {...register("email")}
                />
                {errors.email && <p className="mt-1.5 px-2 text-xs text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <input
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  className={cn(
                    "w-full rounded-full border border-neutral-200 bg-white px-5 py-3.5 text-sm outline-none transition-colors",
                    "placeholder:text-neutral-400 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20",
                    errors.password && "border-red-400 focus:border-red-400 focus:ring-red-100"
                  )}
                  {...register("password")}
                />
                {errors.password && <p className="mt-1.5 px-2 text-xs text-red-500">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#1e293b] py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {isSubmitting ? "Signing in…" : "Sign in"}
              </button>
            </form>

          


          </div>

          {/* Footer + cookies */}
         
        </div>

        {/* Right — hero */}
        <div className="relative hidden min-h-[280px] lg:block">
          <Image
            src="/auth/login-hero.png"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 0vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#22C55E]/95 via-[#22C55E]/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <p className="max-w-xs text-center text-2xl font-bold leading-snug text-white drop-shadow-sm sm:text-3xl">
              Every student,<br />every success!
            </p>
          </div>
          <div className="absolute bottom-8 right-8">
            <span className="text-xl font-extrabold text-white/90">SMS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
