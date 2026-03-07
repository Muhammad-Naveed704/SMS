import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "School Profile Settings",
  "Manage school identity, branding, and institution-level profile details."
);

export default function SchoolProfileSettingsPage() {
  return (
    <RouteShell
      title="School Profile Settings"
      description="Update institution branding, contact information, and profile settings."
      primaryActionLabel="Save Profile"
      primaryActionHref="/settings"
      secondaryActionLabel="Back to Settings"
      secondaryActionHref="/settings"
      rows={createPlaceholderRows("settings-school-profile")}
    />
  );
}
