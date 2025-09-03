import { defineStore } from "pinia";
import { CONFIG } from '../config/globalLinks'

export const useEventStore = defineStore({
  id: "events",
  state: () => ({
    events: [],

  }),
  actions: {
    async fetchEvents() {
      const config = useRuntimeConfig();
      const auth = useAuthStore();

      try {
        const response = await fetch(`${config.public.apiBase}/events`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`, // ← include token
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
    async addEvent(data) {
      const config = useRuntimeConfig();
      const auth = useAuthStore();

      try {
        const response = await fetch(`${config.public.apiBase}/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ ...data }),
      
        });
        // console.log("TOKE WHEN CREATING EVENT", auth.token);
        if (!response.ok) {
          const errorText = await response.text(); // capture backend error message
          console.error("Server responded with:", response.status, errorText);
          throw new Error("Failed to add event");
        }

        const newEvent = await response.json();
        this.events.push(newEvent);
      } catch (error) {
        console.error("Failed to add event:", error);
      }
    },
    async deleteEvent(itemID) {
      const config = useRuntimeConfig();
        const auth = useAuthStore();

      const url = `${config.public.apiBase}/events/${itemID}`;
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          }
        });

        if (!response.ok) {
          console.error("Error, request failed");
          return;
        }

        // ✅ Update local state after deletion
        this.events = this.events.filter((event) => event._id !== itemID);
      } catch (error) {
        console.error("Error deleting Event:", error);
      }
    },

    async updateEvent(itemID, payload) {
      const config = useRuntimeConfig();
          const auth = useAuthStore();
      const url = `${config.public.apiBase}/events/${itemID}`;

      try {
        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Failed to update event: ${response.status} ${response.statusText}`);
        }

        const updatedEvent = await response.json();

        // ✅ Update local Pinia state directly
        const index = this.events.findIndex((event) => event._id === itemID);
        if (index !== -1) {
          this.events[index] = updatedEvent;
        }
      } catch (error) {
        console.error("Error updating event:", error);
      }
    },
  },
  getters: {


    itemsAsArray: (state) => {
      return state.events;
    },

    //refactored
    filterItemById: (state) => (id) => {
      return state.events.filter((item) => item._id === id);
    },


filterEventsByEventType: (state) => (byCategory) => {
      return state.events.filter((data) => data.eventType === byCategory);
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
