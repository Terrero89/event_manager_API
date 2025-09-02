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
    <!-- <div class="numbers my-2">
      <div class="numbers my-2">
        <div class="mr-2">
          Total {{ categoryInput === "" ? "Items" : categoryInput }}:
          <UBadge variant="soft" color="teal" class="font-bold">{{
            stats.totalItems
          }}</UBadge>
        </div>

        <div class="mr-2">
          Items in {{ statusInput }}:
          <UBadge variant="soft" class="font-bold">{{ stats.filterType }}</UBadge>
        </div>

        <div class="mr-2" v-if="stats.filterType > 0">
          Total {{ statusInput }}:
          <UBadge variant="soft" color="teal" class="font-bold">{{
            stats.filterType
          }}</UBadge>
        </div>
      </div>
    </div> -->
    <UIEmptyMessage v-if="items.length < 1" title="stories" />
    <StoryList
      v-else
      v-for="item in items"
      :key="item._id"
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
    />
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
