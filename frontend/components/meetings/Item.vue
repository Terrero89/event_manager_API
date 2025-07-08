<script setup>
const sprintsStore = useSprintStore();
const meetingStore = useMeetingStore();

const { addSprint, fetchSprints } = sprintsStore;
const { sprintList, currentSprint } = storeToRefs(sprintsStore);

const { addMeeting, fetchMeetings, filterItemById } = meetingStore;
const { meetings } = storeToRefs(meetingStore);
const props = defineProps([
  "_id",
  "title",
  "description",
  "date",
  "meetingType",
  "meetingName",
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
      return "gray";
  }
});

const typeColor = computed(() => {
  switch (props.meetingType) {
    case "1x1":
      return "blue";
    case "Standup":
      return "cyan";
    case "Retros":
      return "green";
    case "Planning":
      return "amber";
    case "Bi weekly Demos":
      return "purple";
    case "Training":
      return "orange";
    case "Collaboration":
      return "lime";
    case "Mentor Meetings":
      return "yellow";
    case "Mentee Meetings":
      return "teal";
    case "Workshops":
      return "red";
    case "Feedback Exchange":
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
    case "Volunteering Meetings":
      return "sky";

    case "Personal Development":
      return "slate";
    case "Professional Development":
      return "zinc";
    case "ERG Meetings":
      return "neutral";
    case "Ad Hoc Meetings":
      return "stone";
    case "Other":
      return "gray";

    case "Onboarding":
      return "teal"
       case "Offboarding":
      return "orange"
    case "Coffee Chats":
           return "cyan";
    case "Lunch and Learn":
        return "violet";
    case "Other":
      return "mediumseagreen";
    // extra examples if you need more:
    case "Follow Up":
     return "indigo";
    case "Sprint Review":
     return "sky";
    case "All Hands":
      return "slate";
    case "Town Hall":
      return "stone";
    case "Social Hour":
      return "fuscia";
    default:
      return "gray";
  }
});

const by = computed(() => {
  return filterItemById(props._id)[0];
});

onMounted(async () => {
  await fetchMeetings();
});

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
            <strong>Meeting Type:</strong>
            <UBadge :color="typeColor" variant="soft"> {{ props.meetingType }}</UBadge>
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
             time....
            </p>
            <p><strong>End Time:  </strong>time....</p>
          </div>

          <div>
            <p>
              <strong>Description: </strong>
              {{
                description.length > 15 ? description.slice(0, 15) + "..." : description
              }}
            </p>
            <p><strong>Date: </strong> {{ formatDate(date) }}</p>

            <p><strong>Duration:</strong> {{ duration }} hours</p>
            <p><strong>Sprint ID:</strong> {{ sprintId }}</p>
          </div>
        </div>
      </div>

      <div class="item-buttons my-2">
        <UButton variant="soft" class="" @click="isOpen = true">Details</UButton>

        <UModal v-model="isOpen">
          <MeetingsDetails
            :_id="props._id"
            :description="props.description"
            :date="props.date"
            :meetingName="props.meetingName"
            :meetingType="props.meetingType"
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
