"use client";

import {
  GraduationCap,
  UserCheck,
  CalendarCheck,
  Wallet,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/Button";
import {
  StatCard,
  AttendanceChart,
  FeeCollectionChart,
} from "@/components/charts/DashboardCharts";
import { useSchoolDashboard } from "@/hooks/useSchoolDashboard";
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/utils";

export function SchoolDashboardContent() {
  const { statsQuery, attendanceQuery, feesQuery } = useSchoolDashboard();
  const { data, isLoading, isError, refetch } = statsQuery;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-muted-foreground">
          Unable to load dashboard data. Please try again.
        </p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="School Dashboard"
        description="Overview of students, staff, attendance, and fee collection"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Students"
          value={isLoading ? "—" : formatNumber(data?.totalStudents ?? 0)}
          change={
            data ? `+${data.recentEnrollments} this month` : undefined
          }
          changeType="positive"
          icon={<GraduationCap className="h-5 w-5" />}
        />
        <StatCard
          title="Total Teachers"
          value={isLoading ? "—" : formatNumber(data?.totalTeachers ?? 0)}
          change={`${data?.totalClasses ?? 0} classes`}
          icon={<UserCheck className="h-5 w-5" />}
        />
        <StatCard
          title="Attendance Rate"
          value={
            isLoading ? "—" : formatPercentage(data?.attendanceRate ?? 0)
          }
          change="This week"
          changeType="positive"
          icon={<CalendarCheck className="h-5 w-5" />}
        />
        <StatCard
          title="Fee Collection"
          value={
            isLoading
              ? "—"
              : formatPercentage(data?.feeCollectionRate ?? 0)
          }
          change={
            data
              ? `${formatCurrency(data.collectedFees)} collected`
              : undefined
          }
          changeType="positive"
          icon={<Wallet className="h-5 w-5" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {attendanceQuery.data && (
          <AttendanceChart data={attendanceQuery.data} />
        )}
        {feesQuery.data && <FeeCollectionChart data={feesQuery.data} />}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Collected Fees</p>
          <p className="mt-2 text-2xl font-semibold text-success">
            {isLoading ? "—" : formatCurrency(data?.collectedFees ?? 0)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Pending Fees</p>
          <p className="mt-2 text-2xl font-semibold text-warning">
            {isLoading ? "—" : formatCurrency(data?.pendingFees ?? 0)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total Classes</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">
            {isLoading ? "—" : formatNumber(data?.totalClasses ?? 0)}
          </p>
        </div>
      </div>
    </div>
  );
}
