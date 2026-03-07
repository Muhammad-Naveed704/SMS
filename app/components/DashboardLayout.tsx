"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  UserCircle2,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import { cn } from "@/lib/utils";
import { DASHBOARD_NAV_ITEMS } from "@/app/components/dashboard-nav";
import {
  DEFAULT_USER_ROLE,
  type UserRole,
  resolveRoleFromClientState,
} from "@/lib/roles";

function Sidebar({
  role,
  mobile = false,
  onNavigate,
  collapsed = false,
}: {
  role: UserRole;
  mobile?: boolean;
  onNavigate?: () => void;
  collapsed?: boolean;
}) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex flex-col bg-background border-r border-border transition-all duration-300",
        mobile ? "w-full" : collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-6">
        <h1
          className={cn(
            "font-bold text-primary transition-all duration-300",
            collapsed && !mobile ? "text-lg" : "text-2xl"
          )}
        >
          {collapsed && !mobile ? "SMS" : "School Management"}
        </h1>
        {(!collapsed || mobile) && (
          <p className="text-sm text-muted-foreground mt-1">
            {role.charAt(0).toUpperCase() + role.slice(1)} workspace
          </p>
        )}
      </div>
      <nav className="flex-1 space-y-1 px-3 overflow-y-auto">
        {DASHBOARD_NAV_ITEMS.filter((item) => item.roles.includes(role)).map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                isActive
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              title={collapsed && !mobile ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {(!collapsed || mobile) && (
                <span className="truncate">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const role = useMemo<UserRole>(() => {
    if (typeof window === "undefined") {
      return DEFAULT_USER_ROLE;
    }
    return resolveRoleFromClientState(
      searchParams.toString(),
      document.cookie
    );
  }, [searchParams]);

  const pageTitle = useMemo(() => {
    const current = DASHBOARD_NAV_ITEMS.find((item) =>
      pathname === item.href || pathname.startsWith(`${item.href}/`)
    );

    if (current) {
      return current.label;
    }

    const segment = pathname.split("/").filter(Boolean).pop();
    if (!segment) {
      return "Dashboard";
    }

    return segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (value) => value.toUpperCase());
  }, [pathname]);

  const updateRolePreview = (nextRole: UserRole) => {
    document.cookie = `sms_role=${nextRole}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
    router.push(`${pathname}?role=${nextRole}`);
    router.refresh();
  };

  const logoutDemo = () => {
    document.cookie = "sms_session=; path=/; max-age=0; samesite=lax";
    document.cookie = "sms_role=; path=/; max-age=0; samesite=lax";
    localStorage.removeItem("sms_demo_current_user");
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex relative">
        <Sidebar role={role} collapsed={collapsed} />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-6 h-6 w-6 rounded-full border border-border bg-background shadow-md z-10 hover:bg-muted"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </aside>

      {/* Mobile + Main content */}
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="flex flex-1 flex-col w-full overflow-hidden">
          <header className="flex h-16 items-center justify-between gap-4 border-b border-border bg-background px-6 shadow-sm">
            <SheetTrigger asChild>
              <Button type="button" variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <div className="flex min-w-0 flex-col">
              <h1 className="truncate text-base font-semibold md:text-lg">{pageTitle}</h1>
              <p className="text-xs text-muted-foreground md:text-sm">
                {role.toUpperCase()} access
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground lg:flex">
                <ShieldCheck className="h-4 w-4" />
                Role
                <select
                  className="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground outline-none"
                  value={role}
                  onChange={(event) => updateRolePreview(event.target.value as UserRole)}
                >
                  <option value="admin">ADMIN</option>
                  <option value="teacher">TEACHER</option>
                  <option value="parent">PARENT</option>
                  <option value="student">STUDENT</option>
                </select>
              </div>
              <div className="flex items-center gap-2 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground">
                <UserCircle2 className="h-4 w-4" />
                {role}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8"
                onClick={logoutDemo}
              >
                <LogOut className="mr-1 h-4 w-4" />
                Logout
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {children}
          </main>
        </div>

        <SheetContent side="left" className="p-0 w-64">
          <Sidebar role={role} mobile onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
