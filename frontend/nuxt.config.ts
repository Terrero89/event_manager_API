export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  runtimeConfig: {
    public: {
      apiBase: process.env.API_LOCAL ||  "https://eventmanagerapi-dev.up.railway.app/api/v1",
      firebaseBase: process.env.FIREBASE_BASE || 'https://project-manager-app-f9829-default-rtdb.firebaseio.com',
    }
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  css: ["@/assets/css/main.css"],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  modules: ['@nuxt/ui', '@pinia/nuxt'],
})