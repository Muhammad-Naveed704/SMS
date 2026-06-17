"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, MoreHorizontal, Eye, Pencil, Ban, CheckCircle, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar } from "@/components/shared/FilterBar";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AddSchoolWizard } from "./AddSchoolWizard";
import {
  useOwnerSchools,
  useUpdateSchoolStatus,
  useDeleteSchool,
} from "@/features/owner/hooks/useOwnerQueries";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/format";
import { formatNumber, getInitials } from "@/lib/utils";
import type { OwnerSchool } from "@/types/owner.types";
import type { Column } from "@/components/ui/Table";

function SchoolActions({
  school,
  onView,
  onSuspend,
  onActivate,
  onDelete,
}: {
  school: OwnerSchool;
  onView: () => void;
  onSuspend: () => void;
  onActivate: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-1 w-44 rounded-lg border border-border bg-card py-1 shadow-lg">
            {[
              { icon: Eye, label: "View", action: onView },
              { icon: Pencil, label: "Edit", action: onView },
              ...(school.status === "active" || school.status === "trial"
                ? [{ icon: Ban, label: "Suspend", action: onSuspend, danger: true }]
                : [{ icon: CheckCircle, label: "Activate", action: onActivate }]),
              { icon: Trash2, label: "Delete", action: onDelete, danger: true },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                className={`flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted ${item.danger ? "text-danger" : "text-foreground"}`}
                onClick={(e) => { e.stopPropagation(); setOpen(false); item.action(); }}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const statusVariant = (s: string) => {
  if (s === "active") return "success";
  if (s === "trial") return "primary";
  if (s === "suspended") return "danger";
  return "warning";
};

export function SchoolsPage() {
  const router = useRouter();
  const toast = useToast();
  const { data: schools = [], isLoading, isError, refetch } = useOwnerSchools();
  const updateStatus = useUpdateSchoolStatus();
  const deleteSchool = useDeleteSchool();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [wizardOpen, setWizardOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = schools.filter((s) => {
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.ownerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    const matchPlan = planFilter === "all" || s.plan === planFilter;
    return matchSearch && matchStatus && matchPlan;
  });

  const columns: Column<OwnerSchool>[] = [
    {
      key: "logo",
      header: "",
      className: "w-12",
      render: (row) => (
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
          {getInitials(row.name)}
        </div>
      ),
    },
    { key: "name", header: "School Name", sortable: true },
    { key: "ownerName", header: "Owner", sortable: true },
    {
      key: "plan",
      header: "Plan",
      render: (row) => <Badge variant="primary" className="capitalize">{row.plan}</Badge>,
    },
    { key: "studentCount", header: "Students", render: (r) => formatNumber(r.studentCount), sortable: true },
    { key: "teacherCount", header: "Teachers", render: (r) => formatNumber(r.teacherCount), sortable: true },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge variant={statusVariant(row.status)} className="capitalize">{row.status}</Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (row) => formatDate(row.createdAt),
      sortable: true,
    },
    {
      key: "actions",
      header: "",
      className: "w-12",
      render: (row) => (
        <SchoolActions
          school={row}
          onView={() => router.push(`/owner/schools/${row.id}`)}
          onSuspend={() => updateStatus.mutate({ id: row.id, status: "suspended" }, { onSuccess: () => toast.success("School suspended") })}
          onActivate={() => updateStatus.mutate({ id: row.id, status: "active" }, { onSuccess: () => toast.success("School activated") })}
          onDelete={() => setDeleteId(row.id)}
        />
      ),
    },
  ];

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Schools"
        description="Manage all schools on the platform"
        action={
          <Button onClick={() => setWizardOpen(true)}>
            <Plus className="h-4 w-4" />
            Add School
          </Button>
        }
      />

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search schools or owners..."
        filters={[
          {
            key: "status",
            label: "Status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: "All Status", value: "all" },
              { label: "Active", value: "active" },
              { label: "Trial", value: "trial" },
              { label: "Suspended", value: "suspended" },
              { label: "Inactive", value: "inactive" },
            ],
          },
          {
            key: "plan",
            label: "Plan",
            value: planFilter,
            onChange: setPlanFilter,
            options: [
              { label: "All Plans", value: "all" },
              { label: "Starter", value: "starter" },
              { label: "Professional", value: "professional" },
              { label: "Enterprise", value: "enterprise" },
            ],
          },
        ]}
      />

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(r) => r.id}
        onRowClick={(r) => router.push(`/owner/schools/${r.id}`)}
        emptyTitle="No schools found"
        emptyDescription="Add your first school to get started."
        emptyAction={{ label: "Add School", onClick: () => setWizardOpen(true) }}
      />

      <AddSchoolWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />

      <ConfirmDialog
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            deleteSchool.mutate(deleteId, {
              onSuccess: () => { toast.success("School deleted"); setDeleteId(null); },
            });
          }
        }}
        title="Delete School"
        description="This action cannot be undone. All school data will be permanently removed."
        confirmLabel="Delete"
        variant="danger"
        loading={deleteSchool.isPending}
      />
    </div>
  );
}
