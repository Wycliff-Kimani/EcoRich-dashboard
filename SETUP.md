# Quick Setup & Testing Guide

## What's New

Your EcoRich Dashboard now has a complete authentication system with:

✅ User Registration (Signup)
✅ User Login (Signin)
✅ Password Security (SHA-256 hashing, strength validation)
✅ Session Management
✅ Route Protection
✅ Form Validation & Error Handling
✅ User-Friendly UI Feedback

---

## Files Added/Modified

### New Files Created

1. **src/js/auth/auth.js** - Core authentication logic
2. **src/js/auth/form-ui.js** - Form UI feedback components
3. **src/js/auth/route-protection.js** - Route access control
4. **AUTHENTICATION.md** - Complete documentation
5. **SETUP.md** - This file

### Modified Files

1. **src/signup.html** - Added Alpine.js form handling + authentication
2. **src/signin.html** - Added Alpine.js form handling + authentication

---

## Quick Start

### 1. Test Signup Flow

1. Open **http://localhost:8080/signup.html** in your browser
2. Fill in the form:
   - First Name: `John`
   - Last Name: `Doe`
   - Email: `john@example.com`
   - Password: `TestPass123!` (must be strong)
   - Confirm Password: `TestPass123!`
   - ✓ Accept Terms & Conditions
3. Click **Sign Up**
4. **Expected:** Redirected to dashboard, see success toast

### 2. Test Signin Flow

1. Open **http://localhost:8080/signin.html**
2. Enter:
   - Email: `john@example.com`
   - Password: `TestPass123!`
3. Click **Sign In**
4. **Expected:** Logged in, redirected to dashboard

### 3. Test Route Protection

1. Open browser DevTools → Console
2. Clear localStorage: `localStorage.clear()`
3. Try to access `http://localhost:8080/index.html`
4. **Expected:** Automatically redirected to signin page

### 4. Test Logout

```javascript
// In browser console:
localStorage.removeItem("currentUser");
// Page will auto-redirect to signin on next navigation
```

---

## Password Requirements

Passwords must contain **all** of the following:

- ✓ Minimum 8 characters
- ✓ At least 1 UPPERCASE letter (A-Z)
- ✓ At least 1 lowercase letter (a-z)
- ✓ At least 1 number (0-9)
- ✓ At least 1 special character (!@#$%^&\*()\_+-=[]{};':"\\|,.<>/?)

**Example Strong Passwords:**

- `SecurePass123!`
- `MyDash@2025`
- `EcoRich#Secure99`

---

## User Data in Browser

All user data is stored in browser's `localStorage` (for development/demo only).

### View All Users

```javascript
// In browser console:
JSON.parse(localStorage.getItem("users"));
```

### View Current User

```javascript
JSON.parse(localStorage.getItem("currentUser"));
```

### Clear All Data

```javascript
localStorage.clear();
```

---

## Testing Different Scenarios

### Scenario 1: Already Registered Email

1. Try signing up with `john@example.com` again
2. **Expected:** Error message: "Email already registered"

### Scenario 2: Weak Password

1. Try password: `pass123` (only 7 chars, no uppercase, no special char)
2. **Expected:** Error appears, strength meter shows RED (Weak)

### Scenario 3: Mismatched Passwords

1. Password: `TestPass123!`
2. Confirm: `TestPass456!`
3. **Expected:** Error: "Passwords do not match"

### Scenario 4: Accessing Protected Page Without Login

1. Clear localStorage
2. Manually type `http://localhost:8080/index.html`
3. **Expected:** Redirected to signin.html

### Scenario 5: Wrong Password

1. Use correct email but wrong password
2. **Expected:** Error: "Invalid email or password"

---

## Features Explained

### Password Strength Indicator

As you type in password field:

- Shows real-time strength level (Weak → Fair → Good → Strong)
- Color changes: Red → Yellow → Blue → Green
- Percentage bar fills up

### Toast Notifications

Appear in top-right corner:

- **Green (Success):** "Account created successfully!"
- **Red (Error):** Shows error messages
- **Blue (Info):** Information messages
- **Yellow (Warning):** Warning messages

### Form Error Display

- Errors shown at top of form in red box
- Individual field errors highlighted in red
- Error text appears below each invalid field

### Loading State

- Button shows "Loading..." with spinner
- Button is disabled during submission
- Prevents duplicate submissions

---

## Browser Console Testing Commands

```javascript
// Check if user is logged in
const user = localStorage.getItem("currentUser");
console.log("Is logged in:", user !== null);

// Get current user info
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
console.log("Current user:", currentUser);

// Get all registered users
const allUsers = JSON.parse(localStorage.getItem("users"));
console.log("All users:", allUsers);

// Manually logout
localStorage.removeItem("currentUser");

// Check password hashing (example)
const crypto = window.crypto;
const password = "TestPass123!";
crypto.subtle
  .digest("SHA-256", new TextEncoder().encode(password))
  .then((hash) => {
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    console.log("SHA-256 Hash:", hashHex);
  });
```

---

## Common Issues & Solutions

| Issue                         | Solution                                        |
| ----------------------------- | ----------------------------------------------- |
| Authentication not working    | Clear browser cache/cookies, try incognito mode |
| Password strength not showing | Ensure you're typing in password field          |
| Route protection not working  | Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)      |
| Users not saving              | Check if localStorage is enabled                |
| Redirect loops                | Clear localStorage, try fresh login             |

---

## Next Steps (Production)

Before deploying to production, you should:

1. **Move to Server-Side Auth**
   - Implement backend API (Node.js, Python, etc.)
   - Use bcrypt/Argon2 for password hashing
   - Implement JWT or session-based authentication

2. **Add Security Headers**
   - Configure CORS properly
   - Implement CSRF protection
   - Use HTTPS only

3. **Enhance Features**
   - Email verification
   - Password reset flow
   - Two-factor authentication
   - Account lockout protection

4. **Testing**
   - Write unit tests
   - Integration tests
   - Security penetration testing
   - Load testing

See **AUTHENTICATION.md** for detailed security guidelines.

---

## File Locations Quick Reference

```
/src/
├── signup.html (modified - form + auth logic)
├── signin.html (modified - form + auth logic)
├── index.html (add route protection import)
│
└── js/
    └── auth/ (NEW)
        ├── auth.js (authentication core)
        ├── form-ui.js (form feedback UI)
        └── route-protection.js (route access)

/AUTHENTICATION.md (NEW - detailed docs)
/SETUP.md (THIS FILE - quick start)
```

---

## Support & Questions

For detailed information, see: **AUTHENTICATION.md**

Key sections:

- Security Features Overview
- Implementation Guide
- Data Storage Schema
- Best Practices & Roadmap
- Troubleshooting

---

**Happy Testing! 🚀**

Remember: This implementation is for development/demo. For production, always use server-side authentication with proper security protocols.
