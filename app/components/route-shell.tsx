import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { RouteShellClient } from "@/app/components/route-shell-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

export interface PlaceholderMetric {
  label: string;
  value: string;
  hint: string;
}

export interface PlaceholderRecord {
  id: string;
  name: string;
  status: string;
  updatedAt: string;
}

export interface RouteShellProps {
  title: string;
  description: string;
  primaryActionLabel?: string;
  primaryActionHref?: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  metrics?: PlaceholderMetric[];
  rows?: PlaceholderRecord[];
}

export function buildPageMetadata(title: string, description: string): Metadata {
  return {
    title: `${title} | School Management System`,
    description,
  };
}

export function createPlaceholderRows(entity: string): PlaceholderRecord[] {
  return [
    {
      id: `${entity}-001`,
      name: `${entity} Record A`,
      status: "Active",
      updatedAt: "Today",
    },
    {
      id: `${entity}-002`,
      name: `${entity} Record B`,
      status: "Pending",
      updatedAt: "Yesterday",
    },
    {
      id: `${entity}-003`,
      name: `${entity} Record C`,
      status: "Archived",
      updatedAt: "2 days ago",
    },
  ];
}

const DEFAULT_METRICS: PlaceholderMetric[] = [
  { label: "Total", value: "128", hint: "Current active records" },
  { label: "This Week", value: "+14", hint: "Newly added entries" },
  { label: "Completion", value: "92%", hint: "Operational target status" },
];

export function RouteShell({
  title,
  description,
  primaryActionLabel = "Create New",
  primaryActionHref = "#",
  secondaryActionLabel = "Export",
  secondaryActionHref = "#",
  metrics = DEFAULT_METRICS,
  rows = createPlaceholderRows(title),
}: RouteShellProps) {
  return (
    <RouteShellClient
      title={title}
      description={description}
      primaryActionLabel={primaryActionLabel}
      primaryActionHref={primaryActionHref}
      secondaryActionLabel={secondaryActionLabel}
      secondaryActionHref={secondaryActionHref}
      metrics={metrics}
      rows={rows}
    />
  );
}

interface AuthShellProps {
  title: string;
  description: string;
  ctaLabel: string;
  alternateLabel: string;
  alternateHref: string;
  fields?: AuthField[];
}

interface AuthField {
  name: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
}

const DEFAULT_AUTH_FIELDS: AuthField[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@school.edu",
    autoComplete: "email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    autoComplete: "current-password",
    required: true,
  },
];

export function AuthShell({
  title,
  description,
  ctaLabel,
  alternateLabel,
  alternateHref,
  fields = DEFAULT_AUTH_FIELDS,
}: AuthShellProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-4" action="#" method="post">
          {fields.map((field) => (
            <div className="space-y-2" key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type ?? "text"}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                required={field.required ?? true}
              />
            </div>
          ))}
          <Button className="w-full" type="submit">
            {ctaLabel}
          </Button>
        </form>
        <p className="text-sm text-muted-foreground">
          {alternateLabel}{" "}
          <Link href={alternateHref} className="font-medium text-primary underline">
            Continue
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
