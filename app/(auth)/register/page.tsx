import { LocalAuthForm } from "@/app/components/auth/local-auth-form";
import { buildPageMetadata } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Register",
  "Create a new account for school staff, guardians, or students."
);

export default function RegisterPage() {
  return <LocalAuthForm mode="register" />;
}
