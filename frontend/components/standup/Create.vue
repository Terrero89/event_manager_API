<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { CONFIG } from "~/config/globalVariables";
const sprintStore  = useSprintStore()

const standupStore = useStandupStore()

// Actions & state
const { currentSprint, sprintList } = storeToRefs(sprintStore)
const {items} = storeToRefs(standupStore)
const {fetchStandups, addStandup} = standupStore
const { fetchSprints } = sprintStore

const loadMessage = ref(false);
const router = useRouter();

// Form state
const form = reactive({
  sprintId: currentSprint.value || "",
  workingOn: "",
  notes: "",
  learnings: "",
  repo: "",
  ticketNumber: "",
  date: "",
});

// Validation errors
const errors = reactive({
  sprintId: form.sprintId,
  workingOn: "",
  notes: "",
  learnings: "",
  repo: "",
  ticketNumber: "",
  date: "",
});

// Field validation
const validateFields = () => {
  errors.sprintId = !form.sprintId ? "Sprint ID is required" : "";
  errors.workingOn = !form.workingOn ? "Working on is required" : "";
  errors.notes = !form.notes ? "Notes are required" : "";
  errors.learnings = !form.learnings ? "Learnings are required" : "";
  errors.repo = !form.repo ? "Repo is required" : "";
  errors.ticketNumber = !form.ticketNumber ? "Ticket number is required" : "";
//   errors.date = !form.date ? "Date is required" : "";

  return Object.values(errors).every((e) => !e);
};
// Form submit
const handleSubmit = async () => {
  if (!validateFields()) return;

  const newItem = {
    sprintId: form.sprintId,
    workingOn: form.workingOn,
    notes: form.notes,
    learnings: form.learnings,
    repo: form.repo,
    ticketNumber: form.ticketNumber,
    date: new Date()
  };

  await addStandup(newItem);
  loadMessage.value = true;

  setTimeout(() => {
    loadMessage.value = false;
    router.push("/");
  }, 1500);
};


onMounted(async () => {
  await fetchSprints();
    await fetchSprints();
});


definePageMeta({ requiresAuth: true });
</script>
<template>
    
  <div class="form-container">

    <h1 class="title">Create New Entry</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Sprint -->
      <div class="form-group">
        <label for="sprintId">Sprint ID</label>
        <select v-model="form.sprintId" id="sprintId">
          <option value="" disabled>Select sprint</option>
          <option v-for="item in sprintList" :key="item" :value="item">{{ item }}</option>
        </select>
        <span v-if="errors.sprintId" class="error">{{ errors.sprintId }}</span>
      </div>

         <!-- Ticket Number -->
      <div class="form-group">
        <label for="ticketNumber">Ticket Number</label>
        <input v-model="form.ticketNumber" type="text" id="ticketNumber" />
        <span v-if="errors.ticketNumber" class="error">{{ errors.ticketNumber }}</span>
      </div>

      <!-- Working On -->
         <div class="form-group">
        <label for="workingon">Working on: </label>
        <select v-model="form.workingOn" id="timeOffType">
          <option value="" disabled>Select Type</option>
          <option
            v-for="type in CONFIG.variables.currentWork"
            :key="type"
            :value="type"
          >
            {{ type }}
          </option>
        </select>
        <span v-if="errors.workingOn" class="error">{{ errors.workingOn}}</span>
      </div>


      <!-- Notes -->
      <div class="form-group">
        <label for="notes">Notes</label>
        <textarea v-model="form.notes" id="notes" rows="3" />
        <span v-if="errors.notes" class="error">{{ errors.notes }}</span>
      </div>

      <!-- Learnings -->
      <div class="form-group">
        <label for="learnings">Learnings</label>
        <textarea v-model="form.learnings" id="learnings" rows="3" />
        <span v-if="errors.learnings" class="error">{{ errors.learnings }}</span>
      </div>

      <!-- Repo -->
      <div class="form-group">
        <label for="repo">Repo</label>
        <input v-model="form.repo" type="text" id="repo" />
        <span v-if="errors.repo" class="error">{{ errors.repo }}</span>
      </div>

   
      <!-- Date -->
      <!-- <div class="form-group">
        <label for="date">Date</label>
        <input v-model="form.date" type="date" id="date" />
        <span v-if="errors.date" class="error">{{ errors.date }}</span>
      </div> -->

      <button type="submit" class="submit-button">Submit</button>
       <div class="temp my-4" v-if="loadMessage">Submitting Request...</div>
    </form>
  </div>
</template>

<style scoped>
.temp {
  color: rgb(6, 170, 135);
}

.title {
  color: #bababa;
}

.form-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background: #2c2c2c;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
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
  color: white;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #007bff;
  outline: none;
}

.error {
  color: #d9534f;
  font-size: 0.9rem;
  margin-top: 5px;
  display: block;
}

.submit-button {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .form-container {
    padding: 15px;
  }
  .submit-button {
    font-size: 0.9rem;
  }
}
</style>