import { SubjectDetailPage } from "@/features/student/classes/SubjectDetailPage";

export const metadata = { title: "Subject" };

export default async function StudentSubjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SubjectDetailPage subjectId={id} />;
}
