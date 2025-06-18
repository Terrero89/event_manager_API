<script setup lang="ts">
const props = defineProps([
  "_id",
  "storyNumber", // DMR-xxxx
  "storyName", // C2T xxx
  "storyDescription", // description
  "difficultyLevel", // easy, medium, hard
  "storyPoints", // 1, 2, 3, 5, 8, 13
  "workType", // feature, bug, production
  "developmentType", // frontend, backend, fullstack
  "status", // to do, in progress, demo ready, completed, released
  "storyComments",
  "reporter", // reported who assigned story
  "repoNames", // repo we are going to work on
  "dateAssigned",
  "dateCompleted",
  "sprintId", // PL!, 2 etcc
  "learning", // comments on learning
"createdAt",
  "updatedAt",
]);
</script>

<template>
  <div>

  
    <div class="progress">
      
      <StoryItem
    :_id="props._id"
      :storyName="props.storyName"
      :storyDescription="props.storyDescription"
      :difficultyLevel="props.difficultyLevel"
      :storyPoints="props.storyPoints"
      :workType="props.workType"
      :developmentType="props.developmentType"
      :status="props.status"
      :storyComments="props.storyComments"
      :dateAssigned="props.dateAssigned"
      :reporter="props.reporter"
      :repoNames="props.repoNames"
      :dateCompleted="props.dateCompleted"
      :sprintId="props.sprintId"
      :learning="props.learning"
      :createdAt="props.createdAt"
        :updatedAt="props.updatedAt"
    


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
