/**
 * Browser Console Testing Commands
 * Copy and paste these in your browser console to test authentication
 *
 * Open DevTools: F12 or Right-Click > Inspect > Console tab
 */

// ============================================
// USER DATA INSPECTION
// ============================================

// View all registered users
console.log("All Users:", JSON.parse(localStorage.getItem("users") || "[]"));

// View current logged-in user
console.log(
  "Current User:",
  JSON.parse(localStorage.getItem("currentUser") || "null")
);

// Check if user is logged in
console.log("Is Logged In:", localStorage.getItem("currentUser") !== null);

// Get current user object
const user = JSON.parse(localStorage.getItem("currentUser") || "null");
console.log(
  "User Name:",
  user ? `${user.fname} ${user.lname}` : "Not logged in"
);
console.log("User Email:", user ? user.email : "Not logged in");

// ============================================
// TEST SIGNUP
// ============================================

// Test 1: Check if users array exists
console.log(
  "Users Array:",
  JSON.parse(localStorage.getItem("users") || "[]").length,
  "users"
);

// Test 2: Try duplicate email
const users = JSON.parse(localStorage.getItem("users") || "[]");
const emailExists = users.some((u) => u.email === "test@example.com");
console.log("Email test@example.com exists:", emailExists);

// Test 3: View specific user
const testUser = users.find((u) => u.email === "john@example.com");
console.log("John's account:", testUser);

// ============================================
// TEST AUTHENTICATION
// ============================================

// Simulate password hashing
async function testPasswordHash(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  console.log(`Password: "${password}"`);
  console.log(`Hash: ${hashHex}`);
  return hashHex;
}

// Test hashing
// testPasswordHash('TestPass123!');

// ============================================
// TEST PASSWORD VALIDATION
// ============================================

function testPasswordStrength(password) {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;
  const strengths = ["weak", "weak", "fair", "good", "strong"];
  const strength = strengths[score] || "weak";

  console.log(`\n--- Password Validation: "${password}" ---`);
  console.log("✓ Length (8+):", checks.length);
  console.log("✓ Uppercase (A-Z):", checks.uppercase);
  console.log("✓ Lowercase (a-z):", checks.lowercase);
  console.log("✓ Number (0-9):", checks.number);
  console.log("✓ Special (!@#...):", checks.special);
  console.log("---");
  console.log("Requirements Met:", score, "/ 5");
  console.log("Strength:", strength);
  console.log("Valid:", score === 5 ? "✅ YES" : "❌ NO");
}

// Test different passwords
testPasswordStrength("weak"); // ❌ Weak
testPasswordStrength("Test1"); // ❌ Still weak
testPasswordStrength("TestPass123"); // ❌ Missing special
testPasswordStrength("TestPass123!"); // ✅ Strong

// ============================================
// TEST EMAIL VALIDATION
// ============================================

function testEmailValidation(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = regex.test(email);
  console.log(`Email: "${email}" → ${isValid ? "✅ Valid" : "❌ Invalid"}`);
  return isValid;
}

// Test emails
testEmailValidation("user@example.com"); // ✅ Valid
testEmailValidation("invalid.email"); // ❌ Invalid
testEmailValidation("test@domain.co.uk"); // ✅ Valid
testEmailValidation("@nodomain.com"); // ❌ Invalid

// ============================================
// SESSION MANAGEMENT
// ============================================

// Create a test session
function createTestSession() {
  const testUser = {
    id: "user_" + Date.now() + "_test",
    fname: "Test",
    lname: "User",
    email: "test@example.com",
    loginTime: new Date().toISOString(),
    role: "user",
  };
  localStorage.setItem("currentUser", JSON.stringify(testUser));
  console.log("Test session created:", testUser);
}

// Clear session (logout)
function clearSession() {
  localStorage.removeItem("currentUser");
  console.log("Session cleared (logged out)");
}

// Get session
function getSession() {
  const session = JSON.parse(localStorage.getItem("currentUser") || "null");
  console.log("Current session:", session);
  return session;
}

// ============================================
// STORAGE MANAGEMENT
// ============================================

// Clear all user data
function clearAllData() {
  localStorage.removeItem("users");
  localStorage.removeItem("currentUser");
  console.log("✅ All user data cleared");
}

// Get storage size info
function getStorageInfo() {
  const users = JSON.stringify(
    JSON.parse(localStorage.getItem("users") || "[]")
  );
  const session = JSON.stringify(
    JSON.parse(localStorage.getItem("currentUser") || "null")
  );

  console.log("\n--- Storage Info ---");
  console.log("Users data size:", Math.round(users.length / 1024) + " KB");
  console.log("Session data size:", Math.round(session.length / 1024) + " KB");
  console.log(
    "Total registered users:",
    JSON.parse(localStorage.getItem("users") || "[]").length
  );
  console.log("---");
}

// ============================================
// ROUTE TESTING
// ============================================

function testRouteProtection() {
  const protectedRoutes = [
    "/index.html",
    "/inventory.html",
    "/reports.html",
    "/team.html",
    "/trainings.html",
    "/tracking.html",
  ];

  const publicRoutes = ["/signin.html", "/signup.html", "/404.html"];

  const currentPath = window.location.pathname;
  const isProtected = protectedRoutes.some((r) => currentPath.includes(r));
  const isPublic = publicRoutes.some((r) => currentPath.includes(r));

  console.log("\n--- Route Protection Test ---");
  console.log("Current Path:", currentPath);
  console.log("Is Protected Route:", isProtected);
  console.log("Is Public Route:", isPublic);
  console.log("User Logged In:", localStorage.getItem("currentUser") !== null);
  console.log("---\n");
}

// ============================================
// QUICK TEST SUITE
// ============================================

function runQuickTests() {
  console.clear();
  console.log("🧪 QUICK TEST SUITE\n");

  console.log("1️⃣  Storage Status:");
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  console.log("   - Total users:", users.length);
  console.log("   - Logged in:", localStorage.getItem("currentUser") !== null);

  console.log("\n2️⃣  Password Strength Tests:");
  testPasswordStrength("weak123");
  testPasswordStrength("StrongPass123!");

  console.log("\n3️⃣  Email Validation Tests:");
  testEmailValidation("user@test.com");
  testEmailValidation("invalid-email");

  console.log("\n4️⃣  Current User Info:");
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (currentUser) {
    console.log("   - Name:", `${currentUser.fname} ${currentUser.lname}`);
    console.log("   - Email:", currentUser.email);
    console.log("   - Login Time:", currentUser.loginTime);
  } else {
    console.log("   - No user logged in");
  }

  console.log("\n5️⃣  Route Protection:");
  testRouteProtection();

  console.log("✅ Test suite completed");
}

// Run all tests at once
// runQuickTests();

// ============================================
// USEFUL SHORTCUTS
// ============================================

// Quick commands to copy into console:

/*

// 1. View all users
JSON.parse(localStorage.getItem('users'))

// 2. View current user
JSON.parse(localStorage.getItem('currentUser'))

// 3. Clear everything
localStorage.clear()

// 4. Test password strength
testPasswordStrength('YourPassword123!')

// 5. Test email
testEmailValidation('email@test.com')

// 6. Get current path
window.location.pathname

// 7. Logout
localStorage.removeItem('currentUser')

// 8. Check login status
localStorage.getItem('currentUser') !== null

// 9. Run full test suite
runQuickTests()

// 10. Check storage size
getStorageInfo()

*/

// ============================================
// DEBUGGING HELPERS
// ============================================

function debugAuth() {
  const userList = JSON.parse(localStorage.getItem("users") || "[]");
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  console.log("📊 AUTH DEBUG INFO");
  console.log("================");
  console.log("\n👥 REGISTERED USERS:");
  if (userList.length === 0) {
    console.log("   (No users registered yet)");
  } else {
    userList.forEach((u, i) => {
      console.log(`   ${i + 1}. ${u.fname} ${u.lname} (${u.email})`);
      console.log(`      - Created: ${u.createdAt}`);
      console.log(`      - Last Login: ${u.lastLogin || "Never"}`);
    });
  }

  console.log("\n👤 CURRENT USER:");
  if (currentUser) {
    console.log(`   ✅ Logged in as ${currentUser.fname} ${currentUser.lname}`);
    console.log(`   📧 Email: ${currentUser.email}`);
    console.log(`   ⏰ Login Time: ${currentUser.loginTime}`);
  } else {
    console.log("   ❌ No user logged in");
  }

  console.log("\n📍 PAGE INFO:");
  console.log(`   Current Path: ${window.location.pathname}`);
  console.log(`   Protocol: ${window.location.protocol}`);
  console.log(`   Host: ${window.location.host}`);

  console.log("\n💾 STORAGE:");
  getStorageInfo();

  console.log("================");
}

// Run debug info
// debugAuth();

// ============================================
// Make functions globally available
// ============================================

window.authDebug = {
  testPasswordStrength,
  testEmailValidation,
  testRouteProtection,
  createTestSession,
  clearSession,
  getSession,
  clearAllData,
  getStorageInfo,
  runQuickTests,
  debugAuth,
};

console.log("✅ Auth testing functions loaded!");
console.log('Usage: authDebug.testPasswordStrength("password")');
console.log("See this file for more commands.");
