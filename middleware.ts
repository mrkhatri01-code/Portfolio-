import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Check if the path is for the admin page (but not the login page)
  if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
    // Check if the user is authenticated via cookies
    const adminAuthenticated = request.cookies.get("adminAuthenticated")?.value === "true"

    // If not authenticated, redirect to the login page
    if (!adminAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

// Only run middleware on admin routes
export const config = {
  matcher: "/admin/:path*",
}

