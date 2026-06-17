"use client";

import { useState } from "react";
import { Download, Eye } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DataTable } from "@/components/shared/DataTable";
import { FilterBar } from "@/components/shared/FilterBar";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useStudentDocuments } from "@/features/student/hooks/useStudentQueries";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/format";
import type { StudentDocument } from "@/types/student-panel.types";
import type { Column } from "@/components/ui/Table";

const TYPE_LABELS: Record<StudentDocument["type"], string> = {
  certificate: "Certificates",
  result: "Result Cards",
  report: "Reports",
  school: "School Documents",
};

export function DocumentsPage() {
  const toast = useToast();
  const { data: documents = [], isLoading, isError, refetch } = useStudentDocuments();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = documents.filter((d) => {
    const q = search.toLowerCase();
    const matchSearch = !q || d.name.toLowerCase().includes(q);
    const matchType = typeFilter === "all" || d.type === typeFilter;
    return matchSearch && matchType;
  });

  const columns: Column<StudentDocument>[] = [
    { key: "name", header: "Document", sortable: true, render: (r) => <span className="font-medium">{r.name}</span> },
    { key: "type", header: "Type", render: (r) => <Badge className="capitalize">{TYPE_LABELS[r.type]}</Badge> },
    { key: "size", header: "Size" },
    { key: "uploadedAt", header: "Date", render: (r) => formatDate(r.uploadedAt), sortable: true },
    {
      key: "actions", header: "",
      render: (r) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" title="Preview" onClick={() => toast.info("Preview", r.name)}><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" title="Download" onClick={() => toast.success("Download started", r.name)}><Download className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ];

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Student", href: "/student/dashboard" }, { label: "Documents" }]} />
      <PageHeader title="My Documents" description="Certificates, reports, and school documents" />
      <FilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search documents..."
        filters={[{ key: "type", label: "Type", value: typeFilter, onChange: setTypeFilter,
          options: [
            { label: "All", value: "all" },
            { label: "Certificates", value: "certificate" },
            { label: "Results", value: "result" },
            { label: "Reports", value: "report" },
            { label: "School", value: "school" },
          ] }]} />
      <DataTable columns={columns} data={filtered} keyExtractor={(d) => d.id} />
    </div>
  );
}
