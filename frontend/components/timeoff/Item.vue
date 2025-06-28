<script setup lang="ts">
import { computed, ref } from "vue";

// Props for a timeoff entry
const props = defineProps<{
  _id: string;
  sprintId: string;
  title: string;
  timeOff: number;
  timeOffType: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}>();

// Pick a badge color based on type of time off
const typeColor = computed(() => {
  switch (props.timeOffType) {
    case "Personal":
      return "blue";
    case "Vacation":
      return "green";
    case "Sick":
      return "red";
    case "Unpaid":
      return "orange";
    default:
      return "gray";
  }
});

const isOpen = ref(false);
</script>

<template>
  <UIRenderer>
    <div class="item">
      <p><strong>Sprint ID:</strong> {{ props.sprintId }}</p>
      <p><strong>Title:</strong> {{ props.title }}</p>

      <div class="item-header">
        <p>
          <strong>Type:</strong>
          <UBadge :color="typeColor" variant="soft">
            {{ props.timeOffType }}
          </UBadge>
        </p>
        <p>
          <strong>Days:</strong>
          <UBadge color="red" variant="soft">
            {{ props.timeOff }}
          </UBadge>
        </p>
      </div>

      <div class="item-content">
        <p><strong>Date:</strong> {{ formatDate(props.date) }}</p>
        <p><strong>Requested On:</strong> {{ formatDate(props.createdAt) }}</p>
      </div>
    </div>

    <div class="item-buttons my-2">
      <UButton variant="soft" @click="isOpen = true"> Details </UButton>

      <UModal v-model="isOpen">
        <div class="modal-content">
          <TimeoffUpdate
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
      </UModal>
    </div>
  </UIRenderer>
</template>

<style scoped>
.item {
  margin: 0.9rem 0;
  display: flex;
  flex-direction: column;
  color: white;
}
.item-header,
.item-content {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
}
.item-header p,
.item-content p {
  font-size: 0.9rem;
  margin: 0.2rem 0;
}
.item-content p {
  margin-right: 1rem;
}
.item-buttons {
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
}
.modal-content .progress {
  background-color: #1f242a;
  padding: 0.2rem;
}
</style>
