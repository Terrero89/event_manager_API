<script setup>
import { storeToRefs } from "pinia";
const sprintsStore = useSprintStore();
const meetingStore = useMeetingStore();

const { addSprint, fetchSprints } = sprintsStore;
const { sprintList, currentSprint } = storeToRefs(sprintsStore);

const { addMeeting, fetchMeetings, filterItemById } = meetingStore;
const { meetings } = storeToRefs(meetingStore);
// for later use
// const route = useRoute(); //route object
// const destId = route.params.destinationID;

onMounted(async () => {
  await fetchMeetings();
});

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

const by = computed(() => {
  {
    for (let i = 0; i < filterItemById(props.id).length; i++) {
      return filterItemById(props.id)[i];
    }
  }
});
</script>

<template>
  <div class="modal-details">
    <div>
  
    
    </div>
    <MeetingsUpdateForm :meetingById="by"/>
  </div>
</template>
