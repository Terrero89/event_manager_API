<script setup>
const eventsStore = useEventStore();
import { storeToRefs } from "pinia";

const {  itemsAsArray, filterItemById } = eventsStore
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

const progressColor = computed(() => {
  switch (props.status) {
    case "Completed":
      return "blue";
    case "In Progress":
      return "orange";
    case "Pending":
      return "purple";
    case "Backlog":
      return "teal";
    case "Review":
      return "green";
    case "Done":
      return "yellow";

    case "Epic":

    default:
      return "black";
  }
});

const typeColor = computed(() => {
  switch (props.eventType) {
    case "ERG Meeting":
      return "indigo";
    case "Volunteering":
      return "green";
    case "Contribution":
      return "purple";
    case "Training":
      return "orange";
    case "Company":
      return "blue";
    case "Networking":
      return "teal";
    case "Personal Development":
      return "pink";
    case "Professional Development":
      return "amber";
    case "Mentorship Program":
      return "yellow";
    case "Presentation":
      return "fuchsia";
    default:
      return "gray";
  }
});

const by = computed(() => {
  return filterItemById(props._id)[0];
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
                    <p><strong>Event Type:</strong> <UBadge :color="typeColor" variant="soft" > {{ props.eventType }}</UBadge></p>
 <p><strong>Status:</strong> <UBadge :color="progressColor" variant="soft" > {{ props.status}}</UBadge></p>
        </div>
        <div class="item-content">
          <div>
            <p>
              <strong>Description: </strong>
              {{
                description.length > 15
                  ? description.slice(0, 15) + "..."
                  : description
              }}
            </p>
            <p><strong>Date: </strong> {{ formatDate(date) }}</p>

            <p><strong>Duration:</strong> {{ duration }} hours</p>
          </div>
          <div class="data">
            <p class="mr-2">
              <strong>Created:</strong> {{ formatDate(props.createdAt) }}
            </p>
            <p><strong>updated: </strong> {{ formatDate(props.updatedAt) }}</p>
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
              :duration="props.duration"
            :sprintId="props.sprintId" 
            :status="props.status"
             /> 
            
        </UModal>
      </div>
    </UIRenderer>
  </div>
</template>

<style scoped>
  .data{
    display: flex;
  flex-wrap: wrap;
}
.b {
margin-top: auto;
margin-left:auto;
/* max-width: 6rem; */
}

.item-buttons {
  display: flex;
  flex-direction: column;
  justify-content:start;
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
