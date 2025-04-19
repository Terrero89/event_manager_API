import { defineStore } from "pinia";

export const useEventStore = defineStore({
  id: "events",
  state: () => ({
    URL: "http://localhost:8080/api/v1/events",
    URL_2: `https://project-manager-app-f9829-default-rtdb.firebaseio.com/events.json`,
    events: [],
   
  }),
  actions: {
    async fetchEvents() {
      const response = await fetch(this.URL_2);
      const responseData = await response.json();
      this.events = responseData;

      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to fetch!");
        throw error;
      }

      const eventList = [];

      for (const key in this.events) {
        if (this.events[key]) {
          // Check if city data exists
          const newEvent = {
            id: key,
            ...this.events[key],
          };
          eventList.push(newEvent);
        }
      }
      this.events = eventList;
    },
    async addEvent(data) {
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
        console.error("Failed to add Event:", error);
      } finally {
      }
    },
    async deleteEvent(itemID) {
       const url = `https://project-manager-app-f9829-default-rtdb.firebaseio.com/events/${itemID}.json`
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
    
    async updateEvent(eventID, payload) {
      const url = `https://project-manager-app-f9829-default-rtdb.firebaseio.com/events/${eventID}.json`;
      const options = {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(payload),
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to update Event");
        }

        // Ensure the response contains the updated data
        const updatedEvent = await response.json();

        // Update the local state after a successful update
        const index = this.events.findIndex((event) => event.id === eventID);
        if (index !== -1) {
          // Use the returned data from Firebase to ensure consistency
          this.events[index] = { id: eventID, ...updatedEvent };
        }
      } catch (error) {
        console.error("Error updating Event:", error);
      }
    },
  },
  getters: {

    
       itemsAsArray: (state) => {
          return state.events;
        },
    
        //finds item based on parentDestinationID
        filterItemById(state) {
          const note = this.itemsAsArray.filter((item) => item.id);
          return (id) => note.filter((data) => data.id === id);
        },
    
  },
});
