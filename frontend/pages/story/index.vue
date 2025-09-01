<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { CONFIG } from "~/config/globalVariables";
const storyStore = useStoryStore();
const sprintsStore = useSprintStore();

const { fetchStories, filterStories, totalFilteredStoriesStats } = storyStore;
const { items } = storeToRefs<{
  items: Array<{ progressType: string; [key: string]: any }>;
}>(storyStore);

const { fetchSprints } = sprintsStore;
const { currentSprint, sprintList } = storeToRefs(sprintsStore);

const links = [
  [],
  [
    {
      icon: "i-heroicons-plus",
      to: "/stories/create",
      badge: {
        label: "Add Story",
        color: "blue",
        size: "md",
      },
    },
  ],
];

const show = computed(() => {
  if (items.value.length < 1) {
    return false;
  }
  return true;
});
const isOpen = ref(false);

onMounted(async () => {
  await fetchStories();
});

//
const inputValue = ref("");
const categoryInput = ref("");
const startDate = ref("");
const endDate = ref("");
const statusInput = ref("");
const pointing = ref("");
const workTypesInput = ref("");

const stats = computed(() =>
  totalFilteredStoriesStats(
    filterStories(
      inputValue.value,
      categoryInput.value,
      startDate.value,
      endDate.value,
      statusInput.value,
      pointing.value,
      workTypesInput.value
    )
  )
);

const showStats = computed(() => {
  return (
    inputValue.value.trim() !== "" ||
    categoryInput.value.trim() !== "" ||
    startDate.value !== "" ||
    endDate.value !== "" ||
    statusInput.value !== "" ||
    pointing.value !== "" ||
    workTypesInput.value
  );
});

const sortedFilteredStories = computed(() => {
  const filtered = filterStories(
    inputValue.value,
    categoryInput.value,
    startDate.value,
    endDate.value,
    statusInput.value,
    pointing.value,
    workTypesInput.value
  );

  const inProgress = filtered.filter((s) => s.status === "In Progress");
  const notInProgress = filtered.filter((s) => s.status !== "In Progress");

  return [
    ...inProgress,
    ...notInProgress.slice().sort((a, b) => {
      const order = { Pending: 0, Complete: 1 };
      return (order[a.status] ?? 99) - (order[b.status] ?? 99);
    }),
  ];
});

definePageMeta({ requiresAuth: true });
</script>
<template class="border-b border-gray-200">
  <div>
    <div class="">
      <!--PROGRESS BAR -->
      <UIProgress />
      <!---->
      <!--DROPDOWN IN STORIES-->
      <div class="nav-flex my-2 border-b border-gray-200 dark:border-gray-800">
        <UHorizontalNavigation :links="links" class="" />
        <UModal v-model="isOpen">
          <div class="p-4">IS HERE</div>
        </UModal>

        <UButton
          class="my-3"
          color="blue"
          variant="soft"
          label="Add"
          @Click="isOpen = true"
          >Insights</UButton
        >
      </div>

      <div class="numbers my-2">
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
      </div>
      <UIEmptyMessage v-if="items.length < 1" title="stories" />
      <StoryList
        v-else
        v-for="item in sortedFilteredStories"
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
    <div class="my-12"></div>
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
