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
  "currentYear",
  "previousYearHours",
  "currentPersonalDaysHours",
  "currentSickDaysHours",
  "currentVacationDaysHours",
  "currentHolidayDaysHours",
  "currentAccrueHoursForYear",
  "currentAccruedHoursForMonth",
  "currentAccruedMonthsPerYear",
  "status",
  "description",
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
  currentYear: props.currentYear || 0,
  date: formatedDate(props.createdAt) || "",
  previousYearHours: props.previousYearHours || 0,
  currentPersonalDaysHours: props.currentPersonalDaysHours || 0,
  currentSickDaysHours: props.currentSickDaysHours || 0,
  currentVacationDaysHours: props.currentVacationDaysHours || 0,
  currentHolidayDaysHours: props.currentHolidayDaysHours || 0,
  currentAccrueHoursForYear: props.currentAccrueHoursForYear || 0,
  currentAccruedHoursForMonth: props.currentAccruedHoursForMonth,
  currentAccruedMonthsPerYear: props.currentAccruedMonthsPerYear,
  status: props.status || "",
  description: props.description || "",
});

onMounted(async () => {
  await fetchSprints();
});

const handleSubmit = async () => {
  const newTimeEntry = {
    currentYear: form.value.currentYear,
    date: form.value.date,
    previousYearHours: form.value.previousYearHours,
    currentPersonalDaysHours: form.value.currentPersonalDaysHours,
    currentSickDaysHours: form.value.currentSickDaysHours,
    currentVacationDaysHours: form.value.currentVacationDaysHours,
    currentHolidayDaysHours: form.value.currentHolidayDaysHours,
    currentAccrueHoursForYear: form.value.currentAccrueHoursForYear,
    currentAccruedHoursForMonth: form.value.currentAccruedHoursForMonth,
    currentAccruedMonthsPerYear: form.value.currentAccruedMonthsPerYear,
    status: form.value.status,
    description: form.value,
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
      <!-- Title -->
      <div class="form-group">
        <label for="title">Year</label>
        <input v-model="form.currentYear" type="text" id="title" />
      </div>

      <div class="form-group">
        <label for="title">Previous Year Hours Available</label>
        <input v-model="form.previousYearHours" type="text" id="title" />
      </div>

      <!-- Days Off -->
      <div class="form-group">
        <label for="timeOff">Days Off</label>
        <input
          v-model.number="form.currentPersonalDaysHours"
          type="number"
          id="timeOff"
        />
      </div>

      <!-- Type -->
      <div class="form-group">
        <label for="timeOffType">Type</label>
        <select v-model="form.status" id="timeOffType">
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
        <UButton type="button" color="red" variant="soft" @click="removeItem">
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
