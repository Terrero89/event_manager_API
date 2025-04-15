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
  <div class="details-card">
    <h2 class="details-title">Note Details</h2>
    <ul class="details-list">
      <li><strong>ID:</strong> {{ id }}</li>
      <li><strong>Title:</strong> {{ title }}</li>
      <li><strong>Description:</strong> {{ description }}</li>
      <li><strong>Date:</strong> {{ formatDate(date) || date }}</li>
      <li><strong>Note Type:</strong> {{ noteType }}</li>
      <li><strong>Note Name:</strong> {{ noteName }}</li>
      <li><strong>Priority Level:</strong> {{ priorityLevel }}</li>
      <li><strong>Sprint ID:</strong> {{ sprintId }}</li>
    </ul>
  <div class="buttons">
    <button class="update-btn">Update</button>
    <button class="delete-btn">Delete</button>
  </div>
  </div>
</template>

<style scoped>

.buttons{
  margin-top:15px;
}

.update-btn {
  background: linear-gradient(135deg, #6366f1, #3b82f6); /* Indigo to blue gradient */
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 15px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
  margin-right:10px;
 
}

.delete-btn {
  background: red;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 15px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
}
.fancy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
}

.fancy-btn:active {
  transform: translateY(1px);
  box-shadow: 0 3px 10px rgba(59, 130, 246, 0.3);
}

.fancy-btn:focus {
  outline: 3px solid rgba(99, 102, 241, 0.5);
  outline-offset: 2px;
}

.details-card {
  min-width: 40%;
  background-color: #1f242a;
  color: #ffffff;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin: auto;
}
.details-card {
  width: 300px; /* default width */
  /* other styles... */
}

.details-card {
  width: 300px; /* default width */
  /* other styles... */
}

/* Shrink the card as the screen size decreases */
@media (max-width: 1200px) {
  .details-card {
    width: 80%;
  }
}




.details-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid #3b4047;
  padding-bottom: 0.5rem;
}

.details-list {
  display:flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
}

li{
  margin:1rem 0;
}

strong{
  font-size: 1rem;
  margin-right:15px;
}

.details-list li {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}
</style>
