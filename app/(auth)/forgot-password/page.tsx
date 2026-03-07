import { AuthShell, buildPageMetadata } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Forgot Password",
  "Request a password reset link for your School Management account."
);

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset Password"
      description="Enter your registered email to receive a secure reset link."
      ctaLabel="Send Reset Link"
      alternateLabel="Remembered your password?"
      alternateHref="/login"
      fields={[
        {
          name: "email",
          label: "Registered Email",
          type: "email",
          placeholder: "you@school.edu",
          autoComplete: "email",
        },
      ]}
    />
  );
}
