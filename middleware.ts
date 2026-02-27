import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js Middleware for Route Protection
 *
 * This middleware runs before every page request to check authentication
 * and redirect users appropriately based on their login status.
 */

// ============================================
// ROUTE DEFINITIONS
// ============================================

/**
 * Protected Routes - Require Authentication
 * Users must be logged in to access these pages
 */
const protectedRoutes = [
  "/checkout",
  "/confirmation",
  "/dashboard",
];

/**
 * Authentication Routes - Redirect if Already Logged In
 * Logged-in users will be redirected away from these pages
 * NOTE: Removed /login and /signup to allow authenticated users to access these pages
 */
const authRoutes: string[] = [];

/**
 * Public Routes - Always Accessible
 * These routes don't require any authentication checks
 */
const publicRoutes = ["/", "/ar-aboutUs", "/ar-contactUs"];

// ============================================
// MIDDLEWARE FUNCTION
// ============================================

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ============================================
  // MAINTENANCE MODE CHECK
  // ============================================

  /**
   * Check if maintenance mode is enabled
   * This runs BEFORE all other checks to ensure complete site lockdown
   */
  const maintenanceMode = process.env.MAINTENANCE_MODE === "true";

  if (maintenanceMode) {
    // Allow access to the maintenance page itself to prevent redirect loops
    if (pathname === "/maintenance") {
      return NextResponse.next();
    }

    // Get client IP address for whitelisting
    const clientIP =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "";

    // Check if IP is whitelisted (optional feature)
    const whitelistedIPs =
      process.env.MAINTENANCE_WHITELIST_IPS?.split(",").map((ip) =>
        ip.trim()
      ) || [];
    const isWhitelisted =
      whitelistedIPs.length > 0 && whitelistedIPs.includes(clientIP);

    // Redirect to maintenance page unless IP is whitelisted
    if (!isWhitelisted) {
      return NextResponse.redirect(new URL("/maintenance", request.url));
    }
  }

  // ============================================
  // REGULAR AUTHENTICATION CHECKS
  // ============================================

  // Get authentication token from cookies
  const token = request.cookies.get("token")?.value;

  // 🔍 DEBUG: Log middleware checks
  console.log('[MIDDLEWARE] Path:', pathname);
  console.log('[MIDDLEWARE] token cookie:', token ? 'FOUND' : 'NOT FOUND');
  console.log('[MIDDLEWARE] All cookies:', request.cookies.getAll().map(c => c.name).join(', '));
  console.log('[MIDDLEWARE] Search params:', request.nextUrl.searchParams.toString());
  console.log('[MIDDLEWARE] Full URL:', request.url);

  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if current route is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Check if current route is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route)
  );

  // ============================================
  // ROUTE PROTECTION LOGIC
  // ============================================

  /**
   * Scenario 1: User trying to access protected route without authentication
   * Action: Redirect to login page
   * 
   * EXCEPTION: Allow /confirmation with tap_id parameter (payment callback)
   * This allows users returning from payment gateway to access the confirmation page
   */
  if (isProtectedRoute && !token) {
    // Allow /confirmation with tap_id parameter (payment gateway callback)
    const hasTapId = request.nextUrl.searchParams.has('tap_id');
    console.log('[MIDDLEWARE] 🚨 Protected route WITHOUT token!');
    console.log('[MIDDLEWARE] pathname:', pathname);
    console.log('[MIDDLEWARE] has tap_id:', hasTapId);
    console.log('[MIDDLEWARE] tap_id value:', request.nextUrl.searchParams.get('tap_id'));

    if (pathname === '/confirmation' && hasTapId) {
      console.log('[MIDDLEWARE] ✅ Allowing /confirmation with tap_id');
      return NextResponse.next();
    }

    console.log('[MIDDLEWARE] ❌ Redirecting to /login');
    const loginUrl = new URL("/login", request.url);
    // Add redirect parameter to send user back after login
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  /**
   * Scenario 2: Logged-in user trying to access auth pages (login/signup)
   * Action: Redirect to home page
   */
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  /**
   * Scenario 3: All other routes
   * Action: Allow access
   */
  return NextResponse.next();
}

// ============================================
// MIDDLEWARE CONFIGURATION
// ============================================

/**
 * Configure which routes the middleware should run on
 * Excludes API routes, static files, and Next.js internal files
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|image|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp).*)",
  ],
};
