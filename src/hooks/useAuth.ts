"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { authApi } from "@/services/api/auth.api";
import { clearTokens } from "@/services/api/axios";
import type { RegisterPayload } from "@/types/auth.types";

const AUTH_PATHS = ["/login", "/register"];

export function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    fetchUser,
    setUser,
    setLoading,
    reset,
  } = useAuthStore();

  const isAuthPage = AUTH_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  useEffect(() => {
    if (isAuthPage) {
      clearTokens();
      reset();
      setLoading(false);
      return;
    }

    fetchUser();
  }, [isAuthPage, fetchUser, reset, setLoading]);

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      const redirectPath = await login(email, password);
      router.push(redirectPath);
      router.refresh();
    },
    [login, router]
  );

  const handleRegister = useCallback(
    async (payload: RegisterPayload) => {
      const response = await authApi.register(payload);
      setUser(response.user);
      router.push(`/school/dashboard`);
      router.refresh();
    },
    [router, setUser]
  );

  const handleLogout = useCallback(async () => {
    await logout();
    router.push("/login");
    router.refresh();
  }, [logout, router]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    fetchUser,
  };
}
