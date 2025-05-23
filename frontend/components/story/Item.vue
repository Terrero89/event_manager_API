<script setup lang="ts">
// import CONFIG from '@/config'; // Adjust the path as needed

const props = defineProps([
  //PROPS HERE
  "id",
  "storyTitle",
  "storyDescription",
  "difficultyLevel",
  "storyPoints",
  "workType",
  "developmentType",
  "status",
  "storyComments",
  "subtasks",
  "date",
  "updatedAt",
  "reporter",
  "repoNames",
  "dateAssigned",
  "dateCompleted",
  "sprintId",
  "storyType",
  "learning",
  "planningNotes",
  "updatedAt",
]);


const developmentTypeColor = computed(() => {
  switch (props.developmentType) {
    case 'Frontend':
      return 'blue';
    case 'Backend':
      return 'purple';
    case 'Fullstack':
      return 'teal';
    default:
      return 'black';
  }
});

const workTypeColor = computed(() => {
  switch (props.workType) {
    case 'Story':
      return 'blue';
    case 'Spike':
      return 'teal';
    case 'Bug':
      return 'purple';
    case 'Feature':
      return 'blue';
    case 'non-prod':
      return 'orange';
    case 'Epic':
      return 'green';
    case 'Tech Debt':
      return 'red';
    case 'Epic':
 
    default:
      return 'black';
  }
});

const progressColor = computed(() => {
  switch (props.status) {
    case 'Completed':
      return 'blue';
    case 'In Progress':
      return 'orange';
    case 'Pending':
      return 'purple';
    case 'Backlog':
      return 'teal';
    case 'Review':
      return 'green';
    case 'Done':
      return 'yellow';

    case 'Epic':
 
    default:
      return 'black';
  }
});



const isOpen = ref(false);
</script>

ype: Training
<template>
  <div>
   <!-- change color based on development, workType etc. -->
    <UIRenderer>
      <div class="item">
        <p><strong>Sprint Id:</strong> {{ props.sprintId}}</p>
        <p><strong>Story Name:</strong> {{ props.storyTitle }}</p>

        <div class="item-header">
        
          <p><strong>Development: </strong> <UBadge :color="developmentTypeColor" variant="outline"> {{ props.developmentType }}</UBadge></p>


 
               <p><strong>Work Type:</strong> <UBadge :color="workTypeColor" > {{ props.workType }}</UBadge></p>
        </div>
        <div class="item-content">
          <div>
            <p><strong>Start Date: </strong> {{ formatDate(props.dateAssigned) }}</p>
            <p><strong>End Date: </strong> {{ formatDate(props.dateCompleted) }}</p>
          </div>
        </div>
      </div>

      <div class="item-buttons my-2">
        <UButton
      
          :color="progressColor"
          variant="outline"
          class=" mx-2"
          >{{ props.status }}</UButton
        >
  
    
        <UModal v-model="isOpen">
          <div class="progress">
      
      <StoryDetails
      :id="props.id"
      :progressType="props.progressType"
      :storyTitle="props.storyTitle"
      :storyName="props.storyName"
      :storyDescription="props.storyDescription"
      :difficultyLevel="props.difficultyLevel"
      :storyPoints="props.storyPoints"
      :workType="props.workType"
      :developmentType="props.developmentType"
      :status="props.status"
      :storyComments="props.storyComments"
      :date="props.date"
      :reporter="props.reporter"
      :repoNames="props.repoNames"
      :dateCompleted="props.dateCompleted"
      :sprintId="props.sprintId"
      :learning="props.learning"
    


      />
    </div>

        </UModal>
        <UButton class="b mx-2 mb-2" @click="isOpen = true">See Details</UButton> 
      </div>
    
    </UIRenderer>
    
  </div>
</template>

<style scoped>
.b{
  margin-top:auto;
}
.item-buttons {



  display: flex;
  flex-direction: column;

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
