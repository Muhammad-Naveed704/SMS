"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { Card, CardContent } from "@/components/ui/Card";
import { ChildSwitcher } from "@/features/parent/components/ChildSwitcher";
import { useParentChildren, useParentResults } from "@/features/parent/hooks/useParentQueries";
import { formatDate } from "@/lib/format";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCard } from "@/components/charts/DashboardCharts";

export function ResultsPage() {
  const { data: children = [], isLoading: loadingChildren } = useParentChildren();
  const [childId, setChildId] = useState("all");
  const [academicYear, setAcademicYear] = useState("2025-2026");
  const [examFilter, setExamFilter] = useState("all");

  const activeChildId = childId === "all" ? undefined : childId;
  const { data: results = [], isLoading, isError, refetch } = useParentResults(
    activeChildId,
    academicYear,
    examFilter === "all" ? undefined : examFilter
  );

  const examOptions = useMemo(() => {
    const names = [...new Set(results.map((r) => r.examName))];
    return [{ label: "All Exams", value: "all" }, ...names.map((n) => ({ label: n, value: n }))];
  }, [results]);

  const subjectChartData = results[0]?.subjects.map((s) => ({
    subject: s.subject,
    percentage: Math.round((s.marks / s.totalMarks) * 100),
  })) ?? [];

  const overallChartData = results.map((r) => ({
    exam: r.examName.length > 15 ? r.examName.slice(0, 15) + "…" : r.examName,
    percentage: r.overallPercentage,
  }));

  if (loadingChildren) return <PageSkeleton />;
  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Parent", href: "/parent/dashboard" }, { label: "Results" }]} />
      <PageHeader title="Academic Results" description="View exam results and performance" />

      <div className="grid gap-4 sm:grid-cols-3">
        <ChildSwitcher children={children} value={childId} onChange={setChildId} showAll />
        <Select label="Academic Year" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)}
          options={[{ label: "2025-2026", value: "2025-2026" }, { label: "2024-2025", value: "2024-2025" }]} />
        <Select label="Exam" value={examFilter} onChange={(e) => setExamFilter(e.target.value)} options={examOptions} />
      </div>

      {results.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-12 text-center text-muted-foreground">
          No results found for the selected filters
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {results.map((exam) => (
              <Card key={exam.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{exam.examName}</h3>
                      <p className="text-sm text-muted-foreground">{formatDate(exam.date)} · {exam.academicYear}</p>
                    </div>
                    <Badge variant="success">{exam.overallPercentage}% Overall</Badge>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {exam.subjects.map((s) => (
                      <div key={s.subject} className="rounded-lg border border-border p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{s.subject}</span>
                          <Badge>{s.grade}</Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">Marks: {s.marks}/{s.totalMarks}</p>
                        <p className="mt-2 text-xs italic text-muted-foreground">&ldquo;{s.teacherComment}&rdquo;</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {subjectChartData.length > 0 && (
              <ChartCard title="Subject Performance" description="Latest exam scores by subject">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="subject" stroke="var(--muted-foreground)" fontSize={11} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                      formatter={(v) => [`${v}%`, "Score"]} />
                    <Bar dataKey="percentage" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            )}
            {overallChartData.length > 0 && (
              <ChartCard title="Overall Performance" description="Performance across exams">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={overallChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="exam" stroke="var(--muted-foreground)" fontSize={11} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }}
                      formatter={(v) => [`${v}%`, "Overall"]} />
                    <Line type="monotone" dataKey="percentage" stroke="var(--primary)" strokeWidth={2} dot={{ fill: "var(--primary)" }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            )}
          </div>
        </>
      )}
    </div>
  );
}
