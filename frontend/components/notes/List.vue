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

      <NotesItem
        :_id="props._id"
        :description="props.description"
        :date="props.date"
        :noteType="props.noteType"
        :noteName="props.noteName"
        :priorityLevel="props.priorityLevel"
        :sprintId="props.sprintId"
        :updatedAt="props.updatedAt"
        :createdAt="props.createdAt"
      />
    </div>
    <div class="my-5"></div>
  </div>
</template>

<style scoped>
.progress {
  background-color: #1f242a;
  padding: 0.2rem;
}
</style>
