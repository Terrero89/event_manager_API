
// middleware/auth.global.ts

import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  const nuxtApp = useNuxtApp();

  // Only run on the client
  if (!nuxtApp.isClient) return;

  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    console.log("[auth.global] redirecting to /login because user is not logged in");
    return navigateTo("/login");
  }
});
