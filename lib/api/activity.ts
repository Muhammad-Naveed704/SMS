import apiClient from "../api-client";

export interface ActivityLog {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  action: string;
  resourceType?: string;
  resourceId?: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface ActivityLogsResponse {
  logs: ActivityLog[];
  total: number;
  page: number;
  limit: number;
}

export const activityApi = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    userId?: string;
    action?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ActivityLogsResponse> => {
    const response = await apiClient.get("/admin/activity-logs", { params });
    return response.data.data;
  },
};

