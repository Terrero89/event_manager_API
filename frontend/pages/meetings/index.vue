<script setup lang="ts">
import {onMounted } from 'vue'
const meetingStore = useMeetingStore();
import { storeToRefs } from "pinia";

const {
  fetchMeetings,

} = meetingStore;
const { meetings } = storeToRefs(meetingStore);
// for later use
// const route = useRoute(); //route object
// const destId = route.params.destinationID;

onMounted(async() => {

  await fetchMeetings()


});


const navLinks = [
  [],
  [
    {
      label: '',
      icon: 'i-heroicons-plus',
      to: '/meetings/create',
      badge: {
        label: 'Meetings',
        color: 'blue',
        size: "md"
      }
    },
  ]
];
const show = computed(()=> {
  if(meetings.value.length < 1){
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
    <UButton
        class=" my-3 mx-2 ml-auto "
        color="teal"
        variant="outline"
        label="Clear"
        @click="inputValue = ''; inputType = ''"
  
      />
   
 </div>
      <UIEmptyMessage v-if="meetings.length < 1" title="meetings" />

      <MeetingsList  
      v-else
    v-for="item in meetings"
    :key="item.id"
    :id="item.id"
    :description="item.description"
    :date="item.date"
    :meetingName="item.meetingName"
    :meetingType="item.meetingType"
    :duration="item.duration"
    :sprintId="item.sprintId"
    :status="item.status"


      />
    
      <div class="my-12"></div>
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