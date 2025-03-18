document.addEventListener("DOMContentLoaded", () => {
    // Show the payment card with animation
    const paymentCard = document.querySelector(".payment-card")
    setTimeout(() => {
      paymentCard.style.opacity = "1"
      paymentCard.style.transform = "translateY(0)"
    }, 100)
  
    // Handle passenger count
    const decreaseBtn = document.getElementById("decrease-passengers")
    const increaseBtn = document.getElementById("increase-passengers")
    const passengerCountEl = document.getElementById("passenger-count")
    const fareTotalEl = document.getElementById("fare-total")
    const totalAmountEl = document.getElementById("total-amount")
  
    let passengerCount = 1
    let farePerPassenger = 10
    const serviceFee = 2
  
    // Update fare based on selection
    const fareOptions = document.querySelectorAll('input[name="fare"]')
    fareOptions.forEach((option) => {
      option.addEventListener("change", function () {
        farePerPassenger = Number.parseInt(this.value)
        updateTotals()
      })
    })
  
    // Decrease passenger count
    decreaseBtn.addEventListener("click", () => {
      if (passengerCount > 1) {
        passengerCount--
        passengerCountEl.textContent = passengerCount
        updateTotals()
      }
    })
  
    // Increase passenger count
    increaseBtn.addEventListener("click", () => {
      passengerCount++
      passengerCountEl.textContent = passengerCount
      updateTotals()
    })
  
    // Update totals
    function updateTotals() {
      const fareTotal = farePerPassenger * passengerCount
      const totalAmount = fareTotal + serviceFee
  
      fareTotalEl.textContent = `₹${fareTotal}`
      totalAmountEl.textContent = `₹${totalAmount}`
  
      // Update pay button text
      document.getElementById("pay-now-btn").innerHTML = `<i class="fas fa-lock"></i> Pay Now ₹${totalAmount}`
    }
  
    // Handle payment button click
    const payNowBtn = document.getElementById("pay-now-btn")
    payNowBtn.addEventListener("click", function () {
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...'
      this.disabled = true
  
      // Simulate payment processing
      setTimeout(() => {
        // Redirect to ticket page
        window.location.href = "ticket.html"
      }, 2000)
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
  
  