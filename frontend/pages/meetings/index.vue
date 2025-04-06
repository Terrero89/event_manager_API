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
        size: "sm"
      }
    },
    {
      label: '',
      icon: 'i-heroicons-plus',
      to: '/notes/create',
      badge: {
        label: 'Sprint',
        color: 'green',
        size: "sm"
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
        class="my-2"
        color="blue"
        size="xs"
        variant="soft"
        label="Add"
        @Click="isOpen = true"
        >Insights</UButton
      >
    </div>
      <div>Meetings Page</div>

      <MeetingsList  
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