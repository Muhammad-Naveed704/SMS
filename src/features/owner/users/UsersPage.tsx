"use client";

import { useState } from "react";
import { KeyRound, Ban, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar } from "@/components/shared/FilterBar";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useOwnerUsers, useUpdateUserStatus } from "@/features/owner/hooks/useOwnerQueries";
import { useToast } from "@/components/ui/Toast";
import { formatRelativeTime } from "@/lib/format";
import { getInitials } from "@/lib/utils";
import type { OwnerUser } from "@/types/owner.types";
import type { Column } from "@/components/ui/Table";

export function UsersPage() {
  const toast = useToast();
  const { data: users = [], isLoading, isError, refetch } = useOwnerUsers();
  const updateStatus = useUpdateUserStatus();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = users.filter((u) => {
    const matchSearch =
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.schoolName.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const columns: Column<OwnerUser>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {getInitials(row.name)}
          </div>
          <span className="font-medium">{row.name}</span>
        </div>
      ),
    },
    { key: "email", header: "Email", sortable: true },
    {
      key: "role",
      header: "Role",
      render: (r) => (
        <Badge variant="primary" className="capitalize">
          {r.role.replace("_", " ")}
        </Badge>
      ),
    },
    { key: "schoolName", header: "School", sortable: true },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <Badge variant={r.status === "active" ? "success" : "warning"} className="capitalize">
          {r.status}
        </Badge>
      ),
    },
    {
      key: "lastLogin",
      header: "Last Login",
      render: (r) => (r.lastLogin ? formatRelativeTime(r.lastLogin) : "Never"),
      sortable: true,
    },
    {
      key: "actions",
      header: "",
      render: (row) => (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            title="Reset Password"
            onClick={() => toast.info("Reset link sent", `Password reset email sent to ${row.email}`)}
          >
            <KeyRound className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            title={row.status === "active" ? "Deactivate" : "Activate"}
            onClick={() =>
              updateStatus.mutate(
                { id: row.id, status: row.status === "active" ? "inactive" : "active" },
                {
                  onSuccess: () =>
                    toast.success(
                      row.status === "active" ? "User deactivated" : "User activated"
                    ),
                }
              )
            }
          >
            {row.status === "active" ? (
              <Ban className="h-4 w-4 text-danger" />
            ) : (
              <CheckCircle className="h-4 w-4 text-success" />
            )}
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage platform users across all schools"
      />

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name, email, or school..."
        filters={[
          {
            key: "role",
            label: "Role",
            value: roleFilter,
            onChange: setRoleFilter,
            options: [
              { label: "All Roles", value: "all" },
              { label: "School Admin", value: "school_admin" },
              { label: "Teacher", value: "teacher" },
              { label: "Student", value: "student" },
              { label: "Parent", value: "parent" },
            ],
          },
          {
            key: "status",
            label: "Status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { label: "All Status", value: "all" },
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ],
          },
        ]}
      />

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(u) => u.id}
        emptyTitle="No users found"
        emptyDescription="Users will appear here as schools onboard."
      />
    </div>
  );
}
