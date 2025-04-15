<script setup>
const props = defineProps([
  'id',
  'title',
  'description',
  'date',
  'noteType',
  'noteName',
  'priorityLevel',
  'sprintId',
])
</script>

<template>
  <div class="modal-details">
    <h2 class="details-title">Note Details</h2>
    <div class="details-row">
      <span class="detail-label">Title:</span>
      <span class="detail-value space">{{ props.title}}</span>
    </div>
    <div class="details-row">
      <span class="detail-label">Note Type:</span>
      <span class="detail-value space"> {{ props.noteType}}</span>
    </div>
    <div class="details-row">
      <span class="detail-label">Note Name:</span>
      <span class="detail-value space">{{ props.noteName}}</span>
    </div>
    <div class="details-row">
      <span class="detail-label">Priority: </span>
      <span class="detail-value space">{{ props.priorityLevel}}</span>
    </div>
    <div class="details-row">
      <span class="detail-label">Description: </span>
      <span class="detail-value space">{{ props.priorityLevel}}</span>
    </div>
    <div class="modal-actions">
      <UButton color="red" @click="removeItem(props.destinationID)">Delete</UButton>
      <UButton to="/notes/update">Update</UButton>
    </div>
    
  </div>
</template>

<style scoped>
/* Reusing styles from modal-details in previous component */
.modal-details {
  padding: 20px;
  border-radius: 5px;
   box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.details-title {
  font-size: 1.2rem;
  margin-bottom: 10px;

}

.details-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  font-weight: bold;
 
}

.detail-value {
  flex-grow: 1;
  color: rgb(226, 218, 218);
  
}

.space {
  margin: 0 0.5rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.details-button {
  color: black;
  border: #b0b0b0 solid 1px;
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
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