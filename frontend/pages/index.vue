<script setup>
import {onMounted } from 'vue'
const sprintsStore = useSprintStore();
import { storeToRefs } from "pinia";

const {
  fetchSprints,

} = sprintsStore;
const { items, sprintList } = storeToRefs(sprintsStore);

onMounted(async() => {

await fetchSprints()


});

</script>

<template>
  <div>

<!-- <div>{{items}}</div>

<div>real list{{sprintList}}</div> -->

  </div>
</template>

<style scoped>
.k {
  color: white;
}
</style>
