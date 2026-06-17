"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, LayoutGrid, List, Users } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FilterBar } from "@/components/shared/FilterBar";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useTeacherClasses } from "@/features/teacher/hooks/useTeacherQueries";
import { formatNumber } from "@/lib/utils";
import type { TeacherClass } from "@/types/teacher-panel.types";
import type { Column } from "@/components/ui/Table";

export function ClassesPage() {
  const router = useRouter();
  const { data: classes = [], isLoading, isError, refetch } = useTeacherClasses();
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"cards" | "table">("cards");

  const filtered = classes.filter((c) => {
    const q = search.toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || c.section.toLowerCase().includes(q) || c.subject.toLowerCase().includes(q);
  });

  const columns: Column<TeacherClass>[] = [
    { key: "name", header: "Class", sortable: true, render: (r) => <span className="font-medium">{r.name}</span> },
    { key: "section", header: "Section", sortable: true },
    { key: "subject", header: "Subject" },
    { key: "studentCount", header: "Students", render: (r) => formatNumber(r.studentCount), sortable: true },
    { key: "schedule", header: "Schedule" },
    { key: "room", header: "Room" },
    {
      key: "actions", header: "",
      render: (r) => (
        <Button variant="outline" size="sm" onClick={() => router.push(`/teacher/classes/${r.id}`)}>
          View Class
        </Button>
      ),
    },
  ];

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Teacher", href: "/teacher/dashboard" }, { label: "My Classes" }]} />
      <PageHeader
        title="My Classes"
        description="Classes and subjects assigned to you"
        action={
          <div className="flex gap-2">
            <Button variant={view === "cards" ? "primary" : "outline"} size="sm" onClick={() => setView("cards")}>
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant={view === "table" ? "primary" : "outline"} size="sm" onClick={() => setView("table")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        }
      />

      <FilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search classes..." />

      {view === "cards" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cls) => (
            <Card key={cls.id} className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => router.push(`/teacher/classes/${cls.id}`)}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{cls.name}</h3>
                    <p className="text-sm text-muted-foreground">Section {cls.section}</p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-2 text-primary"><BookOpen className="h-5 w-5" /></div>
                </div>
                <p className="mt-3 text-sm">Subject: <span className="font-medium text-foreground">{cls.subject}</span></p>
                <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="h-4 w-4" />{formatNumber(cls.studentCount)} students</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{cls.schedule} · Room {cls.room}</p>
                <Button className="mt-4 w-full" variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); router.push(`/teacher/classes/${cls.id}`); }}>
                  View Class
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filtered}
          keyExtractor={(c) => c.id}
          searchQuery={search}
          searchFilter={(c, q) => c.name.toLowerCase().includes(q) || c.section.toLowerCase().includes(q)}
        />
      )}
    </div>
  );
}
