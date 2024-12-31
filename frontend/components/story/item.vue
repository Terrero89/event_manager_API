<script setup lang="ts">
const props = defineProps([
  //PROPS HERE
  "storyTitle",
  "storyDescription",
  "difficultyLevel",
  "storyPoints",
  "workType",
  "developmentType",
  "status",
  "storyComments",
  "subtasks",
  "date",
  "updatedAt",
  "reporter",
  "repoNames",
  "dateAssigned",
  "dateCompleted",
  "sprint",
  "storyType",
  "learning",
  "planningNotes",
]);
</script>

<template>
  <div >
    <div class="story-item">STORY ITEM</div>
  </div>
</template>

<style scoped>
/* .story-item {
  //border: solid red 1px;
} */
</style>
