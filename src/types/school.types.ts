export type SchoolStatus = "active" | "inactive" | "suspended" | "trial";

export type SubscriptionPlan = "starter" | "professional" | "enterprise";

export interface School {
  id: string;
  name: string;
  slug: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  logoUrl?: string;
  status: SchoolStatus;
  plan: SubscriptionPlan;
  studentCount: number;
  teacherCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SchoolDashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  attendanceRate: number;
  feeCollectionRate: number;
  pendingFees: number;
  collectedFees: number;
  recentEnrollments: number;
}

export interface AttendanceOverview {
  date: string;
  present: number;
  absent: number;
  late: number;
}

export interface FeeCollectionSummary {
  month: string;
  collected: number;
  pending: number;
  overdue: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
