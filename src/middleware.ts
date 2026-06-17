import { NextResponse, type NextRequest } from "next/server";
import { ROLE_HOME_ROUTE } from "@/lib/constants";
import {
  hasValidSession,
  isAuthRoute,
  redirectToLogin,
} from "@/middleware/auth.middleware";
import {
  enforceRoleAccess,
  getRoleFromRequest,
} from "@/middleware/role.guard";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = hasValidSession(request);
  const onAuthRoute = isAuthRoute(pathname);
  const role = getRoleFromRequest(request);

  if (!authenticated && !onAuthRoute && pathname !== "/") {
    return NextResponse.redirect(redirectToLogin(request, pathname));
  }

  if (authenticated && onAuthRoute) {
    const home = role ? ROLE_HOME_ROUTE[role] : "/school/dashboard";
    return NextResponse.redirect(new URL(home, request.url));
  }

  if (authenticated && pathname === "/") {
    const home = role ? ROLE_HOME_ROUTE[role] : "/school/dashboard";
    return NextResponse.redirect(new URL(home, request.url));
  }

  const roleGuardResponse = enforceRoleAccess(request, role);
  if (roleGuardResponse) {
    return roleGuardResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map)$).*)",
  ],
};
