"use client";

import { useState } from "react";
import { FileText, Download, CreditCard } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { StatsCard } from "@/components/shared/StatsCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ChildSwitcher } from "@/features/parent/components/ChildSwitcher";
import { useParentChildren, useParentFees } from "@/features/parent/hooks/useParentQueries";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/format";
import { formatCurrency } from "@/lib/utils";
import type { ParentFeeRecord } from "@/types/parent-panel.types";
import type { Column } from "@/components/ui/Table";

const feeVariant = (s: string) => (s === "paid" ? "success" : s === "overdue" ? "danger" : "warning");

export function FeesPage() {
  const toast = useToast();
  const { data: children = [], isLoading: loadingChildren } = useParentChildren();
  const [childId, setChildId] = useState("all");
  const { data: feeSummaries = [], isLoading, isError, refetch } = useParentFees(childId === "all" ? undefined : childId);

  const allRecords = feeSummaries.flatMap((f) => f.records);
  const totalFee = feeSummaries.reduce((s, f) => s + f.totalFee, 0);
  const paidAmount = feeSummaries.reduce((s, f) => s + f.paidAmount, 0);
  const remainingAmount = feeSummaries.reduce((s, f) => s + f.remainingAmount, 0);

  const columns: Column<ParentFeeRecord>[] = [
    { key: "invoiceNo", header: "Invoice No", sortable: true },
    { key: "feeType", header: "Fee Type" },
    { key: "amount", header: "Amount", render: (r) => formatCurrency(r.amount), sortable: true },
    { key: "dueDate", header: "Due Date", render: (r) => formatDate(r.dueDate), sortable: true },
    { key: "status", header: "Status", render: (r) => <Badge variant={feeVariant(r.status)} className="capitalize">{r.status}</Badge> },
    {
      key: "actions", header: "",
      render: (r) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" title="View Invoice" onClick={() => toast.info("Invoice", r.invoiceNo)}>
            <FileText className="h-4 w-4" />
          </Button>
          {r.status === "paid" && (
            <Button variant="ghost" size="sm" title="Download Receipt" onClick={() => toast.success("Download started", r.invoiceNo)}>
              <Download className="h-4 w-4" />
            </Button>
          )}
          {r.status !== "paid" && (
            <Button variant="ghost" size="sm" title="Pay Now" onClick={() => toast.success("Payment", "Redirecting to payment gateway...")}>
              <CreditCard className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  if (loadingChildren) return <PageSkeleton />;
  if (isLoading) return <PageSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Parent", href: "/parent/dashboard" }, { label: "Fees" }]} />
      <PageHeader title="Fees" description="View and pay school fees" />

      <div className="max-w-sm">
        <ChildSwitcher children={children} value={childId} onChange={setChildId} showAll />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard title="Total Fee" value={formatCurrency(totalFee)} />
        <StatsCard title="Paid Amount" value={formatCurrency(paidAmount)} changeType="positive" />
        <StatsCard title="Remaining" value={formatCurrency(remainingAmount)} changeType="negative" />
      </div>

      <DataTable columns={columns} data={allRecords} keyExtractor={(f) => f.id} />
    </div>
  );
}
