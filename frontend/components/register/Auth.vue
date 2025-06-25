<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const username = ref('');
const email = ref('');
const password = ref('');
const errors = ref<{ username?: string; email?: string; password?: string }>({});
const router = useRouter();

const validateRegisterFields = () => {
  errors.value = {};
  if (!username.value) errors.value.username = 'Username is required.';
  if (!email.value) errors.value.email = 'Email is required.';
  if (!/\S+@\S+\.\S+/.test(email.value)) {
    errors.value.email = 'Enter a valid email address.';
  }
  if (!password.value) errors.value.password = 'Password is required.';
  if (password.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters.';
  }
  return Object.keys(errors.value).length === 0;
};

const handleRegister = async () => {
  if (!validateRegisterFields()) return;

  try {
      const response = await fetch('https://eventmanagerapi-dev.up.railway.app/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: username.value, email: email.value, password: password.value}),
    });
    console.log('Registration successful:', response);
    router.push('/login');
  } catch (error) {
    errors.value.username = error?.data?.message || 'Registration failed.';
  }
};
</script>


<template>
  <div class="auth-container">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="username">Username</label>
        <input
            v-model="username"
            type="text"
            id="username"
            placeholder="Enter your username"
        />
        <span v-if="errors.username" class="error">{{ errors.username }}</span>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Enter your email"
        />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Enter your password"
        />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
      </div>
      <button type="submit" class="submit-button">Register</button>
    </form>
    <p>
      Already have an account?
      <NuxtLink to="/login" class="link">Login</NuxtLink>
    </p>
  </div>
</template>


<style scoped>
.auth-container {
  max-width: 400px;
  margin: 2rem auto;
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
