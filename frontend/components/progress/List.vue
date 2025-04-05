



<script setup lang="ts">
const props = defineProps([
  "id",
  //PROPS for header
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
  "workType", // feature, bug, production, POC, SPIKE
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

// computer properties

const {
  status,
  data: stories,
  error,
} = useFetch("http://localhost:8080/api/v1/stories", {
  lazy: true,
});

const filteredStories = computed(() => {
  return stories?.value?.filter((story: any) => story.status === props.progressType) || [];
});

</script>

<template>
  <div>
    <div class="progress">


      <div class="item-status">

        <!-- <div class="status-title">
          <h1>{{ progressType }}</h1>
          <span class="story-number"> {{ filteredStories.length }} </span>
        </div> -->

        <div class="story-list">
          <!-- <ProgressItem
                        v-for="story in filteredStories"
                        :key="story.storyNumber"
                        :id="story._id"
                        :story-title="story.storyTitle"
                        :story-number="story.storyNumber"
                        :story-name="story.storyName"
                        :story-description="story.storyDescription"
                        :difficulty-level="story.difficultyLevel"
                        :story-points="story.storyPoints"
                        :work-type="story.workType"
                        :development-type="story.developmentType"
                        :status="story.status"
                        :story-comments="story.storyComments"
                        :subtasks="story.subtasks"
                        :date="story.date"
                        :reporter="story.reporter"
                        :repo-names="story.repoNames"
                        :date-assigned="story.dateAssigned"
                        :date-completed="story.dateCompleted"
                        :sprint="story.sprint"
                        :story-type="story.storyType"
                        :learning="story.learning"
                        :planning-notes="story.planningNotes"
                        :updated-at="story.updatedAt"
          /> -->
        </div>
      </div>
      <div class="item-status">

<div class="story-list">

</div>
hello
</div>
    </div>
    
  </div>
</template>

<style scoped>
.progress {
  background-color: #1f242a;
  padding: 0.2rem;
}

.no-story {
  align-items: center;
  margin: auto 0;
}

.item-status {
  padding: 0.2rem 0;
  margin: 0.2rem 0;
  border-top: 1px solid rgba(236, 236, 236, 0.14);
  border-bottom: 1px solid rgba(236, 236, 236, 0.14);
  min-height: 7rem;
  display: flex;
  flex-direction: row;
  background-color: rgb(15, 15, 15) !important;
  border-radius: 5px;
}

.story-list {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.status-title {
  padding: 0.1rem;
  min-width: 8rem;
  margin: 0 0.5rem;
  display: flex;

  border-radius: 7px;
}

.status-title h1 {
  margin: auto 0;
  text-align: center;
  align-content: center;
}


.story h1 {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.77);
}

.story-top button {
  margin-right: 0;
}


.story-number {
  text-align: center;
  margin: auto 0 auto 1rem;
}


</style>
