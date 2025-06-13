<script setup lang="ts">
import { onMounted } from "vue";
const noteStore = useNoteStore();
import { storeToRefs } from "pinia";


const {  itemsAsArray, filterItemById } = noteStore;
const { notes } = storeToRefs(noteStore);
const props = defineProps([
  '_id',
  'title',
  'description',
  'date',
  'noteType',
  'noteName',
  'priorityLevel',
  'sprintId',
  
])

const by = computed(()=> {{
  for(let i=0; i<filterItemById(props._id).length; i++){
    return filterItemById(props._id)[i]
  }
}})
// for later use


onMounted(async () => {
 
});
</script>

<template>
  <div class="modal-details">

    <NotesUpdateForm :noteById="by"/>
  </div>
</template>
