<script lang="ts">

</script>

<template>
    <div>Boilerplate events
    <div>Boilerplate events</div>
    <div class="nav-flex wrapit">
      
      <UInputMenu color="gray" variant="outline" trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2" placeholder="Select sprint" :options="['Sprint 1', 'Sprint 2', 'Sprint 3']"
        model-value="" />
         <UInputMenu color="gray" variant="outline" trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2" placeholder="Select type" :options="types"
        v-model="currType" />  <UInputMenu color="gray" variant="outline" trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2" placeholder="Select a day" :options="days"
        />
      <UInputMenu color="gray" variant="outline" trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2" placeholder="Select a month" :options="months"
        model-value="" />
      <UInputMenu color="gray" variant="outline" trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 my-3 mr-2" placeholder="Select a year" :options="['Sprint 1', 'Sprint 2', 'Sprint 3']"
        model-value="" />

    </div>
       <div>- filter start and end date</div>
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
    </div>div>
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