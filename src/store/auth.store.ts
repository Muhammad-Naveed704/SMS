import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/auth.types";
import { authApi } from "@/services/api/auth.api";
import { clearTokens } from "@/services/api/axios";
import { ROLE_HOME_ROUTE } from "@/lib/constants";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  login: (email: string, password: string) => Promise<string>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) =>
        set({ user, isAuthenticated: Boolean(user), isLoading: false }),

      setLoading: (isLoading) => set({ isLoading }),

      login: async (email, password) => {
        const response = await authApi.login({ email, password });
        set({
          user: response.user,
          isAuthenticated: true,
          isLoading: false,
        });
        return ROLE_HOME_ROUTE[response.user.role];
      },

      logout: async () => {
        try {
          await authApi.logout();
        } finally {
          clearTokens();
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },

      fetchUser: async () => {
        set({ isLoading: true });
        try {
          const user = await authApi.getMe();
          set({ user, isAuthenticated: true, isLoading: false });
        } catch {
          clearTokens();
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },

      reset: () =>
        set({ user: null, isAuthenticated: false, isLoading: false }),
    }),
    {
      name: "sms-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
