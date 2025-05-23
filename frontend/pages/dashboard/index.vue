<script setup lang="ts">

import { calculateSprintDays } from "~/utils/date-time";
const sprintsStore = useSprintStore();


const { addSprint, fetchSprints } = sprintsStore;
const { currentSprint, sprintList } = storeToRefs(sprintsStore);


const sprint = Math.abs(calculateSprintDays(new Date("2025-01-9"), "2025-01-22"))
let maxValue = ref(14)
let calc = ref(Math.abs(sprint - maxValue.value))

onMounted(async () => {

  await fetchSprints()
});
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
const types = ["stories", "events", "notes", "meetings"];
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

  ]
];

const currType = ref('')
</script>

<template>
  <div>
    {{ sprintList }}
    <div class="nav-flex my-2 border-b border-gray-200 dark:border-gray-800">
      <UHorizontalNavigation :links="navLinks" class="" />
    </div>
    <div class="nav-flex wrapit">


      <UInputMenu color="gray" variant="outline" trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2" placeholder="Select type" :options="types" v-model="currType" />
      <UInputMenu v-if="currType === 'stories'" color="gray" variant="outline" trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2" placeholder="Select sprint" :options="sprintList" model-value="" />
      <UInputMenu color="gray" variant="outline" trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2" placeholder="Select a month" :options="months" model-value="" />
      <UInputMenu color="gray" variant="outline" trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2" placeholder="Select a year" :options="['Sprint 1', 'Sprint 2', 'Sprint 3']"
        model-value="" />

    </div>

    <div>DashboardPage</div>




    <div class="border">
      <NumbersStories v-if="currType === 'stories'" />
      <NumbersMeetings v-if="currType === 'meetings'" />
      <NumbersNotes v-if="currType === 'notes'" />
      <NumbersEvents v-if="currType === 'events'" />
    </div>
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