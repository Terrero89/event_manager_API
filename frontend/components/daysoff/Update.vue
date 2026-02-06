<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { CONFIG } from "~/config/globalVariables";
import { formatDate } from "~/utils/date-conversion";

const sprintStore = useSprintStore();
const daysoffStore = useDaysoffStore();

const { sprintList } = storeToRefs(sprintStore);
const { fetchSprints } = sprintStore;
const { updateDaysoff, deleteDaysoff } = daysoffStore;

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
  await updateDaysoff(props._id, newTimeEntry);
  navigateTo("/daysoff");
};

const removeItem = async () => {
  if (confirm("Are you sure you want to delete this request?")) {
    await deleteDaysoff(props._id);
    navigateTo("/daysoff");
  }
};
</script>

<template>
  <div class="form-container">
    <h1 class="title">Modify Days Off Request</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Sprint ID -->
      <div class="form-group">
        <label for="sprintId">Sprint ID</label>
        <select v-model="form.sprintId" id="sprintId">
          <option value="" disabled>Select sprint</option>
          <option v-for="item in sprintList" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>

      <!-- Title -->
      <div class="form-group">
        <label for="title">Reason / Title</label>
        <input v-model="form.title" type="text" id="title" />
      </div>

      <!-- Days Off -->
      <div class="form-group">
        <label for="timeOff">Hours Off</label>
        <input v-model.number="form.timeOff" type="number" id="timeOff" />
      </div>

      <!-- Type -->
      <div class="form-group">
        <label for="timeOffType">Type</label>
        <select v-model="form.timeOffType" id="timeOffType">
          <option>Vacation</option>
          <option>Sick Leave</option>
          <option>Personal Leave</option>
          <option>Compensatory Time Off</option>
          <option>Unpaid Leave</option>
          <option>Other</option>
        </select>
      </div>

      <!-- Date -->
      <div class="form-group">
        <label for="date">Date</label>
        <input v-model="form.date" type="date" id="date" />
      </div>

      <div class="modal-actions">
        <UButton type="submit" color="blue" variant="soft">Update</UButton>
        <UButton
          type="button"
          color="red"
          variant="soft"
          @click="removeItem"
        >
          Delete
        </UButton>
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
