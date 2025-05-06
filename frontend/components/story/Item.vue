<script setup lang="ts">
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
// const storyIdRoute = computed(() => `/story/${props.id}`);
const isOpen = ref(false);
</script>

<!-- <template>
  <div>
    <UIRenderer>
    <div class="story-item">
      <div>
        <h1 class="">{{ storyTitle }}</h1>
        <p class="">{{ storyDescription }}</p>
        <p class="">{{ storyType }}</p>
        <p class="">{{ storyPoints }}</p>
        <p class="">{{ difficultyLevel }}</p>
        <p class="">{{ workType }}</p>
        <p class="">{{ developmentType }}</p>
        <p class="">{{ status }}</p>
        <p class="">{{ reporter }}</p>
        <p class="">{{ repoNames }}</p>
        <p class="">{{ dateAssigned }}</p>
        <p class="">{{ dateCompleted }}</p>
        <p class="">{{ sprint }}</p>
        <p class="">{{ storyComments }}</p>
        <p class="">{{ subtasks }}</p>
        <div class="" v-for="item in learning" :key="item.id">

          <h2 class="">{{item.id}}</h2>
          <h2 class="">{{item.title}}</h2>

        </div> -->  {{itemsAsArray}}

<!-- <p class="">{{ planningNotes }}</p>
        <p class="">{{ updatedAt }}</p>
      </div> -->

<!-- <UButton class="b" @click="isOpen = true">DetaistoryTitle ls</UButton>
        <UModal v-model="isOpen"  >
          <SprintsDetails
            :id="props.id"
            :sprintID="props.sprintID"
            :relatedStoryId="props.relatedStoryId"
            :startDate="props.startDate"
            :dueDate="props.dueDate"
            :summary="props.summary"
            :piNotes="props.piNotes"
            :storyUnderSprint="props.storyUnderSprint"
          />
        </UModal>
    </div>
    </UIRenderer>
  </div>
</template> -->

<template>
  <div>
   <!-- change color based on development, workType etc. -->
    <UIRenderer>
      <div class="item">
        <p><strong>Sprint Id:</strong> {{ props.sprintId}}</p>
        <p><strong>Story Name:</strong> {{ props.storyTitle }}</p>

        <div class="item-header">
        
          <p><strong>Development: </strong> {{ props.developmentType }}</p>
          <p><strong>Work Type:</strong> {{ props.workType }}</p>
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
          v-if="props.status === 'Pending'"
          color="neutral"
          variant="outline"
          class="b mx-2"
          >{{ props.status }}</UButton
        >
        <UButton
          v-if="props.status === 'Completed'"
          color="blue"
          variant="outline"
          class="b mx-2"
          >{{ props.status }}</UButton
        >
        <UButton
          v-if="props.status === 'In Progress'"
          color="yellow"
          variant="outline"
          class="b mx-2"
          >{{ props.status }}</UButton
        >
        <UButton class="b" @click="isOpen = true">Details</UButton>
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
      </div>
    </UIRenderer>
  </div>
</template>

<style scoped>
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
