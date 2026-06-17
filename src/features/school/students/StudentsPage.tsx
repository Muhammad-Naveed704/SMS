"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, MoreHorizontal, Eye, Pencil, Ban, ArrowUpCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FilterBar } from "@/components/shared/FilterBar";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AddStudentWizard } from "./AddStudentWizard";
import { useSchoolStudents, useSchoolClasses, useUpdateStudentStatus } from "@/features/school/hooks/useSchoolQueries";
import { useToast } from "@/components/ui/Toast";
import { getInitials } from "@/lib/utils";
import type { SchoolStudent } from "@/types/school-admin.types";
import type { Column } from "@/components/ui/Table";

const feeVariant = (s: string) => (s === "paid" ? "success" : s === "overdue" ? "danger" : "warning");

export function StudentsPage() {
  const router = useRouter();
  const toast = useToast();
  const { data: students = [], isLoading, isError, refetch } = useSchoolStudents();
  const { data: classes = [] } = useSchoolClasses();
  const updateStatus = useUpdateStudentStatus();
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [wizardOpen, setWizardOpen] = useState(false);
  const [menuId, setMenuId] = useState<string | null>(null);

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch = !q || `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) || s.rollNumber.includes(q);
    const matchClass = classFilter === "all" || s.classId === classFilter;
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchClass && matchStatus;
  });

  const columns: Column<SchoolStudent>[] = [
    {
      key: "avatar", header: "", className: "w-12",
      render: (r) => (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
          {getInitials(`${r.firstName} ${r.lastName}`)}
        </div>
      ),
    },
    { key: "name", header: "Student Name", sortable: true, render: (r) => <span className="font-medium">{r.firstName} {r.lastName}</span> },
    { key: "rollNumber", header: "Roll No", sortable: true },
    { key: "class", header: "Class", render: (r) => `${r.className} - ${r.section}` },
    { key: "parentName", header: "Parent" },
    { key: "parentPhone", header: "Phone" },
    { key: "feeStatus", header: "Fee", render: (r) => <Badge variant={feeVariant(r.feeStatus)} className="capitalize">{r.feeStatus}</Badge> },
    { key: "status", header: "Status", render: (r) => <Badge variant={r.status === "active" ? "success" : "warning"} className="capitalize">{r.status}</Badge> },
    {
      key: "actions", header: "",
      render: (row) => (
        <div className="relative">
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setMenuId(menuId === row.id ? null : row.id); }}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          {menuId === row.id && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuId(null)} />
              <div className="absolute right-0 z-50 mt-1 w-40 rounded-lg border border-border bg-card py-1 shadow-lg">
                {[
                  { icon: Eye, label: "View Profile", action: () => router.push(`/school/students/${row.id}`) },
                  { icon: Pencil, label: "Edit", action: () => router.push(`/school/students/${row.id}`) },
                  { icon: ArrowUpCircle, label: "Promote", action: () => toast.info("Promote", "Class promotion wizard coming soon") },
                  { icon: Ban, label: "Deactivate", action: () => updateStatus.mutate({ id: row.id, status: "inactive" }, { onSuccess: () => toast.success("Deactivated") }), danger: true },
                ].map((item) => (
                  <button key={item.label} type="button" className={`flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted ${item.danger ? "text-danger" : ""}`}
                    onClick={(e) => { e.stopPropagation(); setMenuId(null); item.action(); }}>
                    <item.icon className="h-4 w-4" />{item.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      ),
    },
  ];

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "School", href: "/school/dashboard" }, { label: "Students" }]} />
      <PageHeader title="Students" description="Manage student records and enrollments"
        action={<Button onClick={() => setWizardOpen(true)}><Plus className="h-4 w-4" />Add Student</Button>} />
      <FilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search students..."
        filters={[
          { key: "class", label: "Class", value: classFilter, onChange: setClassFilter, options: [{ label: "All Classes", value: "all" }, ...classes.map((c) => ({ label: c.name, value: c.id }))] },
          { key: "status", label: "Status", value: statusFilter, onChange: setStatusFilter, options: [{ label: "All", value: "all" }, { label: "Active", value: "active" }, { label: "Inactive", value: "inactive" }] },
        ]} />
      <DataTable columns={columns} data={filtered} keyExtractor={(s) => s.id} onRowClick={(s) => router.push(`/school/students/${s.id}`)}
        emptyTitle="No students" emptyDescription="Add your first student to get started."
        emptyAction={{ label: "Add Student", onClick: () => setWizardOpen(true) }} />
      <AddStudentWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />
    </div>
  );
}
