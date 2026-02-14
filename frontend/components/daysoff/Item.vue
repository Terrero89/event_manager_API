<script setup lang="ts">
import { computed, ref } from "vue";
import { formatDate } from "~/utils/date-conversion";

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

// Pick a badge color based on type of time off
const typeColor = computed(() => {
  switch (props.status) {
    case "Vacation":
      return "green";
    case "Sick Leave":
      return "red";
    case "Personal Leave":
      return "blue";
    case "Compensatory Time Off":
      return "amber";
    case "Unpaid Leave":
      return "orange";
    case "Maternity/Paternity Leave":
      return "pink";
    case "Bereavement Leave":
      return "gray";
    case "Jury Duty":
      return "indigo";
    case "Military Leave":
      return "teal";
    case "Public Service Leave":
      return "lime";
    case "Other":
      return "gray";
    default:
      return "gray";
  }
});

const isOpen = ref(false);
</script>

<template>
  <div>
    <UIRenderer>
      <div class="item">
        <p class="mb-4">
          <strong>Current Year </strong>
          <UBadge :color="typeColor" variant="soft">{{ props.currentYear }} </UBadge>
        </p>
        <p>
          <strong>Previous Year Hours: </strong>
          <UBadge :color="typeColor" variant="soft"
            >{{ props.previousYearHours }}
          </UBadge>
        </p>
        <div class="item-header">
          <p>
            <strong>Personal Days Hours: </strong>
            <UBadge :color="typeColor" variant="soft">
              {{ props.currentPersonalDaysHours }}
            </UBadge>
          </p>

          <p>
            <strong>Sick Days Hours: </strong
            ><UBadge :color="typeColor" variant="soft">
              {{ props.currentSickDaysHours }}
            </UBadge>
          </p>
          <p>
            <strong>Current Holidays Hours: </strong>
            <UBadge :color="typeColor" variant="soft">
              {{ props.currentHolidayDaysHours }}
            </UBadge>
          </p>

          <p>
            <strong>Current Accrued Hours For Year: </strong>
            <UBadge :color="typeColor" variant="soft">
              {{ props.currentAccrueHoursForYear }}
            </UBadge>
          </p>
          <p>
            <strong>Current Accrued Hours For Month: </strong>
            <UBadge :color="typeColor" variant="soft">
              {{ props.currentAccruedHoursForMonth }}
            </UBadge>
          </p>

          <p>
            <strong>Current Accrued Months Per Year: </strong>
            <UBadge :color="typeColor" variant="soft">
              {{ props.currentAccruedMonthsPerYear }}
            </UBadge>
          </p>
          <p>
            <strong>Vacation Days Hours: </strong>
            <UBadge :color="typeColor" variant="soft">
              {{ props.currentVacationDaysHours }}
            </UBadge>
          </p>
          <p>
            <strong>Holiday Hours:</strong>
            <UBadge color="red" variant="soft">
              {{ props.currentHolidayDaysHours }}
            </UBadge>
          </p>
        </div>
        <div class="item-flex">
          <p class="mr-2"><strong>Date: </strong> {{ formatDate(props.createdAt) }}</p>
        </div>
        <div class="item-content"></div>
      </div>

      <div class="item-buttons my-2">
        <UButton variant="soft" class="" @click="isOpen = true">Details</UButton>

        <UModal v-model="isOpen">
          <DaysoffUpdate
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
        </UModal>
      </div>
    </UIRenderer>
  </div>
</template>

<style scoped>
.b {
  margin-top: auto;
  margin-left: auto;
}

.item-buttons {
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.item-flex {
  display: flex;
  justify-content: start;
}

.item {
  margin: 0.9rem 0;
  display: flex;
}

.item-content div {
  display: flex;
  flex-wrap: wrap;
}

.item .item-header {
  display: flex;
  flex-wrap: wrap;
  font-size: 0.9rem;
}

.item-header p,
div {
  margin: 0.2rem 0;
  font-size: 0.9rem;
  margin-right: 1rem;
}

.item-header strong,
div {
  margin: 0.1rem 0;
  font-size: 0.9rem;
  margin-right: 0.5rem;
}

.item-content p {
  margin: 0.2rem 0;
  font-size: 0.9rem;
  display: flex;
  margin-right: 1rem;
  flex-wrap: wrap;
}

.item-content strong {
  margin: 0.1rem 0;
  font-size: 0.9rem;
  margin-right: 0.5rem;
}

.item {
  margin-right: auto;
  flex-direction: column;
  justify-content: flex-end;
  margin-top: 0.5rem;
  color: white;
}
</style>
