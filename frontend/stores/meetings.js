import { defineStore } from "pinia";

export const useMeetingStore = defineStore({
  id: "meetings",
  state: () => ({
    URL: "http://localhost:8080/api/v1/meetings",
    URL_2:
      "https://project-manager-app-f9829-default-rtdb.firebaseio.com/meetings.json",
    meetings: [],
  }),
  actions: {
    async fetchMeetings() {
      const response = await fetch(this.URL_2);
      const responseData = await response.json();
      this.meetings = responseData;

      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to fetch!");
        throw error;
      }

      const meetingList = [];

      for (const key in this.meetings) {
        if (this.meetings[key]) {
          const newNote = {
            id: key,
            ...this.meetings[key],
          };
          meetingList.push(newNote);
        }
      }
      this.meetings = meetingList;
    },
    async addMeeting(data) {
      this.isLoading = true; // Start loading

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
