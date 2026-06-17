import type { PaginationParams } from "@/lib/validators";
import type { PaginatedResponse } from "@/types/school.types";
import type { School } from "@/types/school.types";
import { api } from "./axios";

export interface OwnerDashboardStats {
  totalSchools: number;
  activeSchools: number;
  totalRevenue: number;
  monthlyRevenue: number;
  revenueGrowth: number;
  activeUsers: number;
  totalUsers: number;
  subscriptionStats: {
    starter: number;
    professional: number;
    enterprise: number;
  };
  revenueByMonth: Array<{ month: string; revenue: number }>;
  schoolsGrowth: Array<{ month: string; schools: number }>;
  recentSchools: Array<{
    id: string;
    name: string;
    plan: string;
    status: string;
    createdAt: string;
  }>;
}

export const ownerApi = {
  getDashboardStats: async (): Promise<OwnerDashboardStats> => {
    const response = await api.get<{ data: OwnerDashboardStats }>(
      "/owner/dashboard"
    );
    return response.data.data;
  },

  getSchools: async (
    params?: PaginationParams
  ): Promise<PaginatedResponse<School>> => {
    const response = await api.get<{ data: PaginatedResponse<School> }>(
      "/owner/schools",
      { params }
    );
    return response.data.data;
  },

  getUsers: async (params?: PaginationParams) => {
    const response = await api.get("/owner/users", { params });
    return response.data.data;
  },

  getBilling: async () => {
    const response = await api.get("/owner/billing");
    return response.data.data;
  },

  getAnalytics: async () => {
    const response = await api.get("/owner/analytics");
    return response.data.data;
  },
};
