import { defineStore } from "pinia";

export const useDaysoffStore = defineStore({
  id: "daysoff",
  state: () => ({
    items: [],
    currentSprint: "",
    sprintList: [],
  }),

  actions: {
    getURL() {
      const config = useRuntimeConfig();
      // config.public.apiBase is coming from the public runtime config which is set in nuxt.config.ts
      return config.public.apiBase + "/daysoff";
    },

    async fetchDaysoff() {
      const auth = useAuthStore();
      const URL = this.getURL();

      try {
        if (!auth.token) {
          console.warn("[Daysoff] No auth token available");
          return null;
        }

        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch daysoff: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        this.items = data;
        this.sprintList = this.items.map((item) => item.sprintId);
        this.currentSprint = this.sprintList.reverse()[0];
        console.log("[Daysoff] Fetched successfully:", data.length, "items");
        return data;
      } catch (error) {
        console.error("[Daysoff] Fetch failed:", error);
        this.items = [];
        return null;
      }
    },

    async addDaysoff(data) {
      const auth = useAuthStore();
      const URL = this.getURL();

      try {
        if (!auth.token) {
          console.warn("[Daysoff] No auth token for add");
          return null;
        }

        const response = await fetch(URL, {
          method: "POST",
          body: JSON.stringify({ ...data }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to add daysoff");
        }

        const newItem = await response.json();
        this.items.push(newItem);
        console.log("[Daysoff] Added successfully");
        return newItem;
      } catch (error) {
        console.error("[Daysoff] Add failed:", error);
        return null;
      }
    },

    async deleteDaysoff(itemID) {
      const auth = useAuthStore();
      const URL = this.getURL();

      try {
        if (!auth.token) {
          console.warn("[Daysoff] No auth token for delete");
          return false;
        }

        const response = await fetch(URL + `/${itemID}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Delete failed: ${response.status}`);
        }

        this.items = this.items.filter((event) => event._id !== itemID);
        console.log("[Daysoff] Deleted successfully");
        return true;
      } catch (error) {
        console.error("[Daysoff] Delete failed:", error);
        return false;
      }
    },

    async updateDaysoff(itemID, payload) {
      const auth = useAuthStore();
      const URL = this.getURL();

      try {
        if (!auth.token) {
          console.warn("[Daysoff] No auth token for update");
          return null;
        }

        const response = await fetch(URL + `/${itemID}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Failed to update: ${response.status}`);
        }

        const updatedItem = await response.json();
        const index = this.items.findIndex((event) => event._id === itemID);
        if (index !== -1) {
          this.items[index] = updatedItem;
        }
        console.log("[Daysoff] Updated successfully");
        return updatedItem;
      } catch (error) {
        console.error("[Daysoff] Update failed:", error);
        return null;
      }
    },
  },

  getters: {
    itemsAsArray: (state) => {
      return state.items;
    },

    filterItemById(state) {
      return (id) => state.items.filter((item) => item._id === id);
    },
  },
});
