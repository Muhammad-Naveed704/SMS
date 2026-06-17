"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { StatsCard } from "@/components/shared/StatsCard";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { useSchoolStudent } from "@/features/school/hooks/useSchoolQueries";
import { formatDate } from "@/lib/format";
import { formatCurrency, getInitials } from "@/lib/utils";

export function StudentProfilePage({ studentId }: { studentId: string }) {
  const router = useRouter();
  const [tab, setTab] = useState("overview");
  const { data: student, isLoading, isError, refetch } = useSchoolStudent(studentId);

  if (isLoading) return <PageSkeleton />;
  if (isError || !student) return <ErrorState onRetry={() => refetch()} />;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "attendance", label: "Attendance" },
    { id: "fees", label: "Fees" },
    { id: "results", label: "Results" },
    { id: "documents", label: "Documents" },
  ];

  const attendanceData = [
    { month: "Jan", present: 22, absent: 1 }, { month: "Feb", present: 20, absent: 0 },
    { month: "Mar", present: 21, absent: 2 }, { month: "Apr", present: 19, absent: 1 },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { label: "School", href: "/school/dashboard" },
        { label: "Students", href: "/school/students" },
        { label: `${student.firstName} ${student.lastName}` },
      ]} />
      <Button variant="ghost" size="sm" onClick={() => router.push("/school/students")}>
        <ArrowLeft className="h-4 w-4" />Back
      </Button>

      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-xl font-bold text-primary">
          {getInitials(`${student.firstName} ${student.lastName}`)}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{student.firstName} {student.lastName}</h1>
          <p className="text-muted-foreground">{student.className} — Section {student.section} · Roll {student.rollNumber}</p>
          <div className="mt-2 flex gap-2">
            <Badge variant="success" className="capitalize">{student.status}</Badge>
            <Badge variant={student.feeStatus === "paid" ? "success" : "warning"} className="capitalize">Fee: {student.feeStatus}</Badge>
          </div>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={tab} onChange={setTab} />

      {tab === "overview" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Card><CardContent className="space-y-3 pt-6">
            <h3 className="font-semibold">Personal Information</h3>
            {([["Date of Birth", formatDate(student.dateOfBirth)], ["Gender", student.gender], ["Admission", formatDate(student.admissionDate)], ["Phone", student.phone ?? "—"]] as const).map(([l, v]) => (
              <div key={l} className="flex justify-between text-sm"><span className="text-muted-foreground">{l}</span><span className="font-medium">{v}</span></div>
            ))}
          </CardContent></Card>
          <Card><CardContent className="space-y-3 pt-6">
            <h3 className="font-semibold">Parent / Guardian</h3>
            {([["Name", student.parentName], ["Phone", student.parentPhone], ["Email", student.parentEmail ?? "—"]] as const).map(([l, v]) => (
              <div key={l} className="flex justify-between text-sm"><span className="text-muted-foreground">{l}</span><span className="font-medium">{v}</span></div>
            ))}
          </CardContent></Card>
        </div>
      )}
      {tab === "attendance" && (
        <DataTable columns={[
          { key: "month", header: "Month" }, { key: "present", header: "Present" }, { key: "absent", header: "Absent" },
        ]} data={attendanceData} keyExtractor={(r) => r.month} />
      )}
      {tab === "fees" && (
        <Card><CardContent className="pt-6 space-y-3">
          <div className="flex justify-between text-sm"><span>Tuition Fee</span><span>{formatCurrency(500)}</span></div>
          <div className="flex justify-between text-sm"><span>Status</span><Badge variant={student.feeStatus === "paid" ? "success" : "warning"} className="capitalize">{student.feeStatus}</Badge></div>
        </CardContent></Card>
      )}
      {tab === "results" && <Card><CardContent className="py-12 text-center text-muted-foreground">Exam results will appear here after grading.</CardContent></Card>}
      {tab === "documents" && <Card><CardContent className="py-12 text-center text-muted-foreground">No documents uploaded yet.</CardContent></Card>}
    </div>
  );
}
