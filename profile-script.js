document.addEventListener("DOMContentLoaded", () => {
    // Edit profile button
    const editProfileBtn = document.querySelector(".edit-profile-btn")
    editProfileBtn.addEventListener("click", () => {
      showNotification("Edit profile feature coming soon!", "info")
    })
    
    // Avatar edit button
    const avatarEditBtn = document.querySelector(".avatar-edit-btn")
    avatarEditBtn.addEventListener("click", () => {
      showNotification("Profile photo upload coming soon!", "info")
    })
    
    // Setting buttons
    const settingBtns = document.querySelectorAll(".setting-btn")
    settingBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const settingName = btn.closest(".setting-item").querySelector(".setting-name").textContent
        showNotification(`${settingName} settings coming soon!`, "info")
      })
    })
    
    // Logout button
    const logoutBtn = document.querySelector(".logout-btn")
    logoutBtn.addEventListener("click", () => {
      // Show confirmation dialog
      if (confirm("Are you sure you want to logout?")) {
        // Show loading on button
        logoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging out...'
        logoutBtn.disabled = true
        
        // Simulate logout
        setTimeout(() => {
          window.location.href = "index.html"
        }, 1500)
      }
    })
    
    // Add active class to current nav item
    const currentPage = window.location.pathname.split("/").pop() || "home.html"
    const navItems = document.querySelectorAll(".nav-item")
    navItems.forEach(item => {
      const href = item.getAttribute("href")
      if (href === currentPage) {
        item.classList.add("active")
      }
    })
    
    // Notification function
    function showNotification(message, type) {
      // Create notification element
      const notification = document.createElement("div")
      notification.className = `notification ${type}`
      notification.innerHTML = `
        <div class="notification-content">
          <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle"}"></i>
          <span>${message}</span>
        </div>
        <button class="notification-close">
          <i class="fas fa-times"></i>
        </button>
      `
  
      // Add to body
      document.body.appendChild(notification)
  
      // Add close button functionality
      const closeBtn = notification.querySelector(".notification-close")
      closeBtn.addEventListener("click", () => {
        notification.classList.remove("show")
        setTimeout(() => {
          notification.remove()
        }, 300)
      })
  
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
      }, 5000)
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
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transform: translateX(120%);
          transition: transform 0.3s ease;
          z-index: 1000;
          display: flex;
          align-items: center;
          min-width: 300px;
        }
        
        .notification.show {
          transform: translateX(0);
        }
        
        .notification-content {
          display: flex;
          align-items: center;
          flex: 1;
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
        
        .notification.info i {
          color: #4361ee;
        }
        
        .notification-close {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          padding: 5px;
          margin-left: 10px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .notification-close:hover {
          background: rgba(0, 0, 0, 0.1);
          color: #333;
        }
      `
      document.head.appendChild(notificationStyles)
    }
    
    // Add animations to profile cards
    const profileCards = document.querySelectorAll(".profile-card")
    profileCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      }, 100 * (index + 1))
    })
  })