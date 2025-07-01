<script setup>
const props = defineProps([
  "_id",
  "sprintId",
  "startDate",
  "endDate",
  "summary",
  "piNotes",
  "storiesUnderSprint",
  "createdAt",
  "updatedAt",
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
        :_id="props._id"
        :sprintId="props.sprintId"
        :startDate="props.startDate"
        :endDate="props.endDate"
        :summary="props.summary"
        :piNotes="props.piNotes"
        :storiesUnderSprint="props.storiesUnderSprint"
        :updatedAt="props.updatedAt"
        :createdAt="props.createdAt"
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
