import { defineStore } from "pinia";

export const useSprintStore = defineStore({
  id: "sprint",
  state: () => ({
    URL: "http://localhost:8080/api/v1/sprints",
    items: [],
    currentSprint:'',
    sprintList: [],
  }),
  actions: {
// REFACTOR FOR LATER
async saveCurrentSprintToLocalStorage(current) {
    try {
      // Update Pinia state
      this.currentSprint = current;
  
      // Retrieve sprint list from localStorage or initialize it
      let existingSprints = [];
  
      const stored = localStorage.getItem("sprintList");
      if (stored) {
        existingSprints = JSON.parse(stored);
      }
  
      // Only add if not already included
      if (!existingSprints.includes(current)) {
        existingSprints.push(current);
      }
  
      // Save both to localStorage
      localStorage.setItem("currentSprint", current);
      localStorage.setItem("sprintList", JSON.stringify(existingSprints));
  
      // (Optional) Update in-store sprintList too if you're using it
      this.sprintList = existingSprints;
  
      console.log("✅ currentSprint saved:", current);
      console.log("✅ sprintList in localStorage:", existingSprints);
  
    } catch (error) {
      console.error("❌ Failed to save to localStorage:", error);
    }
  },
      loadCurrentSprintFromLocalStorage() {
        try {
          const savedSprint = localStorage.getItem("currentSprint");
          if (savedSprint) {
            this.currentSprint = savedSprint;
            console.log("Loaded currentSprint from localStorage:", savedSprint);
            return savedSprint;
           
          }
        } catch (error) {
          console.error("Failed to load from localStorage:", error);
        }
      },
      loadSprintListFromLocalStorage() {
        try {
          const savedSprint = localStorage.getItem("sprintList");
          if (savedSprint) {
            this.currentSprint = savedSprint;
            console.log("Loaded currentSprint from localStorage:", savedSprint);
            return savedSprint;
           
          }
        } catch (error) {
          console.error("Failed to load from localStorage:", error);
        }
      },
      loadFromLocalStorage(key, fallback) {
        try {
          const item = localStorage.getItem(key);
          if (!item) return fallback;
      
          try {
            return JSON.parse(item);
          } catch {
            // If it's not JSON, return it as a plain string
            return item;
          }
        } catch (error) {
          console.error(`❌ Failed to load "${key}" from localStorage:`, error);
          return fallback;
        }
      },
    async addSprint(data) {
      this.isLoading = true; // Start loading
      console.log("DATA:", data);
      try {
       
        const response = await fetch(this.URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
          body: JSON.stringify(data),
       
        },
      
        
        this.currentSprint = data.sprintID);
        this.sprintList.push(data.sprintID);
        if (!response.ok) {
          throw new Error("Failed to add event");
        }

        // No need to generate a unique ID here, data is stored directly
      } catch (error) {
        console.error("Failed to add city:", error);
      } finally {
        this.isLoading = false; // Stop loading
      }
    },
    // async deleteEvent(itemID) {
    //   let response = await fetch(
    //     `https://travel-planning-app-44a08-default-rtdb.firebaseio.com/cities/${itemID}.json`,
    //     {
    //       method: "DELETE",
    //       "Content-type": "application/json",
    //     }
    //   );
    //   if (!response.ok) {
    //     console.log("Error, request failed");
    //   }

    // },
    async fetchSprints() {
      const response = await fetch(this.URL);
      const responseData = await response.json();
      this.items = responseData;

      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to fetch!");
        throw error;
      }

      const itemsList = [];

      for (const key in this.items) {
        if (this.items[key]) {
          // Check if city data exists
          const newItem = {
            ...this.notes[key],
          };
          itemsList.push(newItem);
        }
      }
      this.items = itemsList;
      this.sprintList = itemsList.map((item) => item.sprintID);
      this.currentSprint = itemsList[0].sprintID;
    },

    // async updateEvent(cityID, payload) {
    //   const url = `https://travel-planning-app-44a08-default-rtdb.firebaseio.com/cities/${cityID}.json`;
    //   const options = {
    //     method: "PATCH",
    //     headers: { "Content-type": "application/json" },
    //     body: JSON.stringify(payload),
    //   };

    //   try {
    //     const response = await fetch(url, options);
    //     if (!response.ok) {
    //       throw new Error("Failed to update city");
    //     }

    //     // Ensure the response contains the updated data
    //     const updatedCity = await response.json();

    //     // Update the local state after a successful update
    //     const index = this.cities.findIndex((city) => city.cityID === cityID);
    //     if (index !== -1) {
    //       // Use the returned data from Firebase to ensure consistency
    //       this.cities[index] = { cityID, ...updatedCity };
    //     }
    //   } catch (error) {
    //     console.error("Error updating city:", error);
    //   }
    // },
  },
  getters: {},
});
