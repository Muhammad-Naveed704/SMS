"use client";

import { useState } from "react";
import { Menu, Moon, Sun, Bell, LogOut } from "lucide-react";
import { useTheme } from "@/theme/theme-provider";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";
import { useUIStore } from "@/store/ui.store";
import { cn, getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Sidebar } from "./Sidebar";

interface NavbarProps {
  title?: string;
  description?: string;
}

export function Navbar({ title, description }: NavbarProps) {
  const { mode, toggleMode } = useTheme();
  const { user, logout } = useAuth();
  const { role } = useRole();
  const setMobileSidebarOpen = useUIStore((state) => state.setMobileSidebarOpen);
  const mobileSidebarOpen = useUIStore((state) => state.mobileSidebarOpen);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const roleLabel = role?.replace("_", " ") ?? "";

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-md lg:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            {title && (
              <h1 className="text-lg font-semibold text-foreground">{title}</h1>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMode}
            aria-label="Toggle theme"
          >
            {mode === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          <Button variant="ghost" size="sm" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowUserMenu((prev) => !prev)}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {getInitials(user?.name ?? "U")}
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-medium text-foreground">
                  {user?.name ?? "User"}
                </p>
                <p className="text-xs capitalize text-muted-foreground">
                  {roleLabel}
                </p>
              </div>
            </button>

            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-border bg-card p-1 shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-danger hover:bg-muted"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 shadow-xl">
            <Sidebar
              mobile
              onNavigate={() => setMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
