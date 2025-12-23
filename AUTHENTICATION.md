# Authentication & Security Documentation

## Overview

This document outlines the authentication and security implementation for the EcoRich Dashboard. The system includes user registration, login, password validation, and route protection.

## Architecture

### Modules

#### 1. **auth.js** - Core Authentication Module

- **Location:** `src/js/auth/auth.js`
- **Responsibilities:**
  - User registration (signup)
  - User login (signin)
  - Session management
  - Password hashing (SHA-256)
  - Email and password validation
  - Password strength checking

**Key Functions:**

```javascript
signUp(userData); // Register new user
signIn(email, password); // Login user
signOut(); // Logout user
getCurrentUser(); // Get current logged-in user
isLoggedIn(); // Check if user is authenticated
validateEmail(email); // Validate email format
validatePasswordStrength(password); // Check password meets requirements
getPasswordStrength(password); // Get strength level (weak/fair/good/strong)
```

#### 2. **form-ui.js** - Form UI & Feedback Module

- **Location:** `src/js/auth/form-ui.js`
- **Responsibilities:**
  - Display form error messages
  - Show success/info toast notifications
  - Manage form loading states
  - Field-level error highlighting
  - Password strength indicator display

**Key Functions:**

```javascript
showToast(message, type); // Display notification
displayFormErrors(errors, formElement); // Show form-level errors
setFieldError(field, errorMessage); // Highlight specific field
updatePasswordStrengthIndicator(password, element); // Update strength meter
```

#### 3. **route-protection.js** - Route Protection Module

- **Location:** `src/js/auth/route-protection.js`
- **Responsibilities:**
  - Protect authenticated routes
  - Redirect unauthenticated users to signin
  - Redirect authenticated users away from auth pages
  - Manage route access control

**Key Functions:**

```javascript
protectRoute(); // Check and enforce route access
getUserInfo(); // Get current user info
hasRole(role); // Check user role (for future use)
initRouteProtection(); // Initialize protection on page load
```

---

## Security Features

### 1. **Password Security**

#### Password Hashing

- Uses `crypto.subtle.digest('SHA-256')` for client-side hashing
- **⚠️ Note:** For production, implement server-side hashing with bcrypt or Argon2

#### Password Requirements

Users must create passwords with:

- Minimum 8 characters
- At least 1 uppercase letter (A-Z)
- At least 1 lowercase letter (a-z)
- At least 1 number (0-9)
- At least 1 special character (!@#$%^&\*()\_+\-=\[\]{};':"\\|,.<>\/?

#### Password Strength Indicator

Real-time visual feedback:

- **Weak:** 0-2 requirements met (Red)
- **Fair:** 2-3 requirements met (Yellow)
- **Good:** 3-4 requirements met (Blue)
- **Strong:** All 5 requirements met (Green)

### 2. **Session Management**

#### Session Storage

User data stored in `localStorage` with structure:

```javascript
{
  id: "user_[timestamp]_[random]",
  fname: "First Name",
  lname: "Last Name",
  email: "user@example.com",
  loginTime: "2025-12-23T...",
  role: "user" // Can be extended for RBAC
}
```

#### Session Check

```javascript
// Check if user is logged in
const isAuthenticated = getCurrentUser() !== null;
```

### 3. **Input Validation**

#### Email Validation

```regex
^[^\s@]+@[^\s@]+\.[^\s@]+$
```

Validates standard email format

#### Form Validation

- All required fields must be filled
- Email must be unique (checked against stored users)
- Passwords must match
- Terms & conditions must be accepted

### 4. **Route Protection**

#### Protected Routes

These routes require authentication:

- `/index.html` (Dashboard)
- `/inventory.html`
- `/reports.html`
- `/team.html`
- `/trainings.html`
- `/tracking.html`
- `/farmers.html`
- `/waste-suppliers.html`

#### Public Routes

These routes are accessible without authentication:

- `/signin.html`
- `/signup.html`
- `/reset-password.html`
- `/404.html`

#### Redirect Logic

```
If NOT logged in + visiting protected route → Redirect to /signin.html
If logged in + visiting /signin.html or /signup.html → Redirect to /index.html
```

---

## Implementation Guide

### For Signup Page

```html
<!-- Import auth modules -->
<script type="module">
  import { signUp, validatePasswordStrength } from "./js/auth/auth.js";
  import { displayFormErrors, showToast } from "./js/auth/form-ui.js";

  window.signupForm = function () {
    return {
      form: { fname, lname, email, password, passwordConfirm, termsAccepted },
      async handleSubmit() {
        const result = await signUp(this.form);
        if (result.success) {
          showToast("Account created successfully!", "success");
          window.location.href = "/index.html";
        } else {
          displayFormErrors(result.errors, form);
        }
      },
    };
  };
</script>
```

### For Signin Page

```html
<script type="module">
  import { signIn } from "./js/auth/auth.js";
  import { displayFormErrors, showToast } from "./js/auth/form-ui.js";

  window.signinForm = function () {
    return {
      form: { email, password, rememberMe },
      async handleSubmit() {
        const result = await signIn(this.form.email, this.form.password);
        if (result.success) {
          showToast("Welcome back!", "success");
          window.location.href = "/index.html";
        } else {
          displayFormErrors(result.errors, form);
        }
      },
    };
  };
</script>
```

### For Protected Pages

```javascript
// Add to main index.js or component files
import { protectRoute, getCurrentUser } from "./auth/route-protection.js";

// Route protection runs automatically on page load
// Display user info if needed
const user = getCurrentUser();
if (user) {
  console.log(`Welcome back, ${user.fname}!`);
}
```

---

## Data Storage

### localStorage Schema

#### `users` - Array of all registered users

```javascript
[
  {
    id: "user_1703329200000_abc123",
    fname: "John",
    lname: "Doe",
    email: "john@example.com",
    password: "[SHA-256 hash]",
    createdAt: "2025-12-23T...",
    lastLogin: "2025-12-23T...",
    isActive: true,
  },
];
```

#### `currentUser` - Currently logged-in user

```javascript
{
  id: "user_1703329200000_abc123",
  fname: "John",
  lname: "Doe",
  email: "john@example.com",
  loginTime: "2025-12-23T...",
  role: "user"
}
```

#### `darkMode` - User theme preference

```javascript
true; // or false
```

---

## Security Best Practices & Roadmap

### ✅ Currently Implemented

- Client-side password hashing (SHA-256)
- Password strength validation
- Email format validation
- Unique email checking
- Session-based authentication
- Route protection
- Form-level error handling
- Loading states for UX

### ⚠️ Not Yet Implemented (Production Requirements)

1. **Server-Side Implementation**
   - Move authentication to backend API
   - Use bcrypt/Argon2 for password hashing
   - Implement HTTPS-only cookies for sessions
   - Add CSRF protection

2. **Advanced Security**
   - Implement JWT tokens
   - Add refresh token rotation
   - Email verification on signup
   - Two-factor authentication (2FA)
   - Password reset functionality
   - Account lockout after failed attempts
   - Session timeout (auto-logout)

3. **Security Headers**
   - Content Security Policy (CSP)
   - X-Frame-Options
   - X-Content-Type-Options
   - Strict-Transport-Security

4. **API Security**
   - Rate limiting
   - Input sanitization
   - SQL injection prevention
   - XSS prevention

5. **Audit & Monitoring**
   - Login attempt logging
   - Failed authentication tracking
   - Suspicious activity detection
   - Security event logging

---

## Testing Authentication

### Test Case 1: Signup

1. Navigate to `/signup.html`
2. Enter valid details with strong password
3. Accept terms & conditions
4. Click "Sign Up"
5. **Expected:** Redirected to dashboard, user in localStorage

### Test Case 2: Signin

1. Navigate to `/signin.html`
2. Enter registered email and password
3. Click "Sign In"
4. **Expected:** Redirected to dashboard, session created

### Test Case 3: Route Protection

1. Clear localStorage (logout)
2. Manually navigate to `/index.html`
3. **Expected:** Redirected to `/signin.html`

### Test Case 4: Password Validation

1. Try password without uppercase
2. Try password with less than 8 chars
3. **Expected:** Form shows validation errors, strength meter updates

### Test Case 5: Existing Email

1. Try signup with already registered email
2. **Expected:** Form shows "Email already registered" error

---

## File Structure

```
src/
├── signup.html          # Signup page with form
├── signin.html          # Signin page with form
├── index.html           # Protected dashboard
└── js/
    └── auth/
        ├── auth.js                  # Core auth logic
        ├── form-ui.js               # Form feedback UI
        └── route-protection.js      # Route access control
```

---

## Troubleshooting

### Problem: Users not staying logged in

**Solution:** Check if browser's localStorage is enabled and not in private/incognito mode

### Problem: Routes not protecting

**Solution:** Ensure `route-protection.js` is imported in main `index.js` before other scripts

### Problem: Password strength indicator not showing

**Solution:** Make sure `updatePasswordStrengthIndicator()` is called on password field input event

### Problem: Form validation not working

**Solution:** Check that form IDs match the validation field checks

---

## Future Enhancements

1. **Email Verification**
   - Send verification link on signup
   - Resend verification email feature

2. **Password Recovery**
   - Forgot password flow
   - Reset link via email
   - Secure token validation

3. **User Management**
   - Edit profile
   - Change password
   - Account deletion
   - User preferences

4. **Admin Features**
   - User management dashboard
   - Role-based access control (RBAC)
   - User activity logs
   - Bulk user import/export

5. **OAuth Integration**
   - Google OAuth
   - X (Twitter) OAuth
   - GitHub OAuth

---

## References

- [MDN: Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [OWASP: Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [OWASP: Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

---

**Last Updated:** December 23, 2025
**Status:** Production-Ready (Client-Side Only)
**⚠️ Important:** For production use, migrate to server-side authentication with proper security protocols.
