"use client";

import {
  School,
  Users,
  DollarSign,
  GraduationCap,
  UserCheck,
  CreditCard,
  Activity,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/shared/StatsCard";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  RevenueChart,
  SchoolsGrowthChart,
} from "@/components/charts/DashboardCharts";
import { UserActivityChart } from "@/features/owner/dashboard/UserActivityChart";
import { useOwnerDashboardData } from "@/features/owner/hooks/useOwnerQueries";
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/utils";
import { formatDate, formatRelativeTime } from "@/lib/format";
import type { Column } from "@/components/ui/Table";

type RecentSchool = {
  id: string;
  name: string;
  admin: string;
  plan: string;
  students: number;
  status: string;
  createdAt: string;
};

const schoolColumns: Column<RecentSchool>[] = [
  { key: "name", header: "School Name", sortable: true },
  { key: "admin", header: "Admin", sortable: true },
  {
    key: "plan",
    header: "Plan",
    render: (row) => (
      <Badge variant="primary" className="capitalize">{row.plan}</Badge>
    ),
  },
  {
    key: "students",
    header: "Students",
    render: (row) => formatNumber(row.students),
    sortable: true,
  },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <Badge
        variant={row.status === "active" ? "success" : "warning"}
        className="capitalize"
      >
        {row.status}
      </Badge>
    ),
  },
  {
    key: "createdAt",
    header: "Created",
    render: (row) => formatDate(row.createdAt),
    sortable: true,
  },
];

const activityIcons: Record<string, string> = {
  user_created: "👤",
  school_registered: "🏫",
  subscription_updated: "💳",
  school_suspended: "⚠️",
};

export function OwnerDashboard() {
  const { data, isLoading, isError, refetch } = useOwnerDashboardData();

  if (isLoading) return <PageSkeleton />;
  if (isError || !data) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Owner Dashboard"
        description="Platform overview, growth metrics, and system activity"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatsCard title="Total Schools" value={formatNumber(data.totalSchools)} change={`${data.activeSchools} active`} changeType="positive" icon={<School className="h-5 w-5" />} />
        <StatsCard title="Active Schools" value={formatNumber(data.activeSchools)} icon={<School className="h-5 w-5" />} />
        <StatsCard title="Total Students" value={formatNumber(data.totalStudents)} icon={<GraduationCap className="h-5 w-5" />} />
        <StatsCard title="Total Teachers" value={formatNumber(data.totalTeachers)} icon={<UserCheck className="h-5 w-5" />} />
        <StatsCard title="Monthly Revenue" value={formatCurrency(data.monthlyRevenue)} change={`${formatPercentage(data.revenueGrowth)} vs last month`} changeType="positive" icon={<DollarSign className="h-5 w-5" />} />
        <StatsCard title="Active Subscriptions" value={formatNumber(data.activeSubscriptions)} icon={<CreditCard className="h-5 w-5" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SchoolsGrowthChart data={data.schoolsGrowth} />
        <RevenueChart data={data.revenueByMonth} />
      </div>

      <UserActivityChart data={data.userActivity} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h3 className="mb-4 text-base font-semibold text-foreground">Recent Schools</h3>
          <DataTable
            columns={schoolColumns}
            data={data.recentSchools}
            keyExtractor={(r) => r.id}
            pageSize={5}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              System Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.systemActivity.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <span className="text-lg">{activityIcons[item.type] ?? "📌"}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground">{item.message}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.actor && `${item.actor} · `}
                      {formatRelativeTime(item.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
