"use client";

import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useStudentSubjects } from "@/features/student/hooks/useStudentQueries";

export function ClassesPage() {
  const router = useRouter();
  const { data: subjects = [], isLoading, isError, refetch } = useStudentSubjects();

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Student", href: "/student/dashboard" }, { label: "My Classes" }]} />
      <PageHeader title="My Classes" description="Your subjects and class schedule" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((sub) => (
          <Card key={sub.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{sub.name}</h3>
                  <p className="text-sm text-muted-foreground">{sub.teacherName}</p>
                </div>
                <div className="rounded-lg bg-primary/10 p-2 text-primary"><BookOpen className="h-5 w-5" /></div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{sub.schedule}</p>
              <p className="text-sm text-muted-foreground">Room {sub.room}</p>
              <Button className="mt-4 w-full" variant="outline" size="sm" onClick={() => router.push(`/student/classes/${sub.id}`)}>
                View Subject
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
