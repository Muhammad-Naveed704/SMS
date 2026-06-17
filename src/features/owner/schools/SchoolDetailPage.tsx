"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  GraduationCap,
  UserCheck,
  BookOpen,
  DollarSign,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/shared/StatsCard";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import {
  useOwnerSchool,
  useOwnerUsers,
} from "@/features/owner/hooks/useOwnerQueries";
import { ownerDataService } from "@/features/owner/data/owner-data.service";
import { formatCurrency, formatNumber, getInitials } from "@/lib/utils";
import { formatDate, formatRelativeTime } from "@/lib/format";
import type { Column } from "@/components/ui/Table";
import type { OwnerUser } from "@/types/owner.types";

interface SchoolDetailPageProps {
  schoolId: string;
}

export function SchoolDetailPage({ schoolId }: SchoolDetailPageProps) {
  const router = useRouter();
  const [tab, setTab] = useState("overview");
  const { data: school, isLoading, isError, refetch } = useOwnerSchool(schoolId);
  const { data: allUsers = [] } = useOwnerUsers();

  const schoolUsers = allUsers.filter((u) => u.schoolId === schoolId);
  const activity = ownerDataService.getActivity().filter((a) =>
    a.message.toLowerCase().includes(school?.name.toLowerCase().split(" ")[0] ?? "")
  );

  const userColumns: Column<OwnerUser>[] = [
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email" },
    {
      key: "role",
      header: "Role",
      render: (r) => <Badge className="capitalize">{r.role.replace("_", " ")}</Badge>,
    },
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
      render: (r) => (r.lastLogin ? formatRelativeTime(r.lastLogin) : "—"),
    },
  ];

  if (isLoading) return <PageSkeleton />;
  if (isError || !school) return <ErrorState onRetry={() => refetch()} />;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "users", label: "Users", count: schoolUsers.length },
    { id: "subscription", label: "Subscription" },
    { id: "activity", label: "Activity", count: activity.length },
  ];

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" onClick={() => router.push("/owner/schools")}>
        <ArrowLeft className="h-4 w-4" />
        Back to Schools
      </Button>

      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
            {getInitials(school.name)}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{school.name}</h1>
            <p className="text-sm text-muted-foreground">{school.email}</p>
            <div className="mt-2 flex gap-2">
              <Badge variant={school.status === "active" ? "success" : "warning"} className="capitalize">
                {school.status}
              </Badge>
              <Badge variant="primary" className="capitalize">{school.plan}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Students" value={formatNumber(school.studentCount)} icon={<GraduationCap className="h-5 w-5" />} />
        <StatsCard title="Teachers" value={formatNumber(school.teacherCount)} icon={<UserCheck className="h-5 w-5" />} />
        <StatsCard title="Classes" value={formatNumber(school.classCount)} icon={<BookOpen className="h-5 w-5" />} />
        <StatsCard title="Revenue" value={formatCurrency(school.revenue)} icon={<DollarSign className="h-5 w-5" />} />
      </div>

      <Tabs tabs={tabs} activeTab={tab} onChange={setTab} />

      {tab === "overview" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="space-y-3 pt-6">
              <h3 className="font-semibold">School Information</h3>
              {[
                ["Address", `${school.address}, ${school.city}, ${school.country}`],
                ["Phone", school.phone],
                ["Owner", school.ownerName],
                ["Owner Email", school.ownerEmail],
                ["Created", formatDate(school.createdAt)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium text-foreground">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-4 font-semibold">Recent Users</h3>
              <DataTable columns={userColumns} data={schoolUsers.slice(0, 5)} keyExtractor={(u) => u.id} pageSize={5} />
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "users" && (
        <DataTable columns={userColumns} data={schoolUsers} keyExtractor={(u) => u.id} />
      )}

      {tab === "subscription" && (
        <Card>
          <CardContent className="space-y-3 pt-6">
            {[
              ["Plan", school.plan],
              ["Monthly Amount", formatCurrency(school.revenue)],
              ["Start Date", school.subscriptionStart ? formatDate(school.subscriptionStart) : "—"],
              ["Expiry Date", school.subscriptionExpiry ? formatDate(school.subscriptionExpiry) : "—"],
              ["Status", school.status],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between border-b border-border py-3 text-sm last:border-0">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium capitalize text-foreground">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {tab === "activity" && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            {activity.length === 0 ? (
              <p className="text-sm text-muted-foreground">No activity recorded yet.</p>
            ) : (
              activity.map((item) => (
                <div key={item.id} className="flex justify-between border-b border-border pb-3 text-sm last:border-0">
                  <span>{item.message}</span>
                  <span className="text-muted-foreground">{formatRelativeTime(item.timestamp)}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
