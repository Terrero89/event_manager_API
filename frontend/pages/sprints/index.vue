<script setup lang="ts">
const navLinks = [
  [],
  [
    {
      label: 'Create Sprint',
      icon: 'i-heroicons-plus',
      to: '/stories/create',
      badge: {
        label: 'Add Sprint',
        color: 'blue',
        size: "sm"
      }
    },
    {
      label: 'Create Sprint',
      icon: 'i-heroicons-plus',
      to: '/sprints/create',
      badge: {
        label: 'Add',
        color: 'green',
        size: "sm"
      }
    },
    {
      label: 'Insights',
      icon: 'i-heroicons-command-line',
      to: '/'
    }
  ]
];
</script>

<template>
  <div>
       <!--DROPDOWN IN STORIES-->
       <div class="nav-flex my-2 border-b border-gray-200 dark:border-gray-800">
     
       <UHorizontalNavigation :links="navLinks" class=""/>
      </div>
    <div>SPRINTS PAGE </div>
    <div>ADDING NEEW SPRINT</div>
    <div>DISPLAY SPRINT EDIT SPRINTS</div>
    <div>DISPLAY STORIES UNDER SPECIFIC SPRINTS</div>
  </div>

</template>

<style scoped>

</style>