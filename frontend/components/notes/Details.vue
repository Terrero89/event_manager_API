<script setup lang="ts">
import { onMounted } from "vue";
const noteStore = useNoteStore();
import { storeToRefs } from "pinia";


const {  itemsAsArray, filterItemById } = noteStore;
const { notes } = storeToRefs(noteStore);

const props = defineProps({
  _id: { type: String, required: true },
  description: String,
  date: String,
  noteType: String,
  noteName: String,
  priorityLevel: String,
  sprintId: String
});

const by = computed(() => {
  return filterItemById(props._id)[0];
});
onMounted(async () => {
 
});
</script>

<template>
  <!-- props:{{props}} -->
  <div class="modal-details">
    <NotesUpdateForm :noteById="by"/>
  </div>
</template>
