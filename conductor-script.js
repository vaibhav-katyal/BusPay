document.addEventListener("DOMContentLoaded", () => {
  // Make the glass card visible
  document.querySelector(".glass-card").style.opacity = "1"
  document.querySelector(".glass-card").style.transform = "translateY(0)"

  // Toggle password visibility
  const togglePassword = document.querySelector(".toggle-password")
  const passwordInput = document.getElementById("password")

  togglePassword.addEventListener("click", function () {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
    passwordInput.setAttribute("type", type)
    this.querySelector("i").classList.toggle("fa-eye")
    this.querySelector("i").classList.toggle("fa-eye-slash")
  })

  // Refresh captcha
  const refreshCaptcha = document.querySelector(".refresh-captcha")
  const captchaText = document.getElementById("captcha-text")

  refreshCaptcha.addEventListener("click", () => {
    captchaText.textContent = generateCaptcha()
  })

  // Generate random captcha
  function generateCaptcha() {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let captcha = ""
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return captcha
  }

  // Set initial captcha
  captchaText.textContent = generateCaptcha()

  // Conductor login form submission
  const conductorLoginForm = document.getElementById("conductor-login-form")
  conductorLoginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const employeeId = document.getElementById("employee-id").value
    const password = passwordInput.value
    const captchaInput = document.getElementById("captcha").value

    // Validate inputs
    if (!employeeId.trim()) {
      showNotification("Please enter your Employee ID", "error")
      return
    }

    if (!password.trim()) {
      showNotification("Please enter your password", "error")
      return
    }

    if (!captchaInput.trim()) {
      showNotification("Please enter the captcha", "error")
      return
    }

    // Validate captcha
    if (captchaInput.toUpperCase() !== captchaText.textContent) {
      showNotification("Invalid captcha. Please try again.", "error")
      captchaText.textContent = generateCaptcha()
      document.getElementById("captcha").value = ""
      return
    }

    const submitBtn = conductorLoginForm.querySelector('button[type="submit"]')
    submitBtn.disabled = true
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...'

    // Simulate login
    setTimeout(() => {
      // Redirect to conductor dashboard after successful login
      window.location.href = "conductor-dashboard.html"
    }, 1500)
  })

  // Notification function
  function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification ${type}`

    let title, icon
    switch (type) {
      case "success":
        title = "Success"
        icon = "check-circle"
        break
      case "error":
        title = "Error"
        icon = "exclamation-circle"
        break
      case "warning":
        title = "Warning"
        icon = "exclamation-triangle"
        break
      case "info":
      default:
        title = "Information"
        icon = "info-circle"
        type = "info"
    }

    notification.innerHTML = `
      <div class="notification-icon">
        <i class="fas fa-${icon}"></i>
      </div>
      <div class="notification-content">
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
      </div>
    `

    // Add to body
    document.body.appendChild(notification)

    // Show notification
    setTimeout(() => {
      notification.classList.add("show")
    }, 10)

    // Remove notification after 4 seconds
    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => {
        notification.remove()
      }, 300)
    }, 4000)
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
      color: #38b000;
    }
    
    .notification.error i {
      color: #d00000;
    }
  `
  document.head.appendChild(style)
})

