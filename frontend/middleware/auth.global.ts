// middleware/auth.global.ts
// export default defineNuxtRouteMiddleware((to, from) => {
//   const auth = useAuthStore()
//   if (!auth.token && to.path !== '/login') {
//     return navigateTo('/login')
//   }
// })

// middleware/auth.global.ts
// import { useAuthStore } from "~/stores/auth";

// export default defineNuxtRouteMiddleware((to) => {
//   const auth = useAuthStore();

//   // If the route has requiresAuth and user is NOT logged in → redirect
//   if (to.meta.requiresAuth && !auth.isLoggedIn) {
//     return navigateTo("/login");
//   }
// });

import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {  // Only check auth on client
    const auth = useAuthStore();
    if (to.meta.requiresAuth && !auth.isLoggedIn) {
      return navigateTo("/login");
    }
  }
});