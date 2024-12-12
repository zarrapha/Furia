// Password complexity checker function
function isPasswordComplex(password) {
  // Check if the password is a non-empty string
  if (!password || typeof password !== "string") return false;

  // Define the password rules (e.g., length, uppercase, special characters)
  const rules = {
    minLength: password.length >= 12, // Check if password is at least 12 characters long
    hasUpperCase: /[A-Z]/.test(password), // Check for at least one uppercase letter
    hasLowerCase: /[a-z]/.test(password), // Check for at least one lowercase letter
    hasNumber: /[0-9]/.test(password), // Check for at least one number
    hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password), // Check for special characters
    noSpaces: !/\s/.test(password), // Ensure there are no spaces in the password
  };

  // Return true if all password rules are met
  return Object.values(rules).every((rule) => rule === true);
}

// Wait for the document to load before running the code
document.addEventListener("DOMContentLoaded", () => {
  // Cache important DOM elements for easy access
  const elements = {
    form: document.getElementById("registration-form"),
    passwordInput: document.getElementById("password"),
    passwordToggle: document.getElementById("password-toggle"),
    username: document.getElementById("username"),
    email: document.getElementById("email"),
  };

  // Validate if all the required elements are available in the DOM
  if (!Object.values(elements).every((element) => element)) {
    console.error("Required elements not found");
    return; // Exit if any element is missing
  }

  // Event listener to toggle password visibility when clicking the password icon
  elements.passwordToggle.addEventListener("click", () => {
    // Check the current type of the password input field (password or text)
    const isPassword = elements.passwordInput.type === "password";
    // Toggle password visibility based on current state
    elements.passwordInput.type = isPassword ? "text" : "password";
    // Change the toggle icon between an eye and a monkey emoji
    elements.passwordToggle.textContent = isPassword ? "🙈" : "👁️";
  });

  // Form submission event listener
  elements.form.addEventListener("submit", async (e) => {
    // Prevent default form submission behavior (page reload)
    e.preventDefault();

    // Create an object with form data (username, email, password)
    const formData = {
      username: elements.username.value.trim(), // Get trimmed username value
      email: elements.email.value.trim(), // Get trimmed email value
      password: elements.passwordInput.value, // Get password value
    };

    try {
      // Validate username length (between 3 and 50 characters)
      if (formData.username.length < 3 || formData.username.length > 50) {
        throw new Error("Username must be between 3 and 50 characters");
      }

      // Validate email format using a regular expression
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Validate password complexity using the isPasswordComplex function
      if (!isPasswordComplex(formData.password)) {
        // Throw an error with a detailed message if the password doesn't meet requirements
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

      // If all validations pass, set a session storage flag and redirect to the verification page
      sessionStorage.setItem("registrationPending", "true");
      window.location.href = "verify.html"; // Redirect to verify.html

    } catch (error) {
      // Catch any validation errors and log them to the console
      console.error("Validation error:", error);
      alert(error.message); // Show an alert with the error message to the user
    }
  });
});