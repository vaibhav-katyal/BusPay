document.addEventListener("DOMContentLoaded", () => {
  // Initialize Firebase (replace with your actual Firebase config)
  const firebaseConfig = {
    apiKey: "AIzaSyDPoQCAzB9QuXadZbeq3HjD2m-QdRvoXDo",
    authDomain: "buspay-5eaf8.firebaseapp.com",
    projectId: "buspay-5eaf8",
    storageBucket: "buspay-5eaf8.firebasestorage.app",
    messagingSenderId: "1061744556689",
    appId: "1:1061744556689:web:c09203a5ae9e163df21d30"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Get Firebase auth and database references
  const auth = firebase.auth();
  const db = firebase.firestore();

  // Check if user is logged in
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is logged in, update UI
      updateUserInfo(user);
      
      // Show the glass card with animation
      const bookingCard = document.querySelector(".booking-card");
      bookingCard.style.opacity = "1";
      bookingCard.style.transform = "translateY(0)";
    } else {
      // User is not logged in, redirect to login page
      window.location.href = "index.html";
    }
  });
  
  // Update user info in dropdown
  function updateUserInfo(user) {
    const userName = document.getElementById("user-name");
    const userEmail = document.getElementById("user-email");
    
    userName.textContent = user.displayName || "User";
    userEmail.textContent = user.email || "";
    
    // Get additional user data from Firestore
    db.collection("users").doc(user.uid).get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          if (userData.name) {
            userName.textContent = userData.name;
          }
        }
      })
      .catch((error) => {
        console.error("Error getting user data:", error);
      });
  }
  
  // Profile dropdown toggle
  const profileDropdownBtn = document.getElementById("profile-dropdown-btn");
  const profileDropdown = document.querySelector(".profile-dropdown");
  
  profileDropdownBtn.addEventListener("click", () => {
    profileDropdown.classList.toggle("active");
  });
  
  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!profileDropdown.contains(e.target) && profileDropdown.classList.contains("active")) {
      profileDropdown.classList.remove("active");
    }
  });
  
  // Logout functionality
  const logoutBtn = document.getElementById("logout-btn");
  
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    
    try {
      await auth.signOut();
      showNotification("Logged out successfully!", "success");
      
      // Redirect to login page
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } catch (error) {
      showNotification("Error logging out. Please try again.", "error");
    }
  });

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
    
    // If both fields have values, search for buses
    if (startingPoint && destination) {
      simulateBusSearch()
    }
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

      // Reset bus items animation
      const busItems = document.querySelectorAll(".bus-item")
      busItems.forEach((item) => {
        item.style.animation = 'none'
        item.offsetHeight // Trigger reflow
        item.style.animation = null
      })
    }, 2000)
  }

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

    // Show loading on button
    const bookBtn = document.querySelector(".book-btn");
    bookBtn.classList.add("loading");
    bookBtn.disabled = true;

    // Get current user
    const user = auth.currentUser;
    if (!user) {
      showNotification("You must be logged in to book a ticket", "error");
      bookBtn.classList.remove("loading");
      bookBtn.disabled = false;
      return;
    }

    // Get selected bus details
    const busRoute = selectedBus.querySelector(".bus-route").textContent;
    const busPrice = selectedBus.querySelector(".bus-price").textContent;
    const ticketType = document.querySelector('input[name="ticket-type"]:checked').value;

    // Save ticket to Firestore
    db.collection("tickets").add({
      userId: user.uid,
      startingPoint: startingPoint,
      destination: destination,
      busRoute: busRoute,
      price: busPrice,
      ticketType: ticketType,
      status: "pending",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      showNotification("Ticket booked successfully!", "success");
      
      // Proceed to payment page
      setTimeout(() => {
        window.location.href = "payment.html";
      }, 1500);
    })
    .catch((error) => {
      showNotification("Error booking ticket: " + error.message, "error");
      bookBtn.classList.remove("loading");
      bookBtn.disabled = false;
    });
  });

  // Auto-search when both fields have values
  const startingPointInput = document.getElementById("starting-point")
  const destinationInput = document.getElementById("destination")
  
  function checkInputs() {
    if (startingPointInput.value && destinationInput.value) {
      simulateBusSearch()
    }
  }
  
  startingPointInput.addEventListener("change", checkInputs)
  destinationInput.addEventListener("change", checkInputs)

  // Notification function
  function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : type === "warning" ? "fa-exclamation-triangle" : "fa-info-circle"}"></i>
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

    // Remove notification after 5 seconds
    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => {
        notification.remove()
      }, 300)
    }, 5000)
  }
  
  // Add active class to current nav item
  const currentPage = window.location.pathname.split("/").pop() || "home.html"
  const navItems = document.querySelectorAll(".nav-item")
  navItems.forEach(item => {
    const href = item.getAttribute("href")
    if (href === currentPage) {
      item.classList.add("active")
    }
  })
})