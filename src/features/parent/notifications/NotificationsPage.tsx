"use client";

import { useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { useParentNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from "@/features/parent/hooks/useParentQueries";
import { formatRelativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ParentNotificationCategory } from "@/types/parent-panel.types";

const CATEGORY_LABELS: Record<ParentNotificationCategory, string> = {
  notice: "School Notices",
  fee: "Fee Reminders",
  exam: "Exam Alerts",
  attendance: "Attendance Alerts",
};

const categoryVariant = (c: ParentNotificationCategory) =>
  c === "fee" ? "warning" : c === "exam" ? "primary" : c === "attendance" ? "danger" : "default";

export function NotificationsPage() {
  const [tab, setTab] = useState("all");
  const { data: notifications = [], isLoading, isError, refetch } = useParentNotifications();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  const filtered = notifications.filter((n) => {
    if (tab === "unread") return !n.read;
    if (tab === "all") return true;
    return n.category === tab;
  });

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Parent", href: "/parent/dashboard" }, { label: "Notifications" }]} />
      <PageHeader
        title="Notifications"
        description={`${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`}
        action={
          unreadCount > 0 ? (
            <Button variant="outline" size="sm" onClick={() => markAllRead.mutate()} loading={markAllRead.isPending}>
              <CheckCheck className="h-4 w-4" />Mark all read
            </Button>
          ) : undefined
        }
      />

      <Tabs tabs={[
        { id: "all", label: "All", count: notifications.length },
        { id: "unread", label: "Unread", count: unreadCount },
        { id: "notice", label: "Notices" },
        { id: "fee", label: "Fees" },
        { id: "exam", label: "Exams" },
        { id: "attendance", label: "Attendance" },
      ]} activeTab={tab} onChange={setTab} />

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-12 text-center text-muted-foreground">
          <Bell className="mx-auto mb-2 h-8 w-8 opacity-50" />
          No notifications
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((n) => (
            <div
              key={n.id}
              className={cn(
                "flex items-start justify-between gap-4 rounded-xl border border-border p-4 transition-colors",
                !n.read && "bg-primary/5 border-primary/20"
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{n.title}</p>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{n.message}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant={categoryVariant(n.category)}>{CATEGORY_LABELS[n.category]}</Badge>
                  <span className="text-xs text-muted-foreground">{formatRelativeTime(n.sentAt)}</span>
                </div>
              </div>
              {!n.read && (
                <Button variant="ghost" size="sm" onClick={() => markRead.mutate(n.id)} loading={markRead.isPending}>
                  Mark read
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
