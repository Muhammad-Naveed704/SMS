import { RegisterForm } from "@/components/forms/RegisterForm";
import { APP_NAME } from "@/lib/constants";

export const metadata = {
  title: "Create Account",
  description: `Register your school on ${APP_NAME}`,
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex">
        <div>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/20 text-lg font-bold">
            S
          </div>
          <h2 className="mt-8 text-3xl font-semibold">
            Start your school journey
          </h2>
          <p className="mt-3 max-w-md text-primary-foreground/80">
            Onboard your institution in minutes. Manage students, staff,
            attendance, and finances from one unified dashboard.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/60">{APP_NAME}</p>
      </div>
      <div className="flex flex-1 items-center justify-center p-6">
        <RegisterForm />
      </div>
    </div>
  );
}
