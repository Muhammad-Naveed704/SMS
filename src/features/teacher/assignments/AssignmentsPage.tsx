"use client";

import { useState } from "react";
import { Plus, FileText, CheckCircle, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { StatsCard } from "@/components/shared/StatsCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { FilterBar } from "@/components/shared/FilterBar";
import { CreateAssignmentForm } from "./CreateAssignmentForm";
import { useTeacherAssignments, useCreateAssignment } from "@/features/teacher/hooks/useTeacherQueries";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/format";
import type { TeacherAssignment } from "@/types/teacher-panel.types";
import type { Column } from "@/components/ui/Table";

const statusVariant = (s: string) => (s === "active" ? "success" : s === "closed" ? "default" : "warning");

export function AssignmentsPage() {
  const toast = useToast();
  const { data: assignments = [], isLoading, isError, refetch } = useTeacherAssignments();
  const createAssignment = useCreateAssignment();
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  const active = assignments.filter((a) => a.status === "active").length;
  const submitted = assignments.reduce((s, a) => s + a.submittedCount, 0);
  const pendingReview = assignments.filter((a) => a.status === "active" && a.submittedCount < a.totalStudents).length;

  const filtered = assignments.filter((a) => {
    const q = search.toLowerCase();
    return !q || a.title.toLowerCase().includes(q) || a.className.toLowerCase().includes(q);
  });

  const columns: Column<TeacherAssignment>[] = [
    { key: "title", header: "Title", sortable: true, render: (r) => <span className="font-medium">{r.title}</span> },
    { key: "class", header: "Class", render: (r) => `${r.className} - ${r.section}` },
    { key: "subject", header: "Subject" },
    { key: "dueDate", header: "Due Date", render: (r) => formatDate(r.dueDate), sortable: true },
    { key: "submitted", header: "Submitted", render: (r) => `${r.submittedCount}/${r.totalStudents}` },
    { key: "status", header: "Status", render: (r) => <Badge variant={statusVariant(r.status)} className="capitalize">{r.status}</Badge> },
  ];

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Teacher", href: "/teacher/dashboard" }, { label: "Assignments" }]} />
      <PageHeader title="Assignments" description="Create and manage class assignments"
        action={<Button onClick={() => setCreateOpen(true)}><Plus className="h-4 w-4" />Create Assignment</Button>} />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard title="Active Assignments" value={active} icon={<FileText className="h-5 w-5" />} />
        <StatsCard title="Submitted" value={submitted} icon={<CheckCircle className="h-5 w-5" />} changeType="positive" />
        <StatsCard title="Pending Review" value={pendingReview} icon={<Clock className="h-5 w-5" />} changeType="negative" />
      </div>

      <FilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search assignments..." />
      <DataTable columns={columns} data={filtered} keyExtractor={(a) => a.id} />

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create Assignment" size="md">
        <CreateAssignmentForm
          loading={createAssignment.isPending}
          onSubmit={async (values) => {
            try {
              await createAssignment.mutateAsync(values);
              toast.success("Assignment created");
              setCreateOpen(false);
            } catch {
              toast.error("Failed to create assignment");
            }
          }}
        />
      </Modal>
    </div>
  );
}
