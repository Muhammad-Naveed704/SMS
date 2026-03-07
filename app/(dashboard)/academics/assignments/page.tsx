import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Assignments",
  "Create and manage assignments for classes and subjects."
);

export default function AssignmentsPage() {
  return (
    <RouteShell
      title="Assignments"
      description="Publish assignment schedules, submission dates, and grading status."
      primaryActionLabel="Create Assignment"
      primaryActionHref="/academics/homework"
      secondaryActionLabel="Exams"
      secondaryActionHref="/academics/exams"
      rows={createPlaceholderRows("assignment")}
    />
  );
}
