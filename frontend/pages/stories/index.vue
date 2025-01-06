<script setup>
import {useStoryStore} from "@/stores/stories";

const myStore = useStoryStore();
const {fetchStories} = myStore;
const props = defineProps([
  //PROPS HERE
  "id",
  "progressType",
  "storyLength",
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
<template class="border-b border-gray-200">
  <div>
    STORY SECTION HERE
    <!--      component for progress in stories-->
    <!--      make a for loop to render each list based on title displaying their respective stories status-->
    <ProgressList progress-type="Backlog" story-length="2"/>
    <ProgressList progress-type="To do" story-length="1"/>
    <ProgressList progress-type="In Progress" story-length="3"/>
    <ProgressList progress-type="Done" story-length="1"/>
    <ProgressList progress-type="Released" story-length="2"/>

    <h1>STORY LIST</h1>

    <div>



    </div>
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

</style>
