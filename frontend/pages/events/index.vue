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
        size: "md",
      },
    },
   
    // {
    //   label: 'Insights',
    //   icon: 'i-heroicons-command-line',
    //   to: '/'
    // }
  ],
];
const show = computed(()=> {
  if(events.value.length < 1){
  return false
}
return true
});
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
        class="my-3"
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
        class="w-full lg:w-48  my-3 mr-2"
        placeholder="Select a sprint"
        :options="sprintList"
        model-value=""
    />
    <UInputMenu
        
        color="gray" 
        variant="outline"
   
        trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48  my-3 mr-2"
        placeholder="Select a sprint"
        :options="sprintList"
        model-value=""
    />
    <UInputMenu
        
        color="gray" 
        variant="outline"
   
        trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48  my-3 mr-2"
        placeholder="Select a sprint"
        :options="sprintList"
        model-value=""
    />
 </div>
 
    <UIEmptyMessage v-if="events.length < 1" title="events" />
   
    <EventsList  
    v-else
    v-for="item in events"
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
      <div class="my-12" ></div>
  </div>

</template>

<style scoped>
.wrapit{
  flex-wrap: wrap;
}
.nav-flex {
  display: flex;
  justify-content: flex-start;
 

}
.drop {
  margin-right:5rem;
}
</style>
