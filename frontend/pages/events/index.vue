<script setup lang="ts">
import {onMounted } from 'vue'
const eventsStore = useEventStore();
import { storeToRefs } from "pinia";

const {
  fetchEvents,

} = eventsStore;
const { events} = storeToRefs(eventsStore);
// for later use
// const route = useRoute(); //route object
// const destId = route.params.destinationID;

onMounted(async() => {

  await fetchEvents()


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
        size: "sm",
      },
    },
    {
      label: "",
      icon: "i-heroicons-plus",
      to: "/events/create",
      badge: {
        label: "Sprint",
        color: "green",
        size: "sm",
      },
    },
    // {
    //   label: 'Insights',
    //   icon: 'i-heroicons-command-line',
    //   to: '/'
    // }
  ],
];
const isOpen = ref(false);
</script>
<template>
  <div>
    <div class="nav-flex my-2 border-b border-gray-200 dark:border-gray-800">
      <UHorizontalNavigation :links="navLinks" class="" />
      <UModal v-model="isOpen">
        <div class="p-4">IS HERE</div>
      </UModal>

      <UButton
        class="my-2"
        color="blue"
        size="xs"
        variant="soft"
        label="Add"
        @Click="isOpen = true"
        >Insights</UButton
      >
    </div>
    <div>NOTES</div>


  
    <EventsList  
    v-for="item in events"
    :key="item.id"
    :id="item.id"
    :description="item.description"
    :title="item.title"
    :date="item.date"
    :eventName="item.eventName"
    :eventType="item.eventType"
    :duration="item.duration"
    :sprintId="item.sprintId"
    :status="item.status"


      />
      <!-- {{ notes }} -->
  </div>

</template>

<style scoped>
.nav-flex {
  display: flex;
  justify-content: flex-end;
}
/* .progress {
  background-color: #1f242a;
  padding: 0.2rem;
} */
</style>
