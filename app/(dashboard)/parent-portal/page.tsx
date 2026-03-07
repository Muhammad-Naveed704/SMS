import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Parent Portal",
  "Provide guardians with student progress, attendance, and fee visibility."
);

export default function ParentPortalPage() {
  return (
    <RouteShell
      title="Parent Portal"
      description="Support parents with real-time student updates and school communication."
      primaryActionLabel="Open Child Record"
      primaryActionHref="/parent-portal/CHILD-001"
      secondaryActionLabel="Messages"
      secondaryActionHref="/communication/messages"
      rows={createPlaceholderRows("parent-portal")}
    />
  );
}
