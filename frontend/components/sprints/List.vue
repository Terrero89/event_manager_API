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
const isOpen = ref(false);
</script>
<template>
  <div>
    <div class="progress">
      <div class="item-buttons">
        <UModal v-model="isOpen">
          <div class="p-4">SHOW DETAILS HERE</div>
        </UModal>
      </div>

      <SprintsItem
        :id="props.id"
        :sprintID="props.sprintID"
        :relatedStoryId="props.relatedStoryId"
        :startDate="props.startDate"
        :dueDate="props.dueDate"
        :summary="props.summary"
        :piNotes="props.piNotes"
        :storyUnderSprint="props.storyUnderSprint"
      />
    </div>
  </div>
</template>

<style scoped>
.progress {
  background-color: #1f242a;
  padding: 0.2rem;
}
</style>
