<script setup>
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { CONFIG } from "~/config/globalVariables";
const sprintsStore = useSprintStore();
const storyStore = useStoryStore();

const { addSprint, fetchSprints } = sprintsStore;
const { addStory } = storyStore;
const { sprintList, currentSprint } = storeToRefs(sprintsStore);
const {} = storeToRefs(storyStore);

// LINE FROM HERE

const loadMessage = ref(false);
const form = reactive({
  sprintId: currentSprint.value || "",
  storyTitle: "c2t please",
  storyNumber: "UBT-",
  storyName: "storyName",
  storyDescription: "descriptiopn",
  difficultyLevel: "Low",
  storyPoints: 1,
  workType: "Story",
  developmentType: "Frontend",
  status: "Backlog",
  reporter: "",
  storyComments: "comment1,comment2",
  learning: "changed perspective on this exe",
  repoNames: "repo1, repo2",
  dateAssigned: new Date(),
});
const errors = reactive({});
const router = useRouter();

const validateFields = () => {
  // errors.sprintId= !form.sprintId ? "Sprint id is required" : "";
  errors.storyTitle = !form.storyTitle ? "Story Title is required" : "";
  errors.storyName = !form.storyName ? "Story Name is required" : "";
  errors.storyNumber = !form.storyNumber ? "Story Number is required" : "";
  errors.storyDescription = !form.storyDescription ? "Story description is required" : "";
  errors.difficultyLevel = !form.difficultyLevel ? "Difficulty Level is required" : "";
  errors.storyPoints = !form.storyPoints ? "Story Points are required" : "";
  errors.workType = !form.workType ? "Work Type is required" : "";
  errors.developmentType = !form.developmentType ? "Development Type is required" : "";
  errors.status = !form.status ? "Status is required" : "";
  errors.reporter = !form.reporter ? "Reporter is required" : "";
  errors.storyComments = !form.storyComments ? "Comments are required" : "";
  errors.repoNames = !form.repoNames ? "Repo name is required" : "";
  errors.reporter = !form.reporter ? "Reporter is required" : "";
  errors.learning = !form.learning ? "Learning is required" : "";

  return Object.values(errors).every((err) => !err);
};

const handleSubmit = async () => {
  if (!validateFields()) return;

  const newStory = {
    sprintId: form.sprintId,
    storyName: form.storyName,
    storyNumber: form.storyNumber,
    storyDescription: form.storyDescription,
    difficultyLevel: form.difficultyLevel,
    storyPoints: form.storyPoints,
    workType: form.workType,
    developmentType: form.developmentType,
    status: form.status,
    reporter: form.reporter,
    storyComments: form.storyComments,
    repoNames: form.repoNames,
    learning: form.learning,
    dateAssigned: new Date(),
    dateCompleted: new Date(),
  };

  await addStory(newStory);
  loadMessage.value = true;
  setTimeout(() => {
    loadMessage.value = false;
    navigateTo(`/`);
  }, 1700);
};

onMounted(async () => {
  await fetchSprints();
});
</script>

<template>
  <div class="form-container">
    <h1 class="title">Ceate a New Story</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Header Fields -->
      <div class="form-group">
        <label for="assignedSprint">Sprint ID</label>
        <select v-model="form.sprintId" id="assignedSprint">
          <option value="" disabled>Select sprint</option>

          <option :value="item" v-for="item in sprintList" :key="item.id">
            {{ item }}
          </option>
        </select>
        <!--        <span v-if="errors.workType" class="error">{{ errors.workType }}</span>-->
      </div>

      <div class="form-group">
        <label for="storyNumber">Story Name </label>
        <input
          v-model="form.storyName"
          type="text"
          id="storyName"
          placeholder="Enter Story Number"
        />
        <span v-if="errors.storyNumber" class="error">{{ errors.storyNumber }}</span>
      </div>

      <div class="form-group">
        <label for="storyNumber">Story Number (e.g., UBTXXXX)</label>
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
          <option
            v-for="level in CONFIG.variables.difficultyLevels"
            :key="level"
            :value="level"
          >
            {{ level }}
          </option>
        </select>
        <span v-if="errors.difficultyLevel" class="error">{{
          errors.difficultyLevel
        }}</span>
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
          <option :value="type" v-for="type in CONFIG.variables.workTypes" :key="type">
            {{ type }}
          </option>
        </select>
        <span v-if="errors.workType" class="error">{{ errors.workType }}</span>
      </div>
      <div class="form-group">
        <label for="developmentType">Development Type</label>
        <select v-model="form.developmentType" id="developmentType">
          <option value="" disabled>Select Development Type</option>
          <option
            :value="type"
            v-for="type in CONFIG.variables.developmentTypes"
            :key="type"
          >
            {{ type }}
          </option>
        </select>
        <span v-if="errors.developmentType" class="error">{{
          errors.developmentType
        }}</span>
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <select v-model="form.status" id="status">
          <option value="" disabled>Select Status</option>
          <option
            :value="status"
            v-for="status in CONFIG.variables.developmentStatus"
            :key="status"
          >
            {{ status }}
          </option>
        </select>
        <span v-if="errors.status" class="error">{{ errors.status }}</span>
      </div>
      <div class="form-group">
        <label for="reporters">Reporter</label>
        <select v-model="form.reporter" id="status">
          <option value="" disabled>Select Reporter</option>
          <option
            v-for="reporter in CONFIG.variables.reporters"
            :key="reporter"
            :value="reporter"
          >
            {{ reporter }}
          </option>
        </select>
        <span v-if="errors.status" class="error">{{ errors.status }}</span>
      </div>

      <!-- <div class="form-group">
        <label for="repos">Repo Names</label>
        <select v-model="form.workType" id="workType">
          <option value="" disabled></option>
          <option :value="type" v-for="type in CONFIG.variables.servicesList" :key="type">
            {{ type }}
          </option>
        </select>
        <span v-if="errors.repoNames" class="error">{{ errors.repoNames }}</span>
      </div> -->

      <div>
        <label for="startDate">Date Assigned:</label>
        <input v-model="form.dateAssigned" type="date" id="startDate" />
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

      <div class="form-group">
        <label for="storyDescription">Story Description</label>
        <textarea
          v-model="form.storyDescription"
          id="storyDescription"
          placeholder="Enter Story Description"
        ></textarea>
        <span v-if="errors.storyDescription" class="error">{{
          errors.storyDescription
        }}</span>
      </div>
      <button type="submit" class="submit-button">Submit</button>
      <div class="temp my-4" v-if="loadMessage">Adding Story...</div>
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
