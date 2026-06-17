"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCard } from "@/components/charts/DashboardCharts";

interface AttendanceTrendChartProps {
  data: Array<{ month: string; percentage: number }>;
}

export function AttendanceTrendChart({ data }: AttendanceTrendChartProps) {
  return (
    <ChartCard title="Attendance Trend" description="Monthly attendance percentage">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="attTrendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--success)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--success)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
          <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[0, 100]} />
          <Tooltip
            contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
            formatter={(value) => [`${value}%`, "Attendance"]}
          />
          <Area type="monotone" dataKey="percentage" stroke="var(--success)" fill="url(#attTrendGradient)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
