<script setup>
const props = defineProps([
  "id",
  "sprintID",
  "relatedStoryId",
  "startDate",
  "dueDate",
  "summary",
  "piNotes",
  "storiesUnderSprint",
]);
const noteIdRoute = computed(() => `/story/${props.id}`);
const isOpen = ref(false);
</script>

<template>
  <div>
    <!-- <h3>ITEM COMPONENT</h3> -->
    <UIRenderer>
      <div class="item">
        <p><strong>Sprint: </strong> {{ sprintID }}</p>

        <div class="item-header">
          <p><strong>Related story ID:</strong> {{ relatedStoryId }}</p>
        </div>
        <div class="item-content">
          <div>
            <p><strong>Start Date: </strong> {{ formatDate(startDate) }}</p>
            <p><strong>End Date: </strong> {{ formatDate(dueDate) }}</p>
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
        <UButton variant="soft" class="b" @click="isOpen = true">Details</UButton>
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
