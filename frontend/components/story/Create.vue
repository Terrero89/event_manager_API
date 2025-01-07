<template>
  <div class="form-container">
    <h1>Create a New Story</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Header Fields -->


      <div class="form-group">
        <label for="progressType">Progress Type</label>
        <input
            v-model="form.progressType"
            type="text"
            id="progressType"
            placeholder="Enter Progress Type"
        />
        <span v-if="errors.progressType" class="error">{{ errors.progressType }}</span>
      </div>


      <!-- Story Details -->
      <div class="form-group">
        <label for="storyTitle">Story Title</label>
        <input
            v-model="form.storyTitle"
            type="text"
            id="storyTitle"
            placeholder="Enter Story Title"
        />
        <span v-if="errors.storyTitle" class="error">{{ errors.storyTitle }}</span>
      </div>

      <div class="form-group">
        <label for="storyNumber">Story Number (e.g., DMR-XXXX)</label>
        <input
            v-model="form.storyNumber"
            type="text"
            id="storyNumber"
            placeholder="Enter Story Number"
        />
        <span v-if="errors.storyNumber" class="error">{{ errors.storyNumber }}</span>
      </div>

      <div class="form-group">
        <label for="storyDescription">Story Description</label>
        <textarea
            v-model="form.storyDescription"
            id="storyDescription"
            placeholder="Enter Story Description"
        ></textarea>
        <span v-if="errors.storyDescription" class="error">{{ errors.storyDescription }}</span>
      </div>

      <div class="form-group">
        <label for="difficultyLevel">Difficulty Level</label>
        <select v-model="form.difficultyLevel" id="difficultyLevel">
          <option value="" disabled>Select Level</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <span v-if="errors.difficultyLevel" class="error">{{ errors.difficultyLevel }}</span>
      </div>

      <div class="form-group">
        <label for="storyPoints">Story Points</label>
        <select v-model="form.storyPoints" id="storyPoints">
          <option value="" disabled>Select Points</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="13">13</option>
        </select>
        <span v-if="errors.storyPoints" class="error">{{ errors.storyPoints }}</span>
      </div>

      <div class="form-group">
        <label for="workType">Work Type</label>
        <select v-model="form.workType" id="workType">
          <option value="" disabled>Select Work Type</option>
          <option value="feature">Feature</option>
          <option value="bug">Bug</option>
          <option value="production">Production</option>
        </select>
        <span v-if="errors.workType" class="error">{{ errors.workType }}</span>
      </div>

      <div class="form-group">
        <label for="developmentType">Development Type</label>
        <select v-model="form.developmentType" id="developmentType">
          <option value="" disabled>Select Development Type</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="fullstack">Fullstack</option>
        </select>
        <span v-if="errors.developmentType" class="error">{{ errors.developmentType }}</span>
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <select v-model="form.status" id="status">
          <option value="" disabled>Select Status</option>
          <option value="to do">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="demo ready">Demo Ready</option>
          <option value="completed">Completed</option>
          <option value="released">Released</option>
        </select>
        <span v-if="errors.status" class="error">{{ errors.status }}</span>
      </div>
      <div class="form-group">
        <label for="reporters">Reporter</label>
        <select v-model="form.status" id="status">
          <option value="" disabled>Select Reporter</option>
          <option v-for="reporter in reporters" :key="reporter.id" :value="reporter.id">{{ reporter   }}</option>

        </select>
        <span v-if="errors.status" class="error">{{ errors.status }}</span>
      </div>


      <!-- Additional Fields -->
      <div v-for="field in additionalFields" :key="field.key" class="form-group">
        <label :for="field.key">{{ field.label }}</label>
        <input
            v-model="form[field.key]"
            :type="field.type"
            :id="field.key"
            :placeholder="'Enter ' + field.label"
        />
        <span v-if="errors[field.key]" class="error">{{ errors[field.key] }}</span>
      </div>

      <button type="submit" class="submit-button">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const form = reactive({
  progressType: "",

  storyTitle: "",
  storyNumber: "",
  storyDescription: "",
  difficultyLevel: "",
  storyPoints: "",
  workType: "",
  developmentType: "",
  status: "",
  reporter: "",
  subtasks: "",
  dateAssigned: "",
  dateCompleted: "",
  sprint: "",
  learning: "",
  planningNotes: "",
  updatedAt: new Date(),
});
const reporters = ref( ["Sergio Terrero", "Pedro Martinez", "Eugenia Derbez", "Jackie Perex", "Pamela Alvarez"])
const errors = reactive({});
const router = useRouter();

const additionalFields = [
  { key: "storyComments", label: "Story Comments", type: "text" },
  { key: "reporter", label: "Reporter", type: "text" },
  { key: "date", label: "Date", type: "date" },
  { key: "updatedAt", label: "Updated At", type: "date" },
  { key: "repoNames", label: "Repository Names", type: "text" },
];

const validateFields = () => {

  errors.progressType = !form.progressType ? "Progress Type is required" : "";

  errors.storyTitle = !form.storyTitle ? "Story Title is required" : "";
  errors.storyNumber = !form.storyNumber ? "Story Number is required" : "";
  errors.difficultyLevel = !form.difficultyLevel
      ? "Difficulty Level is required"
      : "";
  errors.storyPoints = !form.storyPoints ? "Story Points are required" : "";
  errors.workType = !form.workType ? "Work Type is required" : "";
  errors.developmentType = !form.developmentType
      ? "Development Type is required"
      : "";
  errors.status = !form.status ? "Status is required" : "";

  return Object.values(errors).every((err) => !err);
};

const handleSubmit = async () => {
  if (!validateFields()) return;

  try {
    await $fetch("/api/stories", {
      method: "POST",
      body: form,
    });
    router.push("/success");
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
</script>

<style scoped>
/* General Styles */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
}

/* Form Container */
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

/* Responsive Design */
@media (max-width: 768px) {
  .form-container {
    padding: 15px;
  }

  h1 {
    font-size: 1.5rem;
  }

  .submit-button {
    font-size: 0.9rem;
  }
}
</style>

