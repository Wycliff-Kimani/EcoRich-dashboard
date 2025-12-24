import Alpine from "alpinejs"; // Import here to ensure availability in this module
import { signIn, validateEmail } from "../auth/auth.js"; // Adjust path if needed
import { displayFormErrors, showToast } from "../auth/form-ui.js"; // Adjust path if needed

document.addEventListener("alpine:init", () => {
  Alpine.data("signinForm", () => ({
    form: {
      email: "",
      password: "",
      rememberMe: false,
    },
    isLoading: false,
    errors: [],

    async handleSubmit() {
      this.isLoading = true;
      this.errors = [];

      try {
        const result = await signIn(this.form.email, this.form.password);

        if (result.success) {
          showToast("Welcome back! " + result.user.fname, "success");
          setTimeout(() => {
            window.location.href = "/dashboard.html";
          }, 1500);
        } else {
          this.errors = result.errors;
          displayFormErrors(this.errors, document.getElementById("signinForm"));
        }
      } catch (error) {
        this.errors = [error.message];
        displayFormErrors(this.errors, document.getElementById("signinForm"));
      } finally {
        this.isLoading = false;
      }
    },

    validateField(fieldName) {
      const field = document.getElementById(fieldName);
      let error = null;

      switch (fieldName) {
        case "email":
          if (!this.form.email || !validateEmail(this.form.email)) {
            error = "Valid email is required";
          }
          break;
        case "password":
          if (!this.form.password) {
            error = "Password is required";
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
  }));
});
