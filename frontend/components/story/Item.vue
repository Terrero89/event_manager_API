<script setup lang="ts">
// import CONFIG from '@/config'; // Adjust the path as needed

import { computed, ref } from "vue";

const props = defineProps([
  "_id",
  "storyNumber", // DMR-xxxx
  "storyName", // C2T xxx
  "storyDescription", // description
  "difficultyLevel", // easy, medium, hard
  "storyPoints", // 1, 2, 3, 5, 8, 13
  "workType", // feature, bug, production
  "developmentType", // frontend, backend, fullstack
  "status", // to do, in progress, demo ready, completed, released
  "storyComments",
  "reporter", // reported who assigned story
  "repoNames", // repo we are going to work on
  "dateAssigned",
  "dateCompleted",
  "sprintId", // PL!, 2 etcc
  "learning", // comments on learning
  "createdAt",
  "updatedAt",
]);

const developmentTypeColor = computed(() => {
  switch (props.developmentType) {
    case "Frontend":
      return "blue";
    case "Backend":
      return "purple";
    case "Fullstack":
      return "teal";
    default:
      return "black";
  }
});

const workTypeColor = computed(() => {
  switch (props.workType) {
    case "Story":
      return "blue";
    case "Bug":
      return "purple";
    case "Non-prod":
      return "orange";
    case "Tasks":
      return "cyan";
    case "Tech Debt":
      return "red";
    case "Spike":
      return "teal";
    case "Feature":
      return "indigo";
    case "Epic":
      return "green";
    case "Testing":
      return "pink";
    default:
      return "black";
  }
});

const progressColor = computed(() => {
  switch (props.status) {
    case "Completed":
      return "blue";
    case "In Progress":
      return "orange";
    case "Pending":
      return "purple";
    case "Backlog":
      return "teal";
    case "Review":
      return "green";
    case "Done":
      return "yellow";

    case "Epic":

    default:
      return "black";
  }
});

const pointsColor = computed(() => {
  switch (props.storyPoints) {
    case 1:
      return "green";
    case 2:
      return "blue";
    case 3:
      return "orange";
    case 5:
      return "red";
    case 8:
      return "red";
    case 13:
      return "red";
  }
});

// Define a palette of colors
const colors = ["#FFD93D", "#6A4C93", "#1A535C", "#FF6B6B", "#4ECDC4"];

const repoList = computed(() => {
  return props.repoNames
    .split(",") // split by comma
    .map((item: string, index: number) => {
      return {
        name: item.trim(), // remove extra spaces
        color: colors[index % colors.length], // assign a color in order
      };
    });
});

const isOpen = ref(false);
</script>

<template>
  <div>
    <!-- change color based on development, workType etc. -->
    <UIRenderer>
      <div class="item">
        <p><strong>Sprint Id: </strong> {{ props.sprintId }}</p>
        <div class="item-header">
          <div>
            <p>
              <strong>Number: </strong>

              <UBadge variant="soft" color="gray"> {{ props.storyNumber }}</UBadge>
            </p>
            <p>
              <strong>Name:</strong>
              {{
                props.storyName.length > 35
                  ? props.storyName.slice(0, 35) + "..."
                  : props.storyName
              }}
            </p>
          </div>
        </div>

        <div class="item-header">
          <p>
            <strong>Development: </strong>
            <UBadge :color="developmentTypeColor" variant="soft">
              {{ props.developmentType }}</UBadge
            >
          </p>

          <p>
            <strong>Work Type: </strong>
            <UBadge :color="workTypeColor" variant="soft"> {{ props.workType }}</UBadge>
          </p>
        </div>

        <div class="item-header">
          <p>
            <strong>Points: </strong>
            <UBadge :color="pointsColor" variant="soft"> {{ props.storyPoints }} </UBadge>
          </p>
          <p>
            <strong>Development Status: </strong>
            <UBadge :color="progressColor" variant="soft"> {{ props.status }}</UBadge>
          </p>
        </div>

        <div class="item-content">
          <div class="item-flex">
            <p class="mr-2"><strong>Repos:</strong></p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(repo, index) in repoList"
                :key="index"
                :style="{ color: repo.color }"
                class="font-medium"
              >
                <UBadge :color="repo.color" variant="outline">
                  {{ repo.name }}
                </UBadge>
              </span>
            </div>
          </div>
          <div>
            <p><strong>Start Date: </strong> {{ formatDate(props.dateAssigned) }}</p>
            <p>
              <strong>End Date: </strong>
              {{
                formatDate(props.dateCompleted)
                  ? formatDate(props.dateCompleted)
                  : "Not Completed"
              }}
            </p>
          </div>
        </div>
      </div>

      <div class="item-buttons my-2">
        <UButton variant="soft" class="" progressColor @click="isOpen = true"
          >Details</UButton
        >

        <UModal v-model="isOpen">
          <div class="progress">
            <StoryDetails
              :_id="props._id"
              :storyName="props.storyName"
              :storyNumber="props.storyNumber"
              :storyDescription="props.storyDescription"
              :difficultyLevel="props.difficultyLevel"
              :storyPoints="props.storyPoints"
              :workType="props.workType"
              :developmentType="props.developmentType"
              :status="props.status"
              :storyComments="props.storyComments"
              :dateAssigned="props.dateAssigned"
              :reporter="props.reporter"
              :repoNames="props.repoNames"
              :dateCompleted="props.dateCompleted"
              :sprintId="props.sprintId"
              :learning="props.learning"
              :createdAt="props.createdAt"
              :updatedAt="props.updatedAt"
            />
          </div>
        </UModal>
      </div>
    </UIRenderer>
  </div>
</template>

<style scoped>
.item-status {
  display: flex;
}
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
