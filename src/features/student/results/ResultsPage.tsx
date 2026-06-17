"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { StatsCard } from "@/components/shared/StatsCard";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { useStudentResults } from "@/features/student/hooks/useStudentQueries";
import { GraduationCap, Trophy } from "lucide-react";
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartCard } from "@/components/charts/DashboardCharts";
import type { StudentSubjectResult } from "@/types/student-panel.types";
import type { Column } from "@/components/ui/Table";

export function ResultsPage() {
  const { data, isLoading, isError, refetch } = useStudentResults();

  const columns: Column<StudentSubjectResult>[] = [
    { key: "subject", header: "Subject", sortable: true, render: (r) => <span className="font-medium">{r.subject}</span> },
    { key: "marks", header: "Marks", render: (r) => `${r.marks}/${r.totalMarks}`, sortable: true },
    { key: "grade", header: "Grade", render: (r) => <Badge variant={r.grade.startsWith("A") ? "success" : "warning"}>{r.grade}</Badge> },
    { key: "remarks", header: "Remarks", className: "max-w-xs" },
  ];

  if (isLoading) return <PageSkeleton />;
  if (isError || !data) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Student", href: "/student/dashboard" }, { label: "Results" }]} />
      <PageHeader title="My Results" description={`Academic Year ${data.academicYear}`} />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard title="Overall Grade" value={data.overallGrade} icon={<GraduationCap className="h-5 w-5" />} changeType="positive" />
        <StatsCard title="GPA" value={data.gpa} icon={<GraduationCap className="h-5 w-5" />} />
        {data.rank && (
          <StatsCard title="Class Rank" value={`#${data.rank} / ${data.totalStudents}`} icon={<Trophy className="h-5 w-5" />} />
        )}
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns} data={data.subjects} keyExtractor={(s) => s.subject} />
        </CardContent>
      </Card>

      <ChartCard title="Performance Trend" description="Scores across exams">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.performanceTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="exam" stroke="var(--muted-foreground)" fontSize={11} />
            <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[0, 100]} />
            <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
              formatter={(v) => [`${v}%`, "Score"]} />
            <Line type="monotone" dataKey="percentage" stroke="var(--primary)" strokeWidth={2} dot={{ fill: "var(--primary)" }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
