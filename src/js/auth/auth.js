import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "../firebase"; // adjust path

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// SIGN IN (Firebase)
async function signIn(email, password) {
  const errors = [];

  if (!email || !validateEmail(email)) {
    errors.push("Valid email is required");
  }

  if (!password) {
    errors.push("Password is required");
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        fname: user.displayName || "User",
      },
    };
  } catch (error) {
    return {
      success: false,
      errors: [mapFirebaseError(error.code)],
    };
  }
}

// SIGN OUT
async function signOut() {
  await firebaseSignOut(auth);
  return { success: true };
}

// Firebase error mapper
function mapFirebaseError(code) {
  switch (code) {
    case "auth/user-not-found":
      return "No account found with this email";
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/invalid-email":
      return "Invalid email address";
    case "auth/too-many-requests":
      return "Too many attempts. Try again later";
    default:
      return "Authentication failed";
  }
}

export { signIn, signOut, validateEmail };
