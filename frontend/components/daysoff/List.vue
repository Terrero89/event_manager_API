<script setup lang="ts">
const props = defineProps([
  "_id",
  "currentYear",
  "previousYearHours",
  "currentPersonalDaysHours",
  "currentSickDaysHours",
  "currentVacationDaysHours",
  "currentHolidayDaysHours",
  "currentAccrueHoursForYear",
  "currentAccruedHoursForMonth",
  "currentAccruedMonthsPerYear",
  "status",
  "description",
  "createdAt",
  "updatedAt",
]);
</script>

<template>
  <div class="daysoff-list">
    <DaysoffItem
      :id="props._id"
      :currentYear="props.currentYear"
      :previousYearHours="props.previousYearHours"
      :currentPersonalDaysHours="props.currentPersonalDaysHours"
      :currentSickDaysHours="props.currentSickDaysHours"
      :currentVacationDaysHours="props.currentVacationDaysHours"
      :currentHolidayDaysHours="props.currentHolidayDaysHours"
      :currentAccrueHoursForYear="props.currentAccrueHoursForYear"
      :currentAccruedHoursForMonth="props.currentAccruedHoursForMonth"
      :currentAccruedMonthsPerYear="props.currentAccruedMonthsPerYear"
      :status="props.status"
      :description="props.description"
      :createdAt="props.createdAt"
      :updatedAt="props.updatedAt"
    />
  </div>
</template>

<style scoped>
.daysoff-list {
  background-color: #1f242a;
  padding: 0.2rem;
}
</style>
