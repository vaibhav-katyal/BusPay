document.addEventListener("DOMContentLoaded", () => {
  // Show the glass card with animation
  const bookingCard = document.querySelector(".booking-card")
  bookingCard.style.opacity = "1"
  bookingCard.style.transform = "translateY(0)"

  // Simulate location detection
  const detectLocationBtn = document.getElementById("detect-location")
  detectLocationBtn.addEventListener("click", function () {
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'

    setTimeout(() => {
      document.getElementById("starting-point").value = "Current Location"
      this.innerHTML = '<i class="fas fa-crosshairs"></i>'

      // Show notification
      showNotification("Location detected successfully!", "success")

      // Simulate finding nearby buses
      simulateBusSearch()
    }, 1500)
  })

  // Swap locations
  const swapLocationsBtn = document.getElementById("swap-locations")
  swapLocationsBtn.addEventListener("click", function () {
    const startingPoint = document.getElementById("starting-point").value
    const destination = document.getElementById("destination").value

    document.getElementById("starting-point").value = destination
    document.getElementById("destination").value = startingPoint

    // Animate the swap button
    this.classList.add("rotating")
    setTimeout(() => {
      this.classList.remove("rotating")
    }, 500)
  })

  // Add rotating animation
  const style = document.createElement("style")
  style.textContent = `
    .rotating {
      animation: rotate 0.5s ease;
    }
    
    @keyframes rotate {
      from {
        transform: translateY(-50%) rotate(0deg);
      }
      to {
        transform: translateY(-50%) rotate(360deg);
      }
    }
  `
  document.head.appendChild(style)

  // Simulate bus search
  function simulateBusSearch() {
    const busLoading = document.querySelector(".bus-loading")
    const busList = document.querySelector(".bus-list")

    busLoading.style.display = "flex"
    busList.style.display = "none"

    setTimeout(() => {
      busLoading.style.display = "none"
      busList.style.display = "flex"

      // Animate bus items
      const busItems = document.querySelectorAll(".bus-item")
      busItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = "1"
          item.style.transform = "translateY(0)"
        }, index * 200)
      })
    }, 2000)
  }

  // Initialize bus items with opacity 0
  const busItems = document.querySelectorAll(".bus-item")
  busItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(20px)"
    item.style.transition = "all 0.3s ease"
  })

  // Handle bus selection
  const selectBusBtns = document.querySelectorAll(".select-bus-btn")
  selectBusBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove selected class from all bus items
      document.querySelectorAll(".bus-item").forEach((item) => {
        item.classList.remove("selected")
      })

      // Add selected class to parent bus item
      this.closest(".bus-item").classList.add("selected")

      // Add selected styles
      const selectedStyle = document.createElement("style")
      selectedStyle.textContent = `
        .bus-item.selected {
          border-color: var(--accent);
          background: rgba(255, 255, 255, 0.2);
        }
      `
      document.head.appendChild(selectedStyle)

      // Enable the book button
      document.querySelector(".book-btn").disabled = false
    })
  })

  // Handle form submission
  const bookingForm = document.getElementById("booking-form")
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const startingPoint = document.getElementById("starting-point").value
    const destination = document.getElementById("destination").value

    // Validate inputs
    if (!startingPoint || !destination) {
      showNotification("Please enter both starting point and destination", "error")
      return
    }

    // Check if a bus is selected
    const selectedBus = document.querySelector(".bus-item.selected")
    if (!selectedBus) {
      showNotification("Please select a bus", "error")
      return
    }

    // Proceed to payment page
    window.location.href = "payment.html"
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

  // Add notification styles if not already added
  if (!document.querySelector("style[data-notification-styles]")) {
    const notificationStyles = document.createElement("style")
    notificationStyles.setAttribute("data-notification-styles", "")
    notificationStyles.textContent = `
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
    document.head.appendChild(notificationStyles)
  }
})

