import {
  LayoutDashboard,
  School,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  GraduationCap,
  UserCheck,
  BookOpen,
  CalendarCheck,
  Wallet,
  Bell,
  ClipboardList,
  Home,
  CalendarDays,
  FileBarChart,
  PenLine,
  User,
  MessageSquare,
  BookMarked,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
    icon: UserCheck,
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
    label: "Exams",
    href: "/school/exams",
    icon: ClipboardList,
    roles: ["school_admin"],
  },
  {
    label: "Timetable",
    href: "/school/timetable",
    icon: CalendarDays,
    roles: ["school_admin"],
  },
  {
    label: "Reports",
    href: "/school/reports",
    icon: FileBarChart,
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
  {
    label: "Assignments",
    href: "/teacher/assignments",
    icon: ClipboardList,
    roles: ["teacher"],
  },
  {
    label: "Exams",
    href: "/teacher/exams",
    icon: FileBarChart,
    roles: ["teacher"],
  },
  {
    label: "Results",
    href: "/teacher/results",
    icon: PenLine,
    roles: ["teacher"],
  },
  {
    label: "Timetable",
    href: "/teacher/timetable",
    icon: CalendarDays,
    roles: ["teacher"],
  },
  {
    label: "Students",
    href: "/teacher/students",
    icon: GraduationCap,
    roles: ["teacher"],
  },
  {
    label: "Profile",
    href: "/teacher/profile",
    icon: User,
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
    label: "Profile",
    href: "/student/profile",
    icon: User,
    roles: ["student"],
  },
  {
    label: "Classes",
    href: "/student/classes",
    icon: BookOpen,
    roles: ["student"],
  },
  {
    label: "Attendance",
    href: "/student/attendance",
    icon: CalendarCheck,
    roles: ["student"],
  },
  {
    label: "Timetable",
    href: "/student/timetable",
    icon: CalendarDays,
    roles: ["student"],
  },
  {
    label: "Homework",
    href: "/student/homework",
    icon: BookMarked,
    roles: ["student"],
  },
  {
    label: "Assignments",
    href: "/student/assignments",
    icon: ClipboardList,
    roles: ["student"],
  },
  {
    label: "Exams",
    href: "/student/exams",
    icon: FileBarChart,
    roles: ["student"],
  },
  {
    label: "Results",
    href: "/student/results",
    icon: GraduationCap,
    roles: ["student"],
  },
  {
    label: "Notifications",
    href: "/student/notifications",
    icon: Bell,
    roles: ["student"],
  },
  {
    label: "Documents",
    href: "/student/documents",
    icon: FileText,
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
    icon: Users,
    roles: ["parent"],
  },
  {
    label: "Attendance",
    href: "/parent/attendance",
    icon: CalendarCheck,
    roles: ["parent"],
  },
  {
    label: "Fees",
    href: "/parent/fees",
    icon: Wallet,
    roles: ["parent"],
  },
  {
    label: "Results",
    href: "/parent/results",
    icon: FileBarChart,
    roles: ["parent"],
  },
  {
    label: "Homework",
    href: "/parent/homework",
    icon: BookMarked,
    roles: ["parent"],
  },
  {
    label: "Notifications",
    href: "/parent/notifications",
    icon: Bell,
    roles: ["parent"],
  },
  {
    label: "Messages",
    href: "/parent/messages",
    icon: MessageSquare,
    roles: ["parent"],
  },
  {
    label: "Profile",
    href: "/parent/profile",
    icon: User,
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

export function getNavForRole(role: UserRole): NavItem[] {
  return NAV_BY_ROLE[role] ?? [];
}
