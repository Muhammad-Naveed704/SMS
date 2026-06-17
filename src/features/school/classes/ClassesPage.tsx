"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Card, CardContent } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { DataTable } from "@/components/shared/DataTable";
import { useSchoolClasses, useSchoolClass } from "@/features/school/hooks/useSchoolQueries";
import { formatNumber } from "@/lib/utils";

export function ClassesPage() {
  const router = useRouter();
  const { data: classes = [], isLoading, isError, refetch } = useSchoolClasses();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailTab, setDetailTab] = useState("students");
  const { data: classDetail } = useSchoolClass(selectedId ?? "");

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "School", href: "/school/dashboard" }, { label: "Classes" }]} />
      <PageHeader title="Classes" description="Manage grades, sections, and subjects" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <Card key={cls.id} className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => setSelectedId(cls.id)}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{cls.name}</h3>
                  <p className="text-sm text-muted-foreground">Grade {cls.grade}</p>
                </div>
                <div className="rounded-lg bg-primary/10 p-2 text-primary"><BookOpen className="h-5 w-5" /></div>
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Users className="h-4 w-4" />{formatNumber(cls.studentCount)} students</span>
              </div>
              <p className="mt-2 text-sm">Teacher: <span className="font-medium text-foreground">{cls.classTeacherName ?? "Unassigned"}</span></p>
              <div className="mt-3 flex flex-wrap gap-1">
                {cls.sections.map((s) => (
                  <span key={s} className="rounded-full bg-muted px-2 py-0.5 text-xs">Sec {s}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedId && classDetail && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="mb-4 text-lg font-semibold">{classDetail.name} — Details</h3>
            <Tabs tabs={[
              { id: "sections", label: "Sections", count: classDetail.sections.length },
              { id: "students", label: "Students", count: classDetail.students?.length },
              { id: "subjects", label: "Subjects", count: classDetail.subjects.length },
            ]} activeTab={detailTab} onChange={setDetailTab} />
            <div className="mt-4">
              {detailTab === "sections" && (
                <div className="flex flex-wrap gap-2">
                  {classDetail.sections.map((s) => (
                    <span key={s} className="rounded-lg border border-border px-4 py-2 text-sm">Section {s}</span>
                  ))}
                </div>
              )}
              {detailTab === "students" && (
                <DataTable
                  columns={[
                    { key: "name", header: "Student", render: (r: { firstName: string; lastName: string }) => `${r.firstName} ${r.lastName}` },
                    { key: "rollNumber", header: "Roll No" },
                    { key: "section", header: "Section" },
                  ]}
                  data={classDetail.students ?? []}
                  keyExtractor={(s: { id: string }) => s.id}
                />
              )}
              {detailTab === "subjects" && (
                <div className="flex flex-wrap gap-2">
                  {classDetail.subjects.map((sub) => (
                    <span key={sub} className="rounded-lg bg-muted px-4 py-2 text-sm">{sub}</span>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
