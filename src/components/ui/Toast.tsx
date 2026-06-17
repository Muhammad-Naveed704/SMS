"use client";

import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useUIStore } from "@/store/ui.store";
import { cn } from "@/lib/utils";

const variantStyles = {
  success: {
    container: "border-success/30 bg-success/10",
    icon: "text-success",
    Icon: CheckCircle2,
  },
  error: {
    container: "border-danger/30 bg-danger/10",
    icon: "text-danger",
    Icon: AlertCircle,
  },
  warning: {
    container: "border-warning/30 bg-warning/10",
    icon: "text-warning",
    Icon: AlertTriangle,
  },
  info: {
    container: "border-primary/30 bg-primary/10",
    icon: "text-primary",
    Icon: Info,
  },
};

export function ToastContainer() {
  const toasts = useUIStore((state) => state.toasts);
  const removeToast = useUIStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const style = variantStyles[toast.variant];
        const Icon = style.Icon;

        return (
          <div
            key={toast.id}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-sm",
              style.container
            )}
            role="alert"
          >
            <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", style.icon)} />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {toast.title}
              </p>
              {toast.description && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="shrink-0 rounded p-0.5 text-muted-foreground hover:text-foreground"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function useToast() {
  const addToast = useUIStore((state) => state.addToast);

  return {
    success: (title: string, description?: string) =>
      addToast({ title, description, variant: "success" }),
    error: (title: string, description?: string) =>
      addToast({ title, description, variant: "error" }),
    warning: (title: string, description?: string) =>
      addToast({ title, description, variant: "warning" }),
    info: (title: string, description?: string) =>
      addToast({ title, description, variant: "info" }),
  };
}
