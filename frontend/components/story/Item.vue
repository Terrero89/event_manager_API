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
  "updatedAt"
]);
</script>

<template>
  <div>
    <div class="story-item">
      <div>
        <h1 class="">{{ storyTitle }}</h1>
        <p class="">{{ storyDescription }}</p>
        <p class="">{{ storyType }}</p>
        <p class="">{{ storyPoints }}</p>
        <p class="">{{ difficultyLevel }}</p>
        <p class="">{{ workType }}</p>
        <p class="">{{ developmentType }}</p>
        <p class="">{{ status }}</p>
        <p class="">{{ reporter }}</p>
        <p class="">{{ repoNames }}</p>
        <p class="">{{ dateAssigned }}</p>
        <p class="">{{ dateCompleted }}</p>
        <p class="">{{ sprint }}</p>
        <p class="">{{ storyComments }}</p>
        <p class="">{{ subtasks }}</p>
        <div class="" v-for="item in learning" :key="item.id">

          <h2 class="">{{item.id}}</h2>
          <h2 class="">{{item.title}}</h2>

        </div>

        <p class="">{{ planningNotes }}</p>
        <p class="">{{ updatedAt }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
 .story-item {
  border: solid red 1px;
}
</style>
