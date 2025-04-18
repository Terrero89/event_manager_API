<script setup lang="ts">
import { onMounted } from "vue";
const noteStore = useNoteStore();
import { storeToRefs } from "pinia";


const {  itemsAsArray, filterItemById } = noteStore;
const { notes } = storeToRefs(noteStore);
const props = defineProps([
  'id',
  'title',
  'description',
  'date',
  'noteType',
  'noteName',
  'priorityLevel',
  'sprintId',
  ""
])

const by = computed(()=> {{
  for(let i=0; i<filterItemById(props.id).length; i++){
    return filterItemById(props.id)[i]
  }
}})
// for later use
// const route = useRoute(); //route object
// const destId = route.params.destinationID;

onMounted(async () => {
 
});
</script>

<template>
  <div class="modal-details">
    <NotesUpdateForm :noteById="by"/>
  </div>
</template>

<style scoped>
/* Reusing styles from modal-details in previous component */
.modal-details {
  background-color:rgb(15, 15, 15) !important;
  padding: 20px;
  border-radius: 5px;
   box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.details-title {
  font-size: 1.2rem;
  margin-bottom: 10px;

}

.details-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  font-weight: bold;
 
}

.detail-value {
  flex-grow: 1;
  color: rgb(226, 218, 218);
  
}

.space {
  margin: 0 0.5rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.details-button {
  color: black;
  border: #b0b0b0 solid 1px;
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.details-button:hover {
  background-color: #dadada;
}

/* Optional red delete button override */
.delete-btn {
  border-color: red;
  color: white;
  background-color: red;
}

.delete-btn:hover {
  background-color: darkred;
}


</style>