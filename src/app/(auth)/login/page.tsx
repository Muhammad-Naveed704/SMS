import { LoginForm } from "@/components/forms/LoginForm";
import { APP_NAME } from "@/lib/constants";

export const metadata = {
  title: "Sign In",
  description: `Sign in to ${APP_NAME}`,
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex">
        <div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/20 text-lg font-bold">
            S
          </div>
          <h2 className="mt-8 text-3xl font-semibold">{APP_NAME}</h2>
          <p className="mt-3 max-w-md text-primary-foreground/80">
            The complete platform for managing schools, students, teachers,
            attendance, and fees across your organization.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/60">
          Trusted by schools worldwide
        </p>
      </div>
      <div className="flex flex-1 items-center justify-center p-6">
        <LoginForm />
      </div>
    </div>
  );
}
