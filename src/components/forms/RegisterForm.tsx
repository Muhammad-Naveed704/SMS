"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormValues } from "@/lib/validators";
import { useAuth } from "@/hooks/useAuth";
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

export function RegisterForm() {
  const { register: registerUser } = useAuth();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      schoolName: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser({
        schoolName: values.schoolName,
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });
      toast.success("Account created", "Your school account is ready.");
    } catch {
      toast.error(
        "Registration failed",
        "Unable to create account. Please try again."
      );
    }
  };

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="text-center lg:text-left">
        <h1 className="text-2xl font-semibold text-foreground">
          Create your school account
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Start managing your school in minutes
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Set up your school admin account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="School name"
              placeholder="Springfield Public School"
              error={errors.schoolName?.message}
              {...register("schoolName")}
            />
            <Input
              label="Admin full name"
              placeholder="John Doe"
              error={errors.fullName?.message}
              {...register("fullName")}
            />
            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              placeholder="admin@school.edu"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a strong password"
              error={errors.password?.message}
              {...register("password")}
            />
            <Input
              label="Confirm password"
              type="password"
              autoComplete="new-password"
              placeholder="Confirm your password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
            <Button type="submit" className="w-full" loading={isSubmitting}>
              Create account
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
