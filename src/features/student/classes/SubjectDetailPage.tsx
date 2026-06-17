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
import { useStudentSubject } from "@/features/student/hooks/useStudentQueries";
import { formatDate } from "@/lib/format";
import type { StudentAssignment, StudentHomework } from "@/types/student-panel.types";
import type { Column } from "@/components/ui/Table";

const hwVariant = (s: string) => (s === "completed" ? "success" : s === "late" ? "danger" : "warning");
const asgVariant = (s: string) => (s === "submitted" ? "success" : s === "overdue" ? "danger" : "primary");

export function SubjectDetailPage({ subjectId }: { subjectId: string }) {
  const router = useRouter();
  const [tab, setTab] = useState("overview");
  const { data: subject, isLoading, isError, refetch } = useStudentSubject(subjectId);

  if (isLoading) return <PageSkeleton />;
  if (isError || !subject) return <ErrorState onRetry={() => refetch()} message="Subject not found" />;

  const hwCols: Column<StudentHomework>[] = [
    { key: "title", header: "Title", sortable: true },
    { key: "dueDate", header: "Due", render: (r) => formatDate(r.dueDate) },
    { key: "status", header: "Status", render: (r) => <Badge variant={hwVariant(r.status)} className="capitalize">{r.status}</Badge> },
  ];
  const asgCols: Column<StudentAssignment>[] = [
    { key: "title", header: "Title", sortable: true },
    { key: "dueDate", header: "Due", render: (r) => formatDate(r.dueDate) },
    { key: "status", header: "Status", render: (r) => <Badge variant={asgVariant(r.status)} className="capitalize">{r.status}</Badge> },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { label: "Student", href: "/student/dashboard" },
        { label: "Classes", href: "/student/classes" },
        { label: subject.name },
      ]} />
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.push("/student/classes")}><ArrowLeft className="h-4 w-4" /></Button>
        <div>
          <h1 className="text-2xl font-semibold">{subject.name}</h1>
          <p className="text-muted-foreground">{subject.teacherName} · Room {subject.room}</p>
        </div>
      </div>

      <Tabs tabs={[
        { id: "overview", label: "Overview" },
        { id: "assignments", label: "Assignments", count: subject.assignments.length },
        { id: "homework", label: "Homework", count: subject.homework.length },
        { id: "materials", label: "Study Material", count: subject.studyMaterials.length },
      ]} activeTab={tab} onChange={setTab} />

      <Card>
        <CardContent className="pt-6">
          {tab === "overview" && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Teacher</h4>
                <p className="text-sm text-muted-foreground">{subject.teacherName} — {subject.teacherEmail}</p>
              </div>
              <div>
                <h4 className="font-medium">Schedule</h4>
                <p className="text-sm text-muted-foreground">{subject.schedule} · Room {subject.room}</p>
              </div>
              <div>
                <h4 className="font-medium">Description</h4>
                <p className="text-sm text-muted-foreground">{subject.description}</p>
              </div>
            </div>
          )}
          {tab === "assignments" && <DataTable columns={asgCols} data={subject.assignments} keyExtractor={(a) => a.id} />}
          {tab === "homework" && <DataTable columns={hwCols} data={subject.homework} keyExtractor={(h) => h.id} />}
          {tab === "materials" && (
            <div className="space-y-2">
              {subject.studyMaterials.map((m) => (
                <div key={m.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="text-sm font-medium">{m.title}</span>
                  <span className="text-xs text-muted-foreground">{m.type} · {formatDate(m.uploadedAt)}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
