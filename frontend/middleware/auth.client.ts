// plugins/auth.client.ts
import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin(() => {
  if (process.client) {
    const auth = useAuthStore();
    auth.restoreSessionIfValid();
  }
});