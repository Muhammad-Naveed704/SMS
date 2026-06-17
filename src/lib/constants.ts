import type { UserRole } from "@/types/auth.types";

export const APP_NAME = "School Management System";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export const AUTH_COOKIE = {
  accessToken: "sms_access_token",
  refreshToken: "sms_refresh_token",
  role: "sms_role",
  tenantId: "sms_tenant_id",
} as const;

export const USER_ROLES: UserRole[] = [
  "owner",
  "school_admin",
  "teacher",
  "student",
  "parent",
];

export const ROLE_HOME_ROUTE: Record<UserRole, string> = {
  owner: "/owner/dashboard",
  school_admin: "/school/dashboard",
  teacher: "/teacher/dashboard",
  student: "/student/dashboard",
  parent: "/parent/dashboard",
};

export const ROLE_ROUTE_PREFIX: Record<UserRole, string> = {
  owner: "/owner",
  school_admin: "/school",
  teacher: "/teacher",
  student: "/student",
  parent: "/parent",
};

export const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
] as const;

export const PAGINATION = {
  defaultPageSize: 10,
  pageSizeOptions: [10, 20, 50, 100],
} as const;

export const QUERY_KEYS = {
  auth: {
    me: ["auth", "me"] as const,
  },
  owner: {
    dashboard: ["owner", "dashboard"] as const,
    schools: ["owner", "schools"] as const,
    users: ["owner", "users"] as const,
    billing: ["owner", "billing"] as const,
    analytics: ["owner", "analytics"] as const,
  },
  school: {
    dashboard: ["school", "dashboard"] as const,
    students: ["school", "students"] as const,
    teachers: ["school", "teachers"] as const,
    classes: ["school", "classes"] as const,
    attendance: ["school", "attendance"] as const,
    fees: ["school", "fees"] as const,
    exams: ["school", "exams"] as const,
    timetable: ["school", "timetable"] as const,
    notifications: ["school", "notifications"] as const,
    reports: ["school", "reports"] as const,
    settings: ["school", "settings"] as const,
  },
  teacher: {
    dashboard: ["teacher", "dashboard"] as const,
    classes: ["teacher", "classes"] as const,
    attendance: ["teacher", "attendance"] as const,
    assignments: ["teacher", "assignments"] as const,
    exams: ["teacher", "exams"] as const,
    results: ["teacher", "results"] as const,
    timetable: ["teacher", "timetable"] as const,
    students: ["teacher", "students"] as const,
    profile: ["teacher", "profile"] as const,
    notifications: ["teacher", "notifications"] as const,
  },
  parent: {
    dashboard: ["parent", "dashboard"] as const,
    children: ["parent", "children"] as const,
    attendance: ["parent", "attendance"] as const,
    fees: ["parent", "fees"] as const,
    results: ["parent", "results"] as const,
    homework: ["parent", "homework"] as const,
    notifications: ["parent", "notifications"] as const,
    messages: ["parent", "messages"] as const,
    documents: ["parent", "documents"] as const,
    profile: ["parent", "profile"] as const,
  },
  student: {
    dashboard: ["student", "dashboard"] as const,
    profile: ["student", "profile"] as const,
    classes: ["student", "classes"] as const,
    attendance: ["student", "attendance"] as const,
    timetable: ["student", "timetable"] as const,
    homework: ["student", "homework"] as const,
    assignments: ["student", "assignments"] as const,
    exams: ["student", "exams"] as const,
    results: ["student", "results"] as const,
    notifications: ["student", "notifications"] as const,
    documents: ["student", "documents"] as const,
  },
} as const;
