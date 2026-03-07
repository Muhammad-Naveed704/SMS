import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Exams",
  "Manage exam schedules, invigilation plans, and evaluation windows."
);

export default function ExamsPage() {
  return (
    <RouteShell
      title="Exams"
      description="Coordinate exam plans and monitor execution readiness by class."
      primaryActionLabel="Gradebook"
      primaryActionHref="/academics/exams/grades"
      secondaryActionLabel="Assignments"
      secondaryActionHref="/academics/assignments"
      rows={createPlaceholderRows("exam")}
    />
  );
}
