import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Teacher Profile",
  "View teacher details, assigned classes, and performance indicators."
);

export default async function TeacherProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <RouteShell
      title={`Teacher ${id}`}
      description="Review faculty profile and timetable distribution."
      primaryActionLabel="Edit Teacher"
      primaryActionHref={`/teachers/${id}/edit`}
      secondaryActionLabel="All Teachers"
      secondaryActionHref="/teachers"
      rows={createPlaceholderRows(`teacher-${id}`)}
    />
  );
}
