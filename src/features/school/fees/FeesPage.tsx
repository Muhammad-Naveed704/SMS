"use client";

import { DollarSign, AlertTriangle, CheckCircle, Send, FileText } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { StatsCard } from "@/components/shared/StatsCard";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FeeCollectionChart } from "@/components/charts/DashboardCharts";
import { useSchoolFees, useSchoolDashboardData } from "@/features/school/hooks/useSchoolQueries";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import type { FeeRecord } from "@/types/school-admin.types";
import type { Column } from "@/components/ui/Table";

const feeVariant = (s: string) => (s === "paid" ? "success" : s === "overdue" ? "danger" : "warning");

export function FeesPage() {
  const toast = useToast();
  const { data: fees = [], isLoading, isError, refetch } = useSchoolFees();
  const { data: dashboard } = useSchoolDashboardData();

  const totalCollected = fees.reduce((s, f) => s + f.paid, 0);
  const totalPending = fees.reduce((s, f) => s + (f.amount - f.paid), 0);
  const overdue = fees.filter((f) => f.status === "overdue").reduce((s, f) => s + (f.amount - f.paid), 0);

  const columns: Column<FeeRecord>[] = [
    { key: "studentName", header: "Student", sortable: true },
    { key: "className", header: "Class" },
    { key: "feeType", header: "Fee Type" },
    { key: "amount", header: "Amount", render: (r) => formatCurrency(r.amount), sortable: true },
    { key: "paid", header: "Paid", render: (r) => formatCurrency(r.paid) },
    { key: "dueDate", header: "Due", render: (r) => formatDate(r.dueDate) },
    { key: "status", header: "Status", render: (r) => <Badge variant={feeVariant(r.status)} className="capitalize">{r.status}</Badge> },
    {
      key: "actions", header: "",
      render: (r) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" title="Generate Invoice" onClick={() => toast.info("Invoice", `Invoice generated for ${r.studentName}`)}>
            <FileText className="h-4 w-4" />
          </Button>
          {r.status !== "paid" && (
            <Button variant="ghost" size="sm" title="Send Reminder" onClick={() => toast.success("Reminder sent", `Fee reminder sent to ${r.studentName}`)}>
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "School", href: "/school/dashboard" }, { label: "Fees" }]} />
      <PageHeader title="Fees Management" description="Track collections, invoices, and reminders" />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard title="Total Collected" value={formatCurrency(totalCollected)} icon={<CheckCircle className="h-5 w-5" />} changeType="positive" />
        <StatsCard title="Pending Amount" value={formatCurrency(totalPending)} icon={<DollarSign className="h-5 w-5" />} />
        <StatsCard title="Overdue" value={formatCurrency(overdue)} icon={<AlertTriangle className="h-5 w-5" />} changeType="negative" />
      </div>

      {dashboard?.feeCollection && <FeeCollectionChart data={dashboard.feeCollection} />}
      <DataTable columns={columns} data={fees} keyExtractor={(f) => f.id} />
    </div>
  );
}
