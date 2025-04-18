<script setup lang="ts">
import {onMounted } from 'vue'
const sprintsStore = useSprintStore();
import { storeToRefs } from "pinia";

const {
  fetchSprints,

} = sprintsStore;
const { items } = storeToRefs(sprintsStore);
const navLinks = [
  [],
  [
    {
      label: 'Create Sprint',
      icon: 'i-heroicons-plus',
      to: '/sprints/create',
      badge: {
        label: 'Add Sprint',
        color: 'blue',
        size: "sm"
      }
    },
    {
      label: 'Create Sprint',
      icon: 'i-heroicons-plus',
      to: '/sprints/create',
      badge: {
        label: 'Add',
        color: 'green',
        size: "sm"
      }
    },
 
  ]
];
onMounted(async() => {

await fetchSprints()


});

const isOpen = ref(false);
</script>
<template>
<div>
  <div class="nav-flex my-2 border-b border-gray-200 dark:border-gray-800 ">
    <UHorizontalNavigation :links="navLinks" />
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
  <SprintsList  
  v-for="item in items"
  :key="item.id"
  :id="item.id"
  :sprintID="item.sprintID"
  :startDate="item.startDate"
  :dueDate="item.dueDate"
  :summary="item.summary"
  :piNotes="item.piNotes"
  :storyUnderSprint="item.storyUnderSprint"
  :relatedStoryId="item.relatedStoryId"
  

    />
 
</div>

</template>



<style scoped>
.nav-flex {
  display: flex;
  justify-content: flex-end;

}

  </style>