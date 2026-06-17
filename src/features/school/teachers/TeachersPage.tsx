"use client";

import { useState } from "react";
import { LayoutGrid, List, Ban, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FilterBar } from "@/components/shared/FilterBar";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useSchoolTeachers, useUpdateTeacherStatus } from "@/features/school/hooks/useSchoolQueries";
import { useToast } from "@/components/ui/Toast";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { SchoolTeacher } from "@/types/school-admin.types";
import type { Column } from "@/components/ui/Table";

export function TeachersPage() {
  const toast = useToast();
  const { data: teachers = [], isLoading, isError, refetch } = useSchoolTeachers();
  const updateStatus = useUpdateTeacherStatus();
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"table" | "cards">("table");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = teachers.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch = !q || `${t.firstName} ${t.lastName}`.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const columns: Column<SchoolTeacher>[] = [
    { key: "name", header: "Name", sortable: true, render: (r) => (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{getInitials(`${r.firstName} ${r.lastName}`)}</div>
        <span className="font-medium">{r.firstName} {r.lastName}</span>
      </div>
    )},
    { key: "subject", header: "Subject", sortable: true },
    { key: "classes", header: "Classes", render: (r) => r.classes.join(", ") },
    { key: "phone", header: "Phone" },
    { key: "status", header: "Status", render: (r) => <Badge variant={r.status === "active" ? "success" : "warning"} className="capitalize">{r.status.replace("_", " ")}</Badge> },
    { key: "actions", header: "", render: (r) => (
      <Button variant="ghost" size="sm" onClick={() => updateStatus.mutate(
        { id: r.id, status: r.status === "active" ? "inactive" : "active" },
        { onSuccess: () => toast.success(r.status === "active" ? "Deactivated" : "Activated") }
      )}>
        {r.status === "active" ? <Ban className="h-4 w-4 text-danger" /> : <CheckCircle className="h-4 w-4 text-success" />}
      </Button>
    )},
  ];

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "School", href: "/school/dashboard" }, { label: "Teachers" }]} />
      <PageHeader title="Teachers" description="Manage teaching staff"
        action={
          <div className="flex gap-1 rounded-lg border border-border p-1">
            <Button variant={view === "table" ? "primary" : "ghost"} size="sm" onClick={() => setView("table")}><List className="h-4 w-4" /></Button>
            <Button variant={view === "cards" ? "primary" : "ghost"} size="sm" onClick={() => setView("cards")}><LayoutGrid className="h-4 w-4" /></Button>
          </div>
        } />
      <FilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search teachers..."
        filters={[{ key: "status", label: "Status", value: statusFilter, onChange: setStatusFilter,
          options: [{ label: "All", value: "all" }, { label: "Active", value: "active" }, { label: "On Leave", value: "on_leave" }] }]} />
      {view === "table" ? (
        <DataTable columns={columns} data={filtered} keyExtractor={(t) => t.id} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <Card key={t.id} padding="md">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary">{getInitials(`${t.firstName} ${t.lastName}`)}</div>
                <div>
                  <p className="font-semibold">{t.firstName} {t.lastName}</p>
                  <p className="text-sm text-muted-foreground">{t.subject}</p>
                  <Badge variant={t.status === "active" ? "success" : "warning"} className="mt-2 capitalize">{t.status.replace("_", " ")}</Badge>
                  <p className="mt-2 text-xs text-muted-foreground">{t.classes.join(" · ")}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
