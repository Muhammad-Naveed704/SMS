"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { StatsCard } from "@/components/shared/StatsCard";
import { ChildSwitcher } from "@/features/parent/components/ChildSwitcher";
import { useParentChildren, useParentAttendance } from "@/features/parent/hooks/useParentQueries";
import { cn } from "@/lib/utils";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCard } from "@/components/charts/DashboardCharts";
import { CalendarCheck } from "lucide-react";
import type { AttendanceDayStatus } from "@/types/parent-panel.types";

const STATUS_STYLES: Record<AttendanceDayStatus, string> = {
  present: "bg-success/20 text-success border-success/30",
  absent: "bg-danger/20 text-danger border-danger/30",
  late: "bg-warning/20 text-warning border-warning/30",
  leave: "bg-primary/20 text-primary border-primary/30",
  holiday: "bg-muted text-muted-foreground border-border",
  none: "bg-transparent border-transparent",
};

const STATUS_LABELS: Record<AttendanceDayStatus, string> = {
  present: "P",
  absent: "A",
  late: "L",
  leave: "Lv",
  holiday: "—",
  none: "",
};

export function AttendancePage() {
  const { data: children = [], isLoading: loadingChildren } = useParentChildren();
  const [childId, setChildId] = useState("");
  const activeChildId = childId || children[0]?.id || "";
  const { data: attendance, isLoading, isError, refetch } = useParentAttendance(activeChildId);

  if (loadingChildren) return <PageSkeleton />;
  if (!children.length) return <ErrorState title="No children" message="No linked children found on your account." />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Parent", href: "/parent/dashboard" }, { label: "Attendance" }]} />
      <PageHeader title="Attendance" description="Track your child's daily attendance" />

      <div className="max-w-sm">
        <ChildSwitcher children={children} value={activeChildId} onChange={setChildId} />
      </div>

      {isLoading ? <PageSkeleton /> : isError || !attendance ? (
        <ErrorState onRetry={() => refetch()} />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-4">
            <StatsCard title="Present Days" value={attendance.presentDays} icon={<CalendarCheck className="h-5 w-5" />} changeType="positive" />
            <StatsCard title="Absent Days" value={attendance.absentDays} changeType="negative" />
            <StatsCard title="Leave Days" value={attendance.leaveDays} />
            <StatsCard title="Monthly %" value={`${attendance.monthlyPercentage}%`} changeType="positive" />
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="mb-4 font-semibold">June 2026</h3>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="py-2">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {/* padding for June 2026 starts on Monday */}
              <div />
              {attendance.calendar.map((day) => (
                <div
                  key={day.date}
                  className={cn(
                    "flex aspect-square flex-col items-center justify-center rounded-lg border text-xs",
                    STATUS_STYLES[day.status]
                  )}
                  title={`${day.date}: ${day.status}`}
                >
                  <span className="font-medium">{parseInt(day.date.split("-")[2], 10)}</span>
                  <span className="text-[10px]">{STATUS_LABELS[day.status]}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs">
              {(["present", "absent", "late", "leave", "holiday"] as const).map((s) => (
                <span key={s} className="flex items-center gap-1 capitalize">
                  <span className={cn("h-3 w-3 rounded", STATUS_STYLES[s].split(" ")[0])} />{s}
                </span>
              ))}
            </div>
          </div>

          <ChartCard title="Weekly Attendance" description="Attendance percentage by week">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendance.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                  formatter={(v) => [`${v}%`, "Attendance"]} />
                <Bar dataKey="percentage" fill="var(--success)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </>
      )}
    </div>
  );
}
