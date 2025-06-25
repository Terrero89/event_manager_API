<template>
  <nav class="test px-6 py-4 flex justify-between items-center shadow-md border-b border-gray-200 dark:border-gray-800">
    <!-- Logo -->
    <NuxtLink to="/" class="text-lg font-bold text-gray-400 hover:opacity-100">
      EventManager
    </NuxtLink>

    <!-- Navigation Links -->
    <div class="flex items-center gap-6">
      <!-- Authenticated Nav -->
      <NuxtLink
        v-for="link in navLinks"
        :key="link.name"
        :to="link.href"
        :class="[
          'px-3 py-1 rounded-md transition text-sm',
          route.path === link.href
            ? 'bg-gray-800 text-gray-400border border-gray-600'
            : 'text-gray-300 hover:text-gray-400hover:bg-gray-800'
        ]"
      >
        {{ link.name }}
      </NuxtLink>

      <!-- Authenticated dropdown -->
      <div v-if="auth.token" class="relative group">
        <button
          class="text-gray-300 font-semibold hover:text-white focus:outline-none"
        >
          {{ auth.userUsername || 'User' }}
        </button>
        <div
          class="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition duration-200 z-50"
        >
          <NuxtLink
            to="/dashboard"
            class="block px-4 py-1 hover:bg-gray-800 text-sm text-white"
          >
            Dashboard
          </NuxtLink>
          <button
            @click="logout"
            class="block w-full text-left px-4 py-1 hover:bg-gray-800 text-sm text-red-400 "
          >
            Logout
          </button>
        </div>
      </div>

      <!-- Unauthenticated Nav -->
      <div v-else class="flex gap-4">
        <NuxtLink
          to="/login"
          :class="[
            'px-3 py-1 rounded-md text-sm transition',
            route.path === '/login'
              ? 'bg-gray-800 text-white border border-gray-600'
              : 'text-gray-300 hover:text-white hover:bg-gray-800'
          ]"
        >
          Login
        </NuxtLink>

        <NuxtLink
          to="/register"
          :class="[
            'px-3 py-1 rounded-md text-sm transition',
            route.path === '/register'
              ? 'bg-gray-800 text-white border border-gray-600'
              : 'text-gray-300 hover:text-white hover:bg-gray-800'
          ]"
        >
          Register
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'


const route = useRoute()
const auth = useAuthStore()

const navLinks = [
  { name: 'Stories', href: '/stories' },
]

const logout = () => {
  auth.logout()
  navigateTo('/login')
}
</script>

<style scoped>
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.test{
      background-color:rgb(15, 15, 15) !important;
}
</style>
