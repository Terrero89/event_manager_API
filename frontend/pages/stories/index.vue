<script setup lang="ts">
import { onMounted } from "vue";
const storyStore = useStoryStore();
import { storeToRefs } from "pinia";

const { fetchStories } = storyStore;
const { items } = storeToRefs<{
  items: Array<{ progressType: string; [key: string]: any }>;
}>(storyStore);

onMounted(async () => {
  await fetchStories();
});

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
  "planningNotes", // planning for the spring
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
      },
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

      <div class="progress">
        <div class="item-buttons">
          <UModal v-model="isOpen">
            <div class="p-4">SHOW DETAILS HERE</div>
          </UModal>
        </div>
        <div class="nav-flex wrapit" v-if="show">
          <UInputMenu
            color="gray"
            variant="outline"
            trailing-icon="i-heroicons-chevron-down"
            class="w-full lg:w-48 my-3 mr-2"
            placeholder="Select a sprint"
            :options="sprintList"
            model-value=""
          />
          <UInputMenu
            color="gray"
            variant="outline"
            trailing-icon="i-heroicons-chevron-down"
            class="w-full lg:w-48 my-3 mr-2"
            placeholder="Select a sprint"
            :options="sprintList"
            model-value=""
          />
          <UInputMenu
            color="gray"
            variant="outline"
            trailing-icon="i-heroicons-chevron-down"
            class="w-full lg:w-48 my-3 mr-2"
            placeholder="Select a sprint"
            :options="sprintList"
            model-value=""
          />
        </div>
        <UIEmptyMessage v-if="items.length < 1" title="stories" />
        <StoryList
          v-else
          v-for="item in items"
          :key="item._id"
          :id="item._id"
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
          :dateCompleted="item.dateCompleted"
          :sprint="item.sprint"
          :learning="item.learning"
          :planningNotes="item.planningNotes"
        />
      </div>
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
