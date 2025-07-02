<script setup lang="ts">
import { ref } from "vue";

const props = defineProps([
     "_id",
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
               <p>
            <strong>Ticket #: </strong>
            <UBadge color="indigo" variant="outline"  >
              {{ props.ticketNumber}}
            </UBadge>
          </p>
        </div>

        <div class="item-flex">
          <p class="mr-2">
            <strong>Repos:</strong> {{ props.repo }}
          </p>
       
        </div>
  <div class="item-flex">
     <!-- <p class= "mr-2"> <strong>Notes:</strong> {{ props.notes }}</p>
          <p><strong>Learnings:</strong> {{ props.learnings }}</p> -->
      
        </div>

         <div class="item-flex">
  
          <p class="mr-2">
            <strong>Created:</strong> {{ formatDate(props.date) }}
          </p>
        
         
        </div>
        <div class="item-content">
       

          
        </div>
      </div>



   <div class="item-buttons my-2">
        <UButton variant="soft" @click="isOpen = true">Details</UButton>

        <UModal v-model="isOpen">
    <StandupUpdate
        :_id="props._id"
      :sprintId="props.sprintId"
      :workingOn="props.workingOn"
      :notes="props.notes"
      :learnings="props.learnings"
      :repo="props.repo"
      :ticketNumber="props.ticketNumber"
      :date="props.date"
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
  /* max-width: 6rem; */
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
  /* background-color: #007bff; */
  color: white;
}
</style>
