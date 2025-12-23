/**
 * Route Protection Module
 * Protects routes and ensures user authentication
 */

import { isLoggedIn, getCurrentUser } from "./auth.js";

// List of protected routes (pages that require authentication)
const PROTECTED_ROUTES = [
  "/index.html",
  "/dashboard.html",
  "/profile.html",
  "/settings.html",
  "/inventory.html",
  "/reports.html",
  "/team.html",
  "/trainings.html",
  "/tracking.html",
  "/farmers.html",
  "/waste-suppliers.html",
];

// List of public routes (accessible without authentication)
const PUBLIC_ROUTES = [
  "/signin.html",
  "/signup.html",
  "/reset-password.html",
  "/404.html",
  "/",
];

/**
 * Check if current route is protected
 */
function isProtectedRoute(pathname) {
  return PROTECTED_ROUTES.some((route) => pathname.includes(route));
}

/**
 * Check if current route is public
 */
function isPublicRoute(pathname) {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.includes(route)
  );
}

/**
 * Protect route - redirect to signin if not authenticated
 */
function protectRoute() {
  const pathname = window.location.pathname;

  // If on a protected route and not logged in, redirect to signin
  if (isProtectedRoute(pathname) && !isLoggedIn()) {
    window.location.href = "/signin.html";
    return;
  }

  // If on a public auth route (signin/signup) and already logged in, redirect to dashboard
  if (
    (pathname.includes("/signin.html") || pathname.includes("/signup.html")) &&
    isLoggedIn()
  ) {
    window.location.href = "/index.html";
    return;
  }
}

/**
 * Get current user info
 */
function getUserInfo() {
  return getCurrentUser();
}

/**
 * Check if user has specific role
 */
function hasRole(role) {
  const user = getCurrentUser();
  return user && user.role === role;
}

/**
 * Initialize route protection on page load
 */
function initRouteProtection() {
  document.addEventListener("DOMContentLoaded", () => {
    protectRoute();
  });

  // Also check immediately in case DOM is already loaded
  if (document.readyState === "loading") {
    protectRoute();
  }
}

// Auto-initialize on import
initRouteProtection();

export {
  protectRoute,
  getUserInfo,
  hasRole,
  isProtectedRoute,
  isPublicRoute,
  initRouteProtection,
};
