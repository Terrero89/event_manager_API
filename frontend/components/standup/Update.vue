<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { CONFIG } from "~/config/globalVariables";

const sprintStore = useSprintStore();
const standupStore = useStandupStore();

const { sprintList } = storeToRefs(sprintStore);
const { fetchSprints } = sprintStore;
const { updateStandup, deleteStandup } = standupStore;

// Props for the existing standup entry
const props = defineProps([
  "_id",
  "sprintId",
  "workingOn",
  "notes",
  "learnings",
  "repo",
  "ticketNumber",
  "date",
  "createdAt",
  "updatedAt",
]);
function formatedDate(value: string | number | Date) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Local form state for editing
const form = ref({
  sprintId: props.sprintId,
  workingOn: props.workingOn,
  notes: props.notes,
  learnings: props.learnings,
  repo: props.repo,
  ticketNumber: props.ticketNumber,
  date: formatedDate(props.date),
});

onMounted(async () => {
  await fetchSprints();
});

// Submit updated standup
const handleSubmit = async () => {
  const updatedItem = {
    sprintId: form.value.sprintId,
    workingOn: form.value.workingOn,
    notes: form.value.notes,
    learnings: form.value.learnings,
    repo: form.value.repo,
    ticketNumber: form.value.ticketNumber,
    date: form.value.date, // or new Date() if you want current time
  };
  await updateStandup(props._id, updatedItem);
  navigateTo("/");
};

// Delete entry
const removeItem = async (id: any) => {
  if (confirm("Are you sure you want to delete this standup entry?")) {
    await deleteStandup(id);
    navigateTo("/");
  }
};
</script>

<template>
  <div class="form-container">
    <h1>Update Standup Entry</h1>
    ID: {{ props._id }}
    <form @submit.prevent="handleSubmit">
      <!-- Sprint ID -->
      <div class="form-group">
        <label for="sprintId">Sprint ID</label>
        <select v-model="form.sprintId" id="sprintId">
          <option value="" disabled>Select sprint</option>
          <option v-for="s in sprintList" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>

      <!-- Ticket Number -->
      <div class="form-group">
        <label for="ticketNumber">Ticket Number</label>
        <input v-model="form.ticketNumber" type="text" id="ticketNumber" />
      </div>

      <!-- Working On -->
      <div class="form-group">
        <label for="workingOn">Working On</label>
        <select v-model="form.workingOn" id="workingOn">
          <option value="" disabled>Select type</option>
          <option v-for="type in CONFIG.variables.currentWork" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>

      <!-- Notes -->
      <div class="form-group">
        <label for="notes">Notes</label>
        <textarea v-model="form.notes" id="notes" rows="3" />
      </div>

      <!-- Learnings -->
      <div class="form-group">
        <label for="learnings">Learnings</label>
        <textarea v-model="form.learnings" id="learnings" rows="3" />
      </div>

      <!-- Repo -->
      <div class="form-group">
        <label for="repo">Repository</label>
        <input v-model="form.repo" type="text" id="repo" />
      </div>

      <!-- Date -->
      <div class="form-group">
        <label for="date">Date</label>
        <input v-model="form.date" type="date" id="date" />
      </div>
      <strong>Last updated: </strong> {{ formatDate(props.createdAt) }}
      <!-- Actions -->
      <div class="modal-actions">
        <UButton color="red" @click.prevent="removeItem(props._id)"> Delete </UButton>
        <UButton type="submit"> Update </UButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  padding: 20px;
  background: #2c2c2c;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
h1 {
  text-align: center;
  color: #bababa;
  margin-bottom: 20px;
}
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
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #3c3c3c;
  border-radius: 5px;
  background: #373737;
  color: #fff;
}
input:focus,
select:focus {
  border-color: #007bff;
  outline: none;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}
</style>
