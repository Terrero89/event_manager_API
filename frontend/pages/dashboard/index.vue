<script setup lang="ts">
const navLinks = [
  [],
  [
    {
      label: '',
      icon: 'i-heroicons-plus',
      to: '/meetings/create',
      badge: {
        label: 'Meetings',
        color: 'blue',
        size: "sm"
      }
    },
    {
      label: '',
      icon: 'i-heroicons-plus',
      to: '/notes/create',
      badge: {
        label: 'Sprint',
        color: 'green',
        size: "sm"
      }
    },
    // {
    //   label: 'Insights',
    //   icon: 'i-heroicons-command-line',
    //   to: '/'
    // }
  ]
];
</script>

<template>
    <div>

        <div class="nav-flex my-2 border-b border-gray-200 dark:border-gray-800">
       <UHorizontalNavigation :links=" navLinks" class=""/>
      </div>
      <div>DashboardPage</div>


    </div>
    
    
    </template>