<script setup lang="ts">
import { ref } from "vue";

const props = defineProps([
  "sprintId",         // e.g. 'sprint_5000'
  "workingOn",        // e.g. 'Building auth flow'
  "notes",            // e.g. 'Fixed routing issues'
  "learnings",        // e.g. 'Learned about Vue transitions'
  "repo",             // e.g. 'my-project-repo'
  "ticketNumber",     // e.g. 'ABC-123'
  "date",             // ISO string
   "createdAt",
  "updatedAt",
]);
const typeColor = computed(() => {
  switch (props.workingOn) {
    case "Story":
      return "blue";
    case "Spike":
      return "indigo";
    case "Feature":
      return "green";
    case "Bug Fix":
      return "red";
    case "Technical Debt":
      return "amber";
    case "Research":
      return "purple";
    case "Documentation":
      return "teal";
    case "Testing":
      return "cyan";
    case "Code Review":
      return "lime";
    case "Deployment":
      return "pink";
    case "Maintenance":
      return "orange";
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
        <p><strong>Sprint ID:</strong> {{ props.sprintId }}</p>

        <div class="item-header">
        
               <p>
            <strong>Working On: </strong>
            <UBadge :color="typeColor" variant="soft">
              {{ props.workingOn}}
            </UBadge>
          </p>
          <p><strong>Ticket #:</strong> {{ props.ticketNumber }}</p>
        </div>

        <div class="item-flex">
          <p class="mr-2">
            <strong>Repos:</strong> {{ props.repo }}
          </p>
          <p>
            <strong>Dates:</strong> {{ formatDate(props.date) }}
          </p>
        </div>
  <div class="item-flex">
     <p class= "mr-2"> <strong>Notes:</strong> {{ props.notes }}</p>
          <p><strong>Learnings:</strong> {{ props.learnings }}</p>
      
        </div>

         <div class="item-flex">
  
          <p class="mr-2">
            <strong>Date: </strong> {{ formatDate(props.date) }}
          </p>
          <p>
            <strong>Requested On: </strong> {{ formatDate(props.createdAt) }}
          </p>
        </div>
        <div class="item-content">
       

          
        </div>
      </div>

      <div class="item-buttons my-2">
        <UButton variant="soft" @click="isOpen = true">Details</UButton>

        <UModal v-model="isOpen">
          <div class="p-4">
            <h2 class="text-lg font-semibold mb-2">Full Details</h2>
            <p><strong>Sprint:</strong> {{ props.sprintId }}</p>
            <p><strong>Working On:</strong> {{ props.workingOn }}</p>
            <p><strong>Notes:</strong> {{ props.notes }}</p>
            <p><strong>Learnings:</strong> {{ props.learnings }}</p>
            <p><strong>Repo:</strong> {{ props.repo }}</p>
            <p><strong>Ticket #:</strong> {{ props.ticketNumber }}</p>
            <p><strong>Date:</strong> {{ formatDate(props.date) }}</p>
          </div>
        </UModal>
      </div>
    </UIRenderer>
  </div>
</template>

<style scoped>


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
  flex-direction: column;
  justify-content: flex-end;
  color: white;
}

.item-header {
  display: flex;
  flex-wrap: wrap;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.item-header p {
  margin: 0.2rem 1rem 0.2rem 0;
}

.item-content p {
  margin: 0.2rem 0;
  font-size: 0.9rem;
}
</style>
