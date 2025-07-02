import { defineStore } from "pinia";

export const useStandupStore = defineStore({
  id: "standup",
  state: () => ({
    items: [],
    currentSprint: '',
    sprintList: [],
  }),
  actions: {
    getUrl() {
      return useRuntimeConfig().public.apiBase + '/standups';
    },

    async fetchStandups() {
      const auth = useAuthStore();
      try {
        const response = await fetch(this.getUrl(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch standup: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        this.items = data;
        this.sprintList = this.items.map((item) => item.sprintId);
        this.currentSprint = this.sprintList.reverse()[0] || '';
        return data;

      } catch (error) {
        console.error("❌ Failed to fetch standup:", error);
        return null;
      }
    },

    async addStandup(data) {
      const auth = useAuthStore();
      try {
       const response = await fetch(this.getUrl(), {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth.token}`,
  },
});
const text = await response.text();
console.log("Raw response:", response.status, text);

        if (!response.ok) {
          throw new Error("Failed to add standup");
        }

        const newStandup = await response.json();
        this.items.push(newStandup);
        return newStandup;

      } catch (error) {
        console.error("❌ Failed to add standup:", error);
        return null;
      }
    },

    async deleteStandup(itemID) {
      const auth = useAuthStore();
      try {
        const response = await fetch(`${this.getUrl()}/${itemID}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.token}`,
          },
        });

        if (!response.ok) {
          console.error("❌ Delete failed:", response.status);
          return;
        }

        this.items = this.items.filter(item => item._id !== itemID);
      } catch (error) {
        console.error("❌ Error deleting standup:", error);
      }
    },

    async updateStandup(itemID, payload) {
      const auth = useAuthStore();
      try {
        const response = await fetch(`${this.getUrl()}/${itemID}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Failed to update standup: ${response.status}`);
        }

        const updated = await response.json();
        const index = this.items.findIndex(i => i._id === itemID);
        if (index !== -1) this.items[index] = updated;

      } catch (error) {
        console.error("❌ Error updating standup:", error);
      }
    }
  },

  getters: {
    itemsAsArray: (state) => state.items,

    filterItemById: (state) => {
      return (id) => state.items.filter((item) => item._id === id);
    },
  },
});
