import { defineStore } from "pinia";

export const useStoryStore = defineStore("stories", {
  state: () => ({
    stories: 'stories',
    double: [],
    URL: "http://localhost:8080/api/v1/stories",
  }),
  actions: {

    async fetchStories() {
        fetch(this.URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Returns a promise
      })
      .then((data) => {
        // console.log('Parsed JSON data:', data);
        this.stories= data;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    },
  },

});

