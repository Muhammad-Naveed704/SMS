"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  height?: number;
}

export function ChartCard({
  title,
  description,
  children,
  className,
  height = 300,
}: ChartCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div style={{ height }}>{children}</div>
      </CardContent>
    </Card>
  );
}

interface RevenueChartProps {
  data: Array<{ month: string; revenue: number }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ChartCard title="Revenue Analytics" description="Monthly recurring revenue">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
          <YAxis
            stroke="var(--muted-foreground)"
            fontSize={12}
            tickFormatter={(v) => formatCurrency(v)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
            formatter={(value) => [formatCurrency(Number(value)), "Revenue"]}
          />
        
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="var(--primary)"
            fill="url(#revenueGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

interface SchoolsGrowthChartProps {
  data: Array<{ month: string; schools: number }>;
}

export function SchoolsGrowthChart({ data }: SchoolsGrowthChartProps) {
  return (
    <ChartCard title="Schools Growth" description="New schools onboarded">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
          <YAxis stroke="var(--muted-foreground)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="schools"
            stroke="var(--primary)"
            strokeWidth={2}
            dot={{ fill: "var(--primary)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

interface AttendanceChartProps {
  data: Array<{ date: string; present: number; absent: number; late: number }>;
}

export function AttendanceChart({ data }: AttendanceChartProps) {
  return (
    <ChartCard title="Attendance Overview" description="Last 7 days">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} />
          <YAxis stroke="var(--muted-foreground)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar dataKey="present" fill="var(--success)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="late" fill="var(--warning)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="absent" fill="var(--danger)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

interface FeeCollectionChartProps {
  data: Array<{ month: string; collected: number; pending: number }>;
}

export function FeeCollectionChart({ data }: FeeCollectionChartProps) {
  return (
    <ChartCard title="Fee Collection" description="Monthly collection summary">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
          <YAxis
            stroke="var(--muted-foreground)"
            fontSize={12}
            tickFormatter={(v) => formatNumber(v)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
            formatter={(value) => formatCurrency(Number(value))}
          />
          <Legend />
          <Bar dataKey="collected" fill="var(--success)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="pending" fill="var(--warning)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
}: StatCardProps) {
  const changeColors = {
    positive: "text-success",
    negative: "text-danger",
    neutral: "text-muted-foreground",
  };

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
          {change && (
            <p className={cn("mt-1 text-xs", changeColors[changeType])}>
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
