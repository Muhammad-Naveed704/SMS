"use client";

import { DollarSign, CreditCard, AlertTriangle, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatsCard } from "@/components/shared/StatsCard";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Badge } from "@/components/ui/Badge";
import { RevenueChart } from "@/components/charts/DashboardCharts";
import { useOwnerBilling } from "@/features/owner/hooks/useOwnerQueries";
import { formatCurrency } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import type { SubscriptionRecord, Invoice } from "@/types/owner.types";
import type { Column } from "@/components/ui/Table";

const subColumns: Column<SubscriptionRecord>[] = [
  { key: "schoolName", header: "School", sortable: true },
  {
    key: "plan",
    header: "Plan",
    render: (r) => <Badge variant="primary" className="capitalize">{r.plan}</Badge>,
  },
  {
    key: "amount",
    header: "Amount",
    render: (r) => formatCurrency(r.amount),
    sortable: true,
  },
  {
    key: "startDate",
    header: "Start",
    render: (r) => formatDate(r.startDate),
    sortable: true,
  },
  {
    key: "expiryDate",
    header: "Expiry",
    render: (r) => formatDate(r.expiryDate),
    sortable: true,
  },
  {
    key: "status",
    header: "Status",
    render: (r) => (
      <Badge
        variant={r.status === "active" ? "success" : r.status === "trial" ? "primary" : "danger"}
        className="capitalize"
      >
        {r.status}
      </Badge>
    ),
  },
];

const invoiceColumns: Column<Invoice>[] = [
  { key: "id", header: "Invoice", sortable: true },
  { key: "schoolName", header: "School", sortable: true },
  {
    key: "amount",
    header: "Amount",
    render: (r) => formatCurrency(r.amount),
    sortable: true,
  },
  {
    key: "date",
    header: "Date",
    render: (r) => formatDate(r.date),
    sortable: true,
  },
  {
    key: "status",
    header: "Status",
    render: (r) => (
      <Badge
        variant={r.status === "paid" ? "success" : r.status === "pending" ? "warning" : "danger"}
        className="capitalize"
      >
        {r.status}
      </Badge>
    ),
  },
];

export function BillingPage() {
  const { data, isLoading, isError, refetch } = useOwnerBilling();

  if (isLoading) return <PageSkeleton />;
  if (isError || !data) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing"
        description="Revenue, subscriptions, and invoice management"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Monthly Revenue" value={formatCurrency(data.monthlyRevenue)} changeType="positive" icon={<DollarSign className="h-5 w-5" />} />
        <StatsCard title="Yearly Revenue" value={formatCurrency(data.yearlyRevenue)} icon={<TrendingUp className="h-5 w-5" />} />
        <StatsCard title="Active Plans" value={data.activePlans} icon={<CreditCard className="h-5 w-5" />} />
        <StatsCard title="Expired" value={data.expiredSubscriptions} changeType="negative" icon={<AlertTriangle className="h-5 w-5" />} />
      </div>

      <RevenueChart data={data.revenueByMonth} />

      <div>
        <h3 className="mb-4 text-base font-semibold">Subscriptions</h3>
        <DataTable columns={subColumns} data={data.subscriptions} keyExtractor={(s) => s.id} />
      </div>

      <div>
        <h3 className="mb-4 text-base font-semibold">Recent Invoices</h3>
        <DataTable columns={invoiceColumns} data={data.invoices} keyExtractor={(i) => i.id} />
      </div>
    </div>
  );
}
