"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHeader } from "@/components/shared/PageHeader";
import { ErrorState } from "@/components/shared/ErrorState";
import { PageSkeleton } from "@/components/shared/PageSkeleton";
import { Tabs } from "@/components/ui/Tabs";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useOwnerSettings, useUpdateSettings } from "@/features/owner/hooks/useOwnerQueries";
import { useToast } from "@/components/ui/Toast";

const settingsSchema = z.object({
  companyName: z.string().min(2),
  timezone: z.string().min(1),
  supportEmail: z.string().email(),
  emailFrom: z.string().email(),
  smtpHost: z.string().min(1),
  smtpPort: z.string().min(1),
  notifyNewSchool: z.boolean(),
  notifyPayment: z.boolean(),
  twoFactorRequired: z.boolean(),
  sessionTimeout: z.number().min(5).max(120),
});

type SettingsForm = z.infer<typeof settingsSchema>;

const TABS = [
  { id: "general", label: "General" },
  { id: "branding", label: "Branding" },
  { id: "email", label: "Email" },
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
];

export function SettingsPage() {
  const [tab, setTab] = useState("general");
  const toast = useToast();
  const { data, isLoading, isError, refetch } = useOwnerSettings();
  const updateSettings = useUpdateSettings();

  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    values: data ?? undefined,
  });

  const onSubmit = async (values: SettingsForm) => {
    try {
      await updateSettings.mutateAsync(values);
      toast.success("Settings saved", "Your changes have been applied.");
      reset(values);
    } catch {
      toast.error("Save failed", "Could not update settings.");
    }
  };

  if (isLoading) return <PageSkeleton />;
  if (isError || !data) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Platform configuration and preferences"
        action={
          <Button
            onClick={handleSubmit(onSubmit)}
            loading={updateSettings.isPending}
            disabled={!isDirty}
          >
            Save Changes
          </Button>
        }
      />

      <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="pt-6">
            {tab === "general" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Company Name" error={errors.companyName?.message} {...register("companyName")} />
                <Select
                  label="Timezone"
                  options={[
                    { label: "America/New_York (EST)", value: "America/New_York" },
                    { label: "America/Chicago (CST)", value: "America/Chicago" },
                    { label: "Europe/London (GMT)", value: "Europe/London" },
                    { label: "Asia/Karachi (PKT)", value: "Asia/Karachi" },
                  ]}
                  error={errors.timezone?.message}
                  {...register("timezone")}
                />
                <Input label="Support Email" type="email" className="sm:col-span-2" error={errors.supportEmail?.message} {...register("supportEmail")} />
              </div>
            )}

            {tab === "branding" && (
              <div className="space-y-4">
                <Input label="Company Name" error={errors.companyName?.message} {...register("companyName")} />
                <div className="rounded-lg border border-dashed border-border p-8 text-center">
                  <p className="text-sm text-muted-foreground">Drag & drop logo here, or click to upload</p>
                  <Button type="button" variant="outline" className="mt-4" size="sm">
                    Upload Logo
                  </Button>
                </div>
              </div>
            )}

            {tab === "email" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="From Email" type="email" error={errors.emailFrom?.message} {...register("emailFrom")} />
                <Input label="SMTP Host" error={errors.smtpHost?.message} {...register("smtpHost")} />
                <Input label="SMTP Port" error={errors.smtpPort?.message} {...register("smtpPort")} />
              </div>
            )}

            {tab === "notifications" && (
              <div className="space-y-4">
                {[
                  { key: "notifyNewSchool" as const, label: "New school registration", desc: "Get notified when a new school joins" },
                  { key: "notifyPayment" as const, label: "Payment received", desc: "Get notified on successful payments" },
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4 rounded border-border" {...register(item.key)} />
                  </label>
                ))}
              </div>
            )}

            {tab === "security" && (
              <div className="space-y-4">
                <label className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="text-sm font-medium">Require 2FA for admins</p>
                    <p className="text-xs text-muted-foreground">Enforce two-factor authentication</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4 rounded border-border" {...register("twoFactorRequired")} />
                </label>
                <Input
                  label="Session Timeout (minutes)"
                  type="number"
                  error={errors.sessionTimeout?.message}
                  {...register("sessionTimeout", { valueAsNumber: true })}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
