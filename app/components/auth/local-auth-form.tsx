"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

type DemoRole = "admin" | "teacher" | "parent" | "student";

interface DemoUser {
  id: string;
  email: string;
  password: string;
  fullName: string;
  schoolName?: string;
  role: DemoRole;
}

interface LocalAuthFormProps {
  mode: "login" | "register";
}

const DEMO_ROLES: DemoRole[] = ["admin", "teacher", "parent", "student"];
const USERS_KEY = "sms_demo_users";
const CURRENT_USER_KEY = "sms_demo_current_user";

function getStoredUsers(): DemoUser[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as DemoUser[];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: DemoUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setDemoSession(user: Pick<DemoUser, "email" | "fullName" | "role">) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  localStorage.setItem("sms_role", user.role);

  // Cookie required so middleware treats user as authenticated.
  document.cookie = `sms_session=demo-session-${Date.now()}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
  document.cookie = `sms_role=${user.role}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
}

export function LocalAuthForm({ mode }: LocalAuthFormProps) {
  const router = useRouter();
  const isLogin = mode === "login";

  const [schoolName, setSchoolName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<DemoRole>("admin");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const title = useMemo(
    () => (isLogin ? "Welcome Back" : "Create School Account"),
    [isLogin]
  );
  const description = useMemo(
    () =>
      isLogin
        ? "Login with demo credentials to preview all protected pages."
        : "Create a local demo account and instantly access the SaaS dashboard.",
    [isLogin]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const users = getStoredUsers();

      if (!normalizedEmail || !password.trim()) {
        setError("Email and password are required.");
        return;
      }

      if (isLogin) {
        const existingUser = users.find(
          (user) =>
            user.email.toLowerCase() === normalizedEmail &&
            user.password === password
        );

        const loginUser: DemoUser =
          existingUser ??
          ({
            id: `demo-${Date.now()}`,
            email: normalizedEmail,
            password,
            fullName: normalizedEmail.split("@")[0] ?? "Demo User",
            role,
          } as DemoUser);

        if (!existingUser) {
          saveStoredUsers([...users, loginUser]);
        }

        setDemoSession({
          email: loginUser.email,
          fullName: loginUser.fullName,
          role: loginUser.role,
        });

        router.push(`/dashboard?role=${loginUser.role}`);
        router.refresh();
        return;
      }

      if (!fullName.trim() || !schoolName.trim()) {
        setError("School name and admin name are required for signup.");
        return;
      }

      const duplicateUser = users.find(
        (user) => user.email.toLowerCase() === normalizedEmail
      );
      if (duplicateUser) {
        setError("This email is already registered. Please login instead.");
        return;
      }

      const newUser: DemoUser = {
        id: `demo-${Date.now()}`,
        email: normalizedEmail,
        password,
        fullName: fullName.trim(),
        schoolName: schoolName.trim(),
        role,
      };

      saveStoredUsers([...users, newUser]);
      setDemoSession({
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
      });

      router.push(`/dashboard?role=${newUser.role}`);
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="space-y-2">
                <Label htmlFor="schoolName">School Name</Label>
                <Input
                  id="schoolName"
                  name="schoolName"
                  placeholder="Springfield Public School"
                  value={schoolName}
                  onChange={(event) => setSchoolName(event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Admin Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@school.edu"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role (for UI preview)</Label>
            <select
              id="role"
              name="role"
              className="flex h-9 w-full rounded-md border border-border bg-input-background px-3 py-1 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={role}
              onChange={(event) => setRole(event.target.value as DemoRole)}
            >
              {DEMO_ROLES.map((demoRole) => (
                <option key={demoRole} value={demoRole}>
                  {demoRole.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <Button className="w-full" type="submit" disabled={submitting}>
            {submitting
              ? "Please wait..."
              : isLogin
                ? "Sign In (Local Demo)"
                : "Create Account (Local Demo)"}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground">
          {isLogin ? "Need an account?" : "Already registered?"}{" "}
          <Link
            href={isLogin ? "/register" : "/login"}
            className="font-medium text-primary underline"
          >
            Continue
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

