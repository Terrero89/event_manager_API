<script setup lang="ts">
const props = defineProps([
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
  "reporter", // reported who assigned story
  "repoNames", // repo we are going to work on
  "dateAssigned",
  "dateCompleted",
  "sprint", // PL!, 2 etcc
  "learning", // comments on learning
  "planningNotes", // planning for the spring

]);
</script>

<template>
  <div>
    <div class="progress">
      <StoryItem
      :id="props.id"
      :progressType="props.progressType"
      :storyTitle="props.storyTitle"
      :storyName="props.storyName"
      :storyDescription="props.storyDescription"
      :difficultyLevel="props.difficultyLevel"
      :storyPoints="props.storyPoints"
      :workType="props.workType"
      :developmentType="props.developmentType"
      :status="props.status"
      :storyComments="props.storyComments"
      :date="props.date"
      :reporter="props.reporter"
      :repoNames="props.repoNames"
      :dateCompleted="props.dateCompleted"
      :sprint="props.sprint"
      :learning="props.learning"
      :planningNotes="props.planningNotes"


      />
    </div>

  
  </div>
</template>

<style scoped>




.progress {
  background-color: #1f242a;
  padding: 0.2rem;
}

</style>
