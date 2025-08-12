<script setup lang="ts">
import { calculateSprintDays } from "~/utils/date-time";
const sprintsStore = useSprintStore();

const { addSprint, fetchSprints } = sprintsStore;
const { currentSprint, sprintList } = storeToRefs(sprintsStore);

const sprint = Math.abs(calculateSprintDays(new Date("2025-01-9"), "2025-01-22"));
let maxValue = ref(14);
let calc = ref(Math.abs(sprint - maxValue.value));

onMounted(async () => {
  await fetchSprints();
});
</script>

<template>
  <div>
    <!--PROGRESS IN PERCENTAGE FOR SPRINT-->
    <div class="header">
  
      <div class="header-title">
        <span>Sprint: </span>
        <span class="sprint">
          {{ sprintList.reverse()[0] ? sprintList.reverse()[0] : "No Current Sprint" }}
        </span>
      </div>
      <div class="my-2 progress-bar">
        <UProgress :value="Math.round(calc)" :max="maxValue" />
        <!--          {{maxValue / Math.abs(sprint) * 0.1}}-->
        <p class="done">{{ Math.round((Math.round(calc) / maxValue) * 100) }}%</p>
        done
      </div>
    </div>
  </div>
</template>
<style scoped>
.sprint {
  color: rgb(16, 163, 173);
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
