<script setup >
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { CONFIG } from "~/config/globalVariables";
const storyStore = useStoryStore();

const { fetchStories,
    updateStory,
  deleteStory,
  itemsAsArray,
  filterItemById,

 } = storyStore;
 const { items } = storeToRefs(storyStore);
 
const props = defineProps([
  "_id",
  "storyNumber",
  "storyName",
  "storyDescription",
  "difficultyLevel",
  "storyPoints",
  "workType",
  "developmentType",
  "status",
  "storyComments",
  "reporter",
  "repoNames",
  "dateAssigned",
  "dateCompleted",
  "sprintId",
  "learning",
  "createdAt",
  "updatedAt",
  "daysPassed"
]);



const story = ref({
    status: props.status,
    storyTitle: props.storyTitle,
    storyName: props.storyName,
    storyDescription: props.storyDescription,
    difficultyLevel: props.difficultyLevel,
    storyPoints: props.storyPoints,
    workType: props.workType,
    developmentType: props.developmentType,
    storyComments: props.storyComments,
    reporter: props.reporter,
    repoNames: props.repoNames,
    dateAssigned: inputDateFormatter(props.dateAssigned),
    dateCompleted: inputDateFormatter(props.dateCompleted),
    sprintId: props.sprintId,
    learning: props.learning,
    createdAt: props.createdAt,
    updatedAt: props.updatedAt,
    daysPassed: props.daysPassed
});

const handleSubmit = async () => {
  await updateStory(props._id, { ...story.value });
  navigateTo(`/`);
};

const removeItem = async (id) => {
  if (confirm("Are you sure you want to delete this city? This action cannot be undone.")) {
    await deleteStory(id);
    navigateTo(`/`);
  }
};

onMounted(async () => {
  await fetchStories();
});

// helper to calculate days
function calculateDays(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return 0;
  const diffTime = endDate.getTime() - startDate.getTime();
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)-1));
}

// 🔎 Watcher for status/date changes
watch(
  () => [story.value.status, story.value.dateCompleted],
  () => {
    if (story.value.status === "Completed" || story.value.status === "Released") {
      story.value.daysPassed = calculateDays(story.value.dateAssigned, story.value.dateCompleted);
    } else {
      story.value.daysPassed = calculateDays(story.value.dateAssigned, new Date());
    }
  },
  { immediate: true }
);

const endDate = ref('')
</script>


<template>
  <div>
  <div>dataAss: {{story.dateAssigned}}</div>
    <div>updatedAt: {{props.updatedAt}}</div>

    <div>daysPassed: {{story.daysPassed}}</div>

    <form @submit.prevent="handleSubmit" class="sprint-details form-container">
      <h1>Modify Sprint</h1>
      <!-- Sprint ID -->
      <div>
        <label for="sprintId">Sprint ID:</label>
        <input v-model="story.sprintId" type="text" id="sprintId" />
      </div>  
 

      <div class="form-group">
        <label for="storyPoints">Story Points</label>
        <select v-model="story.storyPoints" id="storyPoints">
          <option value="" disabled>Select Points</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="13">13</option>
        </select>
      
      </div>
  
      <div class="form-group">
        <label for="difficultyLevel">Difficulty Level</label>
        <select v-model="story.difficultyLevel" id="difficultyLevel">
          <option value="" disabled>Select Level</option>
          <option  v-for=" level in CONFIG.variables.difficultyLevels" :key="level " :value="level">{{level}}</option>

        </select>
        
      </div>


      <div class="form-group">
        <label for="workType">Work Type</label>
        <select v-model="story.workType" id="workType">
          <option value="" disabled>Select Work Type</option>
          <option :value="type" v-for="type in CONFIG.variables.workTypes" :key="type">{{type}}</option>

        </select>
        
      </div>
      <div class="form-group">
        <label for="developmentType">Development Type</label>
        <select v-model="story.developmentType" id="developmentType">
          <option value="" disabled>Select Development Type</option>
          <option :value="type" v-for="type in CONFIG.variables.developmentTypes" :key="type">{{type}}</option>

        </select>
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <select v-model="story.status" id="status">
          <option value="" disabled>Select Status</option>
          <option :value="status" v-for="status in CONFIG.variables.developmentStatus" :key="status">{{status}}</option>

        </select>
        
      </div>
      <div class="form-group">
        <label for="reporters">Reporter</label>
        <select v-model="story.reporter" id="status">
          <option value="" disabled>Select Reporter</option>
          <option v-for="reporter in CONFIG.variables.reporters" :key="reporter" :value="reporter">{{ reporter }}</option>
        </select>
 
      </div>
      <div class="form-group">
        <label for="repos">Repo Names</label>
        <input type="text" class="form-control"
            v-model="story.repoNames"
            id="repos"
            placeholder="Enter repos following a coma"
        ></input>
        
      </div>
      <div>
        <label for="startDate">Date Assigned:</label>
        <input v-model="story.dateAssigned" type="date" id="DateAssigned"/>
      </div>


       <div>
        <label for="startDate">Date Completed:</label>
        <input v-model="story.dateCompleted" type="date" id="DateCompleted"/>
      </div>
            <div>
        <label for="storyTitle">Description:</label>
        <textarea
          v-model="story.storyDescription"
          type="text"
          id="relatedStoryId"
        />
      </div>
      <div class="form-group">
        <label for="storyDescription">Story Comments</label>
        <textarea
        class="form-control-textarea"
            v-model="story.storyComments"
            id="storyComments"
            placeholder="Enter Story Comments"
        ></textarea>
  
      </div>
     
      <strong>Last updated: </strong> {{ formatDate(updatedAt) }}
      <div class="modal-actions">
        <UButton color="red" @click="removeItem(props._id)">Delete</UButton>
        <UButton type="submit">Update</UButton> 

    </div>

    </form>
  </div>
</template>

<style scoped>
/* General Styles */
.form-control-textarea{
  border: solid 1px #3c3c3c;
  min-height: 11rem;
}
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

/* Button */
.delete-button {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  color: #fff;
  background-color: red;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: rgb(197, 1, 1);
}
/* Responsive Design */
@media (max-width: 768px) {
  /* .form-container {
    padding: 15px;
  } */

  h1 {
    font-size: 1.5rem;
  }

  .submit-button {
    font-size: 0.9rem;
  }
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.details-button:hover {
  background-color: #dadada;
}

/* Optional red delete button override */
.delete-btn {
  border-color: red;
  color: white;
  background-color: red;
}

.delete-btn:hover {
  background-color: darkred;
}
</style>

