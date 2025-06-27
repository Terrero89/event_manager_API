// store/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token:  localStorage.getItem("token") || "",
    user: null,
    userEmail: localStorage.getItem("email") || "",
    userId:  "",
    userUsername: localStorage.getItem("username") || "",

  }),
  actions: {

    async login(email, password) {
      try {
        const response = await fetch('https://eventmanagerapi-dev.up.railway.app/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
          // The API returned an error (e.g. 401)
          throw new Error(data.message || 'Login failed');
        }
        this.token = data.token;
        this.user = data.user.username;
        this.userEmail = data.user.email;
        this.userId = data.user.id;
        this.userUsername = data.user.username;
        console.log('Login successful:', data);
        // adding to localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("username", data.user.username);

      } catch (error) {
        console.error('Login failed:', error.message || error);
      }
    },

    async logout() {
  this.token = "";
  this.user = null;
  this.userEmail = '';
  this.userId = '';
  this.userUsername = '';

  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('username');

  console.log('User logged out');
},

    async registerUser(username, email, password) {
      try {
        const response = await fetch('https://eventmanagerapi-dev.up.railway.app/api/v1/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, email, password })
        });

    
        if (!response.ok) {
          // The API returned an error (e.g. 400)
          throw new Error(data.message || 'Registration failed');
        }


      } catch (error) {
        console.error('Registration failed:', error.message || error);
      }
    },
  },
})
