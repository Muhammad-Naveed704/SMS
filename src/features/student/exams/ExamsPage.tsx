"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DataTable } from "@/components/shared/DataTable";
import { FilterBar } from "@/components/shared/FilterBar";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { useStudentExams } from "@/features/student/hooks/useStudentQueries";
import { formatDate } from "@/lib/format";
import type { StudentExam } from "@/types/student-panel.types";
import type { Column } from "@/components/ui/Table";

export function ExamsPage() {
  const { data: exams = [], isLoading, isError, refetch } = useStudentExams();
  const [search, setSearch] = useState("");

  const filtered = exams.filter((e) => {
    const q = search.toLowerCase();
    return !q || e.name.toLowerCase().includes(q) || e.subject.toLowerCase().includes(q);
  });

  const columns: Column<StudentExam>[] = [
    { key: "name", header: "Exam", sortable: true, render: (r) => <span className="font-medium">{r.name}</span> },
    { key: "subject", header: "Subject" },
    { key: "date", header: "Date", render: (r) => formatDate(r.date), sortable: true },
    { key: "time", header: "Time" },
    { key: "room", header: "Room" },
    { key: "totalMarks", header: "Marks", render: (r) => r.totalMarks },
  ];

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Student", href: "/student/dashboard" }, { label: "Exams" }]} />
      <PageHeader title="Exam Schedule" description="Your upcoming and past exams" />
      <FilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search exams..." />
      <DataTable columns={columns} data={filtered} keyExtractor={(e) => e.id} />
    </div>
  );
}
