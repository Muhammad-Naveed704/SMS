import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Attendance History",
  "Browse historical attendance entries and updates."
);

export default function AttendanceHistoryPage() {
  return (
    <RouteShell
      title="Attendance History"
      description="Audit past attendance records with date and section-level filters."
      primaryActionLabel="Back to Attendance"
      primaryActionHref="/attendance"
      secondaryActionLabel="Attendance Reports"
      secondaryActionHref="/attendance/report"
      rows={createPlaceholderRows("attendance-history")}
    />
  );
}
