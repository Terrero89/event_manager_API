
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import {CONFIG} from "~/config/globalVariables";

const form = reactive({

  // storyTitle: "",
  // storyNumber: "",
  // storyName: "storyName",
  // storyDescription: "",
  // difficultyLevel: "",
  // storyPoints: "",
  // workType: "",
  // developmentType: "",
  // status: "Backlog",
  // reporter: "",
  // subtasks: "",
  // dateAssigned: new Date(),
  // dateCompleted: "",
  // sprint: "",
  // learning: "",
  // planningNotes: "",
  // repoNames: "",
  // storyComments: "",
  // updatedAt: new Date(),

  //prefilled
  storyTitle: "c2t please",
  storyName: "storyName",
  storyNumber: "dm123",
  storyDescription: "descriptiopn",
  difficultyLevel: "Low",
  storyPoints: 1,
  workType: "Story",
  developmentType: "Frontend",
  status: "Backlog",
  reporter: "Sergio",
  dateAssigned: new Date(),
  dateCompleted: new Date(),
  sprint: "PL1",
  learning: "changed perspective on this exe",
  planningNotes: "note1,note2",
  repoNames: "repo1, repo2",
  storyComments: "comment1,comment2",
  updatedAt: new Date(),


});
const errors = reactive({});
const router = useRouter();



const validateFields = () => {


  errors.storyName = !form.storyName ? "Story Name is required" : "";
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
  let fixedComments =  form.storyComments.length > 1 ? form.storyComments.split(",") : form.storyComments
  let fixedRepos = form.repoNames.length > 1 ? form.repoNames.split(",") : form.repoNames
  let fixedDescription = form.storyDescription.length > 1 ? form.storyDescription.split(",") : form.storyDescription
  let fixedLeaning = form.learning.length > 1 ? form.learning.split(",") : form.learning
  let fixedPlanning = form.planningNotes.length > 1 ? form.planningNotes.split(",") : form.planningNotes
  if (!validateFields()) return;
  try {
    await $fetch("http://localhost:8080/api/v1/stories", {
      method: "POST",
      body:{...form, storyComments: fixedComments, repoNames:fixedRepos, storyDescription: fixedDescription},
    });

      console.log({...form, storyComments: fixedComments, repoNames:fixedRepos, storyDescription: fixedDescription, learning: fixedLeaning, planningNotes:fixedPlanning})
    router.push("/");
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
</script>



<template>
  <div class="form-container">
    <h1 class="title">Create a New Story</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Header Fields -->
      <div class="form-group">
        <label for="storyName">Story Name</label>
        <input
            v-model="form.storyName"
            type="text"
            id="story Name"
            placeholder="Enter Story Name"
        />
        <span v-if="errors.storyName" class="error">{{ errors.Name}}</span>
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
        <label for="difficultyLevel">Difficulty Level</label>
        <select v-model="form.difficultyLevel" id="difficultyLevel">
          <option value="" disabled>Select Level</option>
          <option  v-for=" level in CONFIG.variables.difficultyLevels" :key="level " :value="level">{{level}}</option>

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
          <option :value="type" v-for="type in CONFIG.variables.workTypes" :key="type">{{type}}</option>

        </select>
        <span v-if="errors.workType" class="error">{{ errors.workType }}</span>
      </div>
      <div class="form-group">
        <label for="developmentType">Development Type</label>
        <select v-model="form.developmentType" id="developmentType">
          <option value="" disabled>Select Development Type</option>
          <option :value="type" v-for="type in CONFIG.variables.developmentTypes" :key="type">{{type}}</option>

        </select>
        <span v-if="errors.developmentType" class="error">{{ errors.developmentType }}</span>
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <select v-model="form.status" id="status">
          <option value="" disabled>Select Status</option>
          <option :value="status" v-for="status in CONFIG.variables.status" :key="status">{{status}}</option>

        </select>
        <span v-if="errors.status" class="error">{{ errors.status }}</span>
      </div>
      <div class="form-group">
        <label for="reporters">Reporter</label>
        <select v-model="form.reporter" id="status">
          <option value="" disabled>Select Reporter</option>
          <option v-for="reporter in CONFIG.variables.reporters" :key="reporter" :value="reporter.id">{{ reporter   }}</option>

        </select>
        <span v-if="errors.status" class="error">{{ errors.status }}</span>
      </div>

      <div class="form-group">
        <label for="repos">Repo Names</label>
        <input type="text" class="form-control"
            v-model="form.repoNames"
            id="repos"
            placeholder="Enter repos following a coma"
        ></input>
        <span v-if="errors.repoNames" class="error">{{ errors.repoNames }}</span>
      </div>


      <div class="form-group">
        <label for="storyDescription">Story Comments</label>
        <textarea
            v-model="form.storyComments"
            id="storyComments"
            placeholder="Enter Story Comments"
        ></textarea>
        <span v-if="errors.storyComments" class="error">{{ errors.storyComments }}</span>
      </div>
{{form.storyComments}}
      {{typeof form.storyComments}}
      <div class="form-group">
        <label for="storyDescription">Story Description</label>
        <textarea
            v-model="form.storyDescription"
            id="storyDescription"
            placeholder="Enter Story Description"
        ></textarea>
        <span v-if="errors.storyDescription" class="error">{{ errors.storyDescription }}</span>
      </div>
      <button type="submit" class="submit-button">Submit</button>
    </form>
  </div>
</template>

<style scoped>
/* General Styles */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
}

.title{
  color: #bababa;
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

