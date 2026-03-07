import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Student Assignments",
  "Track assignment submissions and deadlines from the student perspective."
);

export default function StudentAssignmentsPage() {
  return (
    <RouteShell
      title="Student Assignments"
      description="Review pending and submitted assignments with due date visibility."
      primaryActionLabel="View Homework"
      primaryActionHref="/academics/homework"
      secondaryActionLabel="Back to Portal"
      secondaryActionHref="/student-portal"
      rows={createPlaceholderRows("student-assignment")}
    />
  );
}
