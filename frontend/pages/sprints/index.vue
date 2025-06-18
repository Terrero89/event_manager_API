<script setup lang="ts">
import { onMounted } from "vue";
const sprintsStore = useSprintStore();
import { storeToRefs } from "pinia";

const { fetchSprints } = sprintsStore;
const { items, sprintList, currentSprint } = storeToRefs(sprintsStore);
const navLinks = [
  [],
  [
    {
      label: "",
      icon: "i-heroicons-plus",
      to: "/sprints/create",
      badge: {
        label: "Add Sprint",
        color: "blue",
        size: "md",
      },
    },
  ],
];
onMounted(async () => {
  await fetchSprints();
});

const isOpen = ref(false);
const page = ref(5);
const show = computed(()=> {
  if(items.value.length < 1){
  return false
}
return true
});
</script>
<template>
  <div>
    <div class="nav-flex my-2 border-b border-gray-200 dark:border-gray-800">
      <UHorizontalNavigation :links="navLinks" />
      <UModal v-model="isOpen">
        <div class="p-4">IS HERE from another component</div>
      </UModal>

      <UButton
        class="m-3"
        color="blue"
        variant="soft"
        label="Add"
        @Click="isOpen = true"
        >Insights</UButton
      >
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
    <UIEmptyMessage v-if="items.length < 1" title="sprints" />
    <SprintsList
      v-else
      v-for="item in items"
      :key="item._id"
      :_id="item._id"
      :sprintId="item.sprintId"
      :startDate="item.startDate"
      :endDate="item.endDate"
      :summary="item.summary"
      :piNotes="item.piNotes"
      :storyUnderSprint="item.storyUnderSprint"
         :updatedAt="item.updatedAt"
        :createdAt="item.createdAt"
    />
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
