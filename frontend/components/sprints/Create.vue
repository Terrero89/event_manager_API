<script setup>
import {ref, computed} from 'vue'
import {CONFIG} from "~/config/globalVariables";
import {onMounted } from 'vue'
const sprintsStore = useSprintStore();
import { storeToRefs } from "pinia";

const {
  addSprint,

 saveToLocalStorage,
} = sprintsStore;
const { sprintList, currentSprint } = storeToRefs(sprintsStore);


const sprint = ref({
  sprintID: 'PI-00111',
  relatedStoryId: 'DMR-001',
  startDate: '2025-01-22',
  dueDate: '2025-01-29',
  summary: ['summary1', 'summary2', 'summary3'],
  piNotes: ['note1', 'note2', 'note3'],
  storiesUnderSprint: ['DMR-001', 'DMR-002', 'DMR-003'],
})

// Calculate duration between startDate and dueDate
const sprintDuration = computed(() => {
  if (sprint.value.startDate && sprint.value.dueDate) {
    const start = new Date(sprint.value.startDate)
    const due = new Date(sprint.value.dueDate)
    return Math.floor((due - start) / (1000 * 60 * 60 * 24)) || 0
  }
  return 0
})


const handleSubmit = async () => {
const newSprint = {
sprintID: sprint.value.sprintID,
relatedStoryId: sprint.value.relatedStoryId,
startDate: sprint.value.startDate,
dueDate: sprint.value.dueDate,
summary: sprint.value.summary,
piNotes: sprint.value.piNotes,
storiesUnderSprint: sprint.value.storiesUnderSprint
}
 sprintsStore.saveCurrentSprintToLocalStorage(newSprint.sprintID) 

  if (sprintDuration < 0) return;
 await addSprint(newSprint)

};

//  sprintsStore.loadFromLocalStorage('currentSprint', '') retrieving current sprint
// sprintsStore.loadFromLocalStorage('sprintList', [])
 // sprintsStore.sprintList = sprintsStore.loadFromLocalStorage('sprintList', [])


</script>

<template>
  <div>
    <div>{{sprintList}}</div>
    <!-- {{currentSprint}}mmmmmm
 xxx {{sprintsStore.loadSprintListFromLocalStorage()}}fffffff---{{sprintsStore.loadFromLocalStorage('sprintList', [])}} -->
    <form @submit.prevent="handleSubmit" class="sprint-details  form-container ">
      <h1>Add new Sprint</h1>
      <!-- Sprint ID -->
      <div>
        <label for="sprintID">Sprint ID:</label>
        <input v-model="sprint.sprintID" type="text" id="sprintID"/>
      </div>

      <!-- Related Story ID -->
      <div>
        <label for="relatedStoryId">Related Story ID:</label>
        <input v-model="sprint.relatedStoryId" type="text" id="relatedStoryId"/>
      </div>

      <!-- Start Date -->
      <div>
        <label for="startDate">Start Date:</label>
        <input v-model="sprint.startDate" type="date" id="startDate"/>
      </div>

      <!-- Due Date -->
      <div>
        <label for="dueDate">Due Date:</label>
        <input v-model="sprint.dueDate" type="date" id="dueDate"/>
      </div>

      <!-- Summary -->
      <div>
        <label for="summary">Summary:</label>
        <textarea v-model="sprint.summary" id="summary"></textarea>
      </div>

      <!-- PI Notes -->
      <div>
        <label for="piNotes">PI Notes:</label>
        <textarea v-model="sprint.piNotes" id="piNotes"></textarea>
      </div>

      <!-- Stories Under Sprint -->
      <div>
        <label for="storiesUnderSprint">Stories Under Sprint:</label>
        <textarea v-model.trim="sprint.storiesUnderSprint" type="textarea" id="storiesUnderSprint"/>
      </div>
      <button type="submit" class="submit-button">Submit</button>
      <!-- Calculated Duration -->
      <!--    <p><strong>Sprint Duration:</strong> {{ sprintDuration }} days</p>-->
    </form>

  </div>
</template>


<style scoped>
h1 {
  text-align: center;
  color: #616060;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.form-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #2c2c2c;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.sprint-details {
  max-width: 600px;
  margin: 4rem auto;
}

label {
  display: block;
  margin-top: 10px;
}

.form-group {
  margin-bottom: 15px;
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

.submit-button {
  margin: 1rem 0;
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

p {
  margin-top: 15px;
  font-weight: bold;
}
</style>
