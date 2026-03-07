import apiClient from "../api-client";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post("/users/login", credentials);
    const data = response.data.data;
    if (typeof window !== "undefined" && data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
    }
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/users/logout");
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
  },
};

