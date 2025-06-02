<script setup>
const props = defineProps([
  "id",
  "title",
  "description",
  "date",
  "meetingType",
  "meetingName",
  "duration",
  "sprintId",
  "status",
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
      return "gray";
  }
});

const typeColor = computed(() => {
  switch (props.meetingType) {
    case "1x1":
      return "blue";
    case "Standup":
      return "cyan";
    case "Training":
      return "orange";
    case "Contribution":
      return "purple";
    case "Mentor Meeting":
      return "yellow";
    case "Mentee Meeting":
      return "teal";
    case "Retrospective":
      return "green";
    case "Planning":
      return "amber";
    case "Workshops":
      return "red";
    case "Collaboration":
      return "lime";
    case "Feedback Session":
      return "indigo";
    case "Brainstorming":
      return "pink";
    case "Presentation":
      return "fuchsia";
    case "Problem Solving":
      return "violet";
    case "Team Building":
      return "rose";
    case "Pair Programming":
      return "emerald";
    case "Other":
      return "gray";
    default:
      return "gray";
  }
});

const noteIdRoute = computed(() => `/notes/${props.id}`);
const isOpen = ref(false);
</script>

<template>
  <div>
    <!-- <h3>ITEM COMPONENT</h3> -->
    <UIRenderer>
      <div class="item">
        <p><strong>Meeting Name: </strong> {{ meetingName }}</p>
        <!-- <h1>{{id}}</h1> -->

        <div class="item-header">
          <!-- <p><strong>Meeting Type:</strong> {{ meetingType }}</p> -->
          <p>
            <strong>Meeting Type</strong>
            <UBadge :color="typeColor"> {{ props.meetingType }}</UBadge>
          </p>
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
            <p><strong>Sprint ID:</strong> {{ sprintId }}</p>
          </div>
        </div>
      </div>

      <div class="item-buttons my-2">
        <UButton class="" @click="isOpen = true">See Details</UButton>
        <UButton :color="progressColor" variant="outline" class="b">{{
          props.status
        }}</UButton>
        <UModal v-model="isOpen">
          <MeetingsDetails
            :id="props.id"
            :description="props.description"
            :date="props.date"
            :meetingName="props.meetingName"
            :meetingType="props.meetingType"
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
