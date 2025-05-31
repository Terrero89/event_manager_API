import { defineStore } from "pinia";
import { CONFIG } from "~/config/globalVariables";
export const useNoteStore = defineStore({
  id: "notes",
  state: () => ({
    URL: "http://localhost:8080/api/v1/notes",
    URL_2: "https://project-manager-app-f9829-default-rtdb.firebaseio.com/notes.json",
    notes: [],
  }),
  actions: {
    async fetchNotes() {
      const response = await fetch(this.URL_2);
      const responseData = await response.json();
      this.notes = responseData;

      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to fetch!");
        throw error;
      }

      const notesList = [];

      for (const key in this.notes) {
        if (this.notes[key]) {
          // Check if city data exists
          const newItem = {
             id: key,
            ...this.notes[key],
          };
          notesList.push(newItem);
        }
      }
      this.notes = notesList;
      // this.sprintList = itemsList.map((item) => item.sprintID);
      // this.currentSprint = itemsList[0].sprintID;
     },
     async addNote(data) {
      try {
        const response = await fetch(
          this.URL_2,
          {
            method: "POST",
            body: JSON.stringify({ ...data }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to add event");
        }   
      } catch (error) {
        console.error("Failed to add notes:", error);
      } 
    },
    async deleteNote(itemID) {
      const url = `https://project-manager-app-f9829-default-rtdb.firebaseio.com/notes/${itemID}.json`
      let response = await fetch(url,
        {
          method: "DELETE",
          "Content-type": "application/json",
        }
      );
      if (!response.ok) {
        console.log("Error, request failed");
      }

    },


    async updateNote(itemID, payload) {
      const url = `https://project-manager-app-f9829-default-rtdb.firebaseio.com/notes/${itemID}.json`;
      const options = {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(payload),
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to update city");
        }

        // Ensure the response contains the updated data
        const updatedCity = await response.json();

        // Update the local state after a successful update
        const index = this.notes.findIndex((city) => city.id === cityID);
        if (index !== -1) {
          // Use the returned data from Firebase to ensure consistency
          this.notes[index] = { id: cityID, ...updatedCity };
        }
      } catch (error) {
        console.error("Error updating city:", error);
      }
    },
  },
  getters: {

   itemsAsArray: (state) => {
      return state.notes;
    },

    //finds item based on parentDestinationID
    filterItemById(state) {
      const note = this.itemsAsArray.filter((item) => item.id);
      return (id) => note.filter((data) => data.id === id);
    },

    filterNotesByName: (state) => (filter) => {
      if (!filter) return this.itemsAsArray; // Return all if no filter
      return this.itemsAsArray.filter((item) =>
        item.noteName.toLowerCase().includes(filter.toLowerCase()) // Adjust 'name' to the correct property
      );
    },
    filterItemsByInput: (state) => (inputValue) => {
       if (!state.notes) return state.notes;
      return state.notes.filter((item) =>
        item.noteName.toLowerCase().includes(inputValue.toLowerCase() -1)
      );
    },
//id, byStatus, byCategory, byBooking
    filteringTypes: (state) => (type) => {
      let notesArr = state.notes;
     notesArr = notesArr .filter((item) => item.noteType === type);
     return notesArr;
    },

    filterNotes: (state) => (nameFilter, typeFilter) => {
      let filteredNotes = state.notes;

      if (nameFilter) {
        filteredNotes = filteredNotes.filter((item) =>
          item.noteName.toLowerCase().includes(nameFilter.toLowerCase())
        );
      }

      if (typeFilter) {
        filteredNotes = filteredNotes.filter((item) => 
          item.noteType === typeFilter
        );
      }

      return filteredNotes;
    }

  },
});
