<script setup lang="ts">
import { onMounted } from "vue";
import { CONFIG } from "~/config/globalVariables";
const eventsStore = useEventStore();
import { storeToRefs } from "pinia";
const sprintsStore = useSprintStore();

interface Event {
  id: number | string;
  description: string;
  date: string;
  eventName: string;
  eventType: string;
  duration: string | number;
  sprintId: number | string;
  status: string;
}

const { fetchEvents, filterEvents, totalFilteredStats} = eventsStore;
const { events } = storeToRefs(eventsStore) as { events: Ref<Event[]> };

const { fetchSprints } = sprintsStore;
const { currentSprint, sprintList } = storeToRefs(sprintsStore);



// const searched = computed(() =>   filterEventsByInput(inputValue.value))
onMounted(async () => {
  await fetchEvents();
});
const navLinks = [
  [],
  [
    {
      label: "",
      icon: "i-heroicons-plus",
      to: "/events/create",
      badge: {
        label: "Event",
        color: "blue",
        size: "md",
      },
    },
  ],
];
const show = computed(() => {
  if (events.value.length < 1) {
    return false;
  }
  return true;
});
const isOpen = ref(false);
const inputValue = ref("");
const categoryInput = ref("");
const startDate = ref("");
const endDate = ref("");
const statusInput = ref("")

const stats = computed(()=> totalFilteredStats(filterEvents(inputValue.value, categoryInput.value, startDate.value, endDate.value,  statusInput.value))
)
const showStats = computed(() => {
  return (
    inputValue.value.trim() !== "" ||
    categoryInput.value.trim() !== "" ||
    startDate.value !== "" ||
    endDate.value !== "" ||
    statusInput.value !== ""
  );
});

const sortedFilteredEvents = computed(() => {
  const filtered = filterEvents(
    inputValue.value,
    categoryInput.value,
    startDate.value,
    endDate.value,
    statusInput.value
  );

  return filtered.slice().sort((a, b) => {
    const order = { "Pending": 0, "In Progress": 1, "Complete": 2 };
    return (order[a.status] ?? 99) - (order[b.status] ?? 99);
  });
});

</script>
<template>
  <div>
    <div class="nav-flex my-2 border-b border-gray-200 dark:border-gray-800">
      <UHorizontalNavigation :links="navLinks" class="" />
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
        :options="CONFIG.variables.eventTypes"
        v-model="categoryInput"
      />
      <UInputMenu
        color="gray"
        variant="outline"
        trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2"
        placeholder="Select by status"
        :options="CONFIG.variables.statusLevel"
        v-model="statusInput"
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
        "
      />
    </div>
    <div class="numbers my-2">

<div v-if="showStats" class="numbers my-2">
  <div class="mr-2">
    Total {{ categoryInput === '' ? 'Items' : categoryInput}}:
    <UBadge variant="soft" color="teal" class="font-bold">2</UBadge>
  </div>
  <div class="mr-2" v-if="stats.completedCount > 0">
 Status {{statusInput !== "Pending" && statusInput !== "Completed" ? statusInput : "Totals"}}:
    <UBadge variant="soft" class="font-bold">{{ stats.completedCount }}</UBadge>
    
  </div>
  

   <div class="mr-2" v-if="stats.pendingCount > 0">
    Total {{statusInput}}:
    <UBadge variant="soft" color="teal"  class="font-bold">{{ stats.pendingCount }}</UBadge>
    
  </div>
  <div class="mr-2">
    Total Hours:
    <UBadge variant="soft" color="teal"  class="font-bold">{{ stats.totalDuration }}</UBadge>
  </div>
</div>

</div>
    <UIEmptyMessage v-if="events.length < 1" title="events" />

    <EventsList
      v-else
      v-for="item in sortedFilteredEvents"
      :key="item.id"
      :id="item.id"
      :description="item.description"
      :date="item.date"
      :eventName="item.eventName"
      :eventType="item.eventType"
      :duration="item.duration"
      :sprintId="item.sprintId"
      :status="item.status"
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

.numbers{
  display:flex;
  justify-content:start;

}
</style>
