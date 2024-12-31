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
    hello
    <hr class="line" />
    <StoryItem></StoryItem>
    <div class="cool">
      <h1>WHERE SEARCH AND MORE GOES lll...ttre lfdfdffsdffddasasddadsdasasdasdadaSD</h1>
    </div>
  </div>
</template>

<style scoped>
.cool{
  border: solid red 1px;
}

</style>
