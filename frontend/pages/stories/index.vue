<script setup>
import {useStoryStore} from "@/stores/stories";

const myStore = useStoryStore();
const {fetchStories} = myStore;
const props = defineProps([
  //PROPS HERE
  "id",
  "progressType",
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
<template class="border-b border-gray-200">
  <div>

    <ProgressList progress-type="Backlog" />
    <ProgressList progress-type="To do" />
    <ProgressList progress-type="In Progress"/>
    <ProgressList progress-type="Done" />
    <ProgressList progress-type="Released" />



    <div>



    </div>

  </div>
</template>

<style scoped>

</style>
