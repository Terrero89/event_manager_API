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

const show = computed(()=> {
  if(notes.value.length < 1){
  return false
}
return true
});


const isOpen = ref(false);
</script>

<template>
  <div>
    <div class="nav-flex my-2 border-b border-gray-200 dark:border-gray-800">
      <UHorizontalNavigation :links="navLinks" />
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
    <div class="nav-flex wrapit" v-if="show">
      <UInputMenu
        color="gray"
        variant="outline"
        trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2"
        placeholder="Select a sprint"
        :options="sprintList"
        model-value=""
      />
      <UInputMenu
        color="gray"
        variant="outline"
        trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2"
        placeholder="Select a sprint"
        :options="sprintList"
        model-value=""
      />
      <UInputMenu
        color="gray"
        variant="outline"
        trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2"
        placeholder="Select a sprint"
        :options="sprintList"
        model-value=""
      />
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
.wrapit {
  flex-wrap: wrap;
}
.nav-flex {
  display: flex;
  justify-content: flex-start;
}
.drop {
  margin-right: 5rem;
}
</style>
