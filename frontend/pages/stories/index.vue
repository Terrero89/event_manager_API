<script setup>
import { useStoryStore } from "@/stores/stories";

const myStore = useStoryStore();
const { fetchStories } = myStore;
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
  "updatedAt",
]);
const {
  status,
  data: stories,
  error,
} = useFetch("http://localhost:8080/api/v1/stories", {
  lazy: true,
});
</script>
<template class="border-b border-gray-200">
  <div>
    STORY SECTION HERE
    <!--    <hr class="line" />-->

    <div class="progress">
      <!--      component for progress in stories-->
      <!--      to do, progress, done, demo ready, released-->
      <!--      todos-->
      <UIProgress progress-title="Backlog" story-number="2" />
      <!--      todos-->
      <UIProgress progress-title="To do" story-number="1" />
      <!--      progress-->
      <UIProgress progress-title="Progress" story-number="3" />
      <!--      done-->
      <UIProgress progress-title="Done" story-number="1" />
      <UIProgress progress-title="Release" story-number="2" />
    </div>

    <h1>STORY LIST</h1>
    <!-- <StoryItem
       story-title="Story Title"
       story-description="Story Description"
       difficulty-level="Easy"
       story-points="2"
       work-type="feature"
       development-type="FE"
       status="To Do"
       :story-comments="['hello', 'cool']"
       subtasks="[{id: '1', title: 'hello', description: 'cool'}, {id: '2', title: 'hello', description: 'cool'}]"
       date=""
       reporter="Sergio Terrero"
       repo-names="['messaging-receive-api', 'C2T']"
       date-assigned="2024-12-28"
       date-completed="2024-12-30"
       sprint="PI2"
       story-type="C2T phone number setup"
       learning="[ {id: '1', title: 'hello', description: 'cool'}, {id: '2', title: 'hello', description: 'cool'}]"
       planning-notes="['note1', 'note2']"
       updated-at="2024-12-30"
   /> -->
    <!-- <StoryItem
    story-title="Story Title"
    story-description="Story Description"
    difficulty-level="Easy"
    story-points="2"
    work-type="feature"
    development-type="FE"
    status="In Progress"
    :story-comments="['hello', 'cool']"
    subtasks="[{id: '1', title: 'hello', description: 'cool'}, {id: '2', title: 'hello', description: 'cool'}]"
    date=""
    reporter="Sergio Terrero"
    repo-names="['messaging-receive-api', 'C2T']"
    date-assigned="2024-12-28"
    date-completed="2024-12-30"
    sprint="PI2"
    story-type="C2T phone number setup"
    learning="[ {id: '1', title: 'hello', description: 'cool'}, {id: '2', title: 'hello', description: 'cool'}]"
    planning-notes="['note1', 'note2']"
    updated-at="2024-12-30"
/> -->
  </div>
</template>

<style scoped>
.progress {
  background-color: #1f242a;
  padding: 0.2rem;
}
</style>
