import { PanelLayout } from "@/components/layout/PanelLayout";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PanelLayout>{children}</PanelLayout>;
}
