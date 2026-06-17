"use client";

import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  CalendarCheck,
  ClipboardList,
  Clock,
  Bell,
  Plus,
  PenLine,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { StatsCard } from "@/components/shared/StatsCard";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { AttendanceChart } from "@/components/charts/DashboardCharts";
import { PerformanceChart } from "./PerformanceChart";
import { useTeacherDashboard } from "@/features/teacher/hooks/useTeacherQueries";
import { formatRelativeTime } from "@/lib/format";
import { cn, formatNumber } from "@/lib/utils";

const notifVariant = (type: string) =>
  type === "exam" ? "warning" : type === "assignment" ? "primary" : "default";

export function TeacherDashboard() {
  const { data, isLoading, isError, refetch } = useTeacherDashboard();

  if (isLoading) return <PageSkeleton />;
  if (isError || !data) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Teacher", href: "/teacher/dashboard" }, { label: "Dashboard" }]} />
      <PageHeader title="Teacher Dashboard" description="Your classes, schedule, and tasks at a glance" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatsCard title="Assigned Classes" value={data.assignedClasses} icon={<BookOpen className="h-5 w-5" />} />
        <StatsCard title="Total Students" value={formatNumber(data.totalStudents)} icon={<GraduationCap className="h-5 w-5" />} />
        <StatsCard title="Today's Classes" value={data.todaysClasses} icon={<Clock className="h-5 w-5" />} changeType="positive" />
        <StatsCard title="Pending Attendance" value={data.pendingAttendance} icon={<CalendarCheck className="h-5 w-5" />} changeType="negative" />
        <StatsCard title="Upcoming Exams" value={data.upcomingExams} icon={<ClipboardList className="h-5 w-5" />} />
        <StatsCard title="Pending Assignments" value={data.pendingAssignments} icon={<PenLine className="h-5 w-5" />} changeType="negative" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today&apos;s Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.todaySchedule.map((slot) => (
              <div key={slot.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium">{slot.className} — Section {slot.section}</p>
                  <p className="text-xs text-muted-foreground">{slot.subject} · Room {slot.room}</p>
                </div>
                <span className="text-sm font-medium text-primary">{slot.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/teacher/attendance" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}>
              <CalendarCheck className="h-4 w-4" />Mark Attendance
            </Link>
            <Link href="/teacher/assignments" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}>
              <Plus className="h-4 w-4" />Create Assignment
            </Link>
            <Link href="/teacher/results" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}>
              <PenLine className="h-4 w-4" />Enter Marks
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <AttendanceChart data={data.attendanceOverview} />
        <PerformanceChart data={data.performanceOverview} />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.notifications.slice(0, 4).map((n) => (
            <div key={n.id} className="flex items-start justify-between gap-4 rounded-lg border border-border p-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{n.title}</p>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                </div>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{n.message}</p>
              </div>
              <div className="shrink-0 text-right">
                <Badge variant={notifVariant(n.type)} className="capitalize">{n.type}</Badge>
                <p className="mt-1 text-xs text-muted-foreground">{formatRelativeTime(n.sentAt)}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
