<script setup lang="ts">
import { onMounted } from "vue";
const noteStore = useNoteStore();
import { storeToRefs } from "pinia";


const {  itemsAsArray, filterItemById } = noteStore;
const { notes } = storeToRefs(noteStore);

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  description: String,
  date: String,
  noteType: String,
  noteName: String,
  priorityLevel: String,
  sprintId: String
});

const by = computed(()=> {{
  for(let i=0; i<filterItemById(props.id).length; i++){
    return filterItemById(props.id)[i]
  }
}})

onMounted(async () => {
 
});
</script>

<template>
  ID: {{by._id}}
  <div class="modal-details">
    <NotesUpdateForm :noteById="by"/>
  </div>
</template>
