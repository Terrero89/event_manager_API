<script setup>
import {definePageMeta} from '#imports'
import {useStoryStore} from "@/stores/stories";
import {storeToRefs} from "pinia";

const myStore = useStoryStore();
const {fetchStories} = myStore;

const {status, data: stories, error} = useFetch(
    "http://localhost:8080/api/v1/stories",
    {
      lazy: true,
    }
);
// definePageMeta({
//   layout: 'stories'
// })

</script>
<template class="border-b border-gray-200">

  <div>
    hello
    <hr class="line"/>

    <div>

      <h1>WHERE SEARCH AND MORE GOES...</h1>
    </div>
    <!-- you will need to handle a loading state -->
    <div v-if="status === 'pending'">
      Loading stories...
    </div>

    <div v-else>
      <h1 v-for="story in stories" :key="story">
        <div>{{ story.storyTitle }}</div>
      </h1>

    </div>

  </div>
  hello


</template>

<style scoped>
.line {
  margin: 1.5rem 1rem;
  border-bottom: 1px solid #efefef;
}
</style>