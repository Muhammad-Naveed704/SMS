import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Admission Detail",
  "View individual admission application details and status."
);

export default async function AdmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <RouteShell
      title={`Admission ${id}`}
      description="Track applicant progress through verification and acceptance stages."
      primaryActionLabel="Approve Admission"
      primaryActionHref="/students/new"
      secondaryActionLabel="All Admissions"
      secondaryActionHref="/admissions"
      rows={createPlaceholderRows(`admission-${id}`)}
    />
  );
}
