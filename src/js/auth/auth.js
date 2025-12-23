/**
 * Authentication Module
 * Handles user signup, signin, password security, and session management
 */

// Simple password hashing using SHA-256 (client-side hashing for basic security)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

// Validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password strength
function validatePasswordStrength(password) {
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  return {
    isValid: Object.values(requirements).every((req) => req),
    requirements,
  };
}

// Get password strength score
function getPasswordStrength(password) {
  const { requirements } = validatePasswordStrength(password);
  const score = Object.values(requirements).filter((req) => req).length;

  if (score <= 2) return "weak";
  if (score <= 3) return "fair";
  if (score <= 4) return "good";
  return "strong";
}

// Sign up user
async function signUp(userData) {
  const { fname, lname, email, password, passwordConfirm, termsAccepted } =
    userData;

  // Validation
  const errors = [];

  if (!fname || fname.trim() === "") {
    errors.push("First name is required");
  }

  if (!lname || lname.trim() === "") {
    errors.push("Last name is required");
  }

  if (!email || !validateEmail(email)) {
    errors.push("Valid email is required");
  }

  if (!password) {
    errors.push("Password is required");
  }

  const passwordValidation = validatePasswordStrength(password);
  if (!passwordValidation.isValid) {
    errors.push(
      "Password must contain at least 8 characters, uppercase, lowercase, number, and special character"
    );
  }

  if (password !== passwordConfirm) {
    errors.push("Passwords do not match");
  }

  if (!termsAccepted) {
    errors.push("You must accept the terms and conditions");
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  try {
    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Prepare user data
    const user = {
      id: generateUID(),
      fname,
      lname,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      lastLogin: null,
      isActive: true,
    };

    // Save to localStorage (in production, send to backend API)
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    if (existingUsers.some((u) => u.email === email)) {
      return { success: false, errors: ["Email already registered"] };
    }

    existingUsers.push(user);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Create session
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        loginTime: new Date().toISOString(),
      })
    );

    return {
      success: true,
      message: "Account created successfully",
      user: {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      },
    };
  } catch (error) {
    return { success: false, errors: [error.message] };
  }
}

// Sign in user
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
    // Hash the entered password
    const hashedPassword = await hashPassword(password);

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user by email
    const user = users.find((u) => u.email === email);

    if (!user || user.password !== hashedPassword) {
      return { success: false, errors: ["Invalid email or password"] };
    }

    if (!user.isActive) {
      return { success: false, errors: ["This account is disabled"] };
    }

    // Update last login
    const userIndex = users.findIndex((u) => u.id === user.id);
    users[userIndex].lastLogin = new Date().toISOString();
    localStorage.setItem("users", JSON.stringify(users));

    // Create session
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        loginTime: new Date().toISOString(),
      })
    );

    return {
      success: true,
      message: "Signed in successfully",
      user: {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      },
    };
  } catch (error) {
    return { success: false, errors: [error.message] };
  }
}

// Sign out user
function signOut() {
  localStorage.removeItem("currentUser");
  return { success: true, message: "Signed out successfully" };
}

// Get current user
function getCurrentUser() {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}

// Check if user is logged in
function isLoggedIn() {
  return getCurrentUser() !== null;
}

// Generate unique ID
function generateUID() {
  return "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
}

// Export functions
export {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  isLoggedIn,
  validateEmail,
  validatePasswordStrength,
  getPasswordStrength,
  hashPassword,
};
