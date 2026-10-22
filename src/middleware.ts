import { auth } from "@/auth";
import { NextResponse } from "next/server";

/** Public pages that live under a role prefix but must stay reachable while signed out. */
const PUBLIC_ROLE_PATHS = ["/driver/register", "/owner/register"];

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const role = (req.auth?.user as { role?: string } | undefined)?.role;
  const path = nextUrl.pathname;

  if (PUBLIC_ROLE_PATHS.some((p) => path === p || path.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  const isAdminRoute = path.startsWith("/admin");
  const isDriverRoute = path.startsWith("/driver");
  const isOwnerRoute = path.startsWith("/owner");
  const needsCustomerSession =
    path.startsWith("/dashboard") || path.startsWith("/post-login");

  if (isAdminRoute && role !== "admin") {
    return NextResponse.redirect(new URL(isLoggedIn ? "/post-login" : "/login", nextUrl));
  }

  if (isDriverRoute && role !== "driver" && role !== "admin") {
    return NextResponse.redirect(new URL(isLoggedIn ? "/post-login" : "/login", nextUrl));
  }

  if (isOwnerRoute && role !== "owner" && role !== "admin") {
    return NextResponse.redirect(new URL(isLoggedIn ? "/post-login" : "/login", nextUrl));
  }

  if (needsCustomerSession && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icons|manifest.json|sw.js|offline.html).*)"],
};
