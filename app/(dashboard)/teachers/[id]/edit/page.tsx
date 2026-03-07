import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Edit Teacher",
  "Update teacher profile, employment data, and instructional assignments."
);

export default async function EditTeacherPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <RouteShell
      title={`Edit Teacher ${id}`}
      description="Update faculty account details and classroom responsibilities."
      primaryActionLabel="Save Changes"
      primaryActionHref={`/teachers/${id}`}
      secondaryActionLabel="Cancel"
      secondaryActionHref={`/teachers/${id}`}
      rows={createPlaceholderRows(`teacher-edit-${id}`)}
    />
  );
}
