<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const meeting = ref(null)

onMounted(async () => {
  // fetch meeting data here
  meeting.value = {
    id: route.params.meetingId,
    name: 'Meeting Name',
    description: 'Meeting Description'
  }
})
</script>
<template>
    <div>
      <h1>Meeting {{ route.params.meetingId }}</h1>
    </div>
  </template>