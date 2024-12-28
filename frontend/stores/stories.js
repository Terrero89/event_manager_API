import { defineStore } from "pinia";

export const useStoryStore = defineStore("stories", {
  state: () => ({
    stories: 'stories',
    double: [],
    URL: "http://localhost:8080/api/v1/stories",
  }),
  actions: {

    // async fetchStories() {
    //   const response = await fetch(this.URL);
    //   const responseData = await response.json();
    //   this.cities = responseData;

    //   if (!response.ok) {
    //     const error = new Error(responseData.message || "Failed to fetch!");
    //     throw error;
    //   }

    //   const cityList = [];

    //   for (const key in this.cities) {
    //     if (this.cities[key]) {
    //       // Check if city data exists
    //       const newCity = {
    //         cityID: key,
    //         ...this.cities[key],
    //       };
    //       cityList.push(newCity);
    //     }
    //   }
    //   this.cities = cityList;
    // },

    actions: {
      async fetchData() {
        try {
          const response = await $fetch(this.URL); // Replace with your API endpoint
          this.double = response;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
    },
  },
});

