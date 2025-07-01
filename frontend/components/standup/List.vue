<script setup lang="ts">
const props = defineProps([
  "sprintId",         // e.g. 'sprint_5000'
  "workingOn",        // e.g. 'Building auth flow'
  "notes",            // e.g. 'Fixed routing issues'
  "learnings",        // e.g. 'Learned about Vue transitions'
  "repo",             // e.g. 'my-project-repo'
  "ticketNumber",     // e.g. 'ABC-123'
  "date",             // ISO string
   "createdAt",
  "updatedAt",
]);
</script>

<template>
  <div class="sprint-list">
    <StandupItem
      :sprintId="props.sprintId"
      :workingOn="props.workingOn"
      :notes="props.notes"
      :learnings="props.learnings"
      :repo="props.repo"
      :ticketNumber="props.ticketNumber"
      :date="props.date"
       :createdAt="props.createdAt"
      :updatedAt="props.updatedAt"
    />
  </div>
</template>

<style scoped>
.sprint-list {
  background-color: #1f242a;
  padding: 0.2rem;
}
</style>