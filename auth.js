import { auth, db, firebase, googleProvider } from './firebaseConfig.js';

document.addEventListener("DOMContentLoaded", () => {
    // Splash screen animation
    setTimeout(() => {
      const splashScreen = document.getElementById("splash-screen")
      const authContainer = document.getElementById("auth-container")
  
      splashScreen.style.opacity = "0"
      splashScreen.style.visibility = "hidden"
      authContainer.classList.add("visible")
    }, 3000)

  // Tab switching
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs and panes
      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
      document.querySelectorAll(".tab-pane").forEach((p) => p.classList.remove("active"));

      // Add active class to clicked tab
      tab.classList.add("active");

      // Show corresponding tab pane
      const tabId = tab.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Login form submission
  const loginForm = document.getElementById("login-form");
  const loginBtn = document.getElementById("login-btn");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // Show loading state
    loginBtn.classList.add("loading");

    try {
      // Sign in with email and password
      await auth.signInWithEmailAndPassword(email, password);
      
      // Show success notification
      showNotification("Login successful! Redirecting...", "success");
      
      // Redirect to home page
      setTimeout(() => {
        window.location.href = "home.html";
      }, 1500);
    } catch (error) {
      // Show error notification
      showNotification(getErrorMessage(error), "error");
      loginBtn.classList.remove("loading");
    }
  });

  // Signup form submission
  const signupForm = document.getElementById("signup-form");
  const signupBtn = document.getElementById("signup-btn");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const phone = document.getElementById("signup-phone").value;
    const language = document.getElementById("signup-language").value;

    // Show loading state
    signupBtn.classList.add("loading");

    try {
      // Create user with email and password
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Add user data to Firestore
      await db.collection("users").doc(user.uid).set({
        name: name,
        email: email,
        phone: phone,
        language: language,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      // Update user profile
      await user.updateProfile({
        displayName: name
      });

      // Show success notification
      showNotification("Account created successfully! Redirecting...", "success");
      
      // Redirect to home page
      setTimeout(() => {
        window.location.href = "home.html";
      }, 1500);
    } catch (error) {
      // Show error notification
      showNotification(getErrorMessage(error), "error");
      signupBtn.classList.remove("loading");
    }
  });

  // Google sign in
  const googleLoginBtn = document.getElementById("google-login-btn");
  const googleSignupBtn = document.getElementById("google-signup-btn");

  const signInWithGoogle = async () => {
    try {
      const result = await auth.signInWithPopup(googleProvider);
      const user = result.user;
      
      // Check if this is a new user
      const isNewUser = result.additionalUserInfo.isNewUser;
      
      if (isNewUser) {
        // Add user data to Firestore
        await db.collection("users").doc(user.uid).set({
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber || "",
          language: "english",
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
      
      // Show success notification
      showNotification("Login successful! Redirecting...", "success");
      
      // Redirect to home page
      setTimeout(() => {
        window.location.href = "home.html";
      }, 1500);
    } catch (error) {
      // Show error notification
      showNotification(getErrorMessage(error), "error");
    }
  };

  googleLoginBtn.addEventListener("click", signInWithGoogle);
  googleSignupBtn.addEventListener("click", signInWithGoogle);

  // Forgot password
  const forgotPasswordLink = document.getElementById("forgot-password-link");
  const passwordResetModal = document.getElementById("password-reset-modal");
  const closeModalBtn = document.querySelector(".close-modal");
  const resetPasswordForm = document.getElementById("reset-password-form");
  const resetBtn = document.getElementById("reset-btn");

  forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault();
    passwordResetModal.classList.add("active");
  });

  closeModalBtn.addEventListener("click", () => {
    passwordResetModal.classList.remove("active");
  });

  // Close modal when clicking outside
  passwordResetModal.addEventListener("click", (e) => {
    if (e.target === passwordResetModal) {
      passwordResetModal.classList.remove("active");
    }
  });

  resetPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("reset-email").value;
    
    // Show loading state
    resetBtn.classList.add("loading");
    
    try {
      await auth.sendPasswordResetEmail(email);
      
      // Show success notification
      showNotification("Password reset email sent! Check your inbox.", "success");
      
      // Close modal
      passwordResetModal.classList.remove("active");
      resetBtn.classList.remove("loading");
    } catch (error) {
      // Show error notification
      showNotification(getErrorMessage(error), "error");
      resetBtn.classList.remove("loading");
    }
  });

  // Helper function to get error message
  function getErrorMessage(error) {
    switch (error.code) {
      case "auth/user-not-found":
        return "No user found with this email address.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/email-already-in-use":
        return "This email is already registered. Try logging in instead.";
      case "auth/weak-password":
        return "Password is too weak. Use at least 6 characters.";
      case "auth/invalid-email":
        return "Invalid email address format.";
      case "auth/network-request-failed":
        return "Network error. Check your internet connection.";
      case "auth/popup-closed-by-user":
        return "Google sign-in was cancelled.";
      default:
        return error.message || "An error occurred. Please try again.";
    }
  }

  // Notification function
  function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : type === "warning" ? "fa-exclamation-triangle" : "fa-info-circle"}"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close">
        <i class="fas fa-times"></i>
      </button>
    `;

    // Add to body
    document.body.appendChild(notification);

    // Add close button functionality
    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    });

    // Show notification
    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    // Remove notification after 5 seconds
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  }
});