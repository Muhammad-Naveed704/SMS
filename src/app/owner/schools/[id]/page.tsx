import { SchoolDetailPage } from "@/features/owner/schools/SchoolDetailPage";

export const metadata = { title: "School Details" };

export default async function OwnerSchoolDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SchoolDetailPage schoolId={id} />;
}
