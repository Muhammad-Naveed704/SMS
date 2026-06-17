"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { PageHeader } from "@/components/shared/PageHeader";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { ChartCard } from "@/components/charts/DashboardCharts";
import { Button } from "@/components/ui/Button";
import { useOwnerAnalytics } from "@/features/owner/hooks/useOwnerQueries";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

const RANGES = [
  { id: "today", label: "Today" },
  { id: "7d", label: "7 Days" },
  { id: "30d", label: "30 Days" },
  { id: "year", label: "Year" },
] as const;

type Range = (typeof RANGES)[number]["id"];

function GrowthChart({
  title,
  description,
  data,
  dataKey,
  color = "var(--primary)",
  formatValue,
}: {
  title: string;
  description?: string;
  data: Array<{ label: string; value: number }>;
  dataKey?: string;
  color?: string;
  formatValue?: (v: number) => string;
}) {
  const chartData = data.map((d) => ({ label: d.label, value: d.value }));
  return (
    <ChartCard title={title} description={description}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="label" stroke="var(--muted-foreground)" fontSize={12} />
          <YAxis stroke="var(--muted-foreground)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
            formatter={(v) => [formatValue ? formatValue(Number(v)) : v, title]}
          />
          <Area type="monotone" dataKey="value" stroke={color} fill={`url(#grad-${title})`} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function AnalyticsPage() {
  const [range, setRange] = useState<Range>("30d");
  const { data, isLoading, isError, refetch } = useOwnerAnalytics();

  if (isLoading) return <PageSkeleton />;
  if (isError || !data) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Platform-wide growth and engagement metrics"
        action={
          <div className="flex gap-1 rounded-lg border border-border bg-card p-1">
            {RANGES.map((r) => (
              <Button
                key={r.id}
                variant={range === r.id ? "primary" : "ghost"}
                size="sm"
                onClick={() => setRange(r.id)}
                className={cn(range !== r.id && "text-muted-foreground")}
              >
                {r.label}
              </Button>
            ))}
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <GrowthChart title="School Growth" description="New schools over time" data={data.schoolGrowth} color="var(--primary)" />
        <GrowthChart title="Student Growth" description="Total students across platform" data={data.studentGrowth} color="var(--success)" formatValue={formatNumber} />
        <GrowthChart title="Revenue Growth" description="Monthly recurring revenue" data={data.revenueGrowth} color="var(--warning)" formatValue={formatCurrency} />
        <ChartCard title="Active Users" description="Daily active users">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.activeUsers}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }} />
              <Line type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={2} dot={{ fill: "var(--primary)" }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
