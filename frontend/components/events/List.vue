<script setup>
const props = defineProps([
  "_id",
  "description",
  "date",
  "eventType",
  "eventName",
  "duration",
  "sprintId",
  "status",
  "createdAt",
  "updatedAt",
]);

const isOpen = ref(false);
</script>
<template>
  <div>
    <div class="progress">
      <div class="item-buttons">
        <UModal v-model="isOpen">
          <div class="p-4">SHOW DETAILS HERE</div>
        </UModal>
      </div>
      <!-- List: {{props.id}}
{{props}} -->
      <EventsItem
        :_id="_id"
        :description="props.description"
        :date="props.date"
        :eventType="props.eventType"
        :eventName="props.eventName"
        :duration="props.duration"
        :sprintId="props.sprintId"
        :status="props.status"
        :updatedAt="props.updatedAt"
        :createdAt="props.createdAt"
      />
    </div>
  </div>
</template>

<style scoped>
.progress {
  background-color: #1f242a;
  padding: 0.2rem;
}
</style>
