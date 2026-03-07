import { NextResponse, type NextRequest } from "next/server";
import {
  ROLE_HOME_ROUTE,
  getRoleFromQueryParam,
  getRoleFromCookieValue,
  DEFAULT_USER_ROLE,
  type UserRole,
} from "@/lib/roles";

const AUTH_ROUTE_PREFIXES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function resolveRole(request: NextRequest): UserRole {
  const queryRole = getRoleFromQueryParam(request.nextUrl.searchParams.get("role"));
  if (queryRole) {
    return queryRole;
  }
  return (
    getRoleFromCookieValue(request.cookies.get("sms_role")?.value) ?? DEFAULT_USER_ROLE
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get("sms_session")?.value);
  const roleFromQuery = getRoleFromQueryParam(request.nextUrl.searchParams.get("role"));
  const role = resolveRole(request);
  const onAuthRoute = isAuthRoute(pathname);

  const applyRoleCookie = (response: NextResponse) => {
    if (!roleFromQuery) {
      return response;
    }
    response.cookies.set("sms_role", roleFromQuery, {
      path: "/",
      sameSite: "lax",
      httpOnly: false,
    });
    return response;
  };

  if (!hasSession && !onAuthRoute) {
    const loginUrl = new URL("/login", request.url);
    return applyRoleCookie(NextResponse.redirect(loginUrl));
  }

  if (hasSession && onAuthRoute) {
    const homeUrl = new URL(ROLE_HOME_ROUTE[role], request.url);
    return applyRoleCookie(NextResponse.redirect(homeUrl));
  }

  if (hasSession && pathname === "/dashboard") {
    const homeUrl = new URL(ROLE_HOME_ROUTE[role], request.url);
    return applyRoleCookie(NextResponse.redirect(homeUrl));
  }

  return applyRoleCookie(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map)$).*)",
  ],
};
