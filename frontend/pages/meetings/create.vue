
<script setup lang="ts">
import {useRouter, useRoute} from 'vue'
import { ref } from 'vue'

const form = ref({
  eventName: '',
  eventDescription: '',
})

const onSubmit = async () => {
  // Call the API to create the event
  const response = await fetch('/api/v1/meetings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form.value),
  })

  if (response.ok) {
    // Navigate to the event page
    const meeting = await response.json()
    const route = useRoute()
    const router = useRouter()
    router.push(`/meeting/${meeting.id}`)
  } else {
    // Handle the error
    const error = await response.json()
    console.error(error)
  }
}
</script>

<template>
    <div>
      <h1>Create Meeting</h1>
      
      <form @submit.prevent="onSubmit">
        <div>
          <label for="eventName">Event Name</label>
          <input type="text" class="form-control" id="eventName" v-model="form.eventName" />
        </div>
        <div>
          <label for="eventDescription">Event Description</label>
          <textarea class="form-control" id="eventDescription" v-model="form.eventDescription"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </template>
