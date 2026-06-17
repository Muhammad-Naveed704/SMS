"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FilterBar } from "@/components/shared/FilterBar";
import { useTeacherExams } from "@/features/teacher/hooks/useTeacherQueries";
import { formatDate } from "@/lib/format";
import { useState } from "react";
import type { TeacherExam } from "@/types/teacher-panel.types";
import type { Column } from "@/components/ui/Table";

const statusVariant = (s: string) => (s === "upcoming" ? "primary" : s === "ongoing" ? "warning" : "success");

export function ExamsPage() {
  const router = useRouter();
  const { data: exams = [], isLoading, isError, refetch } = useTeacherExams();
  const [search, setSearch] = useState("");

  const filtered = exams.filter((e) => {
    const q = search.toLowerCase();
    return !q || e.name.toLowerCase().includes(q) || e.className.toLowerCase().includes(q);
  });

  const columns: Column<TeacherExam>[] = [
    { key: "name", header: "Exam Name", sortable: true, render: (r) => <span className="font-medium">{r.name}</span> },
    { key: "class", header: "Class", render: (r) => `${r.className} - ${r.section}` },
    { key: "subject", header: "Subject" },
    { key: "date", header: "Date", render: (r) => formatDate(r.date), sortable: true },
    { key: "totalMarks", header: "Marks", render: (r) => r.totalMarks },
    { key: "status", header: "Status", render: (r) => <Badge variant={statusVariant(r.status)} className="capitalize">{r.status}</Badge> },
    {
      key: "actions", header: "",
      render: (r) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => router.push(`/teacher/results?exam=${r.id}&class=${r.classId}`)}>
            Enter Marks
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Teacher", href: "/teacher/dashboard" }, { label: "Exams" }]} />
      <PageHeader title="Exams" description="View scheduled exams and enter marks" />
      <FilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search exams..." />
      <DataTable columns={columns} data={filtered} keyExtractor={(e) => e.id} />
    </div>
  );
}
