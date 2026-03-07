import apiClient from "../api-client";

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user";
  permissions: {
    read: boolean;
    write: boolean;
    update: boolean;
    delete: boolean;
  };
  isActive: boolean;
  createdAt: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export const usersApi = {
  getAll: async (params?: { page?: number; limit?: number; search?: string }): Promise<UsersResponse> => {
    const response = await apiClient.get("/admin/users", { params });
    return response.data.data;
  },

  updatePermissions: async (userId: string, data: Partial<User>): Promise<User> => {
    const response = await apiClient.put(`/admin/users/${userId}/permissions`, data);
    return response.data.data;
  },

  delete: async (userId: string): Promise<void> => {
    await apiClient.delete(`/admin/users/${userId}`);
  },
};

