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

// update note here
const {
  updateNote,
  deleteNote

} = noteStore;
const { notes } = storeToRefs(noteStore);

const props = defineProps([
 
  "noteById"
])

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


// Replace reactive with ref
const form = ref({
  sprintId:  props.noteById.sprintId,
  title: props.noteById.title,
  description: props.noteById.description,
  date: props.noteById.date,
  priorityLevel: props.noteById.priorityLevel,
  noteName: props.noteById.noteName,
  noteType: props.noteById.noteType,
});

const errors = reactive({});
const router = useRouter();
const validateFields = () => {
  const f = form.value;
  errors.sprintId = !f.sprintId ? "Sprint is required" : "";
  errors.noteType = !f.noteType ? "Note Type is required" : "";
  errors.title = !f.title ? "Note Title is required" : "";
  errors.noteName = !f.noteName ? "Note Name is required" : "";
  errors.date = !f.date ? "Date is required" : "";
  errors.description = !f.description ? "Note Description is required" : "";
  return Object.values(errors).every((err) => !err);
};

const handleSubmit = async () => {
  if (!validateFields()) return;

  // const newNote = { ...form.value };

  console.log({ ...form.value });
  await updateNote(props.noteById.id, { ...form.value });
};



const removeItem = async (id) => {
  if (confirm("Are you sure you want to delete this city? This action cannot be undone.")) {
    await deleteNote(id); // Proceed with the deletion if confirmed
    console.log(deleteNote(id))
    // Optionally navigate or refresh the page after deletion
    navigateTo(`/`);
  }
};
</script>

<template>
  <div class="form-container">
    <!-- {{sprintList}}xxx{{currSprint }} -->
<!--    {{sprints}}-->
 <div>
  {{form }}----{{props.noteById.id}}
</div>
    <h1 class="title">Create a New Note</h1>
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
        <label for="reporters">Note Type</label>
        <select v-model="form.noteType" id="status">
          <option value="" disabled>Select Type</option>
          <option v-for="activity in CONFIG.variables.activityType" :key="activity" :value="activity">{{ activity }}</option>
        </select>
        <span v-if="errors.noteType" class="error">{{ errors.noteType }}</span>
      </div>
      <div class="form-group">
        <label for="storyName">Note Title</label>
        <input
            v-model="form.title"
            type="text"
            id="story Name"
            placeholder="Enter Story Name"
        />
        <span v-if="errors.title" class="error">{{ errors.title}}</span>
      </div>

      <div class="form-group">
        <label for="storyName">Note Name</label>
        <input
            v-model="form.noteName"
            type="text"
            id="story Name"
            placeholder="Enter Story Name"
        />
        <span v-if="errors.noteName" class="error">{{ errors.noteName}}</span>
      </div>

      <div  class="form-group">
        <label for="startDate">Start Date:</label>
        <input v-model="form.date" type="date" id="date"/>
      </div>
      <div class="form-group ">
        <label for="storyName">Note Descriptiopn</label>
        <input
            v-model="form.description"
            type="text"
            id="story Name"
            placeholder="Enter Story Name"
        />
        <span v-if="errors.noteName" class="error">{{ errors.description}}</span>
      </div>
     

      <div class="modal-actions">
      <!-- <UButton color="red" @click="removeItem(props.destinationID)">Delete</UButton>
      <UButton to="">Update</UButton> -->
      <button class="delete-button" @click="removeItem(props.noteById.id)">Delete</button>
      <button type="submit" class="submit-button">Update</button>
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

