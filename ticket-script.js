document.addEventListener("DOMContentLoaded", () => {
    // Show the ticket card with animation
    const ticketCard = document.querySelector(".ticket-card")
    setTimeout(() => {
      ticketCard.style.opacity = "1"
      ticketCard.style.transform = "translateY(0)"
    }, 100)
  
    // Set current date
    const currentDateEl = document.getElementById("current-date")
    const now = new Date()
    const options = { month: "short", day: "numeric" }
    currentDateEl.textContent = now.toLocaleDateString("en-US", options)
  
    // Simulate bus arrival
    let etaMinutes = 5
    let busDistance = 0.3
    let progressWidth = 30
  
    const etaTimeEl = document.getElementById("eta-time")
    const busDistanceEl = document.getElementById("bus-distance")
    const arrivalProgressEl = document.getElementById("arrival-progress")
  
    // Update ETA and progress every 10 seconds
    const arrivalInterval = setInterval(() => {
      etaMinutes -= 0.5
      busDistance -= 0.05
      progressWidth += 5
  
      if (etaMinutes <= 0) {
        etaMinutes = 0
        busDistance = 0
        progressWidth = 100
        clearInterval(arrivalInterval)
  
        // Show bus arrived notification
        showNotification("Your bus has arrived!", "success")
  
        // Update status
        document.querySelector(".status-badge").innerHTML = `
          <i class="fas fa-bus"></i>
          <span>Bus Arrived</span>
        `
        document.querySelector(".status-badge").classList.remove("confirmed")
        document.querySelector(".status-badge").classList.add("arrived")
  
        // Add arrived style
        const style = document.createElement("style")
        style.textContent = `
          .status-badge.arrived {
            background: rgba(67, 97, 238, 0.2);
            color: #4361ee;
          }
        `
        document.head.appendChild(style)
      }
  
      etaTimeEl.textContent = etaMinutes.toFixed(1) + " min"
      busDistanceEl.textContent = busDistance.toFixed(1) + " km"
      arrivalProgressEl.style.width = progressWidth + "%"
    }, 10000)
  
    // Initial update
    etaTimeEl.textContent = etaMinutes.toFixed(1) + " min"
    busDistanceEl.textContent = busDistance.toFixed(1) + " km"
    arrivalProgressEl.style.width = progressWidth + "%"
  
    // Handle cancel ticket button
    const cancelTicketBtn = document.getElementById("cancel-ticket-btn")
    cancelTicketBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to cancel this ticket?")) {
        showNotification("Ticket cancelled successfully", "success")
        setTimeout(() => {
          window.location.href = "home.html"
        }, 1500)
      }
    })
  
    // Handle view journey button
    const viewJourneyBtn = document.getElementById("view-journey-btn")
    viewJourneyBtn.addEventListener("click", () => {
      showNotification("Journey view is not available in this demo", "error")
    })
  
    // Handle share button
    const shareButton = document.querySelector(".share-button")
    shareButton.addEventListener("click", () => {
      if (navigator.share) {
        navigator
          .share({
            title: "My BusGo Ticket",
            text: "Check out my bus ticket for Route 42!",
            url: window.location.href,
          })
          .catch((error) => {
            showNotification("Error sharing ticket", "error")
          })
      } else {
        showNotification("Sharing is not supported on this browser", "error")
      }
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
  
  