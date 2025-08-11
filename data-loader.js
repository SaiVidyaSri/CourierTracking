// Load data from db.json for admin interface
async function loadDataFromDB() {
    try {
        console.log("Attempting to load data from backend API...");
        const response = await fetch(`${API_BASE}/shipments`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const shipments = await response.json();
        
        // Get any locally added/modified shipments
        const localShipments = JSON.parse(localStorage.getItem("localShipments")) || [];
        const localDeleted = JSON.parse(localStorage.getItem("deletedShipments")) || [];
        
        // Remove deleted shipments
        shipments = shipments.filter(s => !localDeleted.includes(s.id));
        
        // Add/update local shipments
        localShipments.forEach(localShipment => {
            const existingIndex = shipments.findIndex(s => s.id === localShipment.id);
            if (existingIndex !== -1) {
                // Update existing shipment
                shipments[existingIndex] = localShipment;
            } else {
                // Add new shipment
                shipments.push(localShipment);
            }
        });
        
        // Save merged data to localStorage
        localStorage.setItem("shipments", JSON.stringify(shipments));
        console.log(`Successfully loaded and merged ${shipments.length} shipments`);
        
        return shipments;
    } catch (error) {
        console.error("Failed to load from db.json:", error);
        
        // If fetch fails, use the complete fallback data and merge with local
        const fallbackData = {
            "shipments": [
                {
                    "trackingNumber": "ABC123",
                    "sender": "Alice",
                    "recipient": "Bob",
                    "status": "In Transit",
                    "currentLocation": "Hyderabad",
                    "estimatedDelivery": "2025-07-05",
                    "id": "1"
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
                },
                {
                    "id": "4",
                    "trackingNumber": "JKL012",
                    "sender": "Grace",
                    "recipient": "Heidi",
                    "status": "In Transit",
                    "currentLocation": "Mumbai",
                    "estimatedDelivery": "2025-07-08"
                },
                {
                    "id": "5",
                    "trackingNumber": "MNO345",
                    "sender": "Ivan",
                    "recipient": "Judy",
                    "status": "Pending",
                    "currentLocation": "Delhi",
                    "estimatedDelivery": "2025-07-12"
                },
                {
                    "id": "6",
                    "trackingNumber": "PQR678",
                    "sender": "Karl",
                    "recipient": "Laura",
                    "status": "Delivered",
                    "currentLocation": "Pune",
                    "estimatedDelivery": "2025-06-22"
                },
                {
                    "id": "7",
                    "trackingNumber": "STU901",
                    "sender": "Mallory",
                    "recipient": "Niaj",
                    "status": "In Transit",
                    "currentLocation": "Kolkata",
                    "estimatedDelivery": "2025-07-15"
                },
                {
                    "id": "8",
                    "trackingNumber": "VWX234",
                    "sender": "Olivia",
                    "recipient": "Peggy",
                    "status": "Pending",
                    "currentLocation": "Ahmedabad",
                    "estimatedDelivery": "2025-07-18"
                },
                {
                    "id": "9",
                    "trackingNumber": "YZA567",
                    "sender": "Quentin",
                    "recipient": "Rupert",
                    "status": "Delivered",
                    "currentLocation": "Jaipur",
                    "estimatedDelivery": "2025-06-20"
                },
                {
                    "id": "10",
                    "trackingNumber": "BCD890",
                    "sender": "Sybil",
                    "recipient": "Trudy",
                    "status": "In Transit",
                    "currentLocation": "Lucknow",
                    "estimatedDelivery": "2025-07-20"
                },
                {
                    "id": "11",
                    "trackingNumber": "EFG123",
                    "sender": "Uma",
                    "recipient": "Victor",
                    "status": "Pending",
                    "currentLocation": "Coimbatore",
                    "estimatedDelivery": "2025-07-22"
                },
                {
                    "id": "12",
                    "trackingNumber": "HIJ456",
                    "sender": "Wendy",
                    "recipient": "Xavier",
                    "status": "Delivered",
                    "currentLocation": "Bhopal",
                    "estimatedDelivery": "2025-06-18"
                },
                {
                    "id": "13",
                    "trackingNumber": "KLM789",
                    "sender": "Yvonne",
                    "recipient": "Zack",
                    "status": "In Transit",
                    "currentLocation": "Nagpur",
                    "estimatedDelivery": "2025-07-25"
                },
                {
                    "id": "14",
                    "trackingNumber": "NOP012",
                    "sender": "Aaron",
                    "recipient": "Becky",
                    "status": "Pending",
                    "currentLocation": "Surat",
                    "estimatedDelivery": "2025-07-28"
                },
                {
                    "id": "15",
                    "trackingNumber": "QRS345",
                    "sender": "Catherine",
                    "recipient": "Derek",
                    "status": "Delivered",
                    "currentLocation": "Vadodara",
                    "estimatedDelivery": "2025-06-15"
                },
                {
                    "id": "eb33",
                    "trackingNumber": "18888",
                    "sender": "kiran",
                    "recipient": "vbnm",
                    "status": "Pending",
                    "currentLocation": "chennai",
                    "estimatedDelivery": "2025-07-12"
                },
                {
                    "trackingNumber": "5000",
                    "sender": "krishna",
                    "recipient": "donthagani sai vidya sri",
                    "status": "Delivered",
                    "currentLocation": "tirupati",
                    "estimatedDelivery": "2025-06-27",
                    "id": "5b85"
                }
            ]
        };
        
        let shipments = fallbackData.shipments;
        
        // Merge with local data
        const localShipments = JSON.parse(localStorage.getItem("localShipments")) || [];
        const localDeleted = JSON.parse(localStorage.getItem("deletedShipments")) || [];
        
        // Remove deleted shipments
        shipments = shipments.filter(s => !localDeleted.includes(s.id));
        
        // Add/update local shipments
        localShipments.forEach(localShipment => {
            const existingIndex = shipments.findIndex(s => s.id === localShipment.id);
            if (existingIndex !== -1) {
                shipments[existingIndex] = localShipment;
            } else {
                shipments.push(localShipment);
            }
        });
        
        localStorage.setItem("shipments", JSON.stringify(shipments));
        console.log(`Loaded ${shipments.length} shipments from fallback data`);
        
        return shipments;
    }
}

// Force load data when this script is included
document.addEventListener('DOMContentLoaded', function() {
    // Auto-load data if we're on admin pages
    if (window.location.pathname.includes('admin') || window.location.pathname.includes('dashboard') || window.location.pathname.includes('shipment')) {
        loadDataFromDB();
    }
    
    // For user interface, ensure data is loaded
    if (window.location.pathname.includes('userinterface')) {
        loadDataFromDB();
    }
});
