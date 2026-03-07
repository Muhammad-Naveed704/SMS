import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Edit Student",
  "Update student profile, guardian details, and enrollment data."
);

export default async function EditStudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <RouteShell
      title={`Edit Student ${id}`}
      description="Modify student profile information and save institutional records."
      primaryActionLabel="Save Changes"
      primaryActionHref={`/students/${id}`}
      secondaryActionLabel="Cancel"
      secondaryActionHref={`/students/${id}`}
      rows={createPlaceholderRows(`student-edit-${id}`)}
    />
  );
}
