import { defineStore } from "pinia";

export const useSprintStore = defineStore({
  id: "sprint",
  state: () => ({
    URL_2: "https://project-manager-app-f9829-default-rtdb.firebaseio.com/sprints.json",
    URL: "http://localhost:8080/api/v1/sprints",
    items: [],
    currentSprint:'',
    sprintList: [],
  }),
  actions: {
    async fetchSprints() {
  const config = useRuntimeConfig();
  try {
    const response = await fetch(`${config.public.apiBase}/sprints`, {
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
     
      this.sprintList = this.items.map((item) => item.sprintID);
      this.currentSprint = this.sprintList.reverse()[0];
    return data;

  } catch (error) {
    console.error("Failed to fetch sprints:", error);
    return null;
  }
},

     async addSprint(data) {
        const config = useRuntimeConfig();
      try {
        const response = await fetch(`${config.public.apiBase}/sprints`, {
          method: "POST",
          body: JSON.stringify({ ...data }),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to add sprints");
        }
      } catch (error) {
        console.error("Failed to add sprints:", error);
      }
    },
async deleteSprint(itemID) {
  const config = useRuntimeConfig();
  const url = `${config.public.apiBase}/sprints/${itemID}`;
  // const url = this.URL + `/${itemID}`;
console.log("TEST",url)
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const text = await response.text();

    if (!response.ok) {
      console.error("❌ Delete failed:", response.status, text);
      return;
    }

    console.log("✅ Sprint deleted:", text);
    this.items = this.items.filter((event) => event._id !== itemID);
  } catch (error) {
    console.error("❌ Error deleting sprint:", error);
  }
},

    async updateSprint(itemID, payload)  {
  const config = useRuntimeConfig();
  const url = `${config.public.apiBase}/sprints/${itemID}`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to update sprint: ${response.status} ${response.statusText}`);
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
      const note = this.itemsAsArray.filter((item) => item.id);
      return (id) => note.filter((data) => data.id === id);
    },
    // listOfId(state) {
    //   const note = this.itemsAsArray.map((item) => item.id);
    //   this.sprintList = note;
    //   return note
    // },
  },
});
