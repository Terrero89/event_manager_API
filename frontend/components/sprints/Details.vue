<script setup>
const props = defineProps([
  "id",
  "sprintID",
  "relatedStoryId",
  "startDate",
  "dueDate",
  "summary",
  "piNotes",
  "storiesUnderSprint",
]);
const sprintsStore = useSprintStore();
import { storeToRefs } from "pinia";

const {
  updateprint,
  deleteSprint,
  updateSprint,
  filterItemById,
  

  saveToLocalStorage,
} = sprintsStore;
const { } = storeToRefs(sprintsStore);

console.log("From Details:", props.id);

const by = computed(()=> {{
  for(let i=0; i<filterItemById(props.id).length; i++){
    return filterItemById(props.id)[i]
  }
}})

</script>



<template>
  <div class="modal-details">
<SprintsUpdate :sprintById="by"/>
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

