    document.getElementById("loginForm").addEventListener("submit", async function (e) {
        e.preventDefault(); 

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorDiv = document.getElementById("errorMessage");
        const successDiv = document.getElementById("successMessage");

        errorDiv.classList.add("hidden");
        successDiv.classList.add("hidden");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            errorDiv.textContent = "Please enter a valid email address.";
            errorDiv.classList.remove("hidden");
            return;
        }

        if (password.length < 6) {
            errorDiv.textContent = "Password must be at least 6 characters.";
            errorDiv.classList.remove("hidden");
            return;
        }

        // Set admin user in localStorage
        const adminUser = {
            email: email,
            name: "Admin",
            role: "admin"
        };
        localStorage.setItem("currentUser", JSON.stringify(adminUser));

        // Load initial data from db.json using the data-loader
        try {
            if (typeof loadDataFromDB === 'function') {
                await loadDataFromDB();
            } else {
                await loadInitialData();
            }
        } catch (err) {
            console.error("Failed to load data:", err);
        }

        alert("Login Successful!");
        window.location.href = "dashboard.html";
    });
function closeForm (){
    window.location.href = "index.html";
}

// Function to load initial data from db.json
async function loadInitialData() {
    try {
        const res = await fetch(`${API_BASE}/shipments`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const shipments = await res.json();
        // Always load fresh data from backend
        localStorage.setItem("shipments", JSON.stringify(shipments));
        console.log("Loaded shipments:", shipments.length);
    } catch (err) {
        console.error("Failed to load initial data from backend:", err);
        // Fallback: Load some sample data
        const fallbackData = [
            {
                "id": "1",
                "trackingNumber": "ABC123",
                "sender": "Alice",
                "recipient": "Bob",
                "status": "In Transit",
                "currentLocation": "Hyderabad",
                "estimatedDelivery": "2025-07-05"
            },
            {
                "id": "2",
                "trackingNumber": "DEF456",
                "sender": "Charlie",
                "recipient": "Dave",
                "status": "Pending",
                "currentLocation": "Chennai",
                "estimatedDelivery": "2025-07-10"
            },
            {
                "id": "3",
                "trackingNumber": "GHI789",
                "sender": "Eve",
                "recipient": "Frank",
                "status": "Delivered",
                "currentLocation": "Bangalore",
                "estimatedDelivery": "2025-06-25"
            }
        ];
        localStorage.setItem("shipments", JSON.stringify(fallbackData));
        console.log("Loaded fallback data:", fallbackData.length);
    }
}

    