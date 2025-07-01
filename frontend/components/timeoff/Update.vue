<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { CONFIG } from "~/config/globalVariables";

const sprintStore = useSprintStore();
const timeoffStore = useTimeoffStore();

const { sprintList, currentSprint } = storeToRefs(sprintStore);
const { fetchSprints } = sprintStore;
const {} = storeToRefs(timeoffStore);
const { updateTimeoff, deleteTimeoff, fetchTimeoff } = timeoffStore;

// Props come from the router when you navigate to /timeoff/:id/edit
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

// Local reactive copy for editing
const form = ref({
  sprintId: props.sprintId,
  title: props.title,
  timeOff: props.timeOff,
  timeOffType: props.timeOffType,
  date: props.date, // YYYY-MM-DD for <input type="date">
});

onMounted(async () => {
  await fetchSprints();
  //   await fetchTimeoff()
});

// Submit updated fields
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

// Delete with confirmation
const removeItem = async () => {
  if (confirm("Are you sure you want to delete this request?")) {
    await deleteTimeoff(props._id);
    navigateTo("/");
  }
};
</script>

<template>
  <div class="form-container">
    <h1>Modify Timeoff Request</h1>
    ID:{{ props._id }}
    <form @submit.prevent="handleSubmit">
      <!-- Sprint ID -->
      <div class="form-group">
        <label for="sprintId">Sprint ID:</label>
        <select v-model="form.sprintId" id="sprintId">
          <option value="" disabled>Select sprint</option>
          <option v-for="s in sprintList" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>

      <!-- Title -->
      <div class="form-group">
        <label for="title">Reason / Title:</label>
        <input
          v-model="form.title"
          type="text"
          id="title"
          placeholder="e.g. Dentist emergency"
        />
      </div>

      <!-- Days Off -->
      <div class="form-group">
        <label for="timeOff">Days Off:</label>
        <input
          v-model.number="form.timeOff"
          type="number"
          id="timeOff"
          min="0"
        />
      </div>

      <!-- Time Off Type -->
      <div class="form-group">
        <label for="timeOffType">Type of Time Off:</label>
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
        <label for="date">Date:</label>
        <input v-model="form.date" type="date" id="date" />
      </div>

      <!-- Actions -->
      <div class="modal-actions">
        <UButton color="red" @click.prevent="removeItem"> Delete </UButton>
        <UButton type="submit"> Update </UButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
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
select {
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
