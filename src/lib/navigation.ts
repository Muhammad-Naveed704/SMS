import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  School,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  Wallet,
  Bell,
  UserCircle,
} from "lucide-react";
import type { UserRole } from "@/types/auth.types";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[];
}

export const OWNER_NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: "/owner/dashboard",
    icon: LayoutDashboard,
    roles: ["owner"],
  },
  {
    label: "Schools",
    href: "/owner/schools",
    icon: School,
    roles: ["owner"],
  },
  {
    label: "Users",
    href: "/owner/users",
    icon: Users,
    roles: ["owner"],
  },
  {
    label: "Billing",
    href: "/owner/billing",
    icon: CreditCard,
    roles: ["owner"],
  },
  {
    label: "Analytics",
    href: "/owner/analytics",
    icon: BarChart3,
    roles: ["owner"],
  },
  {
    label: "Settings",
    href: "/owner/settings",
    icon: Settings,
    roles: ["owner"],
  },
];

export const SCHOOL_NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: "/school/dashboard",
    icon: LayoutDashboard,
    roles: ["school_admin"],
  },
  {
    label: "Students",
    href: "/school/students",
    icon: GraduationCap,
    roles: ["school_admin"],
  },
  {
    label: "Teachers",
    href: "/school/teachers",
    icon: Users,
    roles: ["school_admin"],
  },
  {
    label: "Classes",
    href: "/school/classes",
    icon: BookOpen,
    roles: ["school_admin"],
  },
  {
    label: "Attendance",
    href: "/school/attendance",
    icon: CalendarCheck,
    roles: ["school_admin"],
  },
  {
    label: "Fees",
    href: "/school/fees",
    icon: Wallet,
    roles: ["school_admin"],
  },
  {
    label: "Notifications",
    href: "/school/notifications",
    icon: Bell,
    roles: ["school_admin"],
  },
  {
    label: "Settings",
    href: "/school/settings",
    icon: Settings,
    roles: ["school_admin"],
  },
];

export const TEACHER_NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: "/teacher/dashboard",
    icon: LayoutDashboard,
    roles: ["teacher"],
  },
  {
    label: "Classes",
    href: "/teacher/classes",
    icon: BookOpen,
    roles: ["teacher"],
  },
  {
    label: "Attendance",
    href: "/teacher/attendance",
    icon: CalendarCheck,
    roles: ["teacher"],
  },
];

export const STUDENT_NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
    roles: ["student"],
  },
  {
    label: "Grades",
    href: "/student/grades",
    icon: BarChart3,
    roles: ["student"],
  },
  {
    label: "Attendance",
    href: "/student/attendance",
    icon: CalendarCheck,
    roles: ["student"],
  },
];

export const PARENT_NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: "/parent/dashboard",
    icon: LayoutDashboard,
    roles: ["parent"],
  },
  {
    label: "Children",
    href: "/parent/children",
    icon: UserCircle,
    roles: ["parent"],
  },
  {
    label: "Fees",
    href: "/parent/fees",
    icon: Wallet,
    roles: ["parent"],
  },
];

export const NAV_BY_ROLE: Record<UserRole, NavItem[]> = {
  owner: OWNER_NAV,
  school_admin: SCHOOL_NAV,
  teacher: TEACHER_NAV,
  student: STUDENT_NAV,
  parent: PARENT_NAV,
};

export const ROLE_LABELS: Record<UserRole, string> = {
  owner: "Platform Owner",
  school_admin: "School Admin",
  teacher: "Teacher",
  student: "Student",
  parent: "Parent",
};
