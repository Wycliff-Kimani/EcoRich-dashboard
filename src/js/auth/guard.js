import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export function protectPage(redirectTo = "/signin.html") {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = redirectTo;
    }
  });
}
