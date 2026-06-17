"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ChartCard } from "@/components/charts/DashboardCharts";

interface UserActivityChartProps {
  data: Array<{ month: string; users: number }>;
}

export function UserActivityChart({ data }: UserActivityChartProps) {
  return (
    <ChartCard title="User Activity" description="Monthly active users on the platform">
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
            dataKey="users"
            stroke="var(--success)"
            strokeWidth={2}
            dot={{ fill: "var(--success)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
