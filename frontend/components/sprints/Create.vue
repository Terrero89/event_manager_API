<script setup>
import { ref, computed } from "vue";
import { CONFIG } from "~/config/globalVariables";
import { onMounted } from "vue";
const sprintsStore = useSprintStore();
import { storeToRefs } from "pinia";

const { addSprint } = sprintsStore;
const { sprintList, currentSprint } = storeToRefs(sprintsStore);

const loadMessage = ref(false);
const sprint = ref({
  sprintId: "SPRINT-",
  startDate: "",
  endDate: "",
  summary: "N/A",
  piNotes: "N/A",
  storiesUnderSprint: "N/A",
});

// Calculate duration between startDate and endDate
const sprintDuration = computed(() => {
  if (sprint.value.startDate && sprint.value.endDate) {
    const start = new Date(sprint.value.startDate);
    const due = new Date(sprint.value.endDate);
    return Math.floor((due - start) / (1000 * 60 * 60 * 24)) || 0;
  }
  return 0;
});

const handleSubmit = async () => {
  const newSprint = {
    sprintId: sprint.value.sprintId,
    startDate: sprint.value.startDate,
    endDate: sprint.value.endDate,
    summary: sprint.value.summary,
    piNotes: sprint.value.piNotes,
    storiesUnderSprint: sprint.value.storiesUnderSprint,
  };

  if (sprintDuration < 0) return;
  await addSprint(newSprint);

  loadMessage.value = true;
  setTimeout(() => {
    loadMessage.value = false;
    navigateTo(`/`);
  }, 1700);
};


definePageMeta({ requiresAuth: true });
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit" class="sprint-details form-container">
      <h1>Add new Sprint</h1>
      <!-- Sprint ID -->
      <div>
        <label for="sprintID">Sprint ID:</label>
        <input v-model="sprint.sprintId" type="text" id="sprintID" />
      </div>

      <!-- Start Date -->
      <div>
        <label for="startDate">Start Date:</label>
        <input v-model="sprint.startDate" type="date" id="startDate" />
      </div>

      <!-- Due Date -->
      <div>
        <label for="endDate">End Date:</label>
        <input v-model="sprint.endDate" type="date" id="endDate" />
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
        <textarea
          v-model.trim="sprint.storiesUnderSprint"
          type="textarea"
          id="storiesUnderSprint"
        />
      </div>
      <button type="submit" class="submit-button">Submit</button>
      <div class="temp my-4" v-if="loadMessage">Adding Sprint...</div>
    </form>
  </div>
</template>

<style scoped>
.temp {
  color: rgb(6, 170, 135);
}
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
