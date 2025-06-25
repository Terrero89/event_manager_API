// store/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    user: null,
  userEmail: '',
    userId: '',
  
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

    // const { id, email: userEmail, username } = data;

    this.token = data.token;
    // this.user = data.uer.username;
    // this.userEmail = data.user.email;
    // this.userId = data.user.id;

    console.log('Login successful:', data);

  } catch (error) {
    console.error('Login failed:', error.message || error);
  }
},

        async register(username, email, password) {
      const { data } = await useFetch('https://eventmanagerapi-dev.up.railway.app/api/v1/register', {
        method: 'POST',
        body: { username, email, password },
      })

      this.token = data.value.token
      this.user = data.value.user
    },
    async getMe() {
      const { data } = await useFetch('https://eventmanagerapi-dev.up.railway.app/api/v1/events', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })

      this.user = data.value
    },
  },
})
