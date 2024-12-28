export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',

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
});