"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { useTeacherClass } from "@/features/teacher/hooks/useTeacherQueries";
import { getInitials, formatPercentage } from "@/lib/utils";
import type { TeacherClassStudent } from "@/types/teacher-panel.types";
import type { Column } from "@/components/ui/Table";

export function ClassDetailPage({ classId }: { classId: string }) {
  const router = useRouter();
  const [tab, setTab] = useState("students");
  const { data: cls, isLoading, isError, refetch } = useTeacherClass(classId);

  const studentColumns: Column<TeacherClassStudent>[] = [
    {
      key: "avatar", header: "", className: "w-12",
      render: (r) => (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
          {getInitials(`${r.firstName} ${r.lastName}`)}
        </div>
      ),
    },
    { key: "name", header: "Name", sortable: true, render: (r) => <span className="font-medium">{r.firstName} {r.lastName}</span> },
    { key: "rollNumber", header: "Roll No", sortable: true },
    { key: "attendance", header: "Attendance %", render: (r) => formatPercentage(r.attendancePercent), sortable: true },
    { key: "performance", header: "Performance", render: (r) => <Badge variant={r.performanceScore >= 80 ? "success" : "warning"}>{r.performanceScore}%</Badge>, sortable: true },
  ];

  if (isLoading) return <PageSkeleton />;
  if (isError || !cls) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { label: "Teacher", href: "/teacher/dashboard" },
        { label: "Classes", href: "/teacher/classes" },
        { label: `${cls.name} - ${cls.section}` },
      ]} />

      <div className="flex items-start gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.push("/teacher/classes")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">{cls.name} — Section {cls.section}</h1>
          <p className="text-muted-foreground">{cls.subject} · {cls.studentCount} students · Room {cls.room}</p>
        </div>
      </div>

      <Tabs tabs={[
        { id: "students", label: "Students", count: cls.students.length },
        { id: "attendance", label: "Attendance" },
        { id: "assignments", label: "Assignments" },
        { id: "results", label: "Results" },
      ]} activeTab={tab} onChange={setTab} />

      <Card>
        <CardContent className="pt-6">
          {tab === "students" && (
            <DataTable columns={studentColumns} data={cls.students} keyExtractor={(s) => s.id} />
          )}
          {tab === "attendance" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">View and mark attendance for this class.</p>
              <Button onClick={() => router.push("/teacher/attendance")}>Go to Attendance</Button>
            </div>
          )}
          {tab === "assignments" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Manage assignments for {cls.name} Section {cls.section}.</p>
              <Button onClick={() => router.push("/teacher/assignments")}>View Assignments</Button>
            </div>
          )}
          {tab === "results" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Enter and review exam results.</p>
              <Button onClick={() => router.push("/teacher/results")}>Enter Marks</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
