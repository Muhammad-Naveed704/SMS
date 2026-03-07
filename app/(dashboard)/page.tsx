import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROLE_HOME_ROUTE, getRoleFromCookieValue } from "@/lib/roles";

export const metadata = {
  title: "Dashboard Entry | School Management System",
  description: "Resolves the best landing section based on the current user role.",
};

export default async function DashboardEntryPage() {
  const cookieStore = await cookies();
  const role = getRoleFromCookieValue(cookieStore.get("sms_role")?.value) ?? "admin";

  redirect(ROLE_HOME_ROUTE[role]);
}
