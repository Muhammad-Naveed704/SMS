import type { NextRequest } from "next/server";
import { AUTH_COOKIE, AUTH_ROUTES } from "@/lib/constants";

export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export function hasValidSession(request: NextRequest): boolean {
  const accessToken = request.cookies.get(AUTH_COOKIE.accessToken)?.value;
  const role = request.cookies.get(AUTH_COOKIE.role)?.value;

  if (!accessToken || !role) {
    return false;
  }

  try {
    const parts = accessToken.split(".");
    if (parts.length !== 3) return false;

    const payload = JSON.parse(
      Buffer.from(parts[1], "base64url").toString("utf-8")
    ) as { exp?: number };

    if (!payload.exp) return false;
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  return request.cookies.get(AUTH_COOKIE.accessToken)?.value ?? null;
}

export function redirectToLogin(request: NextRequest, pathname: string) {
  const loginUrl = new URL("/login", request.url);
  if (pathname !== "/") {
    loginUrl.searchParams.set("redirect", pathname);
  }
  return loginUrl;
}
