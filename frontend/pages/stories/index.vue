

<script setup>
import { useStoryStore } from '@/stores/stories';
import { storeToRefs } from "pinia";

const myStore = useStoryStore();
const {fetchStories} = myStore;


const { stories } = storeToRefs(myStore);

onMounted(() => {
fetchStories();
});

</script>

<template>
    <div>
      <h1>Stories</h1>
    <div v-for="story in stories" :key="story.id">
      <p>{{ story._id}}</p>
<p>{{ story.storyTitle}}</p>
<p>{{ story.workType}}</p>
<p>{{ story.acceptanceCriteria}}</p>


    </div>
        </div>
  </template>
                                    
