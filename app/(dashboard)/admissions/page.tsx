import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Admissions",
  "Manage incoming student applications and admission workflows."
);

export default function AdmissionsPage() {
  return (
    <RouteShell
      title="Admissions"
      description="Review applications, interview stages, and enrollment confirmations."
      primaryActionLabel="New Admission"
      primaryActionHref="/admissions/new"
      secondaryActionLabel="Students"
      secondaryActionHref="/students"
      rows={createPlaceholderRows("admission")}
    />
  );
}
