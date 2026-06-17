import type {
  AuthResponse,
  LoginCredentials,
  RegisterPayload,
  User,
} from "@/types/auth.types";
import { AUTH_COOKIE } from "@/lib/constants";
import { api, clearTokens, setTokens } from "./axios";

function setAuthCookies(user: User, accessToken: string) {
  if (typeof window === "undefined") return;
  document.cookie = `${AUTH_COOKIE.role}=${user.role}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
  if (user.tenantId) {
    document.cookie = `${AUTH_COOKIE.tenantId}=${user.tenantId}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
  }
  document.cookie = `${AUTH_COOKIE.accessToken}=${accessToken}; path=/; max-age=${60 * 60 * 24}; samesite=lax`;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<{ data: AuthResponse }>(
      "/auth/login",
      credentials
    );
    const data = response.data.data;
    setTokens(data.accessToken, data.refreshToken);
    setAuthCookies(data.user, data.accessToken);
    return data;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await api.post<{ data: AuthResponse }>(
      "/auth/register",
      payload
    );
    const data = response.data.data;
    setTokens(data.accessToken, data.refreshToken);
    setAuthCookies(data.user, data.accessToken);
    return data;
  },

  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } finally {
      clearTokens();
    }
  },

  getMe: async (): Promise<User> => {
    const response = await api.get<{ data: User }>("/auth/me");
    return response.data.data;
  },

  forgotPassword: async (email: string): Promise<void> => {
    await api.post("/auth/forgot-password", { email });
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    await api.post("/auth/reset-password", { token, password });
  },
};
