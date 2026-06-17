"use client";

import { useMemo } from "react";
import { useAuthStore } from "@/store/auth.store";
import {
  ROLE_HOME_ROUTE,
  ROLE_ROUTE_PREFIX,
  USER_ROLES,
} from "@/lib/constants";
import type { UserRole } from "@/types/auth.types";

export function useRole() {
  const user = useAuthStore((state) => state.user);
  const role = user?.role ?? null;

  const isRole = useMemo(
    () => (checkRole: UserRole) => role === checkRole,
    [role]
  );

  const hasAccess = useMemo(
    () => (allowedRoles: UserRole[]) =>
      role ? allowedRoles.includes(role) : false,
    [role]
  );

  const homeRoute = role ? ROLE_HOME_ROUTE[role] : "/login";
  const routePrefix = role ? ROLE_ROUTE_PREFIX[role] : null;

  return {
    role,
    user,
    isRole,
    hasAccess,
    homeRoute,
    routePrefix,
    roles: USER_ROLES,
    isOwner: role === "owner",
    isSchoolAdmin: role === "school_admin",
    isTeacher: role === "teacher",
    isStudent: role === "student",
    isParent: role === "parent",
  };
}
