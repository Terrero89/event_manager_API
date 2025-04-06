<script setup>
const props = defineProps([
  'id',
  'title',
  'description',
  'date',
  'noteType',
  'noteName',
  'priorityLevel',
  'sprintId',
])


</script>

<template>
  <div class="details-card">
    {{}}
    <h2 class="details-title">Note Details</h2>
    <ul class="details-list">
      <li><strong>ID:</strong> {{ id }}</li>
      <li><strong>Title:</strong> {{ title }}</li>
      <li><strong>Description:</strong> {{ description }}</li>
      <li><strong>Date:</strong> {{ date }}</li>
      <li><strong>Note Type:</strong> {{ noteType }}</li>
      <li><strong>Note Name:</strong> {{ noteName }}</li>
      <li><strong>Priority Level:</strong> {{ priorityLevel }}</li>
      <li><strong>Sprint ID:</strong> {{ sprintId }}</li>
    </ul>
  </div>
</template>

<style scoped>
.details-card {
  background-color: #1f242a;
  color: #ffffff;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  max-width: 600px;
  margin: auto;
}

.details-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid #3b4047;
  padding-bottom: 0.5rem;
}

.details-list {
  list-style: none;
  padding: 0;
}

.details-list li {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}
</style>
