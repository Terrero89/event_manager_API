<script setup lang="ts">
const props = defineProps([
    "id" ,
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

const titleTop = ref(
    "Prevent conversation service API from opening a new conversacion for a new exposure on claim and phone numner."
);
const type1 = ref("FullStack");
const type2 = ref("Frontend");
// computer properties
// const work = computed(() => {
//   return workType.value ? 'fullstack' : 'frontend';
// });

const {
  status,
  data: stories,
  error,
} = useFetch("http://localhost:8080/api/v1/stories", {
  lazy: true,
});
</script>

<template>
  <div>
    <div class="progress">
      <div class="item-status">
        <div class="status-title">
          <h1>{{ progressType }}</h1>
          <span class="story-number"> {{ storyLength }} </span>
        </div>

        <div class="story-list">
          <ProgressItem v-for="story in stories"
                        :key=story.storyNumber
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


          />

        </div>

      </div>

    </div>



  </div>
</template>

<style scoped>
.progress {
  background-color: #1f242a;
  padding: 0.2rem;
}
.workType {
  background-color: rgba(42, 185, 88, 0.75);
}

.item-status {
  padding: 0.2rem 0;
  margin: 0.5rem 0;
  border-top: 1px solid rgba(236, 236, 236, 0.14);
  border-bottom: 1px solid rgba(236, 236, 236, 0.14);
  display: flex;
  flex-direction: row;
  background-color: rgb(15, 15, 15) !important;
  border-radius: 5px;
}




.story-list {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.status-title {
  padding: 0.1rem;
  min-width: 7rem;
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
  margin: auto 0;
}


</style>
