import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: "success" | "error" | "warning" | "info";
}

interface UIStore {
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  toasts: Toast[];
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileSidebarOpen: (open: boolean) => void;
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      sidebarCollapsed: false,
      mobileSidebarOpen: false,
      toasts: [],

      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),

      setMobileSidebarOpen: (mobileSidebarOpen) => set({ mobileSidebarOpen }),

      addToast: (toast) => {
        const id = crypto.randomUUID();
        set({ toasts: [...get().toasts, { ...toast, id }] });
        setTimeout(() => get().removeToast(id), 5000);
      },

      removeToast: (id) =>
        set({ toasts: get().toasts.filter((t) => t.id !== id) }),
    }),
    {
      name: "sms-ui",
      partialize: (state) => ({ sidebarCollapsed: state.sidebarCollapsed }),
    }
  )
);
