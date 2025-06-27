import { defineStore } from "pinia";

export const useMeetingStore = defineStore({
  id: "meetings",
  state: () => ({

    meetings: [],
  }),
  actions: {
    async fetchMeetings() {
  const config = useRuntimeConfig();
    const auth = useAuthStore();
  try {
    const response = await fetch(`${config.public.apiBase}/meetings`, {
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
    this.meetings = data;
    return data;

  } catch (error) {
    console.error("Failed to fetch events:", error);
    return null;
  }
},
    async addMeeting(data) {
        const config = useRuntimeConfig();
        const auth = useAuthStore();
      try {
        const response = await fetch(`${config.public.apiBase}/meetings`, {
          method: "POST",
          body: JSON.stringify({ ...data }),
          headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`, // ← include token
        },
        });

        if (!response.ok) {
          throw new Error("Failed to add meeting");
        }
      } catch (error) {
        console.error("Failed to add meeting:", error);
      }
    },
    async deleteMeeting(itemID) {
  const config = useRuntimeConfig();
  const auth = useAuthStore();
  const url = `${config.public.apiBase}/meetings/${itemID}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json",
      Authorization: `Bearer ${auth.token}`, // ← include token
    },
    });

    if (!response.ok) {
      console.error("Error, request failed");
      return;
    }

    // ✅ Update local state after deletion
    this.meetings = this.meetings.filter((event) => event._id !== itemID);
  } catch (error) {
    console.error("Error deleting Event:", error);
  }
},

    async updateMeeting(itemID, payload) {
  const config = useRuntimeConfig();
  const auth = useAuthStore();
  const url = `${config.public.apiBase}/meetings/${itemID}`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`, // ← include token
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to update meeting: ${response.status} ${response.statusText}`);
    }

    const updatedEvent = await response.json();

    // ✅ Update local Pinia state directly
    const index = this.events.findIndex((event) => event._id === itemID);
    if (index !== -1) {
      this.events[index] = updatedEvent;
    }
  } catch (error) {
    console.error("Error updating meeting:", error);
  }
},
  },
  getters: {
    itemsAsArray: (state) => {
      return state.meetings;
    },

    //finds item based on parentDestinationID
  
  filterItemById: (state) => (id) => {
      return state.meetings.filter((item) => item._id === id);
    },
    filterMeetings: (state) => (nameFilter, typeFilter, startDate, endDate, statusFilter) => {
  let filteredItems = state.meetings;

  if (nameFilter) {
    filteredItems = filteredItems.filter((item) =>
      item.meetingName.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }

  if (typeFilter) {
  filteredItems = filteredItems.filter(
      (item) => item.meetingType === typeFilter
    );
  }

  if (startDate && endDate) {
    // Filter between start and end date
    filteredItems= filteredItems.filter((item) => {
      const eventDate = new Date(item.date);
      return (
        eventDate >= new Date(startDate) && eventDate <= new Date(endDate)
      );
    });
  } else if (startDate) {
    // Filter by only the startDate
    filteredItems= filteredItems.filter((item) => {
      const eventDate = new Date(item.date);
      return eventDate.toISOString().slice(0, 10) === startDate;
    });
  } else if (endDate) {
    // Filter by only the endDate
    filteredItems= filteredItems.filter((item) => {
      const eventDate = new Date(item.date);
      return eventDate.toISOString().slice(0, 10) === endDate;
    });
  }

  if (statusFilter) {
    filteredItems = filteredItems.filter(
      (item) => item.status === statusFilter
    );
  }

  return filteredItems;
},

totalFilteredMeetingStats: () => (items) => {
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
    pendingCount,
  };

  },
  },
});
