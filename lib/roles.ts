import type { NextRequest } from "next/server";

export type UserRole = "admin" | "teacher" | "parent" | "student";

export const USER_ROLES: UserRole[] = ["admin", "teacher", "parent", "student"];
export const DEFAULT_USER_ROLE: UserRole = "admin";

export const ROLE_HOME_ROUTE: Record<UserRole, string> = {
  admin: "/students",
  teacher: "/academics/assignments",
  parent: "/parent-portal",
  student: "/student-portal",
};

export function isUserRole(value: string | null | undefined): value is UserRole {
  return USER_ROLES.includes((value ?? "") as UserRole);
}

export function getRoleFromQueryParam(role: string | null | undefined): UserRole | null {
  return isUserRole(role) ? role : null;
}

export function getRoleFromCookieValue(
  role: string | null | undefined
): UserRole | null {
  return isUserRole(role) ? role : null;
}

export function resolveRoleFromRequest(request: NextRequest): UserRole {
  const queryRole = getRoleFromQueryParam(request.nextUrl.searchParams.get("role"));
  if (queryRole) {
    return queryRole;
  }

  const cookieRole = getRoleFromCookieValue(request.cookies.get("sms_role")?.value);
  return cookieRole ?? DEFAULT_USER_ROLE;
}

export function resolveRoleFromClientState(search: string, cookie: string): UserRole {
  const searchParams = new URLSearchParams(search);
  const queryRole = getRoleFromQueryParam(searchParams.get("role"));
  if (queryRole) {
    return queryRole;
  }

  const roleCookie = cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith("sms_role="))
    ?.split("=")[1];

  const cookieRole = getRoleFromCookieValue(roleCookie);
  return cookieRole ?? DEFAULT_USER_ROLE;
}
