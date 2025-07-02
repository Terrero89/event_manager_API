<script setup>
import { ref, computed } from 'vue'



</script>

<template>
<div >
  <SprintsCreate/>
  </div>
</template>



<style scoped>
h1 {
  text-align: center;
  color: #616060;
  font-size: 1.8rem;
  margin-bottom: 20px;
}
.form-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #2c2c2c;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.sprint-details {
  max-width: 600px;
  margin: 4rem auto;
}

label {
  display: block;
  margin-top: 10px;
}

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

.submit-button {
  margin: 1rem 0;
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

p {
  margin-top: 15px;
  font-weight: bold;
}
</style>
