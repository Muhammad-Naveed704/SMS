import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Homework",
  "Track homework posting, submissions, and student completion."
);

export default function HomeworkPage() {
  return (
    <RouteShell
      title="Homework"
      description="Plan and monitor daily homework tasks across classes and sections."
      primaryActionLabel="Post Homework"
      primaryActionHref="/academics/assignments"
      secondaryActionLabel="Student Portal"
      secondaryActionHref="/student-portal/assignments"
      rows={createPlaceholderRows("homework")}
    />
  );
}
