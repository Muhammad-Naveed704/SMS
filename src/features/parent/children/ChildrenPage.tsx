"use client";

import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useParentChildren } from "@/features/parent/hooks/useParentQueries";
import { getInitials } from "@/lib/utils";

export function ChildrenPage() {
  const router = useRouter();
  const { data: children = [], isLoading, isError, refetch } = useParentChildren();

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Parent", href: "/parent/dashboard" }, { label: "Children" }]} />
      <PageHeader title="My Children" description={`${children.length} linked ${children.length === 1 ? "child" : "children"}`} />

      {children.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-12 text-center text-muted-foreground">
          No children linked to your account
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {children.map((child) => (
            <Card key={child.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                    {getInitials(`${child.firstName} ${child.lastName}`)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{child.firstName} {child.lastName}</h3>
                    <p className="text-sm text-muted-foreground">{child.className} — Section {child.section}</p>
                    <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />{child.schoolName}
                    </p>
                    <p className="text-xs text-muted-foreground">Roll No: {child.rollNumber}</p>
                  </div>
                </div>
                <Button className="mt-4 w-full" variant="outline" onClick={() => router.push(`/parent/children/${child.id}`)}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
