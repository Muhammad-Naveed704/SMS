import { StudentProfilePage } from "@/features/school/students/StudentProfilePage";

export const metadata = { title: "Student Profile" };

export default async function SchoolStudentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <StudentProfilePage studentId={id} />;
}
