<script setup lang="ts">
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const route = useRoute();
const auth = useAuthStore();

const { logout } = auth;
const { token, isLoggedIn } = storeToRefs(auth);

const logoutUser = () => {
  logout();

  navigateTo("/login");
};
</script>

<template>
  <div>
    <nav
      class="test px-6 py-4 flex justify-between items-center shadow-md border-b border-gray-200 dark:border-gray-800"
    >
      <!-- Logo -->
      <NuxtLink to="/" class="text-lg font-bold text-gray-400 hover:opacity-100">
        EM
      </NuxtLink>

      <!-- Navigation Links -->
      <div class="flex items-center gap-6">
        <!-- Authenticated Nav -->
        <!-- <NuxtLink
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
      </NuxtLink> -->

        <!-- Authenticated dropdown -->
        <div v-if="token" class="relative group">
          <div class="test2">
            <svg
              class="text-gray-500 font-semibold"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="2 0 16 13"
            >
              <!-- Icon from HeroIcons by Refactoring UI Inc - https://github.com/tailwindlabs/heroicons/blob/master/LICENSE -->
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6.955 1.45A.5.5 0 0 1 7.452 1h1.096a.5.5 0 0 1 .497.45l.17 1.699c.484.12.94.312 1.356.562l1.321-1.081a.5.5 0 0 1 .67.033l.774.775a.5.5 0 0 1 .034.67l-1.08 1.32c.25.417.44.873.561 1.357l1.699.17a.5.5 0 0 1 .45.497v1.096a.5.5 0 0 1-.45.497l-1.699.17c-.12.484-.312.94-.562 1.356l1.082 1.322a.5.5 0 0 1-.034.67l-.774.774a.5.5 0 0 1-.67.033l-1.322-1.08a5 5 0 0 1-1.356.561l-.17 1.699a.5.5 0 0 1-.497.45H7.452a.5.5 0 0 1-.497-.45l-.17-1.699a5 5 0 0 1-1.356-.562L4.108 13.37a.5.5 0 0 1-.67-.033l-.774-.775a.5.5 0 0 1-.034-.67l1.08-1.32a5 5 0 0 1-.561-1.357l-1.699-.17A.5.5 0 0 1 1 8.548V7.452a.5.5 0 0 1 .45-.497l1.699-.17c.12-.484.312-.94.562-1.356L2.629 4.107a.5.5 0 0 1 .034-.67l.774-.774a.5.5 0 0 1 .67-.033L5.43 3.71a5 5 0 0 1 1.356-.561zM6 8c0 .538.212 1.026.558 1.385l.057.057a2 2 0 0 0 2.828-2.828l-.058-.056A2 2 0 0 0 6 8"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <NuxtLink
            to="/config"
            class="mr-2 text-gray-300 font-semibold hover:text-white focus:outline-none"
          >
            Config
          </NuxtLink>
          <!-- <button class="text-gray-300 font-semibold hover:text-white focus:outline-none">
          {{ auth.userUsername || 'User' }}
        </button> -->

          <span
            class="nametag text-gray-300 font-semibold hover:text-white focus:outline-none"
          >
            {{ getInitials(auth.fullname) || "User" }}
          </span>
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
              @click="logoutUser"
              class="block w-full text-left px-4 py-1 hover:bg-gray-800 text-sm text-red-400"
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
                : 'text-gray-300 hover:text-white hover:bg-gray-800',
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
                : 'text-gray-300 hover:text-white hover:bg-gray-800',
            ]"
          >
            Register
          </NuxtLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.test {
  background-color: rgb(15, 15, 15) !important;
}

.test2 {
  display: inline-block;
  margin: auto 0;
}
.nametag {
  text-align: center;
  border-radius: 50%;
  padding: 4px;
  margin: 1rem;
  background: gray;
}
</style>
