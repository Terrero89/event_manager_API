<script setup>
import { ref, computed } from "vue";
import { CONFIG } from "~/config/globalVariables";
import { onMounted } from "vue";
const sprintsStore = useSprintStore();
import { storeToRefs } from "pinia";


const {
  addSprint,
  updateSprint,
  deleteSprint
} = sprintsStore;
const { sprintList, currentSprint } = storeToRefs(sprintsStore);

const props = defineProps([
 
  "sprintById"
])

const sprint = ref({
  sprintID: currentSprint.value ,
  relatedStoryId: props.sprintById.relatedStoryId,
  startDate: props.sprintById.startDate,
  dueDate: props.sprintById.dueDate,
  summary: props.sprintById.summary,
  piNotes: props.sprintById.piNotes,
  storiesUnderSprint: props.sprintById.storiesUnderSprint,
});


// Calculate duration between startDate and dueDate
const sprintDuration = computed(() => {
  if (sprint.value.startDate && sprint.value.dueDate) {
    const start = new Date(sprint.value.startDate);
    const due = new Date(sprint.value.dueDate);
    return Math.floor((due - start) / (1000 * 60 * 60 * 24)) || 0;
  }
  return 0;
});

const handleSubmit = async () => {
  const newSprint = {
    sprintID: sprint.value.sprintID,
    relatedStoryId: sprint.value.relatedStoryId,
    startDate: sprint.value.startDate,
    dueDate: sprint.value.dueDate,
    summary: sprint.value.summary,
    piNotes: sprint.value.piNotes,
    storiesUnderSprint: sprint.value.storiesUnderSprint,
  };
 

  if (sprintDuration < 0) return;

  console.log({ ...sprint.value });
  await updateSprint(props.sprintById.id, { ...sprint.value });
  navigateTo(`/`);
};


const removeItem = async (id) => {
  if (confirm("Are you sure you want to delete this city? This action cannot be undone.")) {
    await deleteSprint(id); // Proceed with the deletion if confirmed
    console.log(deleteSprint(id))
    // Optionally navigate or refresh the page after deletion
    navigateTo(`/`);
  }
};


</script>

<template>
  <div>
    <!-- <div>{{props.sprintById}}</div> -->

    <form @submit.prevent="handleSubmit" class="sprint-details form-container">
      <h1>Modify Sprint</h1>
      <!-- Sprint ID -->
      <div>
        <label for="sprintID">Sprint ID:</label>
        <input v-model="sprint.sprintID" type="text" id="sprintID" />
      </div>

      <!-- Related Story ID -->
      <div>
        <label for="relatedStoryId">Related Story ID:</label>
        <input
          v-model="sprint.relatedStoryId"
          type="text"
          id="relatedStoryId"
        />
      </div>

      <!-- Start Date -->
      <div>
        <label for="startDate">Start Date:</label>
        <input v-model="sprint.startDate" type="date" id="startDate" />
      </div>

      <!-- Due Date -->
      <div>
        <label for="dueDate">Due Date:</label>
        <input v-model="sprint.dueDate" type="date" id="dueDate" />
      </div>

      <!-- Summary -->
      <div>
        <label for="summary">Summary:</label>
        <textarea class="form-control-textarea" v-model="sprint.summary" id="summary"></textarea>
      </div>

      <!-- PI Notes -->
      <div >
        <label for="piNotes">PI Notes:</label>
        <textarea  class="form-control-textarea" v-model="sprint.piNotes" id="piNotes" ></textarea>
      </div>

      <!-- Stories Under Sprint -->
      <div>
        <label for="storiesUnderSprint">Stories Under Sprint:</label>
        <textarea
        class="form-control-textarea"
          v-model.trim="sprint.storiesUnderSprint"
          type="textarea"
          id="storiesUnderSprint"
        />
      </div>
      <div class="modal-actions">
      <UButton color="red" @click="removeItem(props.sprintById.id)">Delete</UButton>
      <UButton type="submit">Update</UButton> 
      <!-- <button class="delete-button" @click="removeItem(props.sprintById.id)">Delete</button>
      <button type="submit" class="submit-button">Update</button> -->
    </div>
      <!-- Calculated Duration -->
      <!--    <p><strong>Sprint Duration:</strong> {{ sprintDuration }} days</p>-->
    </form>
    xxxxxxxxxxxxxxxx
  </div>
</template>

<style scoped>
.form-control-textarea{
  border: solid 1px #3c3c3c;
  min-height: 7rem;
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

