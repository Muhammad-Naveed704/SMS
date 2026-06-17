"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DataTable } from "@/components/shared/DataTable";
import { FilterBar } from "@/components/shared/FilterBar";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { useStudentHomework } from "@/features/student/hooks/useStudentQueries";
import { formatDate } from "@/lib/format";
import type { StudentHomework } from "@/types/student-panel.types";
import type { Column } from "@/components/ui/Table";

const hwVariant = (s: string) =>
  s === "completed" ? "success" : s === "submitted" ? "primary" : s === "late" ? "danger" : "warning";

export function HomeworkPage() {
  const { data: homework = [], isLoading, isError, refetch } = useStudentHomework();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = homework.filter((h) => {
    const q = search.toLowerCase();
    const matchSearch = !q || h.title.toLowerCase().includes(q) || h.subject.toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || h.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const columns: Column<StudentHomework>[] = [
    { key: "title", header: "Title", sortable: true, render: (r) => <span className="font-medium">{r.title}</span> },
    { key: "subject", header: "Subject" },
    { key: "teacherName", header: "Teacher" },
    { key: "assignedDate", header: "Assigned", render: (r) => formatDate(r.assignedDate), sortable: true },
    { key: "dueDate", header: "Due Date", render: (r) => formatDate(r.dueDate), sortable: true },
    { key: "status", header: "Status", render: (r) => <Badge variant={hwVariant(r.status)} className="capitalize">{r.status}</Badge> },
  ];

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Student", href: "/student/dashboard" }, { label: "Homework" }]} />
      <PageHeader title="Homework" description="Track your homework assignments" />
      <FilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search homework..."
        filters={[{ key: "status", label: "Status", value: statusFilter, onChange: setStatusFilter,
          options: [{ label: "All", value: "all" }, { label: "Pending", value: "pending" }, { label: "Completed", value: "completed" }, { label: "Late", value: "late" }] }]} />
      <DataTable columns={columns} data={filtered} keyExtractor={(h) => h.id} />
    </div>
  );
}
