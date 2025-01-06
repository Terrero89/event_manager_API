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
const titleTop = ref(
    "Prevent conversation service API from opening a new conversacion for a new exposure on claim and phone numner."
);
</script>

<template>
  <div>
    {{id.slice(0,8)}}
    <div class="story">

      <UTooltip text="More" :popper="{ arrow: true }" class="story-button">
        <button class="">
          <Icon name="i-heroicons-ellipsis-horizontal-circle" class="icons"/>
        </button>
      </UTooltip>

      <!--         + create a button to be able to move tasks to different status-->
      <h1>{{ storyTitle }}</h1>
      <div><span class="type">{{ developmentType }}</span></div>
      <div><span class="story-name">{{ storyName }} </span></div>
      <div class="icon-list">
        <Icon class="story-id doc icons" name="i-heroicons-document"/>
        <span class="story-id">{{ storyNumber }}</span>
        <UTooltip text="Story Points" :popper="{ arrow: true }">
          <span class="story-points"> {{storyPoints}}</span>
        </UTooltip>
        <UTooltip text="Priority" :popper="{ arrow: true }">
          <Icon name="i-heroicons-list-bullet" class="icons"/>
        </UTooltip>
        <UTooltip text="Repos" :popper="{ arrow: true }">
          <button class="">
            <Icon name="i-heroicons-document-check" class="icons"/>
          </button>
        </UTooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>

.fullStack{
  background-color: rgba(0, 255, 72, 0.75);
}
.backend{
  background-color: rgba(44, 57, 143, 0.75);
}

.frontend{
  background-color: rgba(0, 183, 255, 0.75);
}


.story-button {
  border-radius: 5px;
  float: right;
}

.story-list {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}


.status-title h1 {
  margin: auto 0;
  text-align: center;
  align-content: center;
}

.story {
  width: 13rem;
  padding: 0.5rem;
  margin-right: 0.5rem;
  background-color: rgba(236, 236, 236, 0.14);
  border: 1px solid rgba(236, 236, 236, 0.14);
}

.story h1 {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.77);
}

.story-top button {
  margin-right: 0;
}

.type,
.story-id,
.story-points,
.story-number {
  color: rgba(208, 206, 206, 0.76);
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.2rem 0.3rem;
  border-radius: 0.2rem;
}


.story-name {
  color: rgba(208, 206, 206, 0.76);
  font-size: 0.75rem;

  border-radius: 0.2rem;
}

.type {
  /*background-color: rgba(0, 183, 255, 0.75);*/
  background-color: rgba(0, 183, 255, 0.75);
}

.icons {
  color: rgba(208, 206, 206, 0.76);
}

.doc {
  background-color: #0097ff;
  padding: 0.2rem 0;
}

.icon-list {
  align-items: center;
  margin: auto 0
}


</style>
