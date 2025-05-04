<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { CONFIG } from "~/config/globalVariables";
import { onMounted } from "vue";
const noteStore = useNoteStore();
const sprintsStore = useSprintStore();
import { storeToRefs } from "pinia";

const { fetchSprints, addSprint } = sprintsStore;
const { sprintList, currentSprint } = storeToRefs(sprintsStore);

const { addNote } = noteStore;
const { notes } = storeToRefs(noteStore);

onMounted(async () => {
  // await addEvent()

  await fetchSprints();
});

const loadMessage = ref(false);

const form = reactive({
  // sprintId: currentSprint.value,
  title: "", // Note Title
  description: "", // Note Description
  date: "", // Start Date
  priorityLevel: "N/A", // Unused but included for validation
  noteName: "", // Note Name
  noteType: "", // Note Type
});

const errors = reactive({});
const router = useRouter();

const validateFields = () => {
  // errors.sprintId = !form.sprintId ? "Sprint is required" : "";
  errors.noteType = !form.noteType ? "Note Type is required" : "";
  errors.title = !form.title ? "Note Title is required" : "";
  errors.noteName = !form.noteName ? "Note Name is required" : "";
  errors.date = !form.date ? "Date is required" : "";
  errors.description = !form.description ? "Note Description is required" : "";
  return Object.values(errors).every((err) => !err);
};

const handleSubmit = async () => {
  if (!validateFields()) return;

  const newNote = {
    // sprintId: currentSprint.value,
    title: form.title,
    noteType: form.noteType,
    description: form.description,
    date: form.date,
    noteName: form.noteName,
    priorityLevel: form.priorityLevel,
  };
  console.log(newNote);
  await addNote(newNote);

  loadMessage.value = true;
  setTimeout(() => {
    loadMessage.value = false;
    navigateTo(`/`);
  }, 1700);
};
</script>

<template>
  <div class="form-container">
    <h1 class="title">Create a New Note</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Header Fields -->

      <!-- <div class="form-group">
        <label for="assignedSprint">Sprint ID</label>
        <select v-model="form.sprintId" id="Sprint">
          <option value="" disabled>Select sprint</option>
          <option :value="item" v-for="item in sprintList" :key="item">
            {{ item }}
          </option>
        </select>
        <span v-if="errors.sprintId" class="error">{{ errors.sprintId }}</span>
      </div> -->

      <div class="form-group">
        <label for="reporters">Note Type</label>
        <select v-model="form.noteType" id="status">
          <option value="" disabled>Select Type</option>
          <option
            v-for="activity in CONFIG.variables.activityType"
            :key="activity"
            :value="activity"
          >
            {{ activity }}
          </option>
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
        <span v-if="errors.title" class="error">{{ errors.title }}</span>
      </div>

      <div class="form-group">
        <label for="storyName">Note Name</label>
        <input
          v-model="form.noteName"
          type="text"
          id="story Name"
          placeholder="Enter Story Name"
        />
        <span v-if="errors.noteName" class="error">{{ errors.noteName }}</span>
      </div>

      <div class="form-group">
        <label for="startDate">Start Date:</label>
        <input v-model="form.date" type="date" id="date" />
      </div>
      <div class="form-group">
        <label for="storyName">Note Descriptiopn</label>
        <input
          v-model="form.description"
          type="text"
          id="story Name"
          placeholder="Enter Story Name"
        />
        <span v-if="errors.noteName" class="error">{{
          errors.description
        }}</span>
      </div>

      <button type="submit" class="submit-button">Submit</button>
      <div class="temp my-4" v-if="loadMessage">Adding Note...</div>
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
