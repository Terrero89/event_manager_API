
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const notes = ref('');

onMounted(async () => {
  // fetch note data here
//   notes.value = {
//     id: route.params.notesId,
//     title: 'Note Title',
//     content: 'Note Content'
//   }
})
</script>

<template>
    <div>
      <h1>Notes {{ route.params.notesId }}</h1>
    </div>
  </template>
  