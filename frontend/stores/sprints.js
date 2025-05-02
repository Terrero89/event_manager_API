import { defineStore } from "pinia";

export const useSprintStore = defineStore({
  id: "sprint",
  state: () => ({
    URL_2: "https://project-manager-app-f9829-default-rtdb.firebaseio.com/sprints.json",
    URL: "http://localhost:8080/api/v1/sprints",
    items: [],
    currentSprint:'',
    sprintList: [],
  }),
  actions: {
    async fetchSprints() {
      const response = await fetch(this.URL_2);
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
             id: key,
            ...this.items[key],
          };
          itemsList.push(newItem);
        }
      }
      this.items = itemsList;
      this.sprintList = itemsList.map((item) => item.sprintID);
      this.currentSprint = this.sprintList.reverse()[0];
     },

     async addSprint(data) {
      this.isLoading = true; // Start loading

      try {
        const response = await fetch(
          this.URL_2,
          {
            method: "POST",
            body: JSON.stringify({ ...data }),
          }
        );
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

      async deleteSprint(itemID) {
        const url = `https://project-manager-app-f9829-default-rtdb.firebaseio.com/sprints/${itemID}.json`
        let response = await fetch(url,
          {
            method: "DELETE",
            "Content-type": "application/json",
          }
        );
        if (!response.ok) {
          console.log("Error, request failed");
        }
  
      },
  

    async updateSprint(cityID, payload) {
      const url = `https://project-manager-app-f9829-default-rtdb.firebaseio.com/sprints/${cityID}.json`;
      const options = {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(payload),
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to update city");
        }

        // Ensure the response contains the updated data
        const updatedCity = await response.json();

        // Update the local state after a successful update
        const index = this.items.findIndex((city) => city.id === cityID);
        if (index !== -1) {
          // Use the returned data from Firebase to ensure consistency
          this.items[index] = { id: cityID, ...updatedCity };
        }
      } catch (error) {
        console.error("Error updating city:", error);
      }
    },
  },
  getters: {

    itemsAsArray: (state) => {
      return state.items;
    },

    //finds item based on parentDestinationID
    filterItemById(state) {
      const note = this.itemsAsArray.filter((item) => item.id);
      return (id) => note.filter((data) => data.id === id);
    },
    // listOfId(state) {
    //   const note = this.itemsAsArray.map((item) => item.id);
    //   this.sprintList = note;
    //   return note
    // },
  },
});
