import { redirect } from "next/navigation";
import { buildPageMetadata } from "@/app/components/route-shell";

export const metadata = buildPageMetadata(
  "Home",
  "Redirects to the school dashboard entry route."
);

export default function Home() {
  redirect("/dashboard");
}
