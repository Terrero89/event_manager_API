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
    async deleteMeeting(itemID) {
      const url = `https://project-manager-app-f9829-default-rtdb.firebaseio.com/meetings/${itemID}.json`;
      let response = await fetch(url, {
        method: "DELETE",
        "Content-type": "application/json",
      });
      if (!response.ok) {
        console.log("Error, request failed");
      }
    },

    async updateMeeting(itemID, payload) {
      const url = `https://project-manager-app-f9829-default-rtdb.firebaseio.com/meetings/${itemID}.json`;

      try {
        const response = await fetch(url, {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ ...payload }),
        });

        if (!response.ok) {
          throw new Error("Failed to update meeting");
        }

        // Ensure the response contains the updated data
        const updatedMeeting = await response.json();

        // Update the local state after a successful update
        const index = this.meetings.findIndex((meeting) => meeting.id === itemID);
        if (index !== -1) {
          this.meetings[index] = { id: itemID, ...updatedMeeting };
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
    filterItemById(state) {
      const note = this.itemsAsArray.filter((item) => item.id);
      return (id) => note.filter((data) => data.id === id);
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
