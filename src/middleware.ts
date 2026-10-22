import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const role = (req.auth?.user as any)?.role;

  // Protected routes
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isDriverRoute = nextUrl.pathname.startsWith("/driver");
  const isOwnerRoute = nextUrl.pathname.startsWith("/owner");
  const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");

  if (isAdminRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (isDriverRoute && role !== "driver" && role !== "admin") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (isOwnerRoute && role !== "owner" && role !== "admin") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
