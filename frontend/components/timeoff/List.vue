<script setup lang="ts">
const props = defineProps([
  "_id",
  "sprintId", // e.g. 'sprint_5000'
  "title", // e.g. 'Dentist emergency'
  "timeOff", // e.g. 4
  "timeOffType", // e.g. 'Personal'
  "date", // ISO string
  "createdAt",
  "updatedAt",
]);
</script>

<template>
  <div class="timeoff-list">
    <TimeoffItem
      :_id="props._id"
      :sprintId="props.sprintId"
      :title="props.title"
      :timeOff="props.timeOff"
      :timeOffType="props.timeOffType"
      :date="props.date"
      :createdAt="props.createdAt"
      :updatedAt="props.updatedAt"
    />
  </div>
</template>

<style scoped>
.timeoff-list {
  background-color: #1f242a;
  padding: 0.2rem;
}
</style>
