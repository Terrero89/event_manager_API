<script setup lang="ts">
import {calculateSprintDays} from "~/utils/date-time";
const sprintsStore = useSprintStore();


const {  addSprint} = sprintsStore;
const {  loadCurrentSprintFromLocalStorage } = storeToRefs(sprintsStore);

// Replace with actual data key if needed (was using eventTypes vs sprints earlier)
const sprintList = computed(() => sprintsStore.loadFromLocalStorage('sprintList', []).slice(0, 5));
const currSprint = sprintsStore.loadFromLocalStorage('currentSprint', '')

const sprint = Math.abs(calculateSprintDays(new Date("2025-01-9"), "2025-01-22"))
let maxValue = ref(14)
let calc = ref(Math.abs(sprint - maxValue.value))

</script>

<template>

  <div>
    <!--PROGRESS IN PERCENTAGE FOR SPRINT-->
    <div class="header">
      <div class="header-title">
        <span class="sprint">{{ currSprint ? currSprint : 'No Current Sprint'}} </span>
       
      </div>
      <div class="my-2 progress-bar">
        <UProgress :value="Math.round(calc)" :max="maxValue"/>
        <!--          {{maxValue / Math.abs(sprint) * 0.1}}-->
        <p class="done">{{ Math.round(((Math.round(calc) / maxValue) * 100)) }}% </p>
        done
      </div>
    </div>
  </div>
</template>
<style scoped>

.sprint{
  color:rgb(16, 163, 173);
  font-weight: 700;

}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.f {
  display: flex;
  justify-content: flex-end;
}

.progress-bar {
  min-width: 12rem;
  display: flex;
  align-items: center;

}

.done {
  font-size: 12px;
  margin: 0 0.3rem;
}
</style>