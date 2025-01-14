<script setup lang="ts">
const links = [
  [{
    label: 'Profile',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    },
    badge: 100
  }, {
    label: 'Installation',
    icon: 'i-heroicons-home',
    to: '/getting-started/installation'
  }, {
    label: 'Vertical Navigation',
    icon: 'i-heroicons-chart-bar',
    to: '/components/vertical-navigation'
  }, {
    label: 'Command Palette',
    icon: 'i-heroicons-command-line',
    to: '/'
  }], [{
    label: 'Examples',
    icon: 'i-heroicons-light-bulb'
  }, {
    label: 'Help',
    icon: 'i-heroicons-question-mark-circle'
  }]
]
</script>

<template>
  <UVerticalNavigation :links="links" class="w-64">
    <template #default="{ link }">
      <span class="group-hover:text-primary relative">{{ link.label }}</span>
    </template>
  </UVerticalNavigation>
</template>