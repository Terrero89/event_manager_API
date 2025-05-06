import { defineStore } from "pinia";

export const useStoryStore = defineStore({
  id: "story",
  state: () => ({
    items: [],
    URL: "http://localhost:8080/api/v1/stories",
    URL_2:
      "https://project-manager-app-f9829-default-rtdb.firebaseio.com/stories.json",
  }),
  actions: {
    async fetchStories() {
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
    },
    async addStory(data) {
      try {
        const response = await fetch(this.URL_2, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data }),
        });
        if (!response.ok) {
          throw new Error("Failed to add event");
        }

        // No need to generate a unique ID here, data is stored directly
      } catch (error) {
        console.error("Failed to add story:", error);
      } finally {
      }
    },
    async deleteStory(itemID) {
      const url = `https://project-manager-app-f9829-default-rtdb.firebaseio.com/stories/${itemID}.json`;
      let response = await fetch(url, {
        method: "DELETE",
        "Content-type": "application/json",
      });
      if (!response.ok) {
        console.log("Error, request failed");
      }
    },

    async updateStory(itemID, payload) {
      const url = `https://project-manager-app-f9829-default-rtdb.firebaseio.com/stories/${itemID}.json`;
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
        const index = this.items.findIndex((city) => city.id === itemID);
        if (index !== -1) {
          // Use the returned data from Firebase to ensure consistency
          this.items[index] = { id: itemID, ...updatedCity };
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
      const story = this.items.filter((item) => item.id);
      return (id) => story.filter((data) => data.id === id);
    },
  },
});
