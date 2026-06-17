"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { useTeacherProfile } from "@/features/teacher/hooks/useTeacherQueries";
import { formatDate } from "@/lib/format";
import { getInitials } from "@/lib/utils";

export function ProfilePage() {
  const [tab, setTab] = useState("personal");
  const { data: profile, isLoading, isError, refetch } = useTeacherProfile();

  if (isLoading) return <PageSkeleton />;
  if (isError || !profile) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Teacher", href: "/teacher/dashboard" }, { label: "Profile" }]} />
      <PageHeader title="My Profile" description="Your personal and professional information" />

      <Card>
        <CardContent className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
            {getInitials(`${profile.firstName} ${profile.lastName}`)}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{profile.firstName} {profile.lastName}</h2>
            <p className="text-muted-foreground">{profile.email}</p>
            <p className="text-sm text-muted-foreground">{profile.phone}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.subjects.map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs tabs={[
        { id: "personal", label: "Personal Info" },
        { id: "classes", label: "Classes" },
        { id: "documents", label: "Documents" },
      ]} activeTab={tab} onChange={setTab} />

      <Card>
        <CardContent className="pt-6">
          {tab === "personal" && (
            <dl className="grid gap-4 sm:grid-cols-2">
              {[
                ["Employee ID", profile.employeeId],
                ["Email", profile.email],
                ["Phone", profile.phone],
                ["Qualification", profile.qualification ?? "—"],
                ["Join Date", formatDate(profile.joinDate)],
                ["Subjects", profile.subjects.join(", ")],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-sm text-muted-foreground">{label}</dt>
                  <dd className="mt-1 font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          )}
          {tab === "classes" && (
            <div className="space-y-3">
              {profile.classes.map((cls) => (
                <div key={cls} className="rounded-lg border border-border p-4">
                  <p className="font-medium">{cls}</p>
                  <p className="text-sm text-muted-foreground">Mathematics</p>
                </div>
              ))}
            </div>
          )}
          {tab === "documents" && (
            <div className="space-y-3">
              {profile.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <span className="text-sm font-medium">{doc.name}</span>
                  <span className="text-xs text-muted-foreground">Uploaded {formatDate(doc.uploadedAt)}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
