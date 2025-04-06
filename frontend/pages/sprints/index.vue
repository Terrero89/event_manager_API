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
 
  ]
];
const isOpen = ref(false);
</script>

<template>
  <div>
       <!--DROPDOWN IN STORIES-->
    
     <div class="nav-flex my-2 border-b border-gray-200 dark:border-gray-800">

       <UHorizontalNavigation :links="navLinks" class=""/>
       <UModal v-model="isOpen">
              <div class="p-4">
             IS HERE 
              </div>
            </UModal>
      
  <UButton class="my-2 " color="blue" size="xs" variant="soft" label="Add" @Click="isOpen = true">Insights</UButton>
</div>
    
    <div>SPRINTS PAGE </div>
    <div>ADDING NEEW SPRINT</div>
    <div>DISPLAY SPRINT EDIT SPRINTS</div>
    <div>DISPLAY STORIES UNDER SPECIFIC SPRINTS</div>
  </div>

</template>



<style scoped>
.nav-flex {
  display: flex;
  justify-content: flex-end;

}

  </style>