<script setup>
import { storeToRefs } from "pinia";
const sprintsStore = useSprintStore();
const meetingStore = useMeetingStore();
import { CONFIG } from "~/config/globalVariables";
const { addSprint, fetchSprints } = sprintsStore;
const { sprintList, currentSprint } = storeToRefs(sprintsStore);

const { updateMeeting, fetchMeetings, deleteMeeting, filterItemById } = meetingStore;

const { meetings } = storeToRefs(meetingStore);
// for later use

onMounted(async () => {
  await fetchMeetings();
});

const props = defineProps([
  "_id",
  "title",
  "description",
  "date",
  "meetingType",
  "meetingName",
  "startTime",
  "endTime",
  "duration",
  "sprintId",
  "status",
  "createdAt",
  "updatedAt",
]);

const by = computed(() => {
  {
    for (let i = 0; i < filterItemById(props.id).length; i++) {
      return filterItemById(props.id)[i];
    }
  }
});

// Replace reactive with ref
const form = ref({
  sprintId: props.sprintId,
  description: props.description,
  meetingName: props.meetingName,
  meetingType: props.meetingType,
  startTime: props.startTime || "",
  endTime: props.endTime|| "",
  duration: props.duration,
  status: props.status,
  date: realDateFormatter(props.date),
  createdAt: realDateFormatter(props.createdAt),
  updatedAt: realDateFormatter(props.updatedAt),
});

const errors = reactive({});
const router = useRouter();

const handleSubmit = async () => {
  await updateMeeting(props._id, { ...form.value });
  navigateTo(`/`);
};

const removeItem = async (id) => {
  if (
    confirm("Are you sure you want to delete this meeting? This action cannot be undone.")
  ) {
    await deleteMeeting(id); // Proceed with the deletion if confirmed

    // Optionally navigate or refresh the page after deletion
    navigateTo(`/`);
  }
};
onMounted(async () => {
  await fetchSprints();
});
</script>

<template>
  <div class="form-container">
    <div></div>
    <h1 class="title">Modify Meeting</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Sprint -->
      <div class="form-group">
        <label for="sprint">Sprint Id </label>
        <select v-model="form.sprintId" id="Event">
          <option value="" disabled>Select sprint</option>
          <option :value="item" v-for="item in sprintList" :key="item">{{ item }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="reporters">Meeting Type</label>
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
      </div>

      <div class="form-group">
        <label for="storyName">Meeting Name</label>
        <input
          v-model="form.meetingName"
          type="text"
          id="story Name"
          placeholder="Enter Story Name"
        />
      </div>

      <div class="form-group">
        <label for="startDate">Start Date:</label>
        <input v-model="form.date" type="date" id="date" />
      </div>

      <!-- Start Time -->
      <div class="form-group">
        <label for="startTime">Start Time</label>
        <input id="startTime" type="time" v-model="form.startTime" />
      </div>
      <!-- End Time -->
      <div class="form-group">
        <label for="endTime">End Time</label>
        <input id="endTime" type="time" v-model="form.endTime" />
      </div>
      <div class="form-group">
        <label for="duration">Duration</label>
        <input v-model="form.duration" step="0.25" type="number" id="duration" />
      </div>
      <div class="form-group">
        <label for="assignedSprint">Status</label>
        <select v-model="form.status" id="Status">
          <option value="" disabled>Select sprint</option>
          <option
            v-for="activity in CONFIG.variables.statusLevel"
            :key="activity"
            :value="activity"
          >
            {{ activity }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="storyName">Description</label>
        <textarea
          class="form-control-textarea"
          v-model="form.description"
          type="textarea"
          id="story Name"
          placeholder="Enter Story Name"
        />
      </div>

      <strong>Last updated: </strong>
      {{
        formatDate(props.updatedAt) === "" ? "No update yet" : formatDate(props.updatedAt)
      }}
      <div class="modal-actions">
        <UButton color="red" @click="removeItem(props._id)">Delete</UButton>
        <UButton type="submit">Update</UButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* General Styles */
.form-control-textarea {
  border: solid 1px #3c3c3c;
  min-height: 11rem;
}
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

/* Button */
.delete-button {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  color: #fff;
  background-color: red;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: rgb(197, 1, 1);
}
/* Responsive Design */
@media (max-width: 768px) {
  /* .form-container {
    padding: 15px;
  } */

  h1 {
    font-size: 1.5rem;
  }

  .submit-button {
    font-size: 0.9rem;
  }
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.details-button:hover {
  background-color: #dadada;
}

/* Optional red delete button override */
.delete-btn {
  border-color: red;
  color: white;
  background-color: red;
}

.delete-btn:hover {
  background-color: darkred;
}
</style>
