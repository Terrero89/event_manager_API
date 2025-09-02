<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { CONFIG } from "~/config/globalVariables";
const storyStore = useStoryStore();
const sprintsStore = useSprintStore();

interface Story {
  id: string | number;
  _id: string;
  sprintId: string;
  storyNumber: string | number;
  storyName: string;
  storyDescription: string;
  difficultyLevel: string | number;
  storyPoints: number;
  workType: string;
  developmentType: string;
  status: string;
  storyComments: string;
  reporter: string;
  repoNames: string[];
  dateAssigned: string | Date;
  dateCompleted: string | Date | null;
  learning: string;
  createdAt: string | Date;
  updatedAt: string | Date;
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
        <li
          v-for="item in items"
          :key="item.id"
          :_id="item._id"
          :sprintId="item.sprintId"
          :storyNumber="item.storyNumber"
          :storyName="item.storyName"
          :storyDescription="item.storyDescription"
          :difficultyLevel="item.difficultyLevel"
          :storyPoints="item.storyPoints"
          :workType="item.workType"
          :developmentType="item.developmentType"
          :status="item.status"
          :storyComments="item.storyComments"
          :reporter="item.reporter"
          :repoNames="item.repoNames"
          :dateAssigned="item.dateAssigned"
          :dateCompleted="item.dateCompleted"
          :learning="item.learning"
          :createdAt="item.createdAt"
          :updatedAt="item.updatedAt"
        >
          {{ item.storyName }}-{{item.storyNumber}}
        </li>
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
