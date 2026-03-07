import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Financial Reports",
  "Review school fee collections, pending dues, and billing health."
);

export default function ReportsFinancialPage() {
  return (
    <RouteShell
      title="Financial Reports"
      description="Measure collection efficiency and outstanding fee liabilities."
      primaryActionLabel="Fee Reports"
      primaryActionHref="/fees/reports"
      secondaryActionLabel="Back to Reports"
      secondaryActionHref="/reports"
      rows={createPlaceholderRows("reports-financial")}
    />
  );
}
