import { defineStore } from "pinia";

export const useStoryStore = defineStore({
  id: "story",
  state: () => ({
    items: [],
    double: [],
    URL: "http://localhost:8080/api/v1/stories",
    URL_2: "https://project-manager-app-f9829-default-rtdb.firebaseio.com/stories.json",
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
}});


