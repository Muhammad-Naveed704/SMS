"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Eye } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { useParentChild, useParentAttendance, useParentFees, useParentResults, useParentHomework } from "@/features/parent/hooks/useParentQueries";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/format";
import { formatCurrency, formatPercentage, getInitials } from "@/lib/utils";
import type { ParentDocument, ParentFeeRecord, ParentHomework } from "@/types/parent-panel.types";
import type { Column } from "@/components/ui/Table";

const feeVariant = (s: string) => (s === "paid" ? "success" : s === "overdue" ? "danger" : "warning");
const hwVariant = (s: string) => (s === "completed" ? "success" : s === "late" ? "danger" : "warning");

export function ChildProfilePage({ childId }: { childId: string }) {
  const router = useRouter();
  const toast = useToast();
  const [tab, setTab] = useState("overview");
  const { data: child, isLoading, isError, refetch } = useParentChild(childId);
  const { data: attendance } = useParentAttendance(childId);
  const { data: fees } = useParentFees(childId);
  const { data: results } = useParentResults(childId);
  const { data: homework } = useParentHomework(childId);

  if (isLoading) return <PageSkeleton />;
  if (isError || !child) return <ErrorState onRetry={() => refetch()} message="Child not found or access denied" />;

  const feeSummary = fees?.[0];
  const feeColumns: Column<ParentFeeRecord>[] = [
    { key: "invoiceNo", header: "Invoice", sortable: true },
    { key: "feeType", header: "Type" },
    { key: "amount", header: "Amount", render: (r) => formatCurrency(r.amount) },
    { key: "status", header: "Status", render: (r) => <Badge variant={feeVariant(r.status)} className="capitalize">{r.status}</Badge> },
  ];

  const hwColumns: Column<ParentHomework>[] = [
    { key: "title", header: "Title", sortable: true },
    { key: "subject", header: "Subject" },
    { key: "dueDate", header: "Due", render: (r) => formatDate(r.dueDate) },
    { key: "status", header: "Status", render: (r) => <Badge variant={hwVariant(r.status)} className="capitalize">{r.status}</Badge> },
  ];

  const docColumns: Column<ParentDocument>[] = [
    { key: "name", header: "Document", sortable: true },
    { key: "type", header: "Type", render: (r) => <Badge className="capitalize">{r.type}</Badge> },
    { key: "uploadedAt", header: "Date", render: (r) => formatDate(r.uploadedAt) },
    {
      key: "actions", header: "",
      render: (r) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => toast.info("Preview", r.name)}><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" onClick={() => toast.success("Download started", r.name)}><Download className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[
        { label: "Parent", href: "/parent/dashboard" },
        { label: "Children", href: "/parent/children" },
        { label: `${child.firstName} ${child.lastName}` },
      ]} />

      <div className="flex items-start gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.push("/parent/children")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
            {getInitials(`${child.firstName} ${child.lastName}`)}
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{child.firstName} {child.lastName}</h1>
            <p className="text-muted-foreground">{child.className} — Section {child.section} · Roll {child.rollNumber}</p>
          </div>
        </div>
      </div>

      <Tabs tabs={[
        { id: "overview", label: "Overview" },
        { id: "attendance", label: "Attendance" },
        { id: "fees", label: "Fees" },
        { id: "results", label: "Results" },
        { id: "homework", label: "Homework" },
        { id: "documents", label: "Documents" },
      ]} activeTab={tab} onChange={setTab} />

      <Card>
        <CardContent className="pt-6">
          {tab === "overview" && (
            <dl className="grid gap-4 sm:grid-cols-2">
              {[
                ["School", child.schoolName],
                ["Class Teacher", child.classTeacher],
                ["Date of Birth", formatDate(child.dateOfBirth)],
                ["Gender", child.gender],
                ["Admission Date", formatDate(child.admissionDate)],
                ["Attendance", formatPercentage(child.attendancePercent)],
                ["Fee Status", child.feeStatus],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-sm text-muted-foreground">{label}</dt>
                  <dd className="mt-1 font-medium capitalize">{value}</dd>
                </div>
              ))}
            </dl>
          )}
          {tab === "attendance" && attendance && (
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-border p-4"><p className="text-sm text-muted-foreground">Present</p><p className="text-2xl font-semibold">{attendance.presentDays}</p></div>
              <div className="rounded-lg border border-border p-4"><p className="text-sm text-muted-foreground">Absent</p><p className="text-2xl font-semibold">{attendance.absentDays}</p></div>
              <div className="rounded-lg border border-border p-4"><p className="text-sm text-muted-foreground">Monthly %</p><p className="text-2xl font-semibold">{attendance.monthlyPercentage}%</p></div>
            </div>
          )}
          {tab === "fees" && feeSummary && (
            <>
              <div className="mb-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-border p-4"><p className="text-sm text-muted-foreground">Total</p><p className="text-xl font-semibold">{formatCurrency(feeSummary.totalFee)}</p></div>
                <div className="rounded-lg border border-border p-4"><p className="text-sm text-muted-foreground">Paid</p><p className="text-xl font-semibold">{formatCurrency(feeSummary.paidAmount)}</p></div>
                <div className="rounded-lg border border-border p-4"><p className="text-sm text-muted-foreground">Remaining</p><p className="text-xl font-semibold">{formatCurrency(feeSummary.remainingAmount)}</p></div>
              </div>
              <DataTable columns={feeColumns} data={feeSummary.records} keyExtractor={(f) => f.id} />
            </>
          )}
          {tab === "results" && results && (
            <div className="space-y-4">
              {results.map((exam) => (
                <div key={exam.id} className="rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{exam.examName}</h4>
                    <Badge>{exam.overallPercentage}%</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{formatDate(exam.date)} · {exam.academicYear}</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {exam.subjects.map((s) => (
                      <div key={s.subject} className="rounded-md bg-muted/50 p-3 text-sm">
                        <span className="font-medium">{s.subject}</span>: {s.marks}/{s.totalMarks} ({s.grade})
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === "homework" && homework && (
            <DataTable columns={hwColumns} data={homework} keyExtractor={(h) => h.id} />
          )}
          {tab === "documents" && (
            <DataTable columns={docColumns} data={child.documents} keyExtractor={(d) => d.id} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
