import { defineStore } from "pinia";
import { CONFIG } from "~/config/globalVariables";

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
  const config = useRuntimeConfig();
  const url = `${config.public.apiBase}/stories`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch sprints: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    this.items = data;
     
     
    return data;

  } catch (error) {
    console.error("Failed to fetch storiess:", error);
    return null;
  }
},
    async addStory(data) {
       const config = useRuntimeConfig();
  const url = `${config.public.apiBase}/stories`;
  // const url = "http://localhost:8080/api/v1/stories"
      try {
        const response = await fetch(url, {
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
  const config = useRuntimeConfig();
  const url = `${config.public.apiBase}/stories/${itemID}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Error, request failed");
      return;
    }

    // ✅ Update local state after deletion
    this.items = this.items.filter((event) => event._id !== itemID);
  } catch (error) {
    console.error("Error deleting Event:", error);
  }
},
    async updateStory(itemID, payload){
  const config = useRuntimeConfig();
  const url = `${config.public.apiBase}/stories/${itemID}`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to update event: ${response.status} ${response.statusText}`);
    }

    const updatedEvent = await response.json();

    // ✅ Update local Pinia state directly
    const index = this.items.findIndex((event) => event._id === itemID);
    if (index !== -1) {
      this.items[index] = updatedEvent;
    }
  } catch (error) {
    console.error("Error updating event:", error);
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

    filterStories: (state) => (
  nameFilter,
  typeFilter,
  startDate,
  endDate,
  statusFilter,
  pointing,
  workType
) => {
  let filteredItems = state.items;

  if (nameFilter) {
    filteredItems = filteredItems.filter((item) =>
      item.storyTitle.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }

  if (typeFilter) {
    filteredItems = filteredItems.filter(
      (item) => item.developmentType === typeFilter
    );
  }

  if (workType) {
    filteredItems = filteredItems.filter(
      (item) => item.workType === workType
    );
  }

  if (startDate && endDate) {
    filteredItems = filteredItems.filter((item) => {
      const eventDate = new Date(item.dateAssigned);
      return !isNaN(eventDate) &&
        eventDate >= new Date(startDate) &&
        eventDate <= new Date(endDate);
    });
  } else if (startDate) {
    filteredItems = filteredItems.filter((item) => {
      const eventDate = new Date(item.dateAssigned);
      return !isNaN(eventDate) &&
        eventDate.toISOString().split("T")[0] ===
        new Date(startDate).toISOString().split("T")[0];
    });
  } else if (endDate) {
    filteredItems = filteredItems.filter((item) => {
      const eventDate = new Date(item.dateAssigned);
      return !isNaN(eventDate) &&
        eventDate.toISOString().split("T")[0] ===
        new Date(endDate).toISOString().split("T")[0];
    });
  }

  if (statusFilter) {
    filteredItems = filteredItems.filter(
      (item) => item.status === statusFilter
    );
  }

  if (pointing) {
    if (Array.isArray(pointing)) {
      filteredItems = filteredItems.filter((item) =>
        pointing.includes(String(item.storyPoints))
      );
    } else {
      filteredItems = filteredItems.filter(
        (item) => String(item.storyPoints) === pointing
      );
    }
  }

  return filteredItems;
},


totalFilteredStoriesStats: () => (items) => {
  let statusType =  ["Backlog", "To Do", "In Progress", "Demo Ready", "Completed", "Released"]
  
  const totalItems = items.length;

  // by frontent etc
  const filterType = items.filter(
    (item) => item.status === statusType
  ).length



   

    return {
      totalItems,
      filterType,
    

    };

  },


    
  },
});
