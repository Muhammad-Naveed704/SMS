import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Exam Detail",
  "View exam session details, participating classes, and completion status."
);

export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <RouteShell
      title={`Exam ${id}`}
      description="Inspect exam structure, schedule, and assessment checkpoints."
      primaryActionLabel="View Grades"
      primaryActionHref="/academics/exams/grades"
      secondaryActionLabel="All Exams"
      secondaryActionHref="/academics/exams"
      rows={createPlaceholderRows(`exam-${id}`)}
    />
  );
}
