import { AuthShell, buildPageMetadata } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Reset Password",
  "Set a new password to recover your School Management account."
);

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return (
    <div className="space-y-4">
      <AuthShell
        title="Set a New Password"
        description="Use the fields below to complete your secure password reset."
        ctaLabel="Update Password"
        alternateLabel="Back to sign in?"
        alternateHref="/login"
        fields={[
          {
            name: "newPassword",
            label: "New Password",
            type: "password",
            placeholder: "Enter new password",
            autoComplete: "new-password",
          },
          {
            name: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            placeholder: "Re-enter new password",
            autoComplete: "new-password",
          },
        ]}
      />
      <p className="text-center text-xs text-muted-foreground">
        Reset token: <span className="font-mono">{token}</span>
      </p>
    </div>
  );
}
