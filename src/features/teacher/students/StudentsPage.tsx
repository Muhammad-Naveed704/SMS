"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FilterBar } from "@/components/shared/FilterBar";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { useTeacherStudents } from "@/features/teacher/hooks/useTeacherQueries";
import { formatPercentage } from "@/lib/utils";
import type { TeacherStudent } from "@/types/teacher-panel.types";
import type { Column } from "@/components/ui/Table";

export function StudentsPage() {
  const { data: students = [], isLoading, isError, refetch } = useTeacherStudents();
  const [search, setSearch] = useState("");

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    return !q || `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) || s.className.toLowerCase().includes(q);
  });

  const columns: Column<TeacherStudent>[] = [
    { key: "name", header: "Student", sortable: true, render: (r) => <span className="font-medium">{r.firstName} {r.lastName}</span> },
    { key: "class", header: "Class", render: (r) => `${r.className} - ${r.section}` },
    { key: "parent", header: "Parent Contact", render: (r) => (
      <div>
        <p className="text-sm">{r.parentName}</p>
        <p className="text-xs text-muted-foreground">{r.parentPhone}</p>
      </div>
    )},
    { key: "attendance", header: "Attendance", render: (r) => formatPercentage(r.attendancePercent), sortable: true },
    { key: "performance", header: "Performance", render: (r) => (
      <Badge variant={r.performanceScore >= 80 ? "success" : "warning"}>{r.performanceScore}%</Badge>
    ), sortable: true },
  ];

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Teacher", href: "/teacher/dashboard" }, { label: "Students" }]} />
      <PageHeader title="My Students" description="Students in your assigned classes" />
      <FilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search students..." />
      <DataTable columns={columns} data={filtered} keyExtractor={(s) => s.id} />
    </div>
  );
}
