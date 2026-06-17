"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { FilterBar } from "@/components/shared/FilterBar";
import { ChildSwitcher } from "@/features/parent/components/ChildSwitcher";
import { useParentChildren, useParentHomework } from "@/features/parent/hooks/useParentQueries";
import { formatDate } from "@/lib/format";
import type { ParentHomework } from "@/types/parent-panel.types";
import type { Column } from "@/components/ui/Table";

const hwVariant = (s: string) => (s === "completed" ? "success" : s === "late" ? "danger" : "warning");

export function HomeworkPage() {
  const { data: children = [], isLoading: loadingChildren } = useParentChildren();
  const [childId, setChildId] = useState("all");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { data: homework = [], isLoading, isError, refetch } = useParentHomework(childId === "all" ? undefined : childId);

  const filtered = homework.filter((h) => {
    const q = search.toLowerCase();
    const matchSearch = !q || h.title.toLowerCase().includes(q) || h.subject.toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || h.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const columns: Column<ParentHomework>[] = [
    { key: "title", header: "Title", sortable: true, render: (r) => <span className="font-medium">{r.title}</span> },
    { key: "subject", header: "Subject" },
    { key: "teacherName", header: "Teacher" },
    { key: "assignedDate", header: "Assigned", render: (r) => formatDate(r.assignedDate), sortable: true },
    { key: "dueDate", header: "Due Date", render: (r) => formatDate(r.dueDate), sortable: true },
    { key: "status", header: "Status", render: (r) => <Badge variant={hwVariant(r.status)} className="capitalize">{r.status}</Badge> },
  ];

  if (loadingChildren) return <PageSkeleton />;
  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Parent", href: "/parent/dashboard" }, { label: "Homework" }]} />
      <PageHeader title="Homework" description="Track assignments for your children" />

      <div className="max-w-sm">
        <ChildSwitcher children={children} value={childId} onChange={setChildId} showAll />
      </div>

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search homework..."
        filters={[{
          key: "status", label: "Status", value: statusFilter, onChange: setStatusFilter,
          options: [
            { label: "All", value: "all" },
            { label: "Pending", value: "pending" },
            { label: "Completed", value: "completed" },
            { label: "Late", value: "late" },
          ],
        }]}
      />

      <DataTable columns={columns} data={filtered} keyExtractor={(h) => h.id} />
    </div>
  );
}
