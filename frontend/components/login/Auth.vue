<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
import { storeToRefs } from "pinia";


const {login} = authStore;
const { userId, userEmail, token , user} = storeToRefs(authStore);


const password = ref('');
const email = ref('');
const errors = ref<{ email?: string; password?: string,  username?: String,}>({});
const router = useRouter();

const validateLoginFields = () => {
  errors.value = {};
  // if (!username.value) errors.value.username = 'Username is required.';
  if (!password.value) errors.value.password = 'Password is required.';
  if (!email.value) errors.value.email = 'Email is required.';
  return Object.keys(errors.value).length === 0;
};

const handleLogin = async () => {
  if (!validateLoginFields()) return;
await login(email.value, password.value)
 router.push('/stories');

};
</script>

<template>
  <div class="auth-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">

      <div class="form-group">
        <label for="password">Email</label>
        <input
            v-model="email"
            type="email"
            id="password"
            placeholder="Enter your password"
        />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Enter your email"
        />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
      </div>

      <button type="submit" class="submit-button">Login</button>
    </form>
    <p>
      Don't have an account?
      <NuxtLink to="/register" class="link">Register</NuxtLink>
    </p>
  </div>
</template>


<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #2c2c2c;

  border-radius: 8px;
}
h1 {
  text-align: center;
}
.form-group {
  margin-bottom: 16px;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
}
.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.error {
  color: red;
  font-size: 0.875rem;
}
.submit-button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.submit-button:hover {
  background: #0056b3;
}
.toggle-button {
  color: #007bff;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
