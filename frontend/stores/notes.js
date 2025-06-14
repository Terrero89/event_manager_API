import { defineStore } from "pinia";

export const useNoteStore = defineStore({
  id: "notes",
  state: () => ({
    notes: [],
    notes2:[],
  }),
  actions: {

async fetchNotes() {
  const config = useRuntimeConfig();
  try {
    const response = await fetch(`${config.public.apiBase}/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch notes: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    this.notes = data;
    return data;

  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return null;
  }
},
    async addNote(data) {
      const config = useRuntimeConfig();
      try {
        const response = await fetch(`${config.public.apiBase}/notes`, {
          method: "POST",
          body: JSON.stringify({ ...data }),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to add note");
        }
      } catch (error) {
        console.error("Failed to add notes:", error);
      }
    },

    async deleteNote(itemID) {
      const config = useRuntimeConfig();
      const url = `${config.public.apiBase}/notes/${itemID}`;
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          console.error("Error, request failed");
        }
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    },

 async updateNote(itemID, payload) {
  const config = useRuntimeConfig();
  const url = `${config.public.apiBase}/notes/684c95d1b43eee84c479b89d`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Failed to update note: ${response.status} ${response.statusText}`);
    }

    const updatedNote = await response.json();

    // Update local Pinia state
    const index = this.notes.findIndex(note => note.id === itemID);
    if (index !== -1) {
      this.notes[index] = { id: itemID, ...updatedNote };
    }
  } catch (error) {
    console.error("Error updating note:", error);
  }
}
  },

  getters: {
    itemsAsArray: (state) => state.notes,

    filterItemById: (state) => (id) => {
      return state.notes.filter((item) => item.id === id);
    },

    filterNotesByName: (state) => (filter) => {
      if (!filter) return state.notes;
      return state.notes.filter((item) =>
        item.noteName.toLowerCase().includes(filter.toLowerCase())
      );
    },

    filterItemsByInput: (state) => (inputValue) => {
      if (!state.notes) return state.notes;
      return state.notes.filter((item) =>
        item.noteName.toLowerCase().includes(inputValue.toLowerCase())
      );
    },

    filteringTypes: (state) => (type) => {
      return state.notes.filter((item) => item.noteType === type);
    },

    filterNotes: (state) => (nameFilter, typeFilter) => {
      let filteredNotes = state.notes;

      if (nameFilter) {
        filteredNotes = filteredNotes.filter((item) =>
          item.noteName.toLowerCase().includes(nameFilter.toLowerCase())
        );
      }

      if (typeFilter) {
        filteredNotes = filteredNotes.filter(
          (item) => item.noteType === typeFilter
        );
      }

      return filteredNotes;
    },
  },
});
