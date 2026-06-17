import { ClassDetailPage } from "@/features/teacher/classes/ClassDetailPage";

export const metadata = { title: "Class Detail" };

export default async function TeacherClassDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClassDetailPage classId={id} />;
}
