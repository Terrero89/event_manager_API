<script setup>
const eventsStore = useEventStore();
import { storeToRefs } from "pinia";

const { itemsAsArray } = eventsStore;
const props = defineProps([
  "_id",
  "description",
  "date",
  "eventType",
  "eventName",
  "startTime",
  "endTime",
  "duration",
  "sprintId",
  "status",
  "createdAt",
  "updatedAt",
]);

const progressColor = computed(() => {
  switch (props.status) {
    case "Completed":
      return "blue";
    case "Pending":
      return "purple";
    default:
      return "black";
  }
});

const typeColor = computed(() => {
  switch (props.eventType) {
    case "ERG Events":
      return "indigo";
    case "Volunteering":
      return "green";
    case "Workshops":
      return "orange";
    case "Company Events":
      return "blue";
    case "Networking":
      return "teal";
    case "Hackathons":
      return "purple";
    case "Team Events":
      return "amber";
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
    <!-- <h3>ITEM COMPONENT</h3> -->
    <UIRenderer>
      <div class="item">
        <p><strong>Event Name: </strong> {{ eventName }}</p>

        <div class="item-header">
          <p>
            <strong>Event Type:</strong>
            <UBadge :color="typeColor" variant="soft"> {{ props.eventType }}</UBadge>
          </p>
          <p>
            <strong>Status:</strong>
            <UBadge :color="progressColor" variant="soft"> {{ props.status }}</UBadge>
          </p>
        </div>
        <div class="item-content">
          <div>
            <p>
              <strong>Start Time:</strong>
              {{ to12HourFormat(props.startTime) }}
            </p>

            <p><strong>End Time: </strong>{{ to12HourFormat(props.endTime) }}</p>
          </div>
          <div>
            <p>
              <strong>Description: </strong>
              {{
                description.length > 15 ? description.slice(0, 15) + "..." : description
              }}
            </p>
            <p><strong>Date: </strong> {{ formatDate(date) }}</p>

            <p>
              <strong>Duration:</strong>
              <UBadge color="red" variant="soft"> {{ duration }} hours </UBadge>
            </p>
          </div>
          <div class="data">
            <p class="mr-2">
              <strong>Created on:</strong> {{ formatDate(props.createdAt) }}
            </p>
          </div>
        </div>
      </div>

      <div class="item-buttons my-2">
        <UButton variant="soft" class="" @click="isOpen = true">Details</UButton>

        <UModal v-model="isOpen">
          <EventsDetails
            :_id="props._id"
            :description="props.description"
            :date="props.date"
            :eventType="props.eventType"
            :eventName="props.eventName"
            :startTime="props.startTime"
            :endTime="props.endTime"
            :duration="props.duration"
            :sprintId="props.sprintId"
            :status="props.status"
            :updatedAt="props.updatedAt"
        :createdAt="props.createdAt"
          />
        </UModal>
      </div>
    </UIRenderer>
  </div>
</template>

<style scoped>
.data {
  display: flex;
  flex-wrap: wrap;
}
.b {
  margin-top: auto;
  margin-left: auto;
  /* max-width: 6rem; */
}

.item-buttons {
  display: flex;
  flex-direction: column;
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
  /* border:solid red 1px; */
}

.item-header p {
  margin: 0.2rem 0;
  font-size: 0.9rem;
  margin-right: 1rem;
}

.item-header strong {
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
  /* background-color: #007bff; */
  color: white;
}
</style>
