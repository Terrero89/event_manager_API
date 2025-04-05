<script setup lang="ts">

import {format} from 'date-fns'
import {useStoryStore} from "@/stores/stories";
import {calculateSprintDays} from "~/utils/date-time.js";

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
const links = [

  [],
  [{

    icon: 'i-heroicons-plus',
    to: '/stories/create',
    badge: {
      label: 'Add Story',
      color: 'blue',
      size: "sm"
    }
  }, {

    icon: 'i-heroicons-plus',
    to: '/sprints/create',
    badge: {
      label: 'Add sprint',
      color: 'green',
      size: "sm"
    }
  }, {
    label: 'Insights',
    icon: 'i-heroicons-command-line',
    to: '/'
  }],
]
</script>
<template class="border-b border-gray-200">
  <div>
    <div class="">
      <!--PROGRESS BAR -->
      <UIProgress/>
      <!---->
      <!--DROPDOWN IN STORIES-->
      <div class="nav-flex my-2 border-b border-gray-200 dark:border-gray-800">
        <UIDropdown/>
       <UHorizontalNavigation :links="links" class=""/>
      </div>

      <!--    -->

    </div>
    <div>
      <ProgressList progress-type="Backlog"/>
      <!-- <ProgressList progress-type="To do"/>
      <ProgressList progress-type="In Progress"/>
      <ProgressList progress-type="Done"/>
      <ProgressList progress-type="Released"/> -->
<!-- NEED TO ADD A UI COMPONENT FOR PROGRESS LIST UI -->
    </div>


  </div>

</template>

<style scoped>
.nav-flex {
  display: flex;
  justify-content: flex-end;

}

</style>
