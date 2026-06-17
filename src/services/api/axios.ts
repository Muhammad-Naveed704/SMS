import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL, AUTH_COOKIE } from "@/lib/constants";

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<string | null> | null = null;

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_COOKIE.accessToken);
}

function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_COOKIE.refreshToken);
}

function setTokens(accessToken: string, refreshToken: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_COOKIE.accessToken, accessToken);
  localStorage.setItem(AUTH_COOKIE.refreshToken, refreshToken);
  document.cookie = `${AUTH_COOKIE.accessToken}=${accessToken}; path=/; max-age=${60 * 60 * 24}; samesite=lax`;
}

function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_COOKIE.accessToken);
  localStorage.removeItem(AUTH_COOKIE.refreshToken);
  document.cookie = `${AUTH_COOKIE.accessToken}=; path=/; max-age=0`;
  document.cookie = `${AUTH_COOKIE.refreshToken}=; path=/; max-age=0`;
  document.cookie = `${AUTH_COOKIE.role}=; path=/; max-age=0`;
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/refresh`,
      { refreshToken },
      { headers: { "Content-Type": "application/json" } }
    );
    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
    setTokens(accessToken, newRefreshToken ?? refreshToken);
    return accessToken;
  } catch {
    clearTokens();
    return null;
  }
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig | undefined;
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const newToken = await refreshPromise;
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }

      if (typeof window !== "undefined") {
        const isAuthPage =
          window.location.pathname.startsWith("/login") ||
          window.location.pathname.startsWith("/register");

        clearTokens();

        if (!isAuthPage) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export { setTokens, clearTokens, getAccessToken };
