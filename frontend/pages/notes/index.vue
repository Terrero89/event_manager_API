<script setup lang="ts">
import { onMounted } from "vue";
const noteStore = useNoteStore();
import { storeToRefs } from "pinia";

const { fetchNotes } = noteStore;
const { notes } = storeToRefs(noteStore);
// for later use
// const route = useRoute(); //route object
// const destId = route.params.destinationID;

onMounted(async () => {
  await fetchNotes();
});

const props = defineProps([
  "title",
  "description",
  "date",
  "noteType",
  "noteName",
  "priorityLevel",
  "sprintId",
]);

const navLinks = [
  [],
  [
    {
      label: "",
      icon: "i-heroicons-plus",
      to: "/notes/create",
      badge: {
        label: "Note",
        color: "blue",
        size: "md",
      },
    },
 
  ],
];


const isOpen = ref(false);
</script>

<template>
  <div>
    <div class="nav-flex my-2 border-b border-gray-200 dark:border-gray-800">
      <UHorizontalNavigation :links="navLinks" class="" />
      <UModal v-model="isOpen">
        <div class="p-4">IS HERE</div>
      </UModal>

      <UButton
        class="my-3"
        color="blue"
        variant="soft"
        label="Add"
        @Click="isOpen = true"
        >Insights</UButton
      >
    </div>
   <UIEmptyMessage v-if="notes.length < 1" title="notes" />

    <NotesList
      v-else
      v-for="note in notes"
      :key="note.id"
      :id="note.id"
      :description="note.description"
      :title="note.title"
      :date="note.date"
      :noteName="note.noteName"
      :noteType="note.noteType"
      :priorityLevel="note.priorityLevel"
      :sprintId="note.sprintId"
    />
  </div>
</template>

<style scoped>
.nav-flex {
  display: flex;
  justify-content: flex-end;
}

</style>
