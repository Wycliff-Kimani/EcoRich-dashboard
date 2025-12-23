/**
 * Authentication Integration Guide
 * Add these imports and code to your main application files
 */

// ============================================
// For index.html or main dashboard page
// ============================================

// Add these imports at the top of your index.js or in a script tag:

import { getCurrentUser, isLoggedIn, signOut } from "./auth/auth.js";

import { protectRoute } from "./auth/route-protection.js";

import { showToast } from "./auth/form-ui.js";

// ============================================
// Display logged-in user info
// ============================================

function initializeUserInfo() {
  const user = getCurrentUser();

  if (user) {
    // Update UI with user info
    const userNameElement = document.querySelector("[data-user-name]");
    if (userNameElement) {
      userNameElement.textContent = `${user.fname} ${user.lname}`;
    }

    const userEmailElement = document.querySelector("[data-user-email]");
    if (userEmailElement) {
      userEmailElement.textContent = user.email;
    }

    console.log(`Welcome back, ${user.fname}!`);
  }
}

// Call on page load
document.addEventListener("DOMContentLoaded", initializeUserInfo);

// ============================================
// Logout functionality
// ============================================

function setupLogoutButton() {
  const logoutButton = document.querySelector("[data-logout-btn]");

  if (logoutButton) {
    logoutButton.addEventListener("click", (e) => {
      e.preventDefault();

      // Sign out user
      signOut();

      // Show message and redirect
      showToast("You have been logged out", "info");

      setTimeout(() => {
        window.location.href = "/signin.html";
      }, 1500);
    });
  }
}

document.addEventListener("DOMContentLoaded", setupLogoutButton);

// ============================================
// Example: Add user info to navbar
// ============================================

/*
In your navbar/header HTML, add:

<div class="user-profile">
  <span data-user-name>User Name</span>
  <span data-user-email>user@example.com</span>
  <button data-logout-btn class="logout-btn">Logout</button>
</div>

This will automatically populate with current user info
*/

// ============================================
// Example: Protected data operations
// ============================================

async function loadUserDashboard() {
  const user = getCurrentUser();

  if (!user) {
    // User not authenticated
    window.location.href = "/signin.html";
    return;
  }

  // Load user-specific data
  try {
    // Example: Fetch user's data
    // const response = await fetch(`/api/users/${user.id}/dashboard`);
    // const data = await response.json();

    console.log("Loading dashboard for:", user.fname);

    // Display user-specific content
  } catch (error) {
    showToast("Failed to load dashboard", "error");
    console.error(error);
  }
}

// ============================================
// For API calls with authentication
// ============================================

/**
 * Helper function to make authenticated API calls
 */
async function apiCall(endpoint, method = "GET", data = null) {
  const user = getCurrentUser();

  if (!user) {
    showToast("You must be logged in", "error");
    window.location.href = "/signin.html";
    return null;
  }

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.id}`, // Add your auth token header
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(endpoint, options);

    if (response.status === 401) {
      // Token expired, logout user
      signOut();
      window.location.href = "/signin.html";
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    showToast("An error occurred", "error");
    return null;
  }
}

// ============================================
// Example: Using apiCall in your app
// ============================================

/*
// Fetch user inventory
const inventoryData = await apiCall('/api/inventory');

// Create new item
const newItem = await apiCall('/api/items', 'POST', {
  name: 'New Item',
  description: 'Item description'
});

// Update item
const updated = await apiCall('/api/items/123', 'PUT', {
  name: 'Updated Name'
});

// Delete item
const deleted = await apiCall('/api/items/123', 'DELETE');
*/

// ============================================
// Role-based access control (Future)
// ============================================

function checkUserRole(requiredRole) {
  const user = getCurrentUser();

  if (!user) return false;

  // Check if user has required role
  if (user.role === requiredRole) {
    return true;
  }

  return false;
}

// Hide elements based on user role
function initializeRoleBasedUI() {
  const adminElements = document.querySelectorAll("[data-admin-only]");
  const supervisorElements = document.querySelectorAll(
    "[data-supervisor-only]"
  );

  if (!checkUserRole("admin")) {
    adminElements.forEach((el) => (el.style.display = "none"));
  }

  if (!checkUserRole("supervisor")) {
    supervisorElements.forEach((el) => (el.style.display = "none"));
  }
}

document.addEventListener("DOMContentLoaded", initializeRoleBasedUI);

// ============================================
// Example: Session timeout (Auto-logout)
// ============================================

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

let sessionTimer;

function resetSessionTimer() {
  // Clear existing timer
  clearTimeout(sessionTimer);

  // Set new timer
  sessionTimer = setTimeout(() => {
    if (isLoggedIn()) {
      signOut();
      showToast("Your session has expired. Please log in again.", "warning");
      window.location.href = "/signin.html";
    }
  }, SESSION_TIMEOUT);
}

// Reset timer on user activity
["mousedown", "keydown", "scroll", "touchstart"].forEach((event) => {
  document.addEventListener(event, resetSessionTimer, true);
});

// Initialize timer on page load
if (isLoggedIn()) {
  resetSessionTimer();
}

// ============================================
// Export for use in other modules
// ============================================

export {
  getCurrentUser,
  isLoggedIn,
  signOut,
  apiCall,
  checkUserRole,
  initializeUserInfo,
  setupLogoutButton,
  loadUserDashboard,
  resetSessionTimer,
};
