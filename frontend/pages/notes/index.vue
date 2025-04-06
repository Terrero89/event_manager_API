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
        size: "sm",
      },
    },
    {
      label: "",
      icon: "i-heroicons-plus",
      to: "/notes/create",
      badge: {
        label: "Add",
        color: "green",
        size: "sm",
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
        class="my-2"
        color="blue"
        size="xs"
        variant="soft"
        label="Add"
        @Click="isOpen = true"
        >Insights</UButton
      >
    </div>
    <div>NOTES</div>


  
    <NotesList  
    v-for="note in notes"
    :key="note._id"
    :id="note._id"
    :description="note.description"
    :title="note.title"
    :date="note.date"
    :noteName="note.noteName"
    :noteType="note.noteType"
    :priorityLevel="note.priorityLevel"
    :sprintId="note.sprintId"


      />
      <!-- {{ notes }} -->
  </div>

</template>

<style scoped>
.nav-flex {
  display: flex;
  justify-content: flex-end;
}
/* .progress {
  background-color: #1f242a;
  padding: 0.2rem;
} */
</style>
