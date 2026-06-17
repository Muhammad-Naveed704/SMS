import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  AUTH_COOKIE,
  ROLE_HOME_ROUTE,
  ROLE_ROUTE_PREFIX,
  USER_ROLES,
} from "@/lib/constants";
import type { UserRole } from "@/types/auth.types";

export function getRoleFromRequest(request: NextRequest): UserRole | null {
  const role = request.cookies.get(AUTH_COOKIE.role)?.value;
  if (role && USER_ROLES.includes(role as UserRole)) {
    return role as UserRole;
  }
  return null;
}

export function canAccessRoute(role: UserRole, pathname: string): boolean {
  const prefix = ROLE_ROUTE_PREFIX[role];
  if (pathname.startsWith(prefix)) return true;

  const sharedPrefixes = ["/api", "/_next"];
  if (sharedPrefixes.some((p) => pathname.startsWith(p))) return true;

  return false;
}

export function enforceRoleAccess(
  request: NextRequest,
  role: UserRole | null
): NextResponse | null {
  const { pathname } = request.nextUrl;

  if (!role) {
    return null;
  }

  const rolePrefixes = Object.values(ROLE_ROUTE_PREFIX);
  const isProtectedPanelRoute = rolePrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!isProtectedPanelRoute) {
    return null;
  }

  if (!canAccessRoute(role, pathname)) {
    return NextResponse.redirect(
      new URL(ROLE_HOME_ROUTE[role], request.url)
    );
  }

  return null;
}
