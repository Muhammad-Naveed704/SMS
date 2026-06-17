"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { StatsCard } from "@/components/shared/StatsCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useStudentAssignments, useSubmitAssignment } from "@/features/student/hooks/useStudentQueries";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/format";
import type { StudentAssignment } from "@/types/student-panel.types";
import type { Column } from "@/components/ui/Table";
import { FileText, CheckCircle, AlertTriangle } from "lucide-react";

const asgVariant = (s: string) => (s === "submitted" ? "success" : s === "overdue" ? "danger" : "primary");

export function AssignmentsPage() {
  const toast = useToast();
  const { data: assignments = [], isLoading, isError, refetch } = useStudentAssignments();
  const submitAssignment = useSubmitAssignment();
  const [detail, setDetail] = useState<StudentAssignment | null>(null);

  const active = assignments.filter((a) => a.status === "active").length;
  const submitted = assignments.filter((a) => a.status === "submitted").length;
  const overdue = assignments.filter((a) => a.status === "overdue").length;

  const columns: Column<StudentAssignment>[] = [
    { key: "title", header: "Title", sortable: true, render: (r) => <span className="font-medium">{r.title}</span> },
    { key: "subject", header: "Subject" },
    { key: "teacherName", header: "Teacher" },
    { key: "dueDate", header: "Deadline", render: (r) => formatDate(r.dueDate), sortable: true },
    { key: "status", header: "Status", render: (r) => <Badge variant={asgVariant(r.status)} className="capitalize">{r.status}</Badge> },
    {
      key: "actions", header: "",
      render: (r) => (
        <Button variant="outline" size="sm" onClick={() => setDetail(r)}>
          {r.status === "active" ? "Submit" : "View"}
        </Button>
      ),
    },
  ];

  const handleSubmit = async () => {
    if (!detail) return;
    try {
      await submitAssignment.mutateAsync({ assignmentId: detail.id });
      toast.success("Assignment submitted successfully");
      setDetail(null);
    } catch {
      toast.error("Submission failed");
    }
  };

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Student", href: "/student/dashboard" }, { label: "Assignments" }]} />
      <PageHeader title="Assignments" description="Track and submit your assignments" />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard title="Active" value={active} icon={<FileText className="h-5 w-5" />} />
        <StatsCard title="Submitted" value={submitted} icon={<CheckCircle className="h-5 w-5" />} changeType="positive" />
        <StatsCard title="Overdue" value={overdue} icon={<AlertTriangle className="h-5 w-5" />} changeType="negative" />
      </div>

      <DataTable columns={columns} data={assignments} keyExtractor={(a) => a.id} />

      <Modal open={Boolean(detail)} onClose={() => setDetail(null)} title={detail?.title ?? ""} size="md">
        {detail && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span>{detail.subject}</span><span>·</span><span>{detail.teacherName}</span>
              <span>·</span><span>Due {formatDate(detail.dueDate)}</span>
            </div>
            <p className="text-sm">{detail.description}</p>
            <div className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
              Attachment upload area
            </div>
            {detail.status === "active" && (
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDetail(null)}>Cancel</Button>
                <Button onClick={handleSubmit} loading={submitAssignment.isPending}>Submit Assignment</Button>
              </div>
            )}
            {detail.status === "submitted" && detail.submittedAt && (
              <p className="text-sm text-success">Submitted on {formatDate(detail.submittedAt)}</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
