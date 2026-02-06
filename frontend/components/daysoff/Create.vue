<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const sprintStore = useSprintStore();
const daysoffStore = useDaysoffStore();
const { sprintList, currentSprint } = storeToRefs(sprintStore);
const { addDaysoff } = daysoffStore;
const { fetchSprints } = sprintStore;

const loadMessage = ref(false);
const router = useRouter();

const form = reactive({
  sprintId: currentSprint.value || "",
  title: "",
  timeOff: 0 || null,
  timeOffType: "",
  date: "",
});

const errors = reactive({
  sprintId: "",
  title: "",
  timeOff: "",
  timeOffType: "",
  date: "",
});

const validateFields = () => {
  errors.sprintId = !form.sprintId ? "Sprint ID is required" : "";
  errors.title = !form.title ? "Title is required" : "";
  errors.timeOff =
    form.timeOff == null || form.timeOff < 0 ? "Valid hours off required" : "";
  errors.timeOffType = !form.timeOffType ? "Type is required" : "";
  errors.date = !form.date ? "Date is required" : "";

  return Object.values(errors).every((e) => !e);
};

const handleSubmit = async () => {
  if (!validateFields()) return;

  const newRequest = {
    sprintId: form.sprintId,
    title: form.title,
    timeOff: form.timeOff,
    timeOffType: form.timeOffType,
    date: new Date(form.date).toISOString(),
  };

  await addDaysoff(newRequest);
  loadMessage.value = true;

  setTimeout(() => {
    loadMessage.value = false;
    navigateTo("/daysoff");
  }, 1500);
};

onMounted(async () => {
  await fetchSprints();
});
</script>

<template>
  <div class="form-container">
    <h1 class="title">Request Days Off</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Sprint Selector -->
      <div class="form-group">
        <label for="assignedSprint">Sprint ID</label>
        <select v-model="form.sprintId" id="assignedSprint">
          <option value="" disabled>Select sprint</option>
          <option v-for="item in sprintList" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
        <span v-if="errors.sprintId" class="error">{{ errors.sprintId }}</span>
      </div>

      <!-- Title -->
      <div class="form-group">
        <label for="title">Reason / Title</label>
        <input
          v-model="form.title"
          type="text"
          id="title"
          placeholder="e.g. Doctor appointment"
        />
        <span v-if="errors.title" class="error">{{ errors.title }}</span>
      </div>

      <!-- Days Off -->
      <div class="form-group">
        <label for="timeOff">Hours Off</label>
        <input
          v-model.number="form.timeOff"
          type="number"
          id="timeOff"
          placeholder="e.g. 8"
        />
        <span v-if="errors.timeOff" class="error">{{ errors.timeOff }}</span>
      </div>

      <!-- Type Selector -->
      <div class="form-group">
        <label for="timeOffType">Type</label>
        <select v-model="form.timeOffType" id="timeOffType">
          <option value="" disabled>Select type</option>
          <option>Vacation</option>
          <option>Sick Leave</option>
          <option>Personal Leave</option>
          <option>Compensatory Time Off</option>
          <option>Unpaid Leave</option>
          <option>Other</option>
        </select>
        <span v-if="errors.timeOffType" class="error">{{
          errors.timeOffType
        }}</span>
      </div>

      <!-- Date -->
      <div class="form-group">
        <label for="date">Date</label>
        <input
          v-model="form.date"
          type="date"
          id="date"
          placeholder="Select date"
        />
        <span v-if="errors.date" class="error">{{ errors.date }}</span>
      </div>

      <!-- Submit Button & Loading -->
      <button type="submit" class="submit-button">Submit</button>
      <div class="temp my-4" v-if="loadMessage">Submitting Request...</div>
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
  max-width: 500px;
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
  color: white;
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}

/* Responsive */
@media (max-width: 768px) {
  .form-container {
    max-width: 90%;
    padding: 15px;
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style>
