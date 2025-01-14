<script setup lang="ts">
const props = defineProps([
  //PROPS for header
  "id",
  "progressType",
  "storyLength",
//     different ones for story
  //PROPS HERE
  "storyTitle", // fix bug etc...
  "storyNumber", // DMR-xxxx
  "storyName", // C2T xxx
  "storyDescription", // description
  "difficultyLevel", // easy, medium, hard
  "storyPoints", // 1, 2, 3, 5, 8, 13
  "workType", // feature, bug, production
  "developmentType", // frontend, backend, fullstack
  "status", // to do, in progress, demo ready, completed, released
  "storyComments",
  "subtasks",
  "date",
  "updatedAt",
  "reporter", // reported who assigned story
  "repoNames", // repo we are going to work on
  "dateAssigned",
  "dateCompleted",
  "sprint", // PL!, 2 etcc

  "learning", // comments on learning
  "planningNotes", // planning for the spring
  "updatedAt",
]);

</script>

<template>
<!--  details page here to show all deailsof story-->
 <div>
  <div>
  <div>UPDATE</div>
    <div>DELETE</div>
    <div>SEE TASKS</div>
 </div>



  </div>
</template>

<style scoped>

</style>