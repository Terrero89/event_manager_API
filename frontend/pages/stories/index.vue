

<script setup>
import { useStoryStore } from '@/stores/stories';

const myStore = useStoryStore();
const {fetchStories} = myStore;

onMounted(() => {
fetchStories;
});

</script>

<template>
    <div>
      <h1>Stories</h1>
      {{myStore.stories}}
      {{myStore.double}}
    </div>
  </template>
                                    
