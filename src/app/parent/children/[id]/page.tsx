import { ChildProfilePage } from "@/features/parent/children/ChildProfilePage";

export const metadata = { title: "Child Profile" };

export default async function ParentChildProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ChildProfilePage childId={id} />;
}
