
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const event = ref(null)

// onMounted(async () => {
//   // fetch event data here
//   event.value = {
//     id: route.params.eventsId,
//     name: 'Event Name',
//     description: 'Event Description'
//   }
// })
</script>
<template>
    <div>
      <h1>Event {{ route.params.eventsId }}</h1>
    </div>
  </template>
  