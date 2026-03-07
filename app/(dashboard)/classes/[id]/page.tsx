import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Class Detail",
  "View class strength, timetable, and assigned subject instructors."
);

export default async function ClassDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <RouteShell
      title={`Class ${id}`}
      description="Review class roster, homeroom teacher, and schedule overview."
      primaryActionLabel="Manage Timetable"
      primaryActionHref="/timetable"
      secondaryActionLabel="Back to Classes"
      secondaryActionHref="/classes"
      rows={createPlaceholderRows(`class-${id}`)}
    />
  );
}
