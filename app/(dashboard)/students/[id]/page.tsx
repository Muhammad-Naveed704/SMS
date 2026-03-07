import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Student Profile",
  "View detailed information, attendance, and academic records for a student."
);

export default async function StudentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <RouteShell
      title={`Student ${id}`}
      description="Review student profile, class allocation, and performance highlights."
      primaryActionLabel="Edit Student"
      primaryActionHref={`/students/${id}/edit`}
      secondaryActionLabel="All Students"
      secondaryActionHref="/students"
      rows={createPlaceholderRows(`student-${id}`)}
    />
  );
}
