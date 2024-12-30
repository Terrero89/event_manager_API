<script setup>
import { definePageMeta } from '#imports'
import { useStoryStore } from "@/stores/stories";
import { storeToRefs } from "pinia";
const myStore = useStoryStore();
const { fetchStories } = myStore;

const { status, data: stories, error } = useFetch(
  "http://localhost:8080/api/v1/stories",
  {
    lazy: true,
  }
);
definePageMeta({
  layout: 'stories'
})
onMounted(() => {
  fetchStories();
});
</script>
<template class="border-b border-gray-200">
    <!-- you will need to handle a loading state -->
    <div v-if="status === 'pending'">
      Loading ...
    </div>
    <div v-else>
      <h1 v-for="story in stories" :key="story">
        <div>{{story.storyTitle}}</div>
      </h1>
      {{error}}
    </div>
  </template>
