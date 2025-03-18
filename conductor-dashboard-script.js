const auth = window.auth;
const googleProvider = window.googleProvider;

auth.onAuthStateChanged((user) => {
    if (user) {
        window.location.href = "home.html";
    } else {
        setTimeout(() => {
            document.getElementById("splash-screen").style.opacity = "0";
            document.getElementById("splash-screen").style.visibility = "hidden";
            document.getElementById("auth-container").classList.add("visible");
        }, 3000);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Initialize animations
    const cards = document.querySelectorAll(".trip-status-card, .passenger-list-card")
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      }, index * 200)
    })
  
    // Tab switching
    const tabBtns = document.querySelectorAll(".tab-btn")
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all tabs
        tabBtns.forEach((t) => t.classList.remove("active"))
  
        // Add active class to clicked tab
        this.classList.add("active")
  
        // Filter passengers based on tab
        const tabType = this.getAttribute("data-tab")
        filterPassengers(tabType)
      })
    })
  
    // Filter passengers
    function filterPassengers(type) {
      const passengerItems = document.querySelectorAll(".passenger-item")
  
      passengerItems.forEach((item) => {
        const status = item.querySelector(".passenger-status")
  
        if (type === "all") {
          item.style.display = "flex"
        } else if (type === "boarded" && status.classList.contains("boarded")) {
          item.style.display = "flex"
        } else if (type === "upcoming" && status.classList.contains("upcoming")) {
          item.style.display = "flex"
        } else {
          item.style.display = "none"
        }
      })
    }
  
    // Scanner functionality
    const scanBtn = document.querySelector(".scan-btn")
    const scannerOverlay = document.getElementById("scanner-overlay")
    const closeScannerBtn = document.getElementById("close-scanner-btn")
  
    scanBtn.addEventListener("click", () => {
      scannerOverlay.classList.add("active")
    })
  
    closeScannerBtn.addEventListener("click", () => {
      scannerOverlay.classList.remove("active")
    })
  
    // Toggle flash button
    const toggleFlashBtn = document.getElementById("toggle-flash-btn")
    toggleFlashBtn.addEventListener("click", function () {
      this.classList.toggle("active")
  
      if (this.classList.contains("active")) {
        this.innerHTML = '<i class="fas fa-bolt"></i> Flash: ON'
        this.style.background = "#4361ee"
        this.style.color = "white"
      } else {
        this.innerHTML = '<i class="fas fa-bolt"></i> Toggle Flash'
        this.style.background = "transparent"
        this.style.color = "white"
      }
    })
  
    // Manual entry button
    const manualEntryBtn = document.getElementById("manual-entry-btn")
    manualEntryBtn.addEventListener("click", () => {
      const ticketId = prompt("Enter Ticket ID:")
  
      if (ticketId) {
        // Simulate verification
        scannerOverlay.classList.remove("active")
  
        // Show loading overlay
        showLoadingOverlay("Verifying ticket...")
  
        setTimeout(() => {
          hideLoadingOverlay()
          showTicketVerified("BG-42-123460", "New Passenger")
        }, 1500)
      }
    })
  
    // End trip button
    const endTripBtn = document.querySelector(".end-trip-btn")
    endTripBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to end this trip?")) {
        showLoadingOverlay("Ending trip...")
  
        setTimeout(() => {
          hideLoadingOverlay()
          showNotification("Trip ended successfully", "success")
  
          // Show trip summary
          showTripSummary()
        }, 1500)
      }
    })
  
    // Report issue button
    const reportBtn = document.querySelector(".report-btn")
    reportBtn.addEventListener("click", () => {
      const issue = prompt("Describe the issue:")
  
      if (issue) {
        showNotification("Issue reported successfully", "success")
      }
    })
  
    // Loading overlay
    function showLoadingOverlay(message) {
      const overlay = document.createElement("div")
      overlay.className = "loading-overlay"
      overlay.innerHTML = `
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <div class="loading-message">${message}</div>
        </div>
      `
  
      document.body.appendChild(overlay)
  
      setTimeout(() => {
        overlay.style.opacity = "1"
      }, 10)
  
      // Add styles
      const style = document.createElement("style")
      style.textContent = `
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .loading-container {
          text-align: center;
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }
        
        .loading-message {
          color: white;
          font-size: 1.2rem;
        }
      `
      document.head.appendChild(style)
    }
  
    function hideLoadingOverlay() {
      const overlay = document.querySelector(".loading-overlay")
      if (overlay) {
        overlay.style.opacity = "0"
        setTimeout(() => {
          overlay.remove()
        }, 300)
      }
    }
  
    // Show ticket verified
    function showTicketVerified(ticketId, passengerName) {
      const overlay = document.createElement("div")
      overlay.className = "ticket-verified-overlay"
      overlay.innerHTML = `
        <div class="ticket-verified-container">
          <div class="verified-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="verified-message">Ticket Verified</div>
          <div class="verified-details">
            <div class="detail-row">
              <div class="detail-label">Ticket ID</div>
              <div class="detail-value">${ticketId}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Passenger</div>
              <div class="detail-value">${passengerName}</div>
            </div>
          </div>
          <button class="btn primary close-verified-btn">Done</button>
        </div>
      `
  
      document.body.appendChild(overlay)
  
      setTimeout(() => {
        overlay.style.opacity = "1"
      }, 10)
  
      // Add styles
      const style = document.createElement("style")
      style.textContent = `
        .ticket-verified-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .ticket-verified-container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 30px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          width: 90%;
          max-width: 350px;
        }
        
        .verified-icon {
          font-size: 4rem;
          color: #38b000;
          margin-bottom: 20px;
        }
        
        .verified-message {
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 20px;
        }
        
        .verified-details {
          margin-bottom: 30px;
        }
        
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .detail-label {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .detail-value {
          color: white;
          font-weight: 500;
        }
        
        .close-verified-btn {
          width: 100%;
        }
      `
      document.head.appendChild(style)
  
      // Close button
      const closeBtn = overlay.querySelector(".close-verified-btn")
      closeBtn.addEventListener("click", () => {
        overlay.style.opacity = "0"
        setTimeout(() => {
          overlay.remove()
        }, 300)
  
        // Update passenger list
        updatePassengerList(ticketId, passengerName)
      })
    }
  
    // Update passenger list
    function updatePassengerList(ticketId, passengerName) {
      const passengerList = document.querySelector(".passenger-list")
  
      const newPassenger = document.createElement("div")
      newPassenger.className = "passenger-item"
      newPassenger.innerHTML = `
        <div class="passenger-info">
          <div class="passenger-name">${passengerName}</div>
          <div class="passenger-details">
            <span class="ticket-id">${ticketId}</span>
            <span class="boarding-point">Current Location</span>
          </div>
        </div>
        <div class="passenger-status boarded">
          <i class="fas fa-check-circle"></i>
          <span>Boarded</span>
        </div>
      `
  
      // Add with animation
      newPassenger.style.opacity = "0"
      newPassenger.style.transform = "translateY(20px)"
      passengerList.prepend(newPassenger)
  
      setTimeout(() => {
        newPassenger.style.opacity = "1"
        newPassenger.style.transform = "translateY(0)"
        newPassenger.style.transition = "all 0.3s ease"
      }, 10)
  
      // Update passenger count
      const passengerCount = document.querySelector(".passenger-count")
      const count = Number.parseInt(passengerCount.textContent) + 1
      passengerCount.textContent = `${count} Passengers`
  
      // Update occupancy
      updateOccupancy()
    }
  
    // Update occupancy
    function updateOccupancy() {
      const occupancyProgress = document.querySelector(".occupancy-progress")
      const seatedValue = document.querySelector(".occupancy-details .occupancy-item:nth-child(1) .occupancy-value")
      const totalValue = document.querySelector(".occupancy-details .occupancy-item:nth-child(3) .occupancy-value")
  
      // Parse current values
      const [seated, seatedMax] = seatedValue.textContent.split("/").map((v) => Number.parseInt(v))
      const [total, totalMax] = totalValue.textContent.split("/").map((v) => Number.parseInt(v))
  
      // Update values
      const newSeated = Math.min(seated + 1, seatedMax)
      const newTotal = Math.min(total + 1, totalMax)
      const newPercentage = (newTotal / totalMax) * 100
  
      // Update DOM
      seatedValue.textContent = `${newSeated}/${seatedMax}`
      totalValue.textContent = `${newTotal}/${totalMax}`
      occupancyProgress.style.width = `${newPercentage}%`
    }
  
    // Show trip summary
    function showTripSummary() {
      const overlay = document.createElement("div")
      overlay.className = "trip-summary-overlay"
      overlay.innerHTML = `
        <div class="trip-summary-container">
          <div class="summary-header">
            <h2>Trip Summary</h2>
            <div class="trip-id">Trip ID: BUS-42-789</div>
          </div>
          
          <div class="summary-stats">
            <div class="stat-item">
              <div class="stat-value">38</div>
              <div class="stat-label">Total Passengers</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">₹456</div>
              <div class="stat-label">Revenue</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">4.2h</div>
              <div class="stat-label">Trip Duration</div>
            </div>
          </div>
          
          <div class="summary-details">
            <div class="detail-row">
              <div class="detail-label">Start Time</div>
              <div class="detail-value">09:30 AM</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">End Time</div>
              <div class="detail-value">01:42 PM</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Total Stops</div>
              <div class="detail-value">12</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Distance</div>
              <div class="detail-value">32 km</div>
            </div>
          </div>
          
          <button class="btn primary start-new-trip-btn">Start New Trip</button>
        </div>
      `
  
      document.body.appendChild(overlay)
  
      setTimeout(() => {
        overlay.style.opacity = "1"
      }, 10)
  
      // Add styles
      const style = document.createElement("style")
      style.textContent = `
        .trip-summary-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .trip-summary-container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 30px;
          width: 90%;
          max-width: 450px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .summary-header {
          margin-bottom: 25px;
        }
        
        .summary-header h2 {
          margin-bottom: 5px;
        }
        
        .summary-stats {
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
        }
        
        .stat-item {
          text-align: center;
          flex: 1;
        }
        
        .stat-value {
          color: white;
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 5px;
        }
        
        .stat-label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }
        
        .summary-details {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 25px;
        }
        
        .start-new-trip-btn {
          width: 100%;
        }
      `
      document.head.appendChild(style)
  
      // Start new trip button
      const startNewTripBtn = overlay.querySelector(".start-new-trip-btn")
      startNewTripBtn.addEventListener("click", () => {
        overlay.style.opacity = "0"
        setTimeout(() => {
          overlay.remove()
          window.location.reload()
        }, 300)
      })
    }
  
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
  
  