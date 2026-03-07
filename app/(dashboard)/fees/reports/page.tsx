import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Fee Reports",
  "Analyze fee collection efficiency and outstanding dues."
);

export default function FeeReportsPage() {
  return (
    <RouteShell
      title="Fee Reports"
      description="Access financial fee metrics, trends, and reconciliation snapshots."
      primaryActionLabel="Financial Reports"
      primaryActionHref="/reports/financial"
      secondaryActionLabel="Fee Home"
      secondaryActionHref="/fees"
      rows={createPlaceholderRows("fee-report")}
    />
  );
}
