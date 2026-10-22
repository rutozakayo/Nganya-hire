import { auth } from "@/auth";
import { redirect } from "next/navigation";

/**
 * Landing point after a successful credential sign-in.
 * Sends each role to the surface that actually belongs to it, so an
 * administrator never lands on the empty customer dashboard.
 */
export default async function PostLoginPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  const role = (session.user as { role?: string }).role;

  switch (role) {
    case "admin":
      redirect("/admin");
    case "driver":
      redirect("/driver");
    case "owner":
      redirect("/owner");
    default:
      redirect("/dashboard");
  }
}
