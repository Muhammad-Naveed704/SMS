"use client";

import Link from "next/link";
import { CalendarCheck, ClipboardList, BookOpen, GraduationCap, Bell } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { StatsCard } from "@/components/shared/StatsCard";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { AttendanceTrendChart } from "./AttendanceTrendChart";
import { PerformanceTrendChart } from "./PerformanceTrendChart";
import { useStudentDashboard } from "@/features/student/hooks/useStudentQueries";
import { formatRelativeTime, formatDate } from "@/lib/format";
import { cn, formatPercentage, getInitials } from "@/lib/utils";

export function StudentDashboard() {
  const { data, isLoading, isError, refetch } = useStudentDashboard();

  if (isLoading) return <PageSkeleton />;
  if (isError || !data) return <ErrorState onRetry={() => refetch()} />;

  const { profile } = data;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Student", href: "/student/dashboard" }, { label: "Dashboard" }]} />
      <PageHeader title="Student Dashboard" description="Your academic overview and upcoming tasks" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatsCard title="Attendance" value={formatPercentage(data.attendancePercentage)} icon={<CalendarCheck className="h-5 w-5" />} changeType="positive" />
        <StatsCard title="Upcoming Exams" value={data.upcomingExams} icon={<ClipboardList className="h-5 w-5" />} />
        <StatsCard title="Pending Homework" value={data.pendingHomework} icon={<BookOpen className="h-5 w-5" />} changeType="negative" />
        <StatsCard title="Completed Assignments" value={data.completedAssignments} icon={<GraduationCap className="h-5 w-5" />} changeType="positive" />
        <StatsCard title="Current GPA" value={`${data.currentGpa} (${data.currentGrade})`} icon={<GraduationCap className="h-5 w-5" />} />
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
            {getInitials(`${profile.firstName} ${profile.lastName}`)}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{profile.firstName} {profile.lastName}</h2>
            <p className="text-muted-foreground">{profile.className} — Section {profile.section}</p>
            <p className="text-sm text-muted-foreground">Roll No: {profile.rollNumber} · {profile.schoolName}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/student/homework" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>View Homework</Link>
            <Link href="/student/results" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>Check Results</Link>
            <Link href="/student/timetable" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}>View Timetable</Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <AttendanceTrendChart data={data.attendanceTrend} />
        <PerformanceTrendChart data={data.performanceTrend} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Upcoming Exams</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {data.upcomingExamsList.map((exam) => (
              <div key={exam.id} className="rounded-lg border border-border p-3">
                <p className="text-sm font-medium">{exam.name}</p>
                <p className="text-xs text-muted-foreground">{exam.subject} · {formatDate(exam.date)} · {exam.time}</p>
              </div>
            ))}
            <Link href="/student/exams" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-full")}>View all exams</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="h-4 w-4" />Notifications</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {data.recentNotifications.map((n) => (
              <div key={n.id} className="rounded-lg border border-border p-3">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{n.title}</p>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                </div>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{n.message}</p>
                <p className="mt-1 text-xs text-muted-foreground">{formatRelativeTime(n.sentAt)}</p>
              </div>
            ))}
            <Link href="/student/notifications" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-full")}>View all</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Latest Assignments</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {data.latestAssignments.map((a) => (
              <div key={a.id} className="rounded-lg border border-border p-3">
                <p className="text-sm font-medium">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.subject} · Due {formatDate(a.dueDate)}</p>
                <Badge variant="warning" className="mt-1 capitalize">{a.status}</Badge>
              </div>
            ))}
            <Link href="/student/assignments" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-full")}>View all assignments</Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
