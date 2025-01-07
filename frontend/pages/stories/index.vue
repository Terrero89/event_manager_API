<script setup>
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
    label: "Insights",
    icon: 'i-heroicons-chart-bar',
    to: '/components/horizontal-navigation'
  }, {
    label: 'Palette',
    icon: 'i-heroicons-command-line',
    to: '/components/command-palette'
  }],
]

let maxValue = ref(14)
let newDate = ref(new Date("2025-01-12"))
let calc = ref()




const sprint = Math.abs(calculateSprintDays(new Date(), "2025-01-12"))


</script>
<template class="border-b border-gray-200">
  <div>
    <div class="">
<!--PROGRESS IN PERCENTAGE FOR SPRINT-->
      <div class="header">
        <div class="header-title">
          <span>TEAM [] </span>
          <span>CURRENT SPRINT DATA </span>
        </div>
        <div class="my-2 progress-bar">
          <UProgress  :value="Math.round(sprint)" :max="maxValue" />
<!--          {{maxValue / Math.abs(sprint) * 0.1}}-->
          <p class="done">done</p>
        </div>
      </div>

<!--NAVIGATION IN STORIES-->
      <div class="f my-2 border-b border-gray-200 dark:border-gray-800">

        <UInputMenu
            trailing-icon="i-heroicons-chevron-down"
            class="w-full lg:w-48"
            placeholder="Select a person"
            :options="['Wade Cooper', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']"
            model-value="Arlene Mccoy"
        />
        <UHorizontalNavigation :links="links" class=""/>
      </div>
      <!--NAVIGATION IN STORIES-->

    </div>
    <div>

      <ProgressList progress-type="Backlog"/>
      <ProgressList progress-type="To do"/>
      <ProgressList progress-type="In Progress"/>
      <ProgressList progress-type="Done"/>
      <ProgressList progress-type="Released"/>


    </div>


  </div>

</template>

<style scoped>
.header{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
}
.f {
  display: flex;
  justify-content: flex-end;
}

.progress-bar {
 min-width:12rem;
  display: flex;
  align-items: center;

}

.done{
  display: block;
}
</style>
