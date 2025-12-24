import Alpine from "alpinejs";
// import { signUp, validatePasswordStrength } from "../auth/auth.js"; // Adjust path if needed
import {
  displayFormErrors,
  clearFieldErrors,
  updatePasswordStrengthIndicator,
  showToast,
} from "../auth/form-ui.js"; // Adjust path if needed

document.addEventListener("alpine:init", () => {
  Alpine.data("signupForm", () => ({
    form: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      termsAccepted: false,
    },
    isLoading: false,
    errors: [],

    async handleSubmit() {
      showToast(
        "Account creation is disabled. Please contact the administrator.",
        "error"
      );
    },

    validateField(fieldName) {
      const field = document.getElementById(fieldName);
      let error = null;

      switch (fieldName) {
        case "fname":
          if (!this.form.fname || this.form.fname.trim() === "") {
            error = "First name is required";
          }
          break;
        case "lname":
          if (!this.form.lname || this.form.lname.trim() === "") {
            error = "Last name is required";
          }
          break;
        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!this.form.email || !emailRegex.test(this.form.email)) {
            error = "Valid email is required";
          }
          break;
        case "password":
          if (!this.form.password) {
            error = "Password is required";
          }
          break;

        case "passwordConfirm":
          if (
            !this.form.passwordConfirm ||
            this.form.password !== this.form.passwordConfirm
          ) {
            error = "Passwords do not match";
          }
          break;
        case "termsAccepted":
          if (!this.form.termsAccepted) {
            error = "You must accept the terms and conditions";
          }
          break;
      }

      if (field && error) {
        field.classList.add(
          "border-red-500",
          "focus:border-red-500",
          "focus:ring-red-500/10"
        );
        field.classList.remove(
          "border-gray-300",
          "focus:border-brand-300",
          "focus:ring-brand-500/10"
        );
      } else if (field) {
        field.classList.remove(
          "border-red-500",
          "focus:border-red-500",
          "focus:ring-red-500/10"
        );
        field.classList.add(
          "border-gray-300",
          "focus:border-brand-300",
          "focus:ring-brand-500/10"
        );
      }
    },

    updatePasswordStrength() {
      const indicator = document.getElementById("passwordStrengthIndicator");
      updatePasswordStrengthIndicator(this.form.password, indicator);
    },
  }));
});
