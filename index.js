// Password complexity checker
function isPasswordComplex(password) {
  if (!password || typeof password !== "string") return false;

  const rules = {
    minLength: password.length >= 12,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    noSpaces: !/\s/.test(password),
  };

  return Object.values(rules).every((rule) => rule === true);
}

document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    form: document.getElementById("registration-form"),
    passwordInput: document.getElementById("password"),
    passwordToggle: document.getElementById("password-toggle"),
    username: document.getElementById("username"),
    email: document.getElementById("email"),
  };

  // Validate all elements exist
  if (!Object.values(elements).every((element) => element)) {
    console.error("Required elements not found");
    return;
  }

  // Password visibility toggle
  elements.passwordToggle.addEventListener("click", () => {
    const isPassword = elements.passwordInput.type === "password";
    elements.passwordInput.type = isPassword ? "text" : "password";
    elements.passwordToggle.textContent = isPassword ? "🙈" : "👁️";
  });

  // Form submission
  elements.form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      username: elements.username.value.trim(),
      email: elements.email.value.trim(),
      password: elements.passwordInput.value,
    };

    try {
      // Validate input
      if (formData.username.length < 3 || formData.username.length > 50) {
        throw new Error("Username must be between 3 and 50 characters");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      if (!isPasswordComplex(formData.password)) {
        throw new Error(
          "Password must:\n" +
            "- Be at least 12 characters long\n" +
            "- Contain at least one uppercase letter\n" +
            "- Contain at least one lowercase letter\n" +
            "- Contain at least one number\n" +
            "- Contain at least one special character\n" +
            "- Not contain spaces"
        );
      }

      sessionStorage.setItem("registrationPending", "true");
      window.location.href = "verify.html";
    } catch (error) {
      console.error("Validation error:", error);
      alert(error.message);
    }
  });
});

