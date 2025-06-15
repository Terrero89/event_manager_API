import { defineStore } from "pinia";
import {CONFIG} from '../config/globalLinks'

export const useEventStore = defineStore({
  id: "events",
  state: () => ({
    URL: "http://localhost:8080/api/v1/events",
    URL_2: `https://project-manager-app-f9829-default-rtdb.firebaseio.com/events.json`,
    events: [],

  }),
  actions: {
async fetchEvents(){
  const config = useRuntimeConfig();
  try {
    const response = await fetch(`${config.public.apiBase}/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    this.events = data;
    return data;

  } catch (error) {
    console.error("Failed to fetch events:", error);
    return null;
  }
},
    async addEvent(data){
        const config = useRuntimeConfig();
      try {
        const response = await fetch(`${config.public.apiBase}/events`, {
          method: "POST",
          body: JSON.stringify({ ...data }),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to add event");
        }
      } catch (error) {
        console.error("Failed to add event:", error);
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

    // ON HOLD For NEXT CHANGES

   
    filterEventsByEventType: (state) => (byCategory) => {
      // Step 1: Filter by destination ID (parentDestinationID)
      let currEvents = state.events;
      if (byCategory === "ERG Meeting") {
        currEvents = currEvents.filter((data) => data.eventType === "ERG Meeting");
      }
      if (byCategory === "Volunteering") {
        currEvents = currEvents.filter((data) => data.eventType === "Volunteering");
      }
      if (byCategory === "Contribution") {
        currEvents = currEvents.filter((data) => data.eventType === "Contribution");
      }
      if (byCategory === "Training") {
        currEvents = currEvents.filter((data) => data.eventType === "Training");
      }
      if (byCategory === "Company") {
        currEvents = currEvents.filter((data) => data.eventType === "Company");
      }
      if (byCategory === "Networking") {
        currEvents = currEvents.filter((data) => data.eventType === "Networking");
      }
      if (byCategory === "Personal Development") {
        currEvents = currEvents.filter((data) => data.eventType === "Personal Development");
      }
      if (byCategory === "Professional Development") {
        currEvents = currEvents.filter((data) => data.eventType === "Professional Development");
      }
      if (byCategory === "Mentorship Program") {
        currEvents = currEvents.filter((data) => data.eventType === "Mentorship Program");
      }
      if (byCategory === "Presentation") {
        currEvents = currEvents.filter((data) => data.eventType === "Presentation");
      }
      return currEvents;
    },

       filterEventsByInput: (state) => (inputValue) => {
       if (!state.events) return state.events;
      return state.events.filter((item) => 
        item.eventName.toLowerCase().includes(inputValue.toLowerCase())
      );
    },



filterEvents: (state) => (nameFilter, typeFilter, startDate, endDate, statusFilter) => {
  let filteredEvents = state.events;

  if (nameFilter) {
    filteredEvents = filteredEvents.filter((item) =>
      item.eventName.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }

  if (typeFilter) {
    filteredEvents = filteredEvents.filter(
      (item) => item.eventType === typeFilter
    );
  }

  if (startDate && endDate) {
    // Filter between start and end date
    filteredEvents = filteredEvents.filter((item) => {
      const eventDate = new Date(item.date);
      return (
        eventDate >= new Date(startDate) && eventDate <= new Date(endDate)
      );
    });
  } else if (startDate) {
    // Filter by only the startDate
    filteredEvents = filteredEvents.filter((item) => {
      const eventDate = new Date(item.date);
      return eventDate.toISOString().slice(0, 10) === startDate;
    });
  } else if (endDate) {
    // Filter by only the endDate
    filteredEvents = filteredEvents.filter((item) => {
      const eventDate = new Date(item.date);
      return eventDate.toISOString().slice(0, 10) === endDate;
    });
  }

  if (statusFilter) {
    filteredEvents = filteredEvents.filter(
      (item) => item.status === statusFilter
    );
  }

  return filteredEvents;
},
totalFilteredStats: () => (items) => {
  const totalDuration = items.reduce(
    (sum, item) => sum + (Number(item.duration) || 0),
    0
  );

  const totalItems = items.length;

  const completedCount = items.filter(
    (item) => item.status === "Completed"
  ).length;

    const pendingCount = items.filter(
    (item) => item.status === "Pending"
  ).length;

  return {
    totalDuration,
    totalItems,
    completedCount,
    pendingCount 
  };

  },
  },
  });
