import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, googleProvider } from "./firebaseConfig.js";

// Forgot Password Function
function forgotPassword() {
  const email = document.getElementById("signin-email").value; // Fixed selector
  if (!email) {
    alert("Please enter your email");
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email sent! Check your inbox.");
    })
    .catch((error) => {
      console.error(error.message);
      alert(error.message);
    });
}

// Attach event listeners
document.getElementById("forgotPasswordBtn").addEventListener("click", forgotPassword);

// Sign Up Function
document.getElementById("signup-btn").addEventListener("click", () => {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Account Created Successfully!");
            console.log("User:", userCredential.user);
        })
        .catch((error) => {
            alert(error.message);
            console.error(error);
        });
});

// Sign In Function
document.getElementById("signin-btn").addEventListener("click", () => {
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login Successful!");
            console.log("User:", userCredential.user);
            window.location.href = "home.html"; // Redirect to home page
        })
        .catch((error) => {
            alert(error.message);
            console.error(error);
        });
});

// Google Sign-In Function
document.getElementById("googleLoginBtn").addEventListener("click", () => {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            alert("Google Login Successful!");
            console.log("User:", result.user);
            window.location.href = "home.html";
        })
        .catch((error) => {
            alert(error.message);
            console.error(error);
        });
});
