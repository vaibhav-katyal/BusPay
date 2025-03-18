document.addEventListener("DOMContentLoaded", () => {
  // Make the glass card visible
  document.querySelector(".glass-card").style.opacity = "1"
  document.querySelector(".glass-card").style.transform = "translateY(0)"

  // Conductor login form submission
  const conductorLoginForm = document.getElementById("conductor-login-form")
  conductorLoginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const submitBtn = conductorLoginForm.querySelector('button[type="submit"]')
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
      color: #38b000;
    }
    
    .notification.error i {
      color: #d00000;
    }
  `
  document.head.appendChild(style)
})

