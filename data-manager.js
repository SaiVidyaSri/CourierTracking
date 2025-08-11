// Utility functions for saving data to db.json
class DataManager {
    static async saveToFile(data) {
        try {
            // In a real application, this would send data to a backend server
            // For now, we'll simulate by updating localStorage and providing instructions
            
            localStorage.setItem("shipments", JSON.stringify(data.shipments));
            
            // Create a downloadable file for manual update
            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = 'db.json';
            
            // Show instructions to user
            const updateInstructions = `
Data has been saved to localStorage. 
To persist permanently:
1. A new db.json file will download automatically
2. Replace your current db.json with the downloaded file
3. Restart the web server

This will make your changes permanent across all sessions.
            `;
            
            if (confirm(updateInstructions + "\n\nDownload updated db.json now?")) {
                link.click();
            }
            
            console.log("Data saved successfully");
            return true;
        } catch (error) {
            console.error("Error saving data:", error);
            return false;
        }
    }
    
    static async loadFromFile() {
        try {
            const response = await fetch('db.json');
            if (!response.ok) throw new Error('Failed to load db.json');
            return await response.json();
        } catch (error) {
            console.error("Error loading data:", error);
            return { shipments: [] };
        }
    }
    
    static mergeWithLocalStorage() {
        // Merge db.json data with localStorage modifications
        const localShipments = JSON.parse(localStorage.getItem("shipments")) || [];
        return { shipments: localShipments };
    }
}

// Auto-export updated data when shipments change
window.DataManager = DataManager;
