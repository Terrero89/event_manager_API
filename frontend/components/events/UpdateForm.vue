<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { CONFIG } from "~/config/globalVariables";
import {onMounted } from 'vue'
const eventsStore = useEventStore();
import { storeToRefs } from "pinia";
const sprintsStore = useSprintStore();


const {  addSprint, fetchSprints} = sprintsStore;
const { sprintList, currentSprint } = storeToRefs(sprintsStore);
const {  addEvent, updateEvent, deleteEvent } = eventsStore;
const { events } = storeToRefs(eventsStore);
// for later use
// const route = useRoute(); //route object
// const destId = route.params.destinationID;


onMounted(async() => {


await fetchSprints()
});


const props = defineProps([
 
  "eventById"
])



// Main form state using ref
const form = ref({
  sprintId:currentSprint.value,
  // title: props.eventById.title,
  eventName: props.eventById.eventName,
  eventType: props.eventById.eventType,
  date: props.eventById.date,
  description: props.eventById.description,
  status: props.eventById.status,
  duration: props.eventById.duration,
});

// Error messages
const errors = ref({});
const router = useRouter();


const validateFields = () => {
  // errors.value.sprintId = !form.value.sprintId ? "Sprint is required" : "";
  errors.value.eventType = !form.value.eventType ? "Note Type is required" : "";
  // errors.value.title = !form.value.title ? "Note Title is required" : "";
  errors.value.eventName = !form.value.eventName ? "Note Name is required" : "";
  errors.value.date = !form.value.date ? "Date is required" : "";
  errors.value.duration = !form.value.duration ? "Duration is required" : "";
  errors.value.description = !form.value.description ? "Note Description is required" : "";
  errors.value.status = !form.value.status ? "Status is required" : "";

  return Object.values(errors.value).every((err) => !err);
};
// Submit handler
const handleSubmit = async () => {
  if (!validateFields()) return;

console.log({...form.value})
  await updateEvent(props.eventById.id,{...form.value});
  navigateTo(`/`);

};

const removeItem = async (id) => {
  if (confirm("Are you sure you want to delete this city? This action cannot be undone.")) {
    await deleteEvent(id); // Proceed with the deletion if confirmed
    console.log(deleteEvent(id))
    // Optionally navigate or refresh the page after deletion
    navigateTo(`/`);
  }
};
</script>
<template>
  <div class="form-container">
  
    <h1 class="title">Modify Event</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Sprint -->
      <!-- <div class="form-group">
        <label for="sprint">Sprint Id {{form.sprintId}}</label>
        <select v-model="form.sprintId" id="Event">
          <option value="" disabled>Select sprint</option>
          <option :value="item" v-for="item in sprintList"  :key="item" >{{ item }}</option>
        </select>
        <span v-if="errors.sprintId" class="error">{{ errors.sprintId }}</span>
      </div> -->


   <!-- Event Type -->
   <div class="form-group">
        <label for="reporters">Event Type</label>
        <select v-model="form.eventType" id="status">
          <option value="" disabled>Select Type</option>
          <option v-for="activity in CONFIG.variables.eventTypes" :key="activity" :value="activity">{{ activity }}</option>
        </select>
        <span v-if="errors.eventType" class="error">{{ errors.eventType }}</span>
      </div>
     <!-- Event Name -->
     <!-- <div class="form-group">
        <label for="eventName">Event Title</label>
        <input
          v-model="form.title"
          type="text"
          id="eventName"
          placeholder="Enter Event Name"
        />
        <span v-if="errors.title" class="error">{{ errors.title}}</span>
      </div> -->
      <!-- Event Name -->
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
        <label for="reporters">Status</label>
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
          type="number"
          id="duration"
          placeholder="Enter Duration (e.g., 2h)"
        />
        <span v-if="errors.duration" class="error">{{ errors.duration}}</span>
      </div>
      <!-- Priority Level -->
      <div class="form-group">
        <label for="priorityLevel">Description</label>
        <textarea class="form-control-textarea"
          v-model="form.description"
          type="text"
          id="priorityLevel"
          placeholder="Enter Priority (e.g., High)"
        />
        <span v-if="errors.description" class="error">{{ errors.description}}</span>
      </div>

      <!-- Submit Button -->
      <div class="modal-actions">
        <UButton color="red" @click="removeItem(props.noteById.id)">Delete</UButton>
        <UButton type="submit">Update</UButton> 
    </div>
    </form>
  </div>
</template>


<style scoped>
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

