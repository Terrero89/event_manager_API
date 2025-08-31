<script setup lang="ts">
import { onMounted } from "vue";
import { CONFIG } from "~/config/globalVariables";
const noteStore = useNoteStore();
const sprintsStore = useSprintStore();
import { storeToRefs } from "pinia";

const { fetchNotes, filterNotes } = noteStore;
const { notes } = storeToRefs(noteStore);

const { fetchSprints } = sprintsStore;
const { currentSprint, sprintList } = storeToRefs(sprintsStore);
// for later use
// const route = useRoute(); //route object
// const destId = route.params.destinationID;

onMounted(async () => {
  await fetchNotes();
  await fetchSprints();
});

const props = defineProps([
  "title",
  "description",
  "date",
  "noteType",
  "noteName",
  "sprintId",
  "updatedAt",
  "createdAt",
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

const show = computed(() => {
  if (notes.value.length < 1) {
    return false;
  }
  return true;
});
const inputValue = ref("");
const inputType = ref("");

const isOpen = ref(false);


</script>

<template>
  <div>
    <div class="nav-flex my-2 border-b border-gray-200 dark:border-gray-800">
      <UHorizontalNavigation :links="navLinks" />
      <UModal v-model="isOpen">
        <div class="p-4">IS HERE</div>
      </UModal>

      <UButton class="my-3" color="blue" variant="soft" label="Add" @Click="isOpen = true"
        >Insights</UButton
      >
    </div>

    <div class="nav-flex wrapit" v-if="show">
      <UInput
        class="w-full lg:w-48 my-3 mr-2"
        placeholder="Search..."
        v-model="inputValue"
      />

      <UInputMenu
        color="gray"
        variant="outline"
        trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2"
        placeholder="Select by type"
        :options="CONFIG.variables.activityType"
        v-model="inputType"
      />

      <UButton
        class="my-3 mx-2 ml-auto"
        color="teal"
        variant="outline"
        label="Clear"
        @click="
          inputValue = '';
          inputType = '';
        "
      />
    </div>

    <UIEmptyMessage v-if="notes.length < 1" title="notes" />

    <NotesList
      v-else
      v-for="note in filterNotes(inputValue, inputType)"
      :key="note._id"
      :_id="note._id"
      :description="note.description"
      :title="note.title"
      :date="note.date"
      :noteName="note.noteName"
      :noteType="note.noteType"
      :sprintId="note.sprintId"
      :updatedAt="note.updatedAt"
      :createdAt="note.createdAt"
    />
    <div class="my-12"></div>
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
