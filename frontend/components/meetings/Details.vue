<script setup>
const props = defineProps([
  "id",
  "title",
  "description",
  "date",
  "meetingType",
  "meetingName",
  "duration",
  "sprintId",
  "status"
])
</script>

<template>
  <div class="modal-details">
    <h2 class="details-title">Meeting Details</h2>
    <div class="details-row">
      <span class="detail-label">ID:</span>
      <span class="detail-value space">{{ props.id}}</span>
    </div> <div class="details-row">
      <span class="detail-label">Sprint ID:</span>
      <span class="detail-value space">{{ props.sprintId}}</span>
    </div>
   
    <div class="details-row">
      <span class="detail-label">Related Story ID:</span>
      <span class="detail-value space"> {{ props.title}}</span>
    </div>
    <div class="details-row">
      <span class="detail-label">Event Name: </span>
      <span class="detail-value space">{{ props.meetingName}}</span>
    </div>
    <div class="details-row">
      <span class="detail-label">Start Date: </span>
      <span class="detail-value space">{{ props.date}}</span>
    </div>
    <div class="details-row">
      <span class="detail-label">Event Type: </span>
      <span class="detail-value space">{{ props.meetingType}}</span>
    </div>
    <div class="details-row">
      <span class="detail-label">Status: </span>
      <span class="detail-value space">{{ props.status}}</span>
    </div>
    <div class="details-row">
      <span class="detail-label">Duration:</span>
      <span class="detail-value space">{{ props.duration}}</span>
   
    </div>
 
    <div class="details-row">
      <span class="detail-label">Description: </span>
      <span class="detail-value space">{{ props.description}}</span>
    </div>
    <div class="modal-actions">
      <UButton color="red" @click="removeItem(props.destinationID)">Delete</UButton>
      <UButton to="/notes/update">Update</UButton>
    </div>
    
  </div>
</template>
<style scoped>

.details-button {
  color: black;
  border: #b0b0b0 solid 1px;
  padding: 5px 10px;
  border-radius: 8px;
}

.details-button:hover {
  background-color: #dadada;
  transition: 0.3s ease-in-out;


}

.comment {
  border: solid rgb(180, 180, 180) 1px;
  min-height: 5rem;
  border-radius: 5px;
  margin-top: 1rem;
}

/* for highlighting titles : color: gray; */
/* for highlighting values :  color: rgb(43, 41, 41);
  font-weight: 500;*/
.title {
  font-weight: bold;
  color: rgb(110, 110, 110);
}

.highlight {
  font-weight: 800;
  color: rgb(139, 139, 139) !important;
}

.dr-button {
  padding: 3px 13px;
  border-radius: 5px;
  background: rgb(223, 222, 222);
  cursor: pointer;
}

.dr-button:hover {
  background-color: rgb(136, 134, 134);
}

.space {
  margin: 0 0.5rem;
}

.modal-details {
  background-color:rgb(15, 15, 15) !important;
  padding: 20px;
  border-radius: 5px;

  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-details h2 {
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
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
