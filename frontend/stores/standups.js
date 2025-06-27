import { defineStore } from "pinia";

export const useStandupStore = defineStore({
  id: "sprint",
  state: () => ({
    URL: useRuntimeConfig().public.apiBase + '/standups',
    items: [],
    currentSprint:'',
    sprintList: [],
  }),
  actions: {
    async fetchStandups() {
  const config = useRuntimeConfig();
        const auth = useAuthStore();
  try {
    const response = await fetch(this.URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch sprints: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    this.items = data;
     
      this.sprintList = this.items.map((item) => item.sprintId);
      this.currentSprint = this.sprintList.reverse()[0];
    return data;

  } catch (error) {
    console.error("Failed to fetch sprints:", error);
    return null;
  }
},

     async addStandup(data) {
        const config = useRuntimeConfig();
        const auth = useAuthStore();
    
     
      try {
        const response = await fetch(this.URL, {
          method: "POST",
          body: JSON.stringify({ ...data }),
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`, // ← include token
          },
        });

        if (!response.ok) {
          throw new Error("Failed to add sprints");
        }
      } catch (error) {
        console.error("Failed to add sprints:", error);
      }
    },
async deleteStandup(itemID) {
  const config = useRuntimeConfig();
  const auth = useAuthStore();

  // const url = this.URL + `/${itemID}`;
console.log("TEST",this.URL)
  try {
  const response = await fetch(this.URL + `/${itemID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
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

    async updateStandup(itemID, payload)  {
  const config = useRuntimeConfig();
  const auth = useAuthStore();
;

  try {
    const response = await fetch(this.URL + `/${itemID}`, {
      method: "PATCH",
     headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`, // ← include token
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

  },
});
