"use client";

import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { ChartCard } from "@/components/charts/DashboardCharts";
import { formatNumber } from "@/lib/utils";

interface StudentGrowthChartProps {
  data: Array<{ month: string; students: number }>;
}

export function StudentGrowthChart({ data }: StudentGrowthChartProps) {
  return (
    <ChartCard title="Student Growth" description="Enrollment trend">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
          <YAxis stroke="var(--muted-foreground)" fontSize={12} />
          <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }} formatter={(v) => [formatNumber(Number(v)), "Students"]} />
          <Line type="monotone" dataKey="students" stroke="var(--success)" strokeWidth={2} dot={{ fill: "var(--success)" }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
