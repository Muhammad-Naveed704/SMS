import type { SchoolStatus, SubscriptionPlan } from "./school.types";

export interface OwnerSchool {
  id: string;
  name: string;
  slug: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  logoUrl?: string;
  ownerName: string;
  ownerEmail: string;
  plan: SubscriptionPlan;
  studentCount: number;
  teacherCount: number;
  classCount: number;
  revenue: number;
  status: SchoolStatus;
  createdAt: string;
  subscriptionStart?: string;
  subscriptionExpiry?: string;
}

export interface OwnerUser {
  id: string;
  name: string;
  email: string;
  role: "school_admin" | "teacher" | "student" | "parent";
  schoolId: string;
  schoolName: string;
  status: "active" | "inactive";
  lastLogin?: string;
  avatarUrl?: string;
}

export interface SystemActivity {
  id: string;
  type: "user_created" | "school_registered" | "subscription_updated" | "school_suspended";
  message: string;
  actor?: string;
  timestamp: string;
}

export interface OwnerDashboardData {
  totalSchools: number;
  activeSchools: number;
  totalStudents: number;
  totalTeachers: number;
  monthlyRevenue: number;
  activeSubscriptions: number;
  totalRevenue: number;
  revenueGrowth: number;
  activeUsers: number;
  totalUsers: number;
  subscriptionStats: { starter: number; professional: number; enterprise: number };
  revenueByMonth: Array<{ month: string; revenue: number }>;
  schoolsGrowth: Array<{ month: string; schools: number }>;
  userActivity: Array<{ month: string; users: number }>;
  recentSchools: Array<{
    id: string;
    name: string;
    admin: string;
    plan: string;
    students: number;
    status: string;
    createdAt: string;
  }>;
  systemActivity: SystemActivity[];
}

export interface SubscriptionRecord {
  id: string;
  schoolId: string;
  schoolName: string;
  plan: SubscriptionPlan;
  amount: number;
  startDate: string;
  expiryDate: string;
  status: "active" | "expired" | "trial" | "cancelled";
}

export interface Invoice {
  id: string;
  schoolName: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "overdue";
}

export interface BillingData {
  monthlyRevenue: number;
  yearlyRevenue: number;
  activePlans: number;
  expiredSubscriptions: number;
  revenueByMonth: Array<{ month: string; revenue: number }>;
  subscriptions: SubscriptionRecord[];
  invoices: Invoice[];
}

export interface AnalyticsData {
  schoolGrowth: Array<{ label: string; value: number }>;
  studentGrowth: Array<{ label: string; value: number }>;
  revenueGrowth: Array<{ label: string; value: number }>;
  activeUsers: Array<{ label: string; value: number }>;
}

export interface CreateSchoolPayload {
  schoolName: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  plan: SubscriptionPlan;
  startDate: string;
  expiryDate: string;
}

export interface OwnerSettings {
  companyName: string;
  timezone: string;
  supportEmail: string;
  logoUrl?: string;
  emailFrom: string;
  smtpHost: string;
  smtpPort: string;
  notifyNewSchool: boolean;
  notifyPayment: boolean;
  twoFactorRequired: boolean;
  sessionTimeout: number;
}
