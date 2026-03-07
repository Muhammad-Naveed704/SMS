import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Settings",
  "Configure school-wide preferences, access control, and integrations."
);

export default function SettingsPage() {
  return (
    <RouteShell
      title="Settings"
      description="Manage school profile, user access, billing, and integrations."
      primaryActionLabel="School Profile"
      primaryActionHref="/settings/school-profile"
      secondaryActionLabel="User Management"
      secondaryActionHref="/settings/users"
      rows={createPlaceholderRows("settings")}
    />
  );
}
