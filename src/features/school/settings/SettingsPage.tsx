"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Tabs } from "@/components/ui/Tabs";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useSchoolSettings, useUpdateSchoolSettings } from "@/features/school/hooks/useSchoolQueries";
import { useToast } from "@/components/ui/Toast";

const schema = z.object({
  schoolName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  address: z.string().min(3),
  city: z.string().min(2),
  country: z.string().min(2),
  academicYear: z.string().min(4),
  timezone: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

const TABS = [
  { id: "profile", label: "School Profile" },
  { id: "academic", label: "Academic Year" },
  { id: "users", label: "Users & Roles" },
  { id: "permissions", label: "Permissions" },
  { id: "notifications", label: "Notifications" },
];

const PERMISSIONS = [
  { role: "Teacher", permissions: ["View students", "Mark attendance", "Enter grades", "View timetable"] },
  { role: "Parent", permissions: ["View child profile", "View attendance", "View fees", "View results"] },
];

export function SettingsPage() {
  const [tab, setTab] = useState("profile");
  const toast = useToast();
  const { data, isLoading, isError, refetch } = useSchoolSettings();
  const updateSettings = useUpdateSchoolSettings();

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: data ?? undefined,
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await updateSettings.mutateAsync(values);
      toast.success("Settings saved");
    } catch {
      toast.error("Save failed");
    }
  };

  if (isLoading) return <PageSkeleton />;
  if (isError || !data) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "School", href: "/school/dashboard" }, { label: "Settings" }]} />
      <PageHeader title="School Settings" description="Configure school profile and permissions"
        action={<Button onClick={handleSubmit(onSubmit)} loading={updateSettings.isPending} disabled={!isDirty}>Save Changes</Button>} />

      <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="pt-6">
            {tab === "profile" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="School Name" error={errors.schoolName?.message} {...register("schoolName")} />
                <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
                <Input label="Phone" error={errors.phone?.message} {...register("phone")} />
                <Input label="City" error={errors.city?.message} {...register("city")} />
                <Input label="Country" error={errors.country?.message} {...register("country")} />
                <Input label="Address" className="sm:col-span-2" error={errors.address?.message} {...register("address")} />
              </div>
            )}
            {tab === "academic" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Academic Year" placeholder="2025-2026" error={errors.academicYear?.message} {...register("academicYear")} />
                <Select label="Timezone" options={[
                  { label: "America/New_York", value: "America/New_York" },
                  { label: "Asia/Karachi", value: "Asia/Karachi" },
                  { label: "Europe/London", value: "Europe/London" },
                ]} error={errors.timezone?.message} {...register("timezone")} />
              </div>
            )}
            {tab === "users" && (
              <p className="text-sm text-muted-foreground">Manage school users from the Users section in the main navigation. School admins can invite teachers and staff.</p>
            )}
            {tab === "permissions" && (
              <div className="space-y-4">
                {PERMISSIONS.map((p) => (
                  <div key={p.role} className="rounded-lg border border-border p-4">
                    <h4 className="font-medium">{p.role}</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.permissions.map((perm) => (
                        <label key={perm} className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs">
                          <input type="checkbox" defaultChecked className="rounded" /> {perm}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === "notifications" && (
              <div className="space-y-3">
                {["Fee reminders to parents", "Attendance alerts", "Exam schedule notifications", "New admission alerts"].map((item) => (
                  <label key={item} className="flex items-center justify-between rounded-lg border border-border p-4">
                    <span className="text-sm">{item}</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </label>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
