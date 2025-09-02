<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { CONFIG } from "~/config/globalVariables";

// Stores
const sprintStore = useSprintStore();
const timeoffStore = useTimeoffStore();
const standupStore = useStandupStore();

// Actions & state
const { currentSprint, sprintList } = storeToRefs(sprintStore);
const { items } = storeToRefs(standupStore);
const { fetchStandups } = standupStore;
const { fetchSprints } = sprintStore;
// Define the type for a timeoff item

// Navigation “Add” link
const links = [
  [],
  [
    {
      icon: "i-heroicons-plus",
      to: "/standup/create",
      badge: { label: "Add Standup", color: "blue", size: "md" },
    },
  ],
];

// Modal for insights (as in Stories)
const isOpen = ref(false);

// Search / filter inputs
// const show = computed(() => items.value.length > 0);
// const inputValue = ref("");
// const typeFilter = ref("");
// const startDate = ref("");
// const endDate = ref("");

// Fetch on mount
onMounted(async () => {
  await fetchSprints();

  await fetchStandups();
});

// definePageMeta({ requiresAuth: true });
</script>

<template class="border-b border-gray-200">
  <div>
    <div>
      <!-- PROGRESS BAR -->
      <UIProgress />

      <!-- Top Nav -->
      <div class="nav-flex my-2 border-b border-gray-200 dark:border-gray-800">
        <UHorizontalNavigation :links="links" />
        <UModal v-model="isOpen">
          <div class="p-4">Insights here…</div>
        </UModal>
        <UButton
          class="my-3"
          color="blue"
          variant="soft"
          label="Add"
          @click="isOpen = true"
        >
          Insights
        </UButton>
      </div>

      <!-- Filters -->
      <!-- <div class="nav-flex wrapit" v-if="show">
        <UInput
          v-model="inputValue"
          placeholder="Search by reason..."
          class="w-full lg:w-48 my-3 mr-2"
          color="gray"
          variant="outline"
        />
        <UInputMenu
          v-model="typeFilter"
          :options="CONFIG.variables.timeoffTypes"
          placeholder="Filter by type"
          class="w-full lg:w-48 my-3 mr-2"
          trailing-icon="i-heroicons-chevron-down"
          color="gray"
          variant="outline"
        />
        <UInput
          v-model="startDate"
          type="date"
          placeholder="Start date"
          class="w-full lg:w-36 my-3 mr-2"
          color="gray"
          variant="outline"
        />
        <UInput
          v-model="endDate"
          type="date"
          placeholder="End date"
          class="w-full lg:w-36 my-3 mr-2"
          color="gray"
          variant="outline"
        />
        <UButton
          class="my-3 mx-2 ml-auto"
          color="teal"
          variant="outline"
          label="Clear"
          @click="
            inputValue = '';
            typeFilter = '';
            startDate = '';
            endDate = '';
          "
        />
      </div> -->

      <!-- Empty / List -->
      <UIEmptyMessage v-if="items.length < 1" title="timeoff requests" />
      <StandupList
        v-else
        v-for="item in items"
        :key="item._id"
        :_id="item._id"
        :sprintId="item.sprintId"
        :workingOn="item.workingOn"
        :title="item.title"
        :ticketNumber="item.ticketNumber"
        :repo="item.repo"
        :date="item.date"
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
.numbers {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
