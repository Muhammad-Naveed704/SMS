"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { useStudentProfile, useUpdateStudentProfile, useStudentDocuments } from "@/features/student/hooks/useStudentQueries";
import { useToast } from "@/components/ui/Toast";
import { formatDate } from "@/lib/format";
import { getInitials } from "@/lib/utils";
import type { StudentDocument } from "@/types/student-panel.types";
import type { Column } from "@/components/ui/Table";
import { Download, Eye } from "lucide-react";

const schema = z.object({
  phone: z.string().min(5).optional().or(z.literal("")),
  address: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function ProfilePage() {
  const [tab, setTab] = useState("personal");
  const toast = useToast();
  const { data: profile, isLoading, isError, refetch } = useStudentProfile();
  const { data: documents = [] } = useStudentDocuments();
  const updateProfile = useUpdateStudentProfile();

  const { register, handleSubmit, formState: { isDirty } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: profile ? { phone: profile.phone ?? "", address: profile.address ?? "" } : undefined,
  });

  const docColumns: Column<StudentDocument>[] = [
    { key: "name", header: "Document", sortable: true },
    { key: "type", header: "Type", render: (r) => <Badge className="capitalize">{r.type}</Badge> },
    { key: "uploadedAt", header: "Date", render: (r) => formatDate(r.uploadedAt) },
    {
      key: "actions", header: "",
      render: (r) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => toast.info("Preview", r.name)}><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="sm" onClick={() => toast.success("Download", r.name)}><Download className="h-4 w-4" /></Button>
        </div>
      ),
    },
  ];

  if (isLoading) return <PageSkeleton />;
  if (isError || !profile) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Student", href: "/student/dashboard" }, { label: "Profile" }]} />
      <PageHeader title="My Profile" description="Your personal and academic information"
        action={<Button onClick={handleSubmit(async (v) => { await updateProfile.mutateAsync(v); toast.success("Profile updated"); })} loading={updateProfile.isPending} disabled={!isDirty}>Save</Button>} />

      <Card>
        <CardContent className="flex items-center gap-4 pt-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
            {getInitials(`${profile.firstName} ${profile.lastName}`)}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{profile.firstName} {profile.lastName}</h2>
            <p className="text-muted-foreground">{profile.className} — Section {profile.section}</p>
            <p className="text-sm text-muted-foreground">Roll No: {profile.rollNumber}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs tabs={[
        { id: "personal", label: "Personal Info" },
        { id: "academic", label: "Academic Info" },
        { id: "documents", label: "Documents", count: documents.length },
        { id: "security", label: "Security" },
      ]} activeTab={tab} onChange={setTab} />

      <Card>
        <CardContent className="pt-6">
          {tab === "personal" && (
            <form className="grid gap-4 sm:grid-cols-2">
              <Input label="Name" value={`${profile.firstName} ${profile.lastName}`} disabled />
              <Input label="Date of Birth" value={formatDate(profile.dateOfBirth)} disabled />
              <Input label="Gender" value={profile.gender} disabled className="capitalize" />
              <Input label="Email" value={profile.email} disabled />
              <Input label="Phone" {...register("phone")} />
              <Input label="Address" className="sm:col-span-2" {...register("address")} />
            </form>
          )}
          {tab === "academic" && (
            <dl className="grid gap-4 sm:grid-cols-2">
              {[
                ["School", profile.schoolName],
                ["Class", `${profile.className} — ${profile.section}`],
                ["Roll Number", profile.rollNumber],
                ["Class Teacher", profile.classTeacher],
                ["Admission Date", formatDate(profile.admissionDate)],
              ].map(([label, value]) => (
                <div key={label}><dt className="text-sm text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div>
              ))}
            </dl>
          )}
          {tab === "documents" && <DataTable columns={docColumns} data={documents} keyExtractor={(d) => d.id} />}
          {tab === "security" && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <p className="font-medium">Change Password</p>
                <p className="mt-1 text-sm text-muted-foreground">Keep your account secure with a strong password.</p>
                <Button className="mt-3" variant="outline" onClick={() => toast.info("Password", "Password change coming soon")}>Change Password</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
