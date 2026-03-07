import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "User Settings",
  "Configure user roles, permissions, and account-level access control."
);

export default function UserSettingsPage() {
  return (
    <RouteShell
      title="User Settings"
      description="Manage access rights and account policies for school stakeholders."
      primaryActionLabel="Manage Teachers"
      primaryActionHref="/teachers"
      secondaryActionLabel="Back to Settings"
      secondaryActionHref="/settings"
      rows={createPlaceholderRows("settings-users")}
    />
  );
}
