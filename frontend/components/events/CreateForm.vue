<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { CONFIG } from "~/config/globalVariables";
import {onMounted } from 'vue'
const eventsStore = useEventStore();
import { storeToRefs } from "pinia";
const sprintsStore = useSprintStore();


const {  addSprint, fetchSprints} = sprintsStore;
const {  sprintList, currentSprint } = storeToRefs(sprintsStore);
const {  addEvent } = eventsStore;
const { events } = storeToRefs(eventsStore);
// for later use
// const route = useRoute(); //route object
// const destId = route.params.destinationID;
const loadMessage = ref(false);
onMounted(async() => {

  await fetchSprints()
});

// Main form state
const form = reactive({
  // sprintId: currentSprint.value,
  // title: "Title",           // Note Title
  eventName: "dddd",            // Event Name
  eventType: "dddd",            // Event Type
  date: "",                 // Date
  description: "ddddd",          // Description
  status: "Completed",      // Status
  duration: 0,             // Duration
});

// Error messages
const errors = reactive({});

// Router
const router = useRouter();

// Form field validation
const validateFields = () => {
  // errors.sprintId = !form.sprintId ? "Sprint is required" : "";
  errors.eventType = !form.eventType ? "Note Type is required" : "";
  // errors.title = !form.title ? "Note Title is required" : "";
  errors.eventName = !form.eventName ? "Note Name is required" : "";
  errors.date = !form.date ? "Date is required" : "";
  errors.duration = !form.duration ? "Duration is required" : "";
  errors.description = !form.description ? "Note Description is required" : "";
  errors.status = !form.status ? "Status is required": ""

  return Object.values(errors).every((err) => !err);
};

// Submit handler
const handleSubmit = async () => {
  if (!validateFields()) return;

  const newEvent = {
    // sprintId: currentSprint.value,
    // title: form.title,
    eventName: form.eventName,
    eventType: form.eventType,
    date: form.date,
    description: form.description,
    status: form.status,
    duration: form.duration,
 

  };

  await addEvent(newEvent); // Add the new event to the store

  loadMessage.value = true;
  setTimeout(() => {
    loadMessage.value = false;
    navigateTo(`/`);
  }, 1700);
};

</script>
<template>
  <div class="form-container">
    <h1 class="title">Create a New Event</h1>
    <form @submit.prevent="handleSubmit">
  
   <div class="form-group">
        <label for="reporters">Event Type</label>
        <select v-model="form.eventType" id="status">
          <option value="" disabled>Select Type</option>
          <option v-for="activity in CONFIG.variables.eventTypes" :key="activity" :value="activity">{{ activity }}</option>
        </select>
        <span v-if="errors.eventType" class="error">{{ errors.eventType }}</span>
      </div>
 
      <div class="form-group">
        <label for="eventName">Event Name</label>
        <input
          v-model="form.eventName"
          type="text"
          id="eventName"
          placeholder="Enter Event Name"
        />
        <span v-if="errors.eventName" class="error">{{ errors.eventName }}</span>
      </div>

   

      <!-- Date -->
      <div class="form-group">
        <label for="date">Date</label>
        <input v-model="form.date" type="date" id="date" />
        <span v-if="errors.date" class="error">{{ errors.date }}</span>
      </div>


      <!-- Status -->
      <div class="form-group">
        <label for="reporters">Event Type</label>
        <select v-model="form.status" id="status">
          <option value="" disabled>Select Type</option>
          <option v-for="activity in CONFIG.variables.statusLevel" :key="activity" :value="activity">{{ activity }}</option>
        </select>
        <span v-if="errors.status" class="error">{{ errors.status}}</span>
      </div>
      <!-- Duration -->
      <div class="form-group">
        <label for="duration">Duration</label>
        <input
          v-model="form.duration"
          step="0.25"
          type="number"
          id="duration"
          placeholder="Enter Duration (e.g., 2h)"
        />
        <span v-if="errors.duration" class="error">{{ errors.duration}}</span>
      </div>

      <!-- Priority Level -->
      <div class="form-group">
        <label for="priorityLevel">Description</label>
        <input
          v-model="form.description"
          type="text"
          id="priorityLevel"
          placeholder="Enter Priority (e.g., High)"
        />
        <span v-if="errors.description" class="error">{{ errors.description}}</span>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submit-button">Submit</button>
      <div class="temp my-4" v-if="loadMessage">Adding Event...</div>
    </form>
  </div>
</template>


<style scoped>
.temp {
  color: rgb(6, 170, 135);
}
/* General Styles */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
}

.title{
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

