<script setup lang="ts">
import { onMounted } from "vue";
import { CONFIG } from "~/config/globalVariables";
const storyStore = useStoryStore();
const sprintsStore = useSprintStore();
import { storeToRefs } from "pinia";

const { fetchStories,  filterStories, totalFilteredStoriesStats } = storyStore;
const { items } = storeToRefs<{
  items: Array<{ progressType: string; [key: string]: any }>;
}>(storyStore);


const { fetchSprints} = sprintsStore;
const {currentSprint, sprintList} = storeToRefs(sprintsStore);



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

  "updatedAt",
]);
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
      }
    },
  ],
];



const show = computed(()=> {
  if(items.value.length < 1){
  return false
}
return true
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
const pointing = ref('')
const workTypesInput = ref('')

const stats = computed(()=> totalFilteredStoriesStats(filterStories(inputValue.value, categoryInput.value, startDate.value, endDate.value,  statusInput.value, pointing.value, workTypesInput.value)));

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

const sortedFilteredStories= computed(() => {
  const filtered = filterStories(
    inputValue.value,
    categoryInput.value,
    startDate.value,
    endDate.value,
    statusInput.value,
    pointing.value,
    workTypesInput.value
  );

  const inProgress = filtered.filter(s => s.status === "In Progress");
  const notInProgress = filtered.filter(s => s.status !== "In Progress");

  return [
    ...inProgress,
    ...notInProgress.slice().sort((a, b) => {
      const order = { "Pending": 0, "Complete": 1 };
      return (order[a.status] ?? 99) - (order[b.status] ?? 99);
    }),
  ];
});
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

    <div class="nav-flex wrapit" v-if="show">
      <UInput
        color="gray"
        variant="outline"
        class="w-full lg:w-48 my-3 mr-2"
        placeholder="Search..."
        v-model="inputValue"
      />
      <UInputMenu
        color="gray"
        variant="outline"
        trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2"
        placeholder="Select by category"
        :options='["Frontend", "Backend", "Fullstack"]'
        v-model="categoryInput"
      />
      <UInputMenu
        color="gray"
        variant="outline"
        trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2"
        placeholder="Select by status"
        :options="CONFIG.variables.status"
        v-model="statusInput"
      />
       <UInputMenu
        color="gray"
        variant="outline"
        trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-24 my-3 mr-2"
        placeholder="Select by Points"
        :options="CONFIG.variables.points"
        v-model="pointing"
      />
  <UInputMenu
        color="gray"
        variant="outline"
        trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2"
        placeholder="Select by status"
        :options="CONFIG.variables.workTypes"
        v-model="workTypesInput"
      />
   


      <UInput
        color="gray"
        variant="outline"
        v-model="startDate"
        type="date"
        placeholder="Start date"
        class="w-full lg:w-36 my-3 mr-2"
      />

      <UInput
        color="gray"
        variant="outline"
        v-model="endDate"
        type="date"
        placeholder="End date"
        class="w-full lg:w-36 my-3 mr-2"
      />
      <UButton
        class="my-3 mx-2 ml-auto"
        color="teal"
        variant="outline"
        label="Clear"
        @click="
          inputValue = '';
          categoryInput = '';
          startDate = '';
          endDate = '';
          statusInput = '';
          pointing = '';
          workTypesInput = '';
        "
      />
       </div>
        {{ totalFilteredStoriesStats(filterStories(inputValue, categoryInput, startDate, endDate,  statusInput)) }}
            <div class="numbers my-2">

<div  class="numbers my-2">
  <div class="mr-2">
    Total {{ categoryInput === '' ? 'Items' : categoryInput}}:
    <UBadge variant="soft" color="teal" class="font-bold">2</UBadge>
  </div>
  <div class="mr-2" v-if="stats.filterType > 0">
 Status {{statusInput !== "Pending" && statusInput !== "Completed" ? statusInput : "Totals"}}:
    <UBadge variant="soft" class="font-bold">{{ stats.filterType}}</UBadge>
    
  </div>
  
{{pointing}}
   <div class="mr-2" v-if="stats.filterType > 0">
    Total {{statusInput}}:
    <UBadge variant="soft" color="teal"  class="font-bold">{{ stats.filterType}}</UBadge>
    
  </div>
 
</div>

</div>
        <UIEmptyMessage v-if="items.length < 1" title="stories" />
        <StoryList
          v-else
          v-for="item in sortedFilteredStories"
          :key="item.id"
          :id="item.id"
          :progressType="item.progressType"
          :storyTitle="item.storyTitle"
          :storyName="item.storyName"
          :storyDescription="item.storyDescription"
          :difficultyLevel="item.difficultyLevel"
          :storyPoints="item.storyPoints"
          :workType="item.workType"
          :developmentType="item.developmentType"
          :status="item.status"
          :storyComments="item.storyComments"
          :date="item.date"
          :reporter="item.reporter"
          :repoNames="item.repoNames"
          :dateAssigned="item.dateAssigned"
          :dateCompleted="item.dateCompleted"
          :sprintId="item.sprintId"
          :learning="item.learning"
          
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
