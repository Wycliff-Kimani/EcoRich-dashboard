/**
 * Form UI Helper Module
 * Manages form validation feedback, error/success messages, and loading states
 */

// Show toast notification
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  }[type];

  toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white ${bgColor} shadow-lg z-50 animate-fade-in`;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.style.animation = "fadeOut 0.3s ease-in-out";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Display form errors
function displayFormErrors(errors, formElement) {
  clearFormErrors(formElement);

  if (errors && errors.length > 0) {
    const errorContainer = document.createElement("div");
    errorContainer.className =
      "mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400";
    errorContainer.id = "form-errors";

    const errorList = errors.map((error) => `<li>${error}</li>`).join("");
    errorContainer.innerHTML = `<ul class="list-inside list-disc">${errorList}</ul>`;

    formElement.insertBefore(errorContainer, formElement.firstChild);
  }
}

// Clear form errors
function clearFormErrors(formElement) {
  const errorContainer = formElement.querySelector("#form-errors");
  if (errorContainer) {
    errorContainer.remove();
  }
}

// Display success message
function displaySuccessMessage(message, formElement) {
  const successContainer = document.createElement("div");
  successContainer.className =
    "mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400";
  successContainer.id = "success-message";
  successContainer.textContent = message;

  formElement.insertBefore(successContainer, formElement.firstChild);
}

// Set loading state on button
function setButtonLoading(button, isLoading = true) {
  if (isLoading) {
    button.disabled = true;
    button.classList.add("opacity-70", "cursor-not-allowed");
    const originalText = button.textContent;
    button.textContent = "Loading...";
    button.dataset.originalText = originalText;
  } else {
    button.disabled = false;
    button.classList.remove("opacity-70", "cursor-not-allowed");
    if (button.dataset.originalText) {
      button.textContent = button.dataset.originalText;
    }
  }
}

// Set field error state
function setFieldError(fieldElement, errorMessage = null) {
  if (errorMessage) {
    fieldElement.classList.add(
      "border-red-500",
      "focus:border-red-500",
      "focus:ring-red-500/10"
    );
    fieldElement.classList.remove(
      "border-gray-300",
      "focus:border-brand-300",
      "focus:ring-brand-500/10"
    );

    // Add error message below field
    const existingError = fieldElement.parentElement.querySelector(
      ".field-error-message"
    );
    if (existingError) {
      existingError.remove();
    }

    const errorMsg = document.createElement("p");
    errorMsg.className = "field-error-message mt-1 text-xs text-red-500";
    errorMsg.textContent = errorMessage;
    fieldElement.parentElement.appendChild(errorMsg);
  } else {
    fieldElement.classList.remove(
      "border-red-500",
      "focus:border-red-500",
      "focus:ring-red-500/10"
    );
    fieldElement.classList.add(
      "border-gray-300",
      "focus:border-brand-300",
      "focus:ring-brand-500/10"
    );

    const errorMsg = fieldElement.parentElement.querySelector(
      ".field-error-message"
    );
    if (errorMsg) {
      errorMsg.remove();
    }
  }
}

// Clear all field errors
function clearFieldErrors(formElement) {
  const fields = formElement.querySelectorAll("input, textarea, select");
  fields.forEach((field) => setFieldError(field, null));
}

// Create password strength indicator
function updatePasswordStrengthIndicator(password, indicatorElement) {
  if (!indicatorElement) return;

  const strengthLevels = {
    weak: { color: "bg-red-500", text: "Weak", percent: "33%" },
    fair: { color: "bg-yellow-500", text: "Fair", percent: "66%" },
    good: { color: "bg-blue-500", text: "Good", percent: "85%" },
    strong: { color: "bg-green-500", text: "Strong", percent: "100%" },
  };

  // Simplified strength check
  let strength = "weak";
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;

  if (score <= 2) strength = "weak";
  else if (score <= 3) strength = "fair";
  else if (score <= 4) strength = "good";
  else strength = "strong";

  const level = strengthLevels[strength];

  indicatorElement.innerHTML = `
    <div class="mb-1 text-xs font-medium text-gray-600 dark:text-gray-400">Password Strength: ${level.text}</div>
    <div class="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
      <div class="${level.color} h-full transition-all duration-300" style="width: ${level.percent}"></div>
    </div>
  `;
}

export {
  showToast,
  displayFormErrors,
  clearFormErrors,
  displaySuccessMessage,
  setButtonLoading,
  setFieldError,
  clearFieldErrors,
  updatePasswordStrengthIndicator,
};
