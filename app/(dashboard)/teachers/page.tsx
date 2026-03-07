import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Teachers",
  "Manage teacher profiles, assignments, and employment records."
);

export default function TeachersPage() {
  return (
    <RouteShell
      title="Teachers"
      description="Track teacher information, sections, and classroom responsibilities."
      primaryActionLabel="Add Teacher"
      primaryActionHref="/teachers/new"
      secondaryActionLabel="Teacher Reports"
      secondaryActionHref="/teachers/reports"
      rows={createPlaceholderRows("teacher")}
    />
  );
}
