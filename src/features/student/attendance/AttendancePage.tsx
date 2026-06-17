"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { StatsCard } from "@/components/shared/StatsCard";
import { useStudentAttendance } from "@/features/student/hooks/useStudentQueries";
import { cn } from "@/lib/utils";
import { CalendarCheck } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartCard } from "@/components/charts/DashboardCharts";
import type { StudentAttendanceStatus } from "@/types/student-panel.types";

const STATUS_STYLES: Record<StudentAttendanceStatus, string> = {
  present: "bg-success/20 text-success border-success/30",
  absent: "bg-danger/20 text-danger border-danger/30",
  late: "bg-warning/20 text-warning border-warning/30",
  leave: "bg-primary/20 text-primary border-primary/30",
  holiday: "bg-muted text-muted-foreground border-border",
  none: "bg-transparent border-transparent",
};

const STATUS_LABELS: Record<StudentAttendanceStatus, string> = {
  present: "P", absent: "A", late: "L", leave: "Lv", holiday: "—", none: "",
};

export function AttendancePage() {
  const { data, isLoading, isError, refetch } = useStudentAttendance();

  if (isLoading) return <PageSkeleton />;
  if (isError || !data) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Student", href: "/student/dashboard" }, { label: "Attendance" }]} />
      <PageHeader title="My Attendance" description="Track your daily attendance record" />

      <div className="grid gap-4 sm:grid-cols-4">
        <StatsCard title="Present Days" value={data.presentDays} icon={<CalendarCheck className="h-5 w-5" />} changeType="positive" />
        <StatsCard title="Absent Days" value={data.absentDays} changeType="negative" />
        <StatsCard title="Leave Days" value={data.leaveDays} />
        <StatsCard title="Monthly %" value={`${data.monthlyPercentage}%`} changeType="positive" />
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="mb-4 font-semibold">June 2026</h3>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <div key={d} className="py-2">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          <div />
          {data.calendar.map((day) => (
            <div key={day.date} className={cn("flex aspect-square flex-col items-center justify-center rounded-lg border text-xs", STATUS_STYLES[day.status])} title={`${day.date}: ${day.status}`}>
              <span className="font-medium">{parseInt(day.date.split("-")[2], 10)}</span>
              <span className="text-[10px]">{STATUS_LABELS[day.status]}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-xs">
          {(["present", "absent", "late", "leave"] as const).map((s) => (
            <span key={s} className="flex items-center gap-1 capitalize">
              <span className={cn("h-3 w-3 rounded", STATUS_STYLES[s].split(" ")[0])} />{s}
            </span>
          ))}
        </div>
      </div>

      <ChartCard title="Attendance Trend" description="Monthly attendance percentage">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[0, 100]} />
            <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
              formatter={(v) => [`${v}%`, "Attendance"]} />
            <Bar dataKey="percentage" fill="var(--success)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
