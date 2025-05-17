<script setup lang="ts">
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28","29","30","31"];
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
      <UHorizontalNavigation :links="navLinks" class="" />
    </div>
    <div class="nav-flex wrapit">
      <UInputMenu color="gray" variant="outline" trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2" placeholder="Select a type" :options="['Sprint 1', 'Sprint 2', 'Sprint 3']"
        model-value="" />
      <UInputMenu color="gray" variant="outline" trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2" placeholder="Select a day" :options="days"
        model-value="" />
      <UInputMenu color="gray" variant="outline" trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2" placeholder="Select a month" :options="months"
        model-value="" />
      <UInputMenu color="gray" variant="outline" trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2" placeholder="Select a year" :options="['Sprint 1', 'Sprint 2', 'Sprint 3']"
        model-value="" />

    </div>
    <div>- filter per month</div>
    <div>- filter per month</div>
    <div>- filter per year</div>
    <div>- filter per type</div>
    <div>DashboardPage</div>
    <div>- Stories this month</div>
    <div>- Events this month</div>
    <div>- Meetings this month</div>
    <div>- Sprints this month</div>
    <div>- Notes/ types of notes this month</div>
    <div>- Insights </div>
    <div>DashboardPage</div>


  </div>


</template>

<style scoped>
.nav-flex {
  display: flex;
  justify-content: flex-end;

}


.wrapit {
  flex-wrap: wrap;
}

.nav-flex {
  display: flex;
  justify-content: flex-start;
}

.drop {
  margin-right: 5rem;
}
</style>