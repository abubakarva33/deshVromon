import { NextResponse } from "next/server";


export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Routes that require authentication
  const protectedRoutes = ["/become-seller", "/seller-dashboard", "/admin"];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute) {
    // Authentication check removed - using localStorage on client side
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
