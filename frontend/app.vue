<script setup lang="ts">
const links = [
  [
    {
      label: "Ev App",
      icon: "i-heroicons-light-bulb",
      to: "/",
    },
  ],
  [
    {
      label: "Stories",
      icon: "i-heroicons-home",
      to: "/stories",
    },
    {
      label: "Todos",
      icon: "i-heroicons-chart-bar",
      to: "/todos",
    },
    {
      label: "Dashboard",
      icon: "i-heroicons-chart-bar",
      to: "/dashboard",
    },
    {
      label: "Sign In",
      icon: "i-heroicons-user-solid",
      to: "/login",
    },
    
  ],
];
</script>

<template>
  <div>
    <UHorizontalNavigation
      :links="links"
      class="border-b border-gray-200 dark:border-gray-800"
    />

    <UIContainer>
      <NuxtPage />
    </UIContainer>

   
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}
</style>
