<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { CONFIG } from "~/config/globalVariables";
const storyStore = useStoryStore();
const sprintsStore = useSprintStore();

interface Story {
  id: number;
  storyName: string;
  // add other properties if needed
}

const { fetchStories, filterStories, totalFilteredStoriesStats } = storyStore;
const { items } = storeToRefs(storyStore) as { items: Ref<Story[]> };

const { fetchSprints } = sprintsStore;
const { currentSprint, sprintList } = storeToRefs(sprintsStore);

// const show = computed(() => {
//   if (items.value.length < 1) {
//     return false;
//   }
//   return true;
// });
const isOpen = ref(false);

onMounted(async () => {
  await fetchStories();
});

definePageMeta({ requiresAuth: true });
</script>
<template class="border-b border-gray-200">
  <div>
    <div>
      <h2 class="text-lg font-medium">Stories</h2>
      <ul>
        <li v-for="story in items" :key="story.id">{{ story.storyName }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.wrapit {
  flex-wrap: wrap;
}

.nav-flex {
  display: flex;
  justify-content: flex-start;
}

.drop {
  margin-right: 5rem;
}
</style>
