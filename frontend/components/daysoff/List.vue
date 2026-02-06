<script setup lang="ts">
const props = defineProps([
  "_id",
  "sprintId",
  "title",
  "timeOff",
  "timeOffType",
  "date",
  "createdAt",
  "updatedAt",
]);
</script>

<template>
  <div class="daysoff-list">
    <DaysoffItem
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
.daysoff-list {
  background-color: #1f242a;
  padding: 0.2rem;
}
</style>
