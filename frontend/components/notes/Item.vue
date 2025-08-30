<script setup>
const props = defineProps({
  _id: { type: String, required: true },
  description: String,
  date: String,
  noteType: String,
  noteName: String,
  sprintId: String,
  updatedAt: String,
  createdAt: String,
});
const typeColor = computed(() => {
  switch (props.noteType) {
    case "1x1":
      return "blue";
    case "Standup":
      return "cyan";
    case "Retros":
      return "green";
    case "Planning":
      return "amber";
    case "Bi weekly Demos":
      return "purple";
    case "Training":
      return "orange";
    case "Collaboration":
      return "lime";
    case "Mentor Meetings":
      return "yellow";
    case "Mentee Meetings":
      return "teal";
    case "Workshops":
      return "red";
    case "Feedback Exchange":
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
    case "Volunteering Meetings":
      return "sky";
    case "Prod Support":
      return "cyan";
    case "Personal Development":
      return "slate";
    case "Professional Development":
      return "zinc";
    case "ERG Meetings":
      return "neutral";
    case "Ad Hoc Meetings":
      return "stone";
    case "Other":
      return "gray";

    case "Onboarding":
      return "teal";
    case "Offboarding":
      return "orange";
    case "Coffee Chats":
      return "cyan";
    case "Lunch and Learn":
      return "violet";
    case "Other":
      return "mediumseagreen";
    // extra examples if you need more:
    case "Follow Up":
      return "indigo";
    case "Sprint Review":
      return "sky";
    case "All Hands":
      return "slate";
    case "Town Hall":
      return "stone";
    case "Social Hour":
      return "fuscia";
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
            <strong>Description: </strong>
            {{ description.length > 25 ? description.slice(0, 25) + "..." : description }}
          </p>
          <p>
            <strong>Type:</strong>
            <UBadge variant="soft" :color="typeColor"> {{ props.noteType }}</UBadge>
          </p>
        </div>

        <div class="item-content">
          <div>
            <p><strong>Date: </strong> {{ formatDate(date) }}</p>
          </div>
        </div>
        <div>
          <div class="data">
            <p class="mr-2">
              <strong>Created on:</strong> {{ formatDate(props.createdAt) }}
            </p>
          </div>
        </div>
      </div>

      <div class="item-buttons my-2">
        <UButton variant="soft" class="b" @click="isOpen = true">Details</UButton>

        <!-- <NuxtLink :to="noteIdRoute">About page</NuxtLink> -->
        <UModal v-model="isOpen">
          <NotesDetails
            :_id="props._id"
            :title="props.title"
            :description="props.description"
            :date="props.date"
            :noteType="props.noteType"
            :noteName="props.noteName"
            :sprintId="props.sprintId"
            :updatedAt="props.updatedAt"
            :createdAt="props.createdAt"
          />
        </UModal>
      </div>
    </UIRenderer>
  </div>
</template>

<style scoped>
.data {
  display: flex;
  flex-wrap: wrap;
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
