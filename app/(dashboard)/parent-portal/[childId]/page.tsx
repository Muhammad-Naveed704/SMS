import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Child Dashboard",
  "View child-specific performance, attendance, and fee status."
);

export default async function ParentChildPage({
  params,
}: {
  params: Promise<{ childId: string }>;
}) {
  const { childId } = await params;

  return (
    <RouteShell
      title={`Child ${childId}`}
      description="Track child academics, attendance consistency, and notices."
      primaryActionLabel="Attendance"
      primaryActionHref="/attendance/report"
      secondaryActionLabel="Back to Parent Portal"
      secondaryActionHref="/parent-portal"
      rows={createPlaceholderRows(`child-${childId}`)}
    />
  );
}
