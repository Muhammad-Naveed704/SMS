import { LocalAuthForm } from "@/app/components/auth/local-auth-form";
import { buildPageMetadata } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Login",
  "Sign in to access the School Management System dashboard."
);

export default function LoginPage() {
  return <LocalAuthForm mode="login" />;
}
