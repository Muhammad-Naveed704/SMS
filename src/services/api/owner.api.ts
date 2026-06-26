import type { PaginationParams } from "@/lib/validators";
import type {
  AnalyticsData,
  BillingData,
  OwnerDashboardData,
  OwnerSchool,
  OwnerSettings,
  OwnerUser,
} from "@/types/owner.types";
import type { PaginatedResult } from "./types";
import { apiGet, apiPatch } from "./client";

export interface OwnerDashboardStats {
  totalSchools: number;
  activeSchools: number;
  totalRevenue: number;
  monthlyRevenue: number;
  revenueGrowth: number;
  activeUsers: number;
  totalUsers: number;
  subscriptionStats: { starter: number; professional: number; enterprise: number };
  revenueByMonth: Array<{ month: string; revenue: number }>;
  schoolsGrowth: Array<{ month: string; schools: number }>;
  recentSchools: Array<{
    id: string;
    name: string;
    plan: string;
    status: string;
    createdAt: string;
  }>;
  systemActivity?: OwnerDashboardData["systemActivity"];
}

export const ownerApi = {
  getDashboardStats: () => apiGet<OwnerDashboardStats>("/owner/dashboard"),

  getSchools: (params?: PaginationParams) =>
    apiGet<PaginatedResult<OwnerSchool>>("/owner/schools", { params }),

  getSchool: (id: string) => apiGet<OwnerSchool>(`/owner/schools/${id}`),

  getUsers: (params?: PaginationParams) =>
    apiGet<PaginatedResult<OwnerUser>>("/owner/users", { params }),

  getBilling: () => apiGet<BillingData>("/owner/billing"),

  getAnalytics: () => apiGet<AnalyticsData>("/owner/analytics"),

  getSettings: () => apiGet<OwnerSettings>("/owner/settings"),

  updateSettings: (payload: Partial<OwnerSettings>) =>
    apiPatch<OwnerSettings>("/owner/settings", payload),
};
