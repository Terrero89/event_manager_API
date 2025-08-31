<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { CONFIG } from "~/config/globalVariables";
import { onMounted } from "vue";
const meetingStore = useMeetingStore();
import { storeToRefs } from "pinia";
const sprintsStore = useSprintStore();

const { addSprint, fetchSprints } = sprintsStore;
const { sprintList, currentSprint } = storeToRefs(sprintsStore);
const { addMeeting, fetchMeetings } = meetingStore;
const { meetings } = storeToRefs(meetingStore);
// for later use
// const route = useRoute(); //route object
// const destId = route.params.destinationID;

onMounted(async () => {
  await fetchMeetings();
});
const loadMessage = ref(false);

// Main form state
const form = reactive({
  sprintId: currentSprint.value,
  title: "", // Title
  meetingName: "", // Event Name
  meetingType: "", // Event Type
  description: "", // Description
  status: "Pending", // Status
  startTime: "", // new
  endTime: "", // new
  duration: "", // Duration
});
// simple hh:mm → minutes
function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

// compute duration in decimal hours, two‑decimal precision
const computedDuration = computed(() => {
  if (!form.startTime || !form.endTime) return 0;
  const diffMins = toMinutes(form.endTime) - toMinutes(form.startTime);
  if (diffMins <= 0) return 0;
  const hours = diffMins / 60;
  // round to nearest .25
  return Math.round(hours * 4) / 4;
});

watch([() => form.startTime, () => form.endTime], () => {
  form.duration = computedDuration.value;
});
// Error messages
const errors = reactive({});

// Router
const router = useRouter();

function validateFields() {
  errors.meetingType = form.meetingType ? "" : "Meeting Type is required";
  errors.meetingName = form.meetingName ? "" : "Meeting Name is required";

  errors.startTime = form.startTime ? "" : "Start time required";
  errors.endTime = form.endTime ? "" : "End time required";
  errors.description = form.description ? "" : "Description is required";
  errors.status = form.status ? "" : "Status is required";

  return Object.values(errors).every((e) => !e);
}

// Submit handler
const handleSubmit = async () => {
  if (!validateFields()) return;

  const newMeeting = {
    sprintId: form.sprintId,
    meetingName: form.meetingName,
    meetingType: form.meetingType,
    date: new Date(),
    description: form.description,
    status: form.status,
    duration: form.duration,
    startTime: form.startTime,
    endTime: form.endTime,
  };

  console.log("Before submission", newMeeting);
  await addMeeting(newMeeting);
  loadMessage.value = true;
  setTimeout(() => {
    loadMessage.value = false;
    navigateTo(`/`);
  }, 1700);
};

onMounted(async () => {
  await fetchSprints();
});
</script>
<template>
  <div class="form-container">
    <h1 class="title">Create a Meeting</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Sprint -->
      <div class="form-group">
        <label for="sprint">Sprint</label>
        <select v-model="form.sprintId" id="sprint">
          <option value="" disabled>Select sprint</option>
          <option :value="item" v-for="item in sprintList" :key="item">
            {{ item }}
          </option>
        </select>
        <span v-if="errors.sprintId" class="error">{{ errors.sprintId }}</span>
      </div>

      <!-- Event Type -->
      <div class="form-group">
        <label for="meetings">Meeting Type</label>
        <select v-model="form.meetingType" id="status">
          <option value="" disabled>Select Type</option>
          <option
            v-for="activity in CONFIG.variables.activityType"
            :key="activity"
            :value="activity"
          >
            {{ activity }}
          </option>
        </select>
        <span v-if="errors.meetingType" class="error">{{ errors.meetingType }}</span>
      </div>

      <div class="form-group">
        <label for="eventName">Meeting Name</label>
        <input
          v-model="form.meetingName"
          type="text"
          id="eventName"
          placeholder="Enter Meeting Name"
        />
        <span v-if="errors.meetingName" class="error">{{ errors.meetingName }}</span>
      </div>

      <!-- Status -->
      <div class="form-group">
        <label for="status">Status</label>
        <select v-model="form.status" id="status">
          <option value="" disabled>Select Type</option>
          <option
            v-for="activity in CONFIG.variables.statusLevel"
            :key="activity"
            :value="activity"
          >
            {{ activity }}
          </option>
        </select>
        <span v-if="errors.status" class="error">{{ errors.status }}</span>
      </div>
      <!-- Start Time -->
      <div class="form-group">
        <label for="startTime">Start Time</label>
        <input id="startTime" type="time" v-model="form.startTime" />
        <span v-if="errors.startTime" class="error">{{ errors.startTime }}</span>
      </div>

      <!-- End Time -->
      <div class="form-group">
        <label for="endTime">End Time</label>
        <input id="endTime" type="time" v-model="form.endTime" />
        <span v-if="errors.endTime" class="error">{{ errors.endTime }}</span>
      </div>
      <!-- Duration -->
      <div class="form-group">
        <label for="duration">Duration</label>
        <input
          v-model="form.duration"
          step="0.25"
          type="number"
          id="duration"
          placeholder="Enter Duration"
        />
        <span v-if="errors.duration" class="error">{{ errors.duration }}</span>
      </div>

      <!-- Priority Level -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          v-model="form.description"
          type="text"
          id="priorityLevel"
          placeholder="Enter Description"
        />
        <span v-if="errors.description" class="error">{{ errors.description }}</span>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submit-button">Submit</button>
      <div class="temp my-4" v-if="loadMessage">Adding Meeting...</div>
    </form>
  </div>
</template>

<style scoped>
.temp {
  color: rgb(6, 170, 135);
}
/* General Styles */
body {
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
}

.title {
  color: #bababa;
}

/* Form Container */
.form-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #2c2c2c;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

h1 {
  text-align: center;
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

/* Form Group */
.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #616060;
}

input,
textarea,
select {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #3c3c3c;
  border-radius: 5px;
  background: #373737;
  transition: border-color 0.3s;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #007bff;
  outline: none;
}

/* Error Messages */
.error {
  color: #d9534f;
  font-size: 0.9rem;
  margin-top: 5px;
  display: block;
}

/* Button */
.submit-button {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-container {
    padding: 15px;
  }

  h1 {
    font-size: 1.5rem;
  }

  .submit-button {
    font-size: 0.9rem;
  }
}
</style>
