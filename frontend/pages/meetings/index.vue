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
  
    // {
    //   label: 'Insights',
    //   icon: 'i-heroicons-command-line',
    //   to: '/'
    // }
  ]
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
        class="m-3"
        color="blue"
        
        variant="soft"
        label="Add"
        @Click="isOpen = true"
        >Insights</UButton
      >
    </div>
      
      <UIEmptyMessage v-if="meetings.length < 1" title="meetings" />

      <MeetingsList  
      v-else
    v-for="item in meetings"
    :key="item._id"
    :id="item._id"
    :description="item.description"
    :title="item.title"
    :date="item.date"
    :meetingName="item.meetingName"
    :meetingType="item.meetingType"
    :duration="item.duration"
    :sprintId="item.sprintId"
    :status="item.status"


      />
    </div>
    
    
    </template>


<style scoped>
.nav-flex {
  display: flex;
  justify-content: flex-end;

}

  </style>