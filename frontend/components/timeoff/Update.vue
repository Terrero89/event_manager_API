<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { CONFIG } from "~/config/globalVariables";
import { formatDate } from "~/utils/date-conversion";

const sprintStore = useSprintStore();
const timeoffStore = useTimeoffStore();

const { sprintList } = storeToRefs(sprintStore);
const { fetchSprints } = sprintStore;
const { updateTimeoff, deleteTimeoff } = timeoffStore;

const props = defineProps([
  "_id",
  "sprintId",
  "title",
  "timeOff",
  "timeOffType",
  "date",
  "createdAt",
  "updatedAt",
]);

function formatedDate(value: string | Date) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const form = ref({
  sprintId: props.sprintId,
  title: props.title,
  timeOff: props.timeOff,
  timeOffType: props.timeOffType,
  date: formatedDate(props.date),
});

onMounted(async () => {
  await fetchSprints();
});

const handleSubmit = async () => {
  const newTimeEntry = {
    sprintId: form.value.sprintId,
    title: form.value.title,
    timeOff: form.value.timeOff,
    timeOffType: form.value.timeOffType,
    date: form.value.date,
  };
  await updateTimeoff(props._id, newTimeEntry);
  navigateTo("/");
};

const removeItem = async () => {
  if (confirm("Are you sure you want to delete this request?")) {
    await deleteTimeoff(props._id);
    navigateTo("/");
  }
};
</script>

<template>
  <div class="form-container">
    <h1 class="title">Modify Timeoff Request</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Sprint ID -->
      <div class="form-group">
        <label for="sprintId">Sprint ID</label>
        <select v-model="form.sprintId" id="sprintId">
          <option value="" disabled>Select sprint</option>
          <option v-for="s in sprintList" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>

      <!-- Title -->
      <div class="form-group">
        <label for="title">Reason / Title</label>
        <input
          v-model="form.title"
          type="text"
          id="title"
          placeholder="e.g. Dentist emergency"
        />
      </div>

      <!-- Days Off -->
      <div class="form-group">
        <label for="timeOff">Days Off</label>
        <input
          v-model.number="form.timeOff"
          type="number"
          id="timeOff"
          min="0"
          step="0.25"
        />
      </div>

      <!-- Time Off Type -->
      <div class="form-group">
        <label for="timeOffType">Type of Time Off</label>
        <select v-model="form.timeOffType" id="timeOffType">
          <option value="" disabled>Select Type</option>
          <option
            v-for="type in CONFIG.variables.timeoffTypes"
            :key="type"
            :value="type"
          >
            {{ type }}
          </option>
        </select>
      </div>

      <!-- Date -->
      <div class="form-group">
        <label for="date">Date</label>
        <input v-model="form.date" type="date" id="date" />
      </div>
      <strong>Created on: </strong> {{ formatDate(props.updatedAt) }}
      <!-- Actions -->
      <div class="modal-actions">
        <UButton color="red" @click.prevent="removeItem">Delete</UButton>
        <UButton type="submit">Update</UButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-control-textarea {
  border: solid 1px #3c3c3c;
  min-height: 11rem;
}
.form-container {
  padding: 20px;
  background: #2c2c2c;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.title {
  color: #bababa;
  text-align: center;
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
textarea,
select {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #3c3c3c;
  border-radius: 5px;
  background: #373737;
  color: #fff;
}

input:focus,
textarea:focus,
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
