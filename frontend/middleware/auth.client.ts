// plugins/auth.client.ts
import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp();

  if (!nuxtApp.isClient) return;

  const auth = useAuthStore();
  auth.restoreSessionIfValid();
});
