"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHeader } from "@/components/shared/PageHeader";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { useParentProfile, useUpdateParentProfile } from "@/features/parent/hooks/useParentQueries";
import { useToast } from "@/components/ui/Toast";
import { getInitials } from "@/lib/utils";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().min(5),
  address: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function ProfilePage() {
  const [tab, setTab] = useState("personal");
  const toast = useToast();
  const { data: profile, isLoading, isError, refetch } = useParentProfile();
  const updateProfile = useUpdateParentProfile();

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: profile ? {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
      address: profile.address ?? "",
    } : undefined,
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await updateProfile.mutateAsync(values);
      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    }
  };

  if (isLoading) return <PageSkeleton />;
  if (isError || !profile) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Parent", href: "/parent/dashboard" }, { label: "Profile" }]} />
      <PageHeader title="Profile Settings" description="Manage your account information"
        action={<Button onClick={handleSubmit(onSubmit)} loading={updateProfile.isPending} disabled={!isDirty}>Save Changes</Button>} />

      <Card>
        <CardContent className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
            {getInitials(`${profile.firstName} ${profile.lastName}`)}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{profile.firstName} {profile.lastName}</h2>
            <p className="text-muted-foreground">{profile.email}</p>
            <p className="text-sm text-muted-foreground">{profile.phone}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs tabs={[
        { id: "personal", label: "Personal Information" },
        { id: "children", label: "Children", count: profile.children.length },
        { id: "security", label: "Security" },
      ]} activeTab={tab} onChange={setTab} />

      <Card>
        <CardContent className="pt-6">
          {tab === "personal" && (
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
              <Input label="First Name" error={errors.firstName?.message} {...register("firstName")} />
              <Input label="Last Name" error={errors.lastName?.message} {...register("lastName")} />
              <Input label="Email" value={profile.email} disabled className="sm:col-span-2" />
              <Input label="Phone" error={errors.phone?.message} {...register("phone")} />
              <Input label="Address" className="sm:col-span-2" error={errors.address?.message} {...register("address")} />
            </form>
          )}
          {tab === "children" && (
            <div className="space-y-3">
              {profile.children.map((child) => (
                <div key={child.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium">{child.firstName} {child.lastName}</p>
                    <p className="text-sm text-muted-foreground">{child.className} — Section {child.section}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{child.schoolName}</p>
                </div>
              ))}
            </div>
          )}
          {tab === "security" && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <p className="font-medium">Change Password</p>
                <p className="mt-1 text-sm text-muted-foreground">Update your password to keep your account secure.</p>
                <Button className="mt-3" variant="outline" onClick={() => toast.info("Password", "Password change flow coming soon")}>
                  Change Password
                </Button>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="mt-1 text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                <Button className="mt-3" variant="outline" onClick={() => toast.info("2FA", "Two-factor setup coming soon")}>
                  Enable 2FA
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
