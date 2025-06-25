<script setup lang="js">
import { CONFIG } from "../config/globalLinks";
const authStore = useAuthStore();
import { storeToRefs } from "pinia";


const {login, logout} = authStore;
const { userId, userEmail, token , user} = storeToRefs(authStore);

const loggingOut = async () => {
 await logout();
  navigateTo('/login');
};  
</script>

<template>
  <div class="layout-container">
    <!-- Horizontal Navigation -->
    <div>
      <!-- <UHorizontalNavigation
        :links="CONFIG.horizontal.storyLinks"
        class="border-b border-gray-200 dark:border-gray-800"
      /> -->
<UINavigationNew/>
    </div>

  
    <!-- Main Content Section -->
    <div class="main-content">
      
      <!-- Vertical Navigation -->

      <aside
        class="vertical-navigation border-b border-l border-r border-gray-200 dark:border-gray-800 hide"
      >
               <UButton @click="loggingOut">Logout</UButton>
        <UVerticalNavigation :links="CONFIG.vertical.default" />
        
      </aside>

      <!-- Page Content -->
      <main class="content-area">
        <slot />
      </main>
  
    </div>
    <UIFooter class="show"/>
  </div>
</template>

<style scoped>


@media (max-width: 600px) {
  .hide{
    display:none;
  }
}
@media (min-width: 600px) {
  .show{
    display:none;
  }
}
/* Main container for the layout */
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Section for the horizontal navigation */
.layout-container > div:first-child {
  flex-shrink: 0;
}

/* Main content section */
.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* Vertical navigation styling */
.vertical-navigation {
  width: 15rem;

}

@media (max-width: 756px) {
  .vertical-navigation {
    width: 12rem;
  }
}

/* Content area styling */
.content-area {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

/* Border and color variables */
:root {
  --border-color: #d1d5db;
  --background-color: #f9fafb;
}

.dark :root {
  --border-color: #374151;
  --background-color: #1f2937;
}
</style>
