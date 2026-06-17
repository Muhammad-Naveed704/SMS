"use client";

import {
  GraduationCap,
  UserCheck,
  BookOpen,
  CalendarCheck,
  Wallet,
  ClipboardList,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/shared/StatsCard";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { AttendanceChart, FeeCollectionChart } from "@/components/charts/DashboardCharts";
import { StudentGrowthChart } from "@/features/school/dashboard/StudentGrowthChart";
import { useSchoolDashboardData } from "@/features/school/hooks/useSchoolQueries";
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import type { Column } from "@/components/ui/Table";
import type { SchoolStudent } from "@/types/school-admin.types";

const admissionColumns: Column<SchoolStudent>[] = [
  { key: "name", header: "Student", render: (r) => `${r.firstName} ${r.lastName}`, sortable: true },
  { key: "className", header: "Class", render: (r) => `${r.className} - ${r.section}` },
  { key: "admissionDate", header: "Admitted", render: (r) => formatDate(r.admissionDate), sortable: true },
  { key: "status", header: "Status", render: (r) => <Badge variant="success" className="capitalize">{r.status}</Badge> },
];

export function SchoolDashboard() {
  const { data, isLoading, isError, refetch } = useSchoolDashboardData();

  if (isLoading) return <PageSkeleton />;
  if (isError || !data) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <PageHeader title="School Dashboard" description="Springfield Academy — overview and insights" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatsCard title="Total Students" value={formatNumber(data.totalStudents)} change={`+${data.recentEnrollments.length} recent`} changeType="positive" icon={<GraduationCap className="h-5 w-5" />} />
        <StatsCard title="Total Teachers" value={formatNumber(data.totalTeachers)} icon={<UserCheck className="h-5 w-5" />} />
        <StatsCard title="Total Classes" value={formatNumber(data.totalClasses)} icon={<BookOpen className="h-5 w-5" />} />
        <StatsCard title="Today's Attendance" value={formatPercentage(data.attendanceRate)} change={`${data.todayAttendance} present`} changeType="positive" icon={<CalendarCheck className="h-5 w-5" />} />
        <StatsCard title="Pending Fees" value={formatCurrency(data.pendingFees)} changeType="negative" icon={<Wallet className="h-5 w-5" />} />
        <StatsCard title="Upcoming Exams" value={data.upcomingExams} icon={<ClipboardList className="h-5 w-5" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AttendanceChart data={data.attendanceOverview} />
        </div>
        <Card>
          <CardHeader><CardTitle>Upcoming Events</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {data.upcomingEvents.map((ev) => (
              <div key={ev.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium">{ev.title}</p>
                  <p className="text-xs capitalize text-muted-foreground">{ev.type}</p>
                </div>
                <span className="text-xs text-muted-foreground">{formatDate(ev.date)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <FeeCollectionChart data={data.feeCollection} />
        <StudentGrowthChart data={data.studentGrowth} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-base font-semibold">Recent Admissions</h3>
          <DataTable columns={admissionColumns} data={data.recentEnrollments} keyExtractor={(s) => s.id} pageSize={5} />
        </div>
        <div>
          <h3 className="mb-4 text-base font-semibold">Today&apos;s Attendance</h3>
          <DataTable
            columns={[
              { key: "studentName", header: "Student", sortable: true },
              { key: "rollNumber", header: "Roll No" },
              { key: "status", header: "Status", render: (r) => (
                <Badge variant={r.status === "present" ? "success" : "danger"} className="capitalize">{r.status}</Badge>
              )},
            ]}
            data={data.todayAttendanceList}
            keyExtractor={(r) => r.studentId}
            pageSize={5}
          />
        </div>
      </div>
    </div>
  );
}
