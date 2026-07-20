import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminToken = request.cookies.get("admin_token")?.value;

  // Protect /admin and all sub-routes
  if (pathname.startsWith("/admin")) {
    if (!adminToken) {
      const loginUrl = new URL("/login", request.url);
      const response = NextResponse.redirect(loginUrl);
      response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
      return response;
    }

    const payload = await verifyAdminToken(adminToken);
    if (!payload) {
      const loginUrl = new URL("/login", request.url);
      const response = NextResponse.redirect(loginUrl);
      // Clear invalid token cookie
      response.cookies.delete("admin_token");
      response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
      return response;
    }

    // Token is valid - ensure protected route is not cached by browsers or CDNs
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
    return response;
  }

  // If user is already logged in and tries to access /login, redirect to /admin
  if (pathname === "/login" && adminToken) {
    const payload = await verifyAdminToken(adminToken);
    if (payload) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
