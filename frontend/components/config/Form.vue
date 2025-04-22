<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { CONFIG } from "~/config/globalVariables";
import {onMounted } from 'vue'
const noteStore = useNoteStore();
const sprintsStore = useSprintStore();
import { storeToRefs } from "pinia";

const {  addSprint} = sprintsStore;
const {  loadFromLocalStorage } = storeToRefs(sprintsStore);


const {
  addNote,

} = noteStore;
const { notes} = storeToRefs(noteStore);
// for later use
// const route = useRoute(); //route object
// const destId = route.params.destinationID;

onMounted(async() => {

  // await addEvent()


});

// sprintsStore.loadFromLocalStorage('currentSprint', '') 
const sprintList = sprintsStore.loadFromLocalStorage('sprintList', []).slice(0, 5);
const currSprint = sprintsStore.loadFromLocalStorage('currentSprint', '')
 // sprintsStore.sprintList = sprintsStore.loadFromLocalStorage('sprintList', [])


const form = ref({
  reporters:  currSprint ,
  difficultyLevels:"",          // Note Title
  workTypes: '',  // Note Description
  developmentTypes: "",           // Start Date
  priorityLevel: "N/A",  // Unused but included for validation
  status: "",       // Note Name
 statusLevel:"",       // Note Type
 repoNames: '',
 ,
 sprints: [],
 activityType:[],
 eventTypes: []
});

const errors = reactive({});
const router = useRouter();


const handleSubmit = async () => {

  const newNote = {
    sprintId: form.sprintId,
    title: form.title,
    noteType: form.noteType,
    description: form.description,
    date: form.date,
    noteName: form.noteName,
    priorityLevel: form.priorityLevel,
  };

  await addNote(newNote);

};




</script>

<template>
  <div class="form-container">
<!--    {{sprints}}-->
    <h1 class="title">Modify Config</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Header Fields -->
      <div class="form-group">
        <label for="assignedSprint">Sprint ID</label>
        <select v-model="form.sprintId" id="Sprint">
          <option value="" disabled>Select sprint</option>
          <option :value="item" v-for="item in sprintList" :key="item">{{item}}</option>

        </select>
       <span v-if="errors.sprintId" class="error">{{ errors.sprintId}}</span>
      </div>
      <div class="form-group">
        <label for="reporters">Reporters</label>
        <select v-model="form.noteType" id="status">
          <option value="" disabled>Select Type</option>
          <option v-for="activity in CONFIG.variables.activityType" :key="activity" :value="activity">{{ activity }}</option>
        </select>
        <span v-if="errors.noteType" class="error">{{ errors.noteType }}</span>
      </div>
      <div class="form-group">
        <label for="reporters">Difficulty Levels</label>
        <select v-model="form.noteType" id="status">
          <option value="" disabled>Select Type</option>
          <option v-for="activity in CONFIG.variables.activityType" :key="activity" :value="activity">{{ activity }}</option>
        </select>
        <span v-if="errors.noteType" class="error">{{ errors.noteType }}</span>
      </div>
      <div class="form-group">
        <label for="reporters">Status</label>
        <select v-model="form.noteType" id="status">
          <option value="" disabled>Select Type</option>
          <option v-for="activity in CONFIG.variables.activityType" :key="activity" :value="activity">{{ activity }}</option>
        </select>
        <span v-if="errors.noteType" class="error">{{ errors.noteType }}</span>
      </div>
      <div class="form-group">
        <label for="reporters">Status Levels</label>
        <select v-model="form.noteType" id="status">
          <option value="" disabled>Select Type</option>
          <option v-for="activity in CONFIG.variables.activityType" :key="activity" :value="activity">{{ activity }}</option>
        </select>
        <span v-if="errors.noteType" class="error">{{ errors.noteType }}</span>
      </div>
      <div class="form-group">
        <label for="reporters">Repo Names</label>
        <select v-model="form.noteType" id="status">
          <option value="" disabled>Select Type</option>
          <option v-for="activity in CONFIG.variables.activityType" :key="activity" :value="activity">{{ activity }}</option>
        </select>
        <span v-if="errors.noteType" class="error">{{ errors.noteType }}</span>
      </div>
      <div class="form-group">
        <label for="reporters">Sprint List</label>
        <select v-model="form.noteType" id="status">
          <option value="" disabled>Select Type</option>
          <option v-for="activity in CONFIG.variables.activityType" :key="activity" :value="activity">{{ activity }}</option>
        </select>
        <span v-if="errors.noteType" class="error">{{ errors.noteType }}</span>
      </div>
      <div class="form-group">
        <label for="reporters">Activity Type</label>
        <select v-model="form.noteType" id="status">
          <option value="" disabled>Select Type</option>
          <option v-for="activity in CONFIG.variables.activityType" :key="activity" :value="activity">{{ activity }}</option>
        </select>
        <span v-if="errors.noteType" class="error">{{ errors.noteType }}</span>
      </div>
      <div class="form-group">
        <label for="reporters">Event Types</label>
        <select v-model="form.noteType" id="status">
          <option value="" disabled>Select Type</option>
          <option v-for="activity in CONFIG.variables.activityType" :key="activity" :value="activity">{{ activity }}</option>
        </select>
        <span v-if="errors.noteType" class="error">{{ errors.noteType }}</span>
      </div>
      <button type="submit" class="submit-button">Submit</button>
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

