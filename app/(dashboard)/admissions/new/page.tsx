import { RouteShell, buildPageMetadata, createPlaceholderRows } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "New Admission",
  "Start a new admission application and enrollment review."
);

export default function NewAdmissionPage() {
  return (
    <RouteShell
      title="New Admission"
      description="Capture applicant profile, documents, and guardian contact details."
      primaryActionLabel="Submit Application"
      primaryActionHref="/admissions"
      secondaryActionLabel="Back to Admissions"
      secondaryActionHref="/admissions"
      rows={createPlaceholderRows("new-admission")}
    />
  );
}
