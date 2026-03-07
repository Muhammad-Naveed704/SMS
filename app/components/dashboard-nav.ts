import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Calendar,
  ClipboardCheck,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Receipt,
  School,
  ScrollText,
  Settings,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import type { UserRole } from "@/lib/roles";

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[];
}

const ALL_ROLES: UserRole[] = ["admin", "teacher", "parent", "student"];

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ALL_ROLES },
  { label: "Students", href: "/students", icon: GraduationCap, roles: ["admin", "teacher"] },
  { label: "Teachers", href: "/teachers", icon: UserCheck, roles: ["admin"] },
  { label: "Classes", href: "/classes", icon: School, roles: ["admin", "teacher"] },
  { label: "Subjects", href: "/subjects", icon: BookOpen, roles: ["admin", "teacher", "student"] },
  { label: "Timetable", href: "/timetable", icon: Calendar, roles: ["admin", "teacher", "student"] },
  { label: "Attendance", href: "/attendance", icon: ClipboardCheck, roles: ["admin", "teacher", "parent"] },
  { label: "Academics", href: "/academics/assignments", icon: ScrollText, roles: ["admin", "teacher", "student"] },
  { label: "Fees", href: "/fees", icon: CreditCard, roles: ["admin", "parent"] },
  { label: "Admissions", href: "/admissions", icon: UserPlus, roles: ["admin"] },
  { label: "Communication", href: "/communication/messages", icon: MessageSquare, roles: ["admin", "teacher", "parent", "student"] },
  { label: "Reports", href: "/reports", icon: Receipt, roles: ["admin", "teacher"] },
  { label: "Parent Portal", href: "/parent-portal", icon: Users, roles: ["admin", "parent"] },
  { label: "Student Portal", href: "/student-portal", icon: Megaphone, roles: ["admin", "student"] },
  { label: "Settings", href: "/settings", icon: Settings, roles: ["admin"] },
];
