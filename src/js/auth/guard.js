import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export function protectPage(redirectTo = "/index.html") {
  console.log("Protect check started on:", window.location.pathname);
  const publicPaths = ["/index.html", "/reset-password.html"];
  if (publicPaths.includes(window.location.pathname)) {
    console.log("Public page - skipping");
    return;
  }

  if (!auth.currentUser) {
    console.log("No user (sync) - redirecting to", redirectTo);
    window.location.href = redirectTo;
    return;
  }

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      console.log("No user (async) - redirecting to", redirectTo);
      window.location.href = redirectTo;
    } else {
      console.log("User OK:", user.uid);
    }
  });
}
