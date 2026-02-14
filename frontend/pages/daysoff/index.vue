<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";

// Stores
const sprintStore = useSprintStore();
const daysoffStore = useDaysoffStore();

// Actions & state
const { currentSprint, sprintList } = storeToRefs(sprintStore);
const { fetchSprints } = sprintStore;

interface DaysoffItem {
  _id: string;
  currentYear: Number;
  previousYearHours: number;
  currentPersonalDaysHours: number;
  currentSickDaysHours: number;
  currentVacationDaysHours: number;
  currentHolidayDaysHours: number;
  currentAccrueHoursForYear: number;
  currentAccruedHoursForMonth: number;
  currentAccruedMonthsPerYear: number;
  status: string;
  description: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
const { items } = storeToRefs(daysoffStore) as { items: Ref<DaysoffItem[]> };
const { fetchDaysoff } = daysoffStore;

// Navigation "Add" link
const links = [
  [],
  [
    {
      icon: "i-heroicons-plus",
      to: "/daysoff/create",
      badge: { label: "Add daysoff", color: "blue", size: "md" },
    },
  ],
];

// Modal for insights
const isOpen = ref(false);

// Fetch on mount
onMounted(async () => {
  await fetchSprints();
  await fetchDaysoff();
});
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
          color="yellow"
          variant="soft"
          label="Add"
          @click="isOpen = true"
        >Edit
        </UButton>
      </div>

      <!-- Empty / List -->
      <UIEmptyMessage v-if="items.length < 1" title="daysoff requests" />
      <DaysoffList
        v-else
        v-for="item in items"
        :key="item._id"
        :_id="item._id"
        :currentYear="item.currentYear || 2026"
        :previousYearHours="item.previousYearHours"
        :currentPersonalDaysHours="item.currentPersonalDaysHours"
        :currentSickDaysHours="item.currentSickDaysHours"
        :currentVacationDaysHours="item.currentVacationDaysHours"
        :currentHolidayDaysHours="item.currentHolidayDaysHours"
        :currentAccrueHoursForYear="item.currentAccrueHoursForYear"
        :currentAccruedHoursForMonth="item.currentAccruedHoursForMonth"
        :currentAccruedMonthsPerYear="item.currentAccruedMonthsPerYear"
        :status="item.status"
        :description="item.description"
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
