import apiClient from "../api-client";

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalMessages: number;
  totalConversations: number;
  totalEvents: number;
  recentActivities: any[];
}

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get("/admin/dashboard");
    return response.data.data;
  },
};

