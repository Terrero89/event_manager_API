// store/auth.ts
import { defineStore } from "pinia";

let logoutTimer = null;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    fullname: localStorage.getItem("fullname") || "", // Added fullname to state
    user: null,
    userEmail: localStorage.getItem("email") || "",
    userId: localStorage.getItem("id") || "",
    userUsername: localStorage.getItem("username") || "",
    isLoggedIn: !!localStorage.getItem("token") || false, // true if token exists
  }),

  actions: {
    async login(email, password) {
      try {
        const response = await fetch(
          "https://eventmanagerapi-dev.up.railway.app/api/v1/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Login failed");

        this.token = data.token;
        this.user = data.user.username;
        this.fullname = data.user.fullname; // Save fullname from response
        this.userEmail = data.user.email;
        this.userId = data.user.id;
        this.userUsername = data.user.username;
        this.isLoggedIn = true;

        // Save to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("fullname", data.user.fullname);
        // Save expiration timestamp
        const expiresAt= Date.now() + 30 * 60 * 1000; // 15 minutes
        localStorage.setItem("expiresAt", expiresAt.toString());

        this.startAutoLogoutTimer();

        return true;
      } catch (error) {
        return false;
      }
    },

   async logout(showMessage = true) {
  this.isLoggedIn = false;
  this.token = "";
  this.user = null;
  this.userEmail = "";
  this.userId = "";
  this.userUsername = "";

  localStorage.removeItem("fullname");
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("username");
  localStorage.removeItem("expiresAt");

  if (logoutTimer) clearTimeout(logoutTimer);
  logoutTimer = null;

  if (showMessage) {
    console.log("User logged out");
  }
},
    startAutoLogoutTimer() {
      if (logoutTimer) clearTimeout(logoutTimer);

      const expiresAt = parseInt(localStorage.getItem("expiresAt") || "0");
      const timeLeft = expiresAt - Date.now();

      if (timeLeft <= 0) {
        this.logout();
        return;
      }

      logoutTimer = setTimeout(() => {
        this.logout();
      }, timeLeft);
    },

    restoreSessionIfValid() {
      const token = localStorage.getItem("token");
      const expiresAt = parseInt(localStorage.getItem("expiresAt") || "0");

      if (token && expiresAt > Date.now()) {
        this.token = token;
        this.userEmail = localStorage.getItem("email") || "";
        this.userUsername = localStorage.getItem("username") || "";
        this.isLoggedIn = true;
        this.startAutoLogoutTimer();
      } else {
        this.logout(); // Expired or invalid session
      }
    },

    async registerUser(fullname, username, email, password) {
      try {
        const response = await fetch(
          "https://eventmanagerapi-dev.up.railway.app/api/v1/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullname, username, email, password }),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Registration failed");
        }
      } catch (error) {
        console.error("Registration failed:", error.message || error);
      }
    },
  },
});
