import { NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/income",
  "/expenses",
  "/accounts",
];

const authRoutes = [
  "/login",
  "/register",
];

export function proxy(request) {
  const pathname = request.nextUrl.pathname;

  const sessionCookie = request.cookies.get(
    "expense_tracker_auth",
  );

  const hasSession = Boolean(sessionCookie?.value);

  const isProtectedRoute = protectedRoutes.some(
    function (route) {
      return (
        pathname === route ||
        pathname.startsWith(route + "/")
      );
    },
  );

  const isAuthRoute = authRoutes.some(
    function (route) {
      return (
        pathname === route ||
        pathname.startsWith(route + "/")
      );
    },
  );

  if (isProtectedRoute && !hasSession) {
    const loginUrl = new URL(
      "/login",
      request.url,
    );

    loginUrl.searchParams.set(
      "callbackUrl",
      pathname,
    );

    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/income/:path*",
    "/expenses/:path*",
    "/accounts/:path*",
    "/login",
    "/register",
  ],
};