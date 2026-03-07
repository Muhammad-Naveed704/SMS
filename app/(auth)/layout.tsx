import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | School Management System",
  description: "Secure access for school administrators, staff, parents, and students.",
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-muted/20 px-4 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl items-center justify-center">
        {children}
      </div>
    </div>
  );
}
