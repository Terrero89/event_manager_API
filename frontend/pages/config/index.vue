
<script setup lang="ts">
import {} from 'vue'
import { ref } from 'vue'

const form = ref({
  eventName: '',
  eventDescription: '',
})

</script>

<template>
    <div>
      <ConfigForm/>
   <div class="cool">
    hello
   </div>
    </div>
  </template>



<style scoped>
.cool{
    background: #373737;
    min-height: 35rem;
}
</style>
