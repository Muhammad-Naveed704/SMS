"use client";

import {
  School,
  Users,
  DollarSign,
  TrendingUp,
  Building2,
  CreditCard,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Table, type Column } from "@/components/ui/Table";
import {
  StatCard,
  RevenueChart,
  SchoolsGrowthChart,
} from "@/components/charts/DashboardCharts";
import { useOwnerDashboard } from "@/hooks/useOwnerDashboard";
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/utils";
import type { OwnerDashboardStats } from "@/services/api/owner.api";

type RecentSchool = OwnerDashboardStats["recentSchools"][number];

const recentSchoolColumns: Column<RecentSchool>[] = [
  { key: "name", header: "School", sortable: true },
  {
    key: "plan",
    header: "Plan",
    render: (row) => (
      <Badge variant="primary" className="capitalize">
        {row.plan}
      </Badge>
    ),
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
  { key: "createdAt", header: "Joined", sortable: true },
];

export function OwnerDashboardContent() {
  const { data, isLoading, isError, refetch } = useOwnerDashboard();

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
        title="Owner Dashboard"
        description="Platform overview, revenue analytics, and subscription metrics"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Schools"
          value={isLoading ? "—" : formatNumber(data?.totalSchools ?? 0)}
          change={`${data?.activeSchools ?? 0} active`}
          changeType="positive"
          icon={<School className="h-5 w-5" />}
        />
        <StatCard
          title="Monthly Revenue"
          value={isLoading ? "—" : formatCurrency(data?.monthlyRevenue ?? 0)}
          change={
            data
              ? `${formatPercentage(data.revenueGrowth)} vs last month`
              : undefined
          }
          changeType="positive"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <StatCard
          title="Active Users"
          value={isLoading ? "—" : formatNumber(data?.activeUsers ?? 0)}
          change={`${formatNumber(data?.totalUsers ?? 0)} total`}
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          title="Total Revenue"
          value={isLoading ? "—" : formatCurrency(data?.totalRevenue ?? 0)}
          change="All time"
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 lg:col-span-1">
          <h3 className="text-base font-semibold text-foreground">
            Subscription Plans
          </h3>
          <div className="mt-4 space-y-3">
            {[
              { label: "Starter", value: data?.subscriptionStats?.starter, icon: Building2 },
              { label: "Professional", value: data?.subscriptionStats?.professional, icon: CreditCard },
              { label: "Enterprise", value: data?.subscriptionStats?.enterprise, icon: School },
            ].map((plan) => (
              <div
                key={plan.label}
                className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <plan.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{plan.label}</span>
                </div>
                <span className="text-sm font-semibold">
                  {isLoading ? "—" : formatNumber(plan.value ?? 0)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {data?.revenueByMonth && (
            <RevenueChart data={data.revenueByMonth} />
          )}
        </div>
      </div>

      {data?.schoolsGrowth && (
        <SchoolsGrowthChart data={data.schoolsGrowth} />
      )}

      <div>
        <h3 className="mb-4 text-base font-semibold text-foreground">
          Recently Onboarded Schools
        </h3>
        <Table
          columns={recentSchoolColumns}
          data={data?.recentSchools ?? []}
          keyExtractor={(row) => row.id}
          loading={isLoading}
          emptyMessage="No schools onboarded yet"
        />
      </div>
    </div>
  );
}
