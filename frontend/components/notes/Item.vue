<script setup>
const props = defineProps([
  "id",
  "description",
  "date",
  "noteType",
  "noteName",
  "priorityLevel",
  "sprintId",
]);

const typeColor = computed(() => {
  switch (props.noteType) {
    case "1x1":
      return "blue";
    case "Standup":
      return "cyan";
    case "Training":
      return "orange";
    case "Contribution":
      return "purple";
    case "Mentor Meeting":
      return "yellow";
    case "Mentee Meeting":
      return "teal";
    case "Retrospective":
      return "green";
    case "Planning":
      return "amber";
    case "Workshops":
      return "red";
    case "Collaboration":
      return "lime";
    case "Feedback Session":
      return "indigo";
    case "Brainstorming":
      return "pink";
    case "Presentation":
      return "fuchsia";
    case "Problem Solving":
      return "violet";
    case "Team Building":
      return "rose";
    case "Pair Programming":
      return "emerald";
    case "Other":
      return "gray";
    default:
      return "gray";
  }
});
const noteIdRoute = computed(()=> `/notes/${props.id}`)
const isOpen = ref(false);
</script>

<template>
  <div>
    <!-- <h3>ITEM COMPONENT</h3> -->
    <UIRenderer>
      <div class="item">
        <p><strong>Name: </strong> {{ noteName }}</p>
     

        <div class="item-header">
          
         
         
                  <p><strong>Type</strong> <UBadge :color="typeColor" > {{ props.noteType }}</UBadge></p>
      <p>
              <strong>Description: </strong>
              {{
                description.length > 25
                  ? description.slice(0, 25) + "..."
                  : description
              }}
            </p>
        </div>
        <div class="item-content">
          <div>
            <p><strong>Date: </strong> {{formatDate(date) }}</p>
            

            <p><strong>Priority Level:</strong> {{ priorityLevel }}</p>
            <p><strong>Sprint ID:</strong> {{ sprintId }}</p>
          </div>
        </div>
      </div>
      <div class="item-buttons my-2">
        <UButton class="b" @click="isOpen = true" >Details</UButton>
        <!-- <NuxtLink :to="noteIdRoute">About page</NuxtLink> -->
        <UModal v-model="isOpen"  >
    
         <NotesDetails
             :id="props.id"
            :title="props.title"
            :description="props.description"
            :date="props.date"
            :noteType="props.noteType"
            :noteName="props.noteName"
            :priorityLevel="props.priorityLevel"
            :sprintId="props.sprintId"
         
         />
        
        
        </UModal>
      </div>
    </UIRenderer>
  </div>
</template>

<style scoped>
.item {
  margin: 0.9rem 0;
  display: flex;
}
.item-content div{

  display:flex;
  flex-wrap:wrap;
}

.item .item-header {
    display:flex;
    flex-wrap:wrap;

  font-size: 0.9rem;
  /* border:solid red 1px; */
}

.item-header p {
  margin: 0.2rem 0;
  font-size: 0.9rem;
  margin-right: 1rem;

}
.item-header strong {
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
