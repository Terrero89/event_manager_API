import { defineStore } from "pinia";

export const useStandupStore = defineStore({
  id: "standup",
  state: () => ({
    items: [],
    currentSprint: "",
    sprintList: [],
  }),
  actions: {
    getUrl() {
      return useRuntimeConfig().public.apiBase + "/standups";
    },

    async fetchStandups() {
      const auth = useAuthStore();
      const url = this.getUrl();
      try {
        if (!auth.token) {
          console.warn("[Standup] No auth token available");
          return null;
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch standup: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        this.items = data;
        this.sprintList = this.items.map((item) => item.sprintId);
        this.currentSprint = this.sprintList.reverse()[0] || "";
        console.log("[Standup] Fetched successfully:", data.length, "items");
        return data;
      } catch (error) {
        console.error("[Standup] Fetch failed:", error);
        this.items = [];
        return null;
      }
    },

    async addStandup(data) {
      const auth = useAuthStore();
      const url = this.getUrl();
      try {
        if (!auth.token) {
          console.warn("[Standup] No auth token for add");
          return null;
        }

        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to add standup");
        }

        const newStandup = await response.json();
        this.items.push(newStandup);
        console.log("[Standup] Added successfully");
        return newStandup;
      } catch (error) {
        console.error("[Standup] Add failed:", error);
        return null;
      }
    },

    async deleteStandup(itemID) {
      const auth = useAuthStore();
      const url = this.getUrl();
      try {
        if (!auth.token) {
          console.warn("[Standup] No auth token for delete");
          return false;
        }

        const response = await fetch(`${url}/${itemID}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Delete failed: ${response.status}`);
        }

        this.items = this.items.filter((item) => item._id !== itemID);
        console.log("[Standup] Deleted successfully");
        return true;
      } catch (error) {
        console.error("[Standup] Delete failed:", error);
        return false;
      }
    },

    async updateStandup(itemID, payload) {
      const auth = useAuthStore();
      const url = this.getUrl();
      try {
        if (!auth.token) {
          console.warn("[Standup] No auth token for update");
          return null;
        }

        const response = await fetch(`${url}/${itemID}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Failed to update standup: ${response.status}`);
        }

        const updated = await response.json();
        const index = this.items.findIndex((i) => i._id === itemID);
        if (index !== -1) this.items[index] = updated;
        console.log("[Standup] Updated successfully");
        return updated;
      } catch (error) {
        console.error("[Standup] Update failed:", error);
        return null;
      }
    },
  },

  getters: {
    itemsAsArray: (state) => state.items,

    filterItemById: (state) => {
      return (id) => state.items.filter((item) => item._id === id);
    },
  },
});
