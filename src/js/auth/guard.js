import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

/**
 * Protect private pages (dashboard, settings, etc)
 * Redirects OUT if user is NOT logged in
 */
export function protectPage(redirectTo = "/signin.html") {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.replace(redirectTo);
    }
  });
}

/**
 * Prevent logged-in users from accessing auth pages
 * Redirects OUT if user IS logged in
 */
export function redirectIfAuthenticated(redirectTo = "/dashboard.html") {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.replace(redirectTo);
    }
  });
}
