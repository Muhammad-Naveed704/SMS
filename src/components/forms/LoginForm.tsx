"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/lib/validators";
import { useAuthStore } from "@/store/auth.store";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { APP_NAME } from "@/lib/constants";

export function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const redirectPath = await login(values.email, values.password);
      toast.success("Welcome back!", "You have been signed in successfully.");
      router.push(redirectPath);
      router.refresh();
    } catch {
      toast.error(
        "Sign in failed",
        "Invalid email or password. Please try again."
      );
    }
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="text-center lg:text-left">
        <h1 className="text-2xl font-semibold text-foreground">
          Welcome to {APP_NAME}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              placeholder="you@school.edu"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register("password")}
            />
            <Button
              type="submit"
              className="w-full"
              loading={isSubmitting}
            >
              Sign in
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Create account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
