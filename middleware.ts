import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
    '/ar-select-package',
    '/ar-checkout',
    '/ar-confirmation',
    '/dashboard',
];

/**
 * Authentication Routes - Redirect if Already Logged In
 * Logged-in users will be redirected away from these pages
 */
const authRoutes = [
    '/login',
    '/signup',
];

/**
 * Public Routes - Always Accessible
 * These routes don't require any authentication checks
 */
const publicRoutes = [
    '/',
    '/ar-aboutUs',
    '/ar-contactUs',
];

// ============================================
// MIDDLEWARE FUNCTION
// ============================================

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get authentication token from cookies
    const authToken = request.cookies.get('authToken')?.value;

    // Check if current route is protected
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Check if current route is an auth route
    const isAuthRoute = authRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Check if current route is public
    const isPublicRoute = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(route)
    );

    // ============================================
    // ROUTE PROTECTION LOGIC
    // ============================================

    /**
     * Scenario 1: User trying to access protected route without authentication
     * Action: Redirect to login page
     */
    if (isProtectedRoute && !authToken) {
        const loginUrl = new URL('/login', request.url);
        // Add redirect parameter to send user back after login
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    /**
     * Scenario 2: Logged-in user trying to access auth pages (login/signup)
     * Action: Redirect to home page
     */
    if (isAuthRoute && authToken) {
        return NextResponse.redirect(new URL('/', request.url));
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
        '/((?!api|_next/static|_next/image|favicon.ico|image|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp).*)',
    ],
};
