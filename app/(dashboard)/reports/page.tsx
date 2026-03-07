import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Reports",
  "Access institution-wide analytical and operational reports."
);

export default function ReportsPage() {
  return (
    <RouteShell
      title="Reports"
      description="Review attendance, academics, and finance reports from one place."
      primaryActionLabel="Attendance Reports"
      primaryActionHref="/reports/attendance"
      secondaryActionLabel="Financial Reports"
      secondaryActionHref="/reports/financial"
      rows={createPlaceholderRows("report")}
    />
  );
}
