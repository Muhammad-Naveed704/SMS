"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { DatePicker } from "@/components/ui/DatePicker";
import { useSchoolExams } from "@/features/school/hooks/useSchoolQueries";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/format";
import type { Exam } from "@/types/school-admin.types";
import type { Column } from "@/components/ui/Table";

export function ExamsPage() {
  const toast = useToast();
  const { data: exams = [], isLoading, isError, refetch } = useSchoolExams();
  const [createOpen, setCreateOpen] = useState(false);

  const columns: Column<Exam>[] = [
    { key: "name", header: "Exam Name", sortable: true },
    { key: "date", header: "Date", render: (r) => formatDate(r.date), sortable: true },
    { key: "classes", header: "Classes", render: (r) => r.classes.join(", ") },
    { key: "subjects", header: "Subjects", render: (r) => r.subjects.join(", ") },
    { key: "totalMarks", header: "Marks", render: (r) => r.totalMarks },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <Badge variant={r.status === "upcoming" ? "primary" : r.status === "ongoing" ? "warning" : "success"} className="capitalize">
          {r.status}
        </Badge>
      ),
    },
    {
      key: "actions", header: "",
      render: (r) => (
        <Button variant="outline" size="sm" onClick={() => toast.info("Results", `Manage results for ${r.name}`)}>
          Manage Results
        </Button>
      ),
    },
  ];

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "School", href: "/school/dashboard" }, { label: "Exams" }]} />
      <PageHeader title="Exams" description="Schedule exams and manage results"
        action={<Button onClick={() => setCreateOpen(true)}><Plus className="h-4 w-4" />Create Exam</Button>} />
      <DataTable columns={columns} data={exams} keyExtractor={(e) => e.id} />
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Create Exam" size="md">
        <div className="space-y-4">
          <Input label="Exam Name" placeholder="Mid-Term Examination" />
          <DatePicker label="Exam Date" />
          <Input label="Classes" placeholder="Grade 10, Grade 12" />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button onClick={() => { toast.success("Exam created"); setCreateOpen(false); }}>Create</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
