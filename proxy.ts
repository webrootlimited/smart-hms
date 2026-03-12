import { NextRequest, NextResponse } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface HmsJwtPayload extends JwtPayload {
  userId: string;
  role: string;
  email: string;
  profileSlug?: string;
}

function getRoleRoute(role: string, profileSlug?: string): string {
  if (role === "ADMIN" || role === "CLINIC_ADMIN") return "/admin/dashboard";
  if (role === "DOCTOR") return `/doctor/${profileSlug || "me"}/dashboard`;
  if (role === "PATIENT") return `/patient/${profileSlug || "me"}/dashboard`;
  return "/login";
}

const PROTECTED_PREFIXES = ["/admin", "/doctor", "/patient"];
const PUBLIC_ROUTES = ["/login", "/signup"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
  const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

  // No token + protected route → redirect to login
  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Has token → decode and check role
  if (token) {
    try {
      const decoded = jwtDecode<HmsJwtPayload>(token);

      // Check if token is expired
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        const response = NextResponse.redirect(
          new URL("/login", request.url)
        );
        response.cookies.set("accessToken", "", {
          path: "/",
          expires: new Date(0),
        });
        return response;
      }

      const role = decoded.role;

      const profileSlug = decoded.profileSlug;

      // Logged in user on login/signup → redirect to their dashboard
      if (isPublic || pathname === "/") {
        return NextResponse.redirect(new URL(getRoleRoute(role, profileSlug), request.url));
      }

      // Role-based access check
      if (pathname.startsWith("/admin") && role !== "ADMIN" && role !== "CLINIC_ADMIN") {
        return NextResponse.redirect(
          new URL(getRoleRoute(role, profileSlug), request.url)
        );
      }
      if (pathname.startsWith("/doctor") && role !== "DOCTOR") {
        return NextResponse.redirect(
          new URL(getRoleRoute(role, profileSlug), request.url)
        );
      }
      if (pathname.startsWith("/patient") && role !== "PATIENT") {
        return NextResponse.redirect(
          new URL(getRoleRoute(role, profileSlug), request.url)
        );
      }
    } catch {
      // Invalid token → clear and redirect to login
      if (isProtected) {
        const response = NextResponse.redirect(
          new URL("/login", request.url)
        );
        response.cookies.set("accessToken", "", {
          path: "/",
          expires: new Date(0),
        });
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|auth|images|icons).*)",
  ],
};
