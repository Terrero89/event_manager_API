// middleware/auth.ts
import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && (!auth.isLoggedIn && auth.token === "")) {
    // Redirect to login if not authenticated
    return navigateTo("/login");
  }
});