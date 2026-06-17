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
const publicRoutes = [
  "/",
  "/ar-aboutUs",
  "/ar-contactUs",
  "/ar-blog",
  "/login",
  "/signup",
  "/packages",
  "/qudurat",
  "/tahsili",
  "/password-reset",
  "/reset-code",
  "/reset-password",
  "/create-password",
  "/verification-code",
];

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
   * EXCEPTION: Allow /confirmation page without auth (payment callback)
   * After Paylink payment, the gateway redirects back without transactionNo in URL.
   * The transactionNo is stored in localStorage and the page handles verification itself.
   */
  if (isProtectedRoute && !token) {
    // Always allow /confirmation — page handles auth and payment verification internally
    if (pathname === '/confirmation') {
      return NextResponse.next();
    }

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
