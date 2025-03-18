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
  const tabs = document.querySelectorAll(".tab")
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs and panes
      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"))
      document.querySelectorAll(".tab-pane").forEach((p) => p.classList.remove("active"))

      // Add active class to clicked tab
      tab.classList.add("active")

      // Show corresponding tab pane
      const tabId = tab.getAttribute("data-tab")
      document.getElementById(tabId).classList.add("active")
    })
  })

  // OTP functionality for login
  const sendOtpBtn = document.getElementById("send-otp-btn")
  const verifyOtpBtn = document.getElementById("verify-otp-btn")
  const loginOtpGroup = document.getElementById("login-otp-group")

  sendOtpBtn.addEventListener("click", () => {
    // Simulate OTP sending
    sendOtpBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'

    setTimeout(() => {
      loginOtpGroup.style.display = "block"
      verifyOtpBtn.style.display = "block"
      sendOtpBtn.style.display = "none"

      // Show success message
      showNotification("OTP sent successfully!", "success")
    }, 1500)
  })

  // OTP functionality for signup
  const signupSendOtpBtn = document.getElementById("signup-send-otp-btn")
  const signupVerifyBtn = document.getElementById("signup-verify-btn")
  const signupOtpGroup = document.getElementById("signup-otp-group")

  signupSendOtpBtn.addEventListener("click", () => {
    // Simulate OTP sending
    signupSendOtpBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'

    setTimeout(() => {
      signupOtpGroup.style.display = "block"
      signupVerifyBtn.style.display = "block"
      signupSendOtpBtn.style.display = "none"

      // Show success message
      showNotification("OTP sent successfully!", "success")
    }, 1500)
  })

  // Login form submission
  const loginForm = document.getElementById("login-form")
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    verifyOtpBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...'

    // Simulate verification
    setTimeout(() => {
      // Redirect to home page after successful login
      window.location.href = "home.html"
    }, 1500)
  })

  // Signup form submission
  const signupForm = document.getElementById("signup-form")
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault()

    signupVerifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...'

    // Simulate account creation
    setTimeout(() => {
      // Redirect to home page after successful signup
      window.location.href = "home.html"
    }, 1500)
  })

  // Notification function
  function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
        <span>${message}</span>
      </div>
    `

    // Add to body
    document.body.appendChild(notification)

    // Show notification
    setTimeout(() => {
      notification.classList.add("show")
    }, 10)

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => {
        notification.remove()
      }, 300)
    }, 3000)
  }

  // Add notification styles
  const style = document.createElement("style")
  style.textContent = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 10px;
      background: white;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      transform: translateX(120%);
      transition: transform 0.3s ease;
      z-index: 1000;
    }
    
    .notification.show {
      transform: translateX(0);
    }
    
    .notification-content {
      display: flex;
      align-items: center;
    }
    
    .notification i {
      margin-right: 10px;
      font-size: 1.2rem;
    }
    
    .notification.success i {
      color: var(--success);
    }
    
    .notification.error i {
      color: var(--error);
    }
  `
  document.head.appendChild(style)
})

