<script setup lang="ts">
import { computed, ref } from "vue";
import { formatDate } from "~/utils/date-conversion";

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

// Pick a badge color based on type of time off
const typeColor = computed(() => {
  switch (props.timeOffType) {
    case "Vacation":
      return "green";
    case "Sick Leave":
      return "red";
    case "Personal Leave":
      return "blue";
    case "Compensatory Time Off":
      return "amber";
    case "Unpaid Leave":
      return "orange";
    case "Maternity/Paternity Leave":
      return "pink";
    case "Bereavement Leave":
      return "gray";
    case "Jury Duty":
      return "indigo";
    case "Military Leave":
      return "teal";
    case "Public Service Leave":
      return "lime";
    case "Other":
      return "gray";
    default:
      return "gray";
  }
});

const isOpen = ref(false);
</script>

<template>
  <div>
    <UIRenderer>
      <div class="item">
        <p><strong>Title: </strong> {{ props.title }}</p>

        <div class="item-header">
          <p><strong>Sprint ID: </strong> {{ props.sprintId }}</p>
          <p>
            <strong>Type: </strong>
            <UBadge :color="typeColor" variant="soft">
              {{ props.timeOffType }}
            </UBadge>
          </p>
          <p>
            <strong>Hours:</strong>
            <UBadge color="red" variant="soft">
              {{ props.timeOff }}
            </UBadge>
          </p>
        </div>
        <div class="item-flex">
          <p class="mr-2">
            <strong>Date: </strong> {{ formatDate(props.date) }}
          </p>
        </div>
        <div class="item-content"></div>
      </div>

      <div class="item-buttons my-2">
        <UButton variant="soft" class="" @click="isOpen = true"
          >Details</UButton
        >

        <UModal v-model="isOpen">
          <DaysoffUpdate
            :_id="props._id"
            :sprintId="props.sprintId"
            :title="props.title"
            :timeOff="props.timeOff"
            :timeOffType="props.timeOffType"
            :date="props.date"
            :createdAt="props.createdAt"
            :updatedAt="props.updatedAt"
          />
        </UModal>
      </div>
    </UIRenderer>
  </div>
</template>

<style scoped>
.b {
  margin-top: auto;
  margin-left: auto;
}

.item-buttons {
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.item-flex {
  display: flex;
  justify-content: start;
}

.item {
  margin: 0.9rem 0;
  display: flex;
}

.item-content div {
  display: flex;
  flex-wrap: wrap;
}

.item .item-header {
  display: flex;
  flex-wrap: wrap;
  font-size: 0.9rem;
}

.item-header p,
div {
  margin: 0.2rem 0;
  font-size: 0.9rem;
  margin-right: 1rem;
}

.item-header strong,
div {
  margin: 0.1rem 0;
  font-size: 0.9rem;
  margin-right: 0.5rem;
}

.item-content p {
  margin: 0.2rem 0;
  font-size: 0.9rem;
  display: flex;
  margin-right: 1rem;
  flex-wrap: wrap;
}

.item-content strong {
  margin: 0.1rem 0;
  font-size: 0.9rem;
  margin-right: 0.5rem;
}

.item {
  margin-right: auto;
  flex-direction: column;
  justify-content: flex-end;
  margin-top: 0.5rem;
  color: white;
}
</style>
