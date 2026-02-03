(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__f2b15f93._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
/**
 * Next.js Middleware for Route Protection
 *
 * This middleware runs before every page request to check authentication
 * and redirect users appropriately based on their login status.
 */ // ============================================
// ROUTE DEFINITIONS
// ============================================
/**
 * Protected Routes - Require Authentication
 * Users must be logged in to access these pages
 */ const protectedRoutes = [
    "/checkout",
    "/confirmation",
    "/dashboard"
];
/**
 * Authentication Routes - Redirect if Already Logged In
 * Logged-in users will be redirected away from these pages
 * NOTE: Removed /login and /signup to allow authenticated users to access these pages
 */ const authRoutes = [];
/**
 * Public Routes - Always Accessible
 * These routes don't require any authentication checks
 */ const publicRoutes = [
    "/",
    "/ar-aboutUs",
    "/ar-contactUs"
];
function middleware(request) {
    const { pathname } = request.nextUrl;
    // ============================================
    // MAINTENANCE MODE CHECK
    // ============================================
    /**
   * Check if maintenance mode is enabled
   * This runs BEFORE all other checks to ensure complete site lockdown
   */ const maintenanceMode = process.env.MAINTENANCE_MODE === "true";
    if (maintenanceMode) {
        // Allow access to the maintenance page itself to prevent redirect loops
        if (pathname === "/maintenance") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
        }
        // Get client IP address for whitelisting
        const clientIP = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "";
        // Check if IP is whitelisted (optional feature)
        const whitelistedIPs = process.env.MAINTENANCE_WHITELIST_IPS?.split(",").map((ip)=>ip.trim()) || [];
        const isWhitelisted = whitelistedIPs.length > 0 && whitelistedIPs.includes(clientIP);
        // Redirect to maintenance page unless IP is whitelisted
        if (!isWhitelisted) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/maintenance", request.url));
        }
    }
    // ============================================
    // REGULAR AUTHENTICATION CHECKS
    // ============================================
    // Get authentication token from cookies
    const authToken = request.cookies.get("authToken")?.value;
    // Check if current route is protected
    const isProtectedRoute = protectedRoutes.some((route)=>pathname.startsWith(route));
    // Check if current route is an auth route
    const isAuthRoute = authRoutes.some((route)=>pathname.startsWith(route));
    // Check if current route is public
    const isPublicRoute = publicRoutes.some((route)=>pathname === route || pathname.startsWith(route));
    // ============================================
    // ROUTE PROTECTION LOGIC
    // ============================================
    /**
   * Scenario 1: User trying to access protected route without authentication
   * Action: Redirect to login page
   * 
   * EXCEPTION: Allow /confirmation with tap_id parameter (payment callback)
   * This allows users returning from payment gateway to access the confirmation page
   */ if (isProtectedRoute && !authToken) {
        // Allow /confirmation with tap_id parameter (payment gateway callback)
        if (pathname === '/confirmation' && request.nextUrl.searchParams.has('tap_id')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
        }
        const loginUrl = new URL("/login", request.url);
        // Add redirect parameter to send user back after login
        loginUrl.searchParams.set("redirect", pathname);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(loginUrl);
    }
    /**
   * Scenario 2: Logged-in user trying to access auth pages (login/signup)
   * Action: Redirect to home page
   */ if (isAuthRoute && authToken) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/", request.url));
    }
    /**
   * Scenario 3: All other routes
   * Action: Allow access
   */ return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */ "/((?!api|_next/static|_next/image|favicon.ico|image|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__f2b15f93._.js.map